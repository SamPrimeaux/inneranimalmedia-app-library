// Type definitions for InnerAnimalMedia App Library

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  CAD_ASSETS: R2Bucket;
  HYPERDRIVE: Hyperdrive;
  IAM_SESSION: DurableObjectNamespace;
  MEAUX_SESSION: DurableObjectNamespace;
  CACHE?: KVNamespace; // Optional
  ENVIRONMENT: string;
  CLOUDFLARE_API_TOKEN?: string; // For API calls
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_IMAGES_ACCOUNT_HASH?: string;
  REALTIME_SFU_APP_ID?: string;
}

export interface App {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  category: string;
  subcategory: string | null;
  developer: string;
  developer_url: string | null;
  version: string;
  build_number: number | null;
  release_date: string;
  min_os_version: string | null;
  icon_url: string;
  hero_image_url: string | null;
  screenshots: string | null; // JSON string
  video_url: string | null;
  downloads: number;
  rating: number;
  review_count: number;
  is_public: boolean;
  is_featured: boolean;
  install_url: string;
  documentation_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface AppReview {
  id: number;
  app_id: string;
  user_id: string | null;
  username: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface LibraryQuery {
  category?: string;
  search?: string;
  featured?: boolean;
  sort?: 'popular' | 'newest' | 'rating' | 'name';
  page?: number;
  limit?: number;
}
