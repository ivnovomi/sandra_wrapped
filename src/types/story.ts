export type SlideType = 'intro' | 'bio' | 'stats' | 'gallery' | 'gallery_explore' | 'timeline' | 'outro' | 'fast_review' | 'dedications' | 'dedications_intro';

export interface SlideContent {
  title?: string;
  subtitle?: string;
  highlight?: string;
  date?: string;
  location?: string;
  description?: string;
  people?: string[];
  icon?: string;
  stats?: Array<{ label: string; value: string }>;
  cta?: string;
  events?: Array<{ year: string; text: string }>;
  images?: Array<{ src: string; caption: string }>;
  image?: string;
  averages?: Array<{ label: string; value: string; color?: string }>;
  videos?: Array<{
    url: string;
    author: string;
    message?: string;
    thumbnail?: string;
    duration?: number;
  }>;
}

export interface Slide {
  id: string;
  type: SlideType;
  duration: number;
  content: SlideContent;
  style?: Record<string, string>;
}

export interface StoryTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface StoryMeta {
  title: string;
  beneficiary: string;
  occasion: string;
  date: string;
  theme: StoryTheme;
}

export interface StoryData {
  meta: StoryMeta;
  slides: Slide[];
}
