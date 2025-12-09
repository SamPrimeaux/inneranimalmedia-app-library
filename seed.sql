-- Seed data for InnerAnimalMedia App Library

-- Insert categories
INSERT OR IGNORE INTO categories (id, name, slug, description, icon, display_order) VALUES
  ('productivity', 'Productivity', 'productivity', 'Get more done with powerful tools', '??', 1),
  ('media', 'Media & Content', 'media', 'Create and manage stunning media', '??', 2),
  ('dev-tools', 'Developer Tools', 'dev-tools', 'Build better software faster', '??', 3),
  ('ai-ml', 'AI & ML', 'ai-ml', 'Intelligence-powered applications', '??', 4),
  ('business', 'Business', 'business', 'Manage and grow your business', '??', 5),
  ('design', 'Design & Creative', 'design', 'Design tools for creators', '??', 6);

-- Insert sample apps
INSERT OR IGNORE INTO apps (id, name, slug, tagline, description, long_description, category, developer, developer_url, version, release_date, icon_url, install_url, is_featured) VALUES
  ('meauxaccess', 
   'MeauxAccess', 
   'meauxaccess', 
   'Enterprise Intelligence Platform', 
   'Full-featured enterprise dashboard with real-time analytics, team management, and intelligent insights.',
   'MeauxAccess is a comprehensive enterprise platform that provides real-time intelligence across your entire infrastructure. Features include: advanced analytics, team management, cost tracking, AI gateway integration, and multi-service orchestration. Built on Cloudflare Workers for global performance.',
   'productivity', 
   'Meaux Technologies', 
   'https://meauxtechnologies.com',
   '2.1.0',
   '2024-12-01',
   'https://assets.inneranimalmedia.com/icons/meauxaccess.png',
   'https://meauxaccess.com', 
   1),
  
  ('meauxphoto', 
   'MeauxPhoto', 
   'meauxphoto', 
   'Professional Photo Gallery', 
   'Lightning-fast photo gallery with AI organization, facial recognition, and bulk operations.',
   'MeauxPhoto transforms how you manage photos. Featuring AI-powered organization, automatic tagging, facial recognition, bulk editing, and cloud-native architecture. Upload thousands of photos with ease, organize them intelligently, and access them instantly from anywhere.',
   'media', 
   'Meaux Technologies', 
   'https://meauxtechnologies.com',
   '1.5.2',
   '2024-11-15',
   'https://assets.inneranimalmedia.com/icons/meauxphoto.png',
   'https://inneranimalmedia.com/apps/meauxphoto', 
   1),
  
  ('iautodidact', 
   'iAutodidact', 
   'iautodidact', 
   'Self-Learning Platform', 
   'Personalized learning paths with AI tutoring, progress tracking, and adaptive content.',
   'iAutodidact is an intelligent self-learning platform that adapts to your learning style. Features include AI-powered tutoring, personalized learning paths, spaced repetition, progress analytics, and integration with top educational resources. Learn anything, at your own pace.',
   'productivity', 
   'InnerAnimal Media', 
   'https://inneranimalmedia.com',
   '3.0.1',
   '2024-11-20',
   'https://assets.inneranimalmedia.com/icons/iautodidact.png',
   'https://iautodidact.com', 
   1),
  
  ('damnsam', 
   'DamnSam', 
   'damnsam', 
   'Personal AI Assistant', 
   'Your personal AI assistant powered by multiple AI models for maximum capability.',
   'DamnSam is a powerful AI assistant that combines the best of multiple AI models (GPT-4, Claude, Gemini) to help you with tasks, answer questions, and boost your productivity. Features include context-aware conversations, file analysis, code generation, and workflow automation.',
   'ai-ml', 
   'InnerAnimal Media', 
   'https://inneranimalmedia.com',
   '1.2.0',
   '2024-12-05',
   'https://assets.inneranimalmedia.com/icons/damnsam.png',
   'https://damnsam.inneranimalmedia.com', 
   1),
  
  ('grantwriting', 
   'Grant Writing Pipeline', 
   'grantwriting', 
   'Automated Grant Management', 
   'Complete grant writing and management pipeline with AI-assisted writing and tracking.',
   'Transform your grant writing process with AI assistance. This platform helps non-profits and organizations discover grants, write compelling proposals, track submissions, and manage awarded grants. Features include AI writing assistance, deadline tracking, and impact reporting.',
   'business', 
   'InnerAnimal Media', 
   'https://inneranimalmedia.com',
   '2.0.3',
   '2024-11-10',
   'https://assets.inneranimalmedia.com/icons/grantwriting.png',
   'https://grantwriting.inneranimalmedia.com', 
   0),
  
  ('designlab', 
   'DesignLab', 
   'designlab', 
   'Creative Design Studio', 
   'Professional design tools for creating stunning visuals, logos, and brand assets.',
   'DesignLab is a cloud-based design studio with professional-grade tools for creating logos, brand assets, social media graphics, and more. Features include vector editing, template library, asset management, and real-time collaboration. Perfect for designers and marketers.',
   'design', 
   'InnerAnimal Media', 
   'https://inneranimalmedia.com',
   '1.8.0',
   '2024-11-25',
   'https://assets.inneranimalmedia.com/icons/designlab.png',
   'https://designlab.inneranimalmedia.com', 
   0),

  ('meauxlearn', 
   'MeauxLearn', 
   'meauxlearn', 
   'Interactive Learning Platform', 
   'Build and deliver engaging online courses with interactive content and assessments.',
   'MeauxLearn is a comprehensive learning management system for educators and trainers. Create engaging courses with video, quizzes, assignments, and interactive content. Track student progress, automate grading, and deliver certificates. Perfect for schools, training programs, and online courses.',
   'productivity', 
   'Meaux Technologies', 
   'https://meauxtechnologies.com',
   '2.3.1',
   '2024-10-30',
   'https://assets.inneranimalmedia.com/icons/meauxlearn.png',
   'https://meauxlearn.com', 
   0),

  ('cloudconnect', 
   'CloudConnect', 
   'cloudconnect', 
   'Universal API Integration', 
   'Connect any API with no-code integration builder and workflow automation.',
   'CloudConnect makes API integration simple. Build complex workflows without code, connect hundreds of services, automate repetitive tasks, and create custom integrations. Features include visual workflow builder, error handling, scheduling, and monitoring.',
   'dev-tools', 
   'Meaux Technologies', 
   'https://meauxtechnologies.com',
   '1.6.0',
   '2024-11-18',
   'https://assets.inneranimalmedia.com/icons/cloudconnect.png',
   'https://cloudconnect.meauxtechnologies.com', 
   0);

-- Update app ratings and downloads (simulate realistic data)
UPDATE apps SET 
  rating = 4.8,
  review_count = 127,
  downloads = 3420
WHERE id = 'meauxaccess';

UPDATE apps SET 
  rating = 4.6,
  review_count = 89,
  downloads = 2150
WHERE id = 'meauxphoto';

UPDATE apps SET 
  rating = 4.9,
  review_count = 234,
  downloads = 5680
WHERE id = 'iautodidact';

UPDATE apps SET 
  rating = 4.7,
  review_count = 156,
  downloads = 4200
WHERE id = 'damnsam';

UPDATE apps SET 
  rating = 4.5,
  review_count = 67,
  downloads = 1340
WHERE id = 'grantwriting';

UPDATE apps SET 
  rating = 4.4,
  review_count = 92,
  downloads = 1890
WHERE id = 'designlab';

UPDATE apps SET 
  rating = 4.8,
  review_count = 178,
  downloads = 3870
WHERE id = 'meauxlearn';

UPDATE apps SET 
  rating = 4.6,
  review_count = 103,
  downloads = 2560
WHERE id = 'cloudconnect';

-- Insert some sample reviews
INSERT OR IGNORE INTO app_reviews (app_id, username, rating, title, comment) VALUES
  ('meauxaccess', 'techleader', 5, 'Game changer for our team', 'The real-time analytics and team management features are incredible. Has transformed how we monitor our infrastructure.'),
  ('meauxphoto', 'photographer_pro', 5, 'Best photo manager', 'AI organization saved me hours of work. The facial recognition is spot on!'),
  ('iautodidact', 'lifelong_learner', 5, 'Finally makes learning fun', 'The adaptive learning paths are brilliant. I''ve learned 3 new skills in 2 months.'),
  ('damnsam', 'developer123', 4, 'Very helpful AI assistant', 'Love how it combines multiple AI models. The code generation feature is super useful.'),
  ('meauxaccess', 'cto_startup', 5, 'Essential for startups', 'Gave us enterprise-level insights without enterprise costs. Highly recommend!');
