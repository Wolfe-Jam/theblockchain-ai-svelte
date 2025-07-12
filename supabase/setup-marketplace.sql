-- Create the components table for the marketplace
CREATE TABLE IF NOT EXISTS components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  consumer_tagline VARCHAR(255),
  api_name VARCHAR(255),
  formal_name VARCHAR(255),
  fintech_name VARCHAR(255),
  price_individual INTEGER NOT NULL,
  price_team INTEGER,
  price_enterprise INTEGER,
  category VARCHAR(100),
  tags TEXT[],
  keywords TEXT[],
  tech_stack TEXT[],
  flip_card_theme VARCHAR(50),
  flip_card_size VARCHAR(50),
  rating DECIMAL(3,2) DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  is_api_product BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  demo_url VARCHAR(255),
  developer_features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  component_id UUID REFERENCES components(id),
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  license_type VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  transaction_id VARCHAR(255),
  license_key UUID DEFAULT gen_random_uuid(),
  download_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create user_components table (for tracking user purchases)
CREATE TABLE IF NOT EXISTS user_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  component_id UUID REFERENCES components(id),
  order_id UUID REFERENCES orders(id),
  license_type VARCHAR(50),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create search_analytics table
CREATE TABLE IF NOT EXISTS search_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_result UUID,
  mode VARCHAR(50),
  response_time_ms INTEGER,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_components_slug ON components(slug);
CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_featured ON components(featured);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_search_analytics_query ON search_analytics(query);

-- Insert the 3 initial products
INSERT INTO components (
  name, slug, tagline, description, consumer_tagline, api_name, formal_name, fintech_name,
  price_individual, price_team, price_enterprise, category, tags, keywords, tech_stack,
  flip_card_theme, flip_card_size, rating, download_count, featured, is_api_product,
  is_active, is_published, demo_url, developer_features
) VALUES 
(
  'NOBS Pay',
  'nobs-pay',
  'Universal payment component for modern apps',
  'The only payment component that gives your users maximum choice while giving you minimum complexity. Integrate Stripe, PayPal, and cryptocurrency payments with a single, beautiful component.',
  'No BS pay less',
  'Next Open Billing Software',
  'Neural Omni Balance System',
  'Next Open Billing Stack',
  19900, 49900, 149900,
  'payment-processing',
  ARRAY['payment', 'stripe', 'paypal', 'crypto', 'checkout', 'e-commerce'],
  ARRAY['payment gateway', 'checkout', 'e-commerce'],
  ARRAY['svelte', 'typescript', 'stripe-api', 'paypal-sdk'],
  'wallet',
  'standard',
  5.0,
  0,
  true,
  true,
  true,
  true,
  '/marketplace/demo/nobs-pay',
  ARRAY[
    'Universal payment gateway supporting multiple processors',
    'Multi-processor support (Stripe, PayPal, Crypto)',
    'Full TypeScript definitions for type safety',
    'Customizable themes to match your brand',
    'Built-in webhook handling for payment events',
    'PCI compliant with secure tokenization',
    'Mobile-optimized responsive design',
    'Internationalization support (20+ currencies)',
    'Comprehensive error handling and recovery',
    'Real-time payment status updates'
  ]
),
(
  'DataViz Pro',
  'dataviz-pro',
  'Beautiful charts and graphs for your data',
  'Transform your data into stunning visualizations with our professional charting library. Built on D3.js with pre-configured responsive charts, real-time updates, and seamless Svelte integration.',
  'Visualize everything',
  'DataViz Professional',
  'Data Visualization Suite',
  'Analytics Display Engine',
  14900, 34900, 99900,
  'data-visualization',
  ARRAY['charts', 'd3js', 'analytics', 'dashboard', 'graphs', 'visualization'],
  ARRAY['data viz', 'graphs', 'charts', 'analytics'],
  ARRAY['svelte', 'd3js', 'typescript', 'svg'],
  'neon',
  'standard',
  4.8,
  42,
  false,
  false,
  true,
  true,
  '/marketplace/demo/dataviz-pro',
  ARRAY[
    'Over 20 pre-built chart types',
    'Real-time data updates with smooth transitions',
    'Fully responsive design for all screen sizes',
    'Export charts as PNG, SVG, or PDF',
    'Custom theming with CSS variables',
    'Interactive tooltips and legends',
    'Zoom and pan capabilities',
    'Accessibility features (ARIA labels)',
    'Server-side rendering support',
    'Minimal bundle size with tree-shaking'
  ]
),
(
  'Auth Shield',
  'auth-shield',
  'Complete authentication solution',
  'Enterprise-grade authentication system with everything you need for secure user management. Includes social login, multi-factor authentication, passwordless options, and comprehensive session management.',
  'Login made simple',
  'Authentication Shield',
  'Security Authentication Framework',
  'Identity Verification System',
  24900, 59900, 179900,
  'authentication',
  ARRAY['auth', 'security', 'oauth', 'mfa', 'login', 'supabase'],
  ARRAY['authentication', 'login', 'security', 'oauth'],
  ARRAY['svelte', 'supabase', 'oauth2', 'jwt'],
  'gradient',
  'standard',
  4.9,
  128,
  true,
  true,
  true,
  true,
  '/marketplace/demo/auth-shield',
  ARRAY[
    'Social login (Google, GitHub, Twitter, Facebook)',
    'Multi-factor authentication (SMS, Email, TOTP)',
    'Passwordless authentication (Magic links)',
    'Session management with refresh tokens',
    'Role-based access control (RBAC)',
    'User profile management',
    'Password strength requirements',
    'Account recovery flows',
    'Rate limiting and brute force protection',
    'GDPR compliant with data export/deletion'
  ]
);

-- Enable Row Level Security
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to components
CREATE POLICY "Components are viewable by everyone" 
  ON components FOR SELECT 
  USING (is_published = true AND is_active = true);

-- Create policies for search analytics (insert only)
CREATE POLICY "Anyone can insert search analytics" 
  ON search_analytics FOR INSERT 
  WITH CHECK (true);

-- Note: You'll need to add more specific policies for orders and user_components
-- based on your authentication setup