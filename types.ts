
export type ContentType = 
  | 'tiktok_shorts' 
  | 'instagram_reels' 
  | 'youtube_shorts' 
  | 'twitter_threads' 
  | 'linkedin_posts' 
  | 'newsletter' 
  | 'blog_post' 
  | 'seo_content' 
  | 'distribution_plan' 
  | 'monetization';

export interface GenerationSettings {
  language: string;
  tone: 'Professional' | 'Casual' | 'Educational' | 'Viral';
  brandVoice: boolean;
  autoCaptions: boolean;
  subtitleStyle: string;
  aspectRatio: '9:16' | '1:1' | '16:9';
  clipLength: '15s' | '30s' | '60s';
}

export interface GeneratedAsset {
  id: string;
  type: 'video' | 'text' | 'plan';
  platform: string;
  title: string;
  content: string;
  mediaUrl?: string;
  duration?: string;
  tags?: string[];
}

export type AppStatus = 'idle' | 'analyzing' | 'generating' | 'completed';
