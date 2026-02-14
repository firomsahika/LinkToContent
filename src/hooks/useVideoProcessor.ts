import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useRef, useState } from 'react';

export const useVideoProcessor = () => {
  const ffmpegRef = useRef(new FFmpeg());
  const [loading, setLoading] = useState(false);

  /**
   * Initializes the FFmpeg WASM engine.
   * This requires the Cross-Origin headers in next.config.js
   */
  const init = async () => {
    if (ffmpegRef.current.loaded) return;
    
    setLoading(true);
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ffmpegRef.current.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    } catch (error) {
      console.error("FFmpeg initialization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 1. Extract Audio to send to API
   * Converts the uploaded video to a lightweight MP3.
   */
  const extractAudio = async (videoFile: File): Promise<Blob> => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg.loaded) await init();

    // Write the source file to virtual memory
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

    // Run FFmpeg command: Strip video (-vn) and convert to MP3
    await ffmpeg.exec([
      '-i', 'input.mp4',
      '-vn',
      '-acodec', 'libmp3lame',
      'audio.mp3'
    ]);

    const data = await ffmpeg.readFile('audio.mp3');
    
    /**
     * FIX: Use 'as any' to bypass the SharedArrayBuffer -> BlobPart mismatch.
     * This is necessary because SharedArrayBuffer (multi-threaded WASM) 
     * is technically a different type than standard ArrayBuffer in TypeScript.
     */
    return new Blob([data as any], { type: 'audio/mp3' });
  };

  /**
   * 2. Snip and Crop Viral Clips
   * Cuts a specific segment and applies a 9:16 vertical crop.
   */
  const snipClip = async (videoFile: File, start: string, end: string): Promise<string> => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg.loaded) await init();

    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
    
    // Create a unique filename based on the start time
    const outputName = `clip_${start.replace(/:/g, '')}.mp4`;
    
    /**
     * Command breakdown:
     * -ss: start time
     * -to: end time
     * -vf: Video Filter - Crop to 9:16 aspect ratio (center crop)
     * -c:v: Video codec (h264)
     * -preset: ultrafast (for speed in the browser)
     */
    await ffmpeg.exec([
      '-i', 'input.mp4',
      '-ss', start,
      '-to', end,
      '-vf', 'crop=ih*(9/16):ih:(iw-ow)/2:0',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      outputName
    ]);

    const data = await ffmpeg.readFile(outputName);
    
    // FIX: Again using 'as any' to handle the SharedArrayBuffer buffer
    return URL.createObjectURL(new Blob([data as any], { type: 'video/mp4' }));
  };

  return { init, extractAudio, snipClip, loading, ffmpeg: ffmpegRef.current };
};