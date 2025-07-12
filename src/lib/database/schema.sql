-- ============================================
-- bAI MARKETPLACE DATABASE SCHEMA
-- PostgreSQL schema for Supabase
-- ============================================

-- Enable UUID extension for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- COMPONENTS TABLE (Products)
-- Core marketplace inventory
-- ============================================

CREATE TABLE IF NOT EXISTS components (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  
  -- Multi-audience naming strategy (CRITICAL for NOBS Pay)
  formal_name TEXT,           -- "Neural Omni Balance System"
  fintech_name TEXT,          -- "Next Open Billing Stack"
  api_name TEXT,              -- "Next Open Billing Software" 
  consumer_tagline TEXT,      -- "No BS pay less"
  
  -- Pricing structure (stored in cents for precision)
  price_individual INTEGER NOT NULL CHECK (price_individual >= 0),
  price_team INTEGER NOT NULL CHECK (price_team >= 0),
  price_enterprise INTEGER NOT NULL CHECK (price_enterprise >= 0),
  
  -- Search optimization fields
  category TEXT NOT NULL CHECK (category IN (
    'payment-processing',
    'blockchain-integration', 
    'ui-components',
    'data-visualization',
    'authentication',
    'analytics',
    'developer-tools'
  )),
  tags TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  
  -- Display configuration
  flip_card_theme TEXT DEFAULT 'wallet' CHECK (flip_card_theme IN (
    'wallet', 'nft', 'minimal', 'premium', 'api'
  )),
  flip_card_size TEXT DEFAULT 'standard' CHECK (flip_card_size IN (
    'square', 'story', 'pinterest', 'twitter', 'standard',
    'compact', 'hero', 'mobile', 'desktop', 'coinbase',
    'opensea', 'github'
  )),
  
  -- Quality and popularity metrics
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  download_count INTEGER DEFAULT 0 CHECK (download_count >= 0),
  
  -- Status flags
  featured BOOLEAN DEFAULT false,
  is_api_product BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Computed search field for better performance
  search_text TEXT GENERATED ALWAYS AS (
    LOWER(
      name || ' ' || 
      COALESCE(formal_name, '') || ' ' || 
      COALESCE(api_name, '') || ' ' || 
      COALESCE(fintech_name, '') || ' ' ||
      COALESCE(consumer_tagline, '') || ' ' ||
      COALESCE(tagline, '') || ' ' ||
      description || ' ' ||
      category || ' ' ||
      COALESCE(array_to_string(tags, ' '), '') || ' ' ||
      COALESCE(array_to_string(keywords, ' '), '')
    )
  ) STORED
);

-- Indexes for performance
CREATE INDEX idx_components_slug ON components(slug);
CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_featured ON components(featured) WHERE featured = true;
CREATE INDEX idx_components_published ON components(is_published) WHERE is_published = true;
CREATE INDEX idx_components_search ON components USING gin(to_tsvector('english', search_text));
CREATE INDEX idx_components_tags ON components USING gin(tags);

-- ============================================
-- SEARCH ANALYTICS TABLE
-- Track search behavior and performance
-- ============================================

CREATE TABLE IF NOT EXISTS search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('search', 'ai')),
  results_count INTEGER DEFAULT 0,
  response_time_ms INTEGER CHECK (response_time_ms >= 0),
  converted_to_purchase BOOLEAN DEFAULT false,
  user_id UUID,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX idx_search_analytics_timestamp ON search_analytics(timestamp DESC);
CREATE INDEX idx_search_analytics_query ON search_analytics(query);
CREATE INDEX idx_search_analytics_mode ON search_analytics(mode);
CREATE INDEX idx_search_analytics_conversion ON search_analytics(converted_to_purchase) 
  WHERE converted_to_purchase = true;

-- ============================================
-- AI CONVERSATIONS TABLE
-- Store AI-powered search interactions
-- ============================================

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  response JSONB NOT NULL,
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  led_to_purchase BOOLEAN DEFAULT false,
  recommended_components UUID[] DEFAULT '{}',
  user_id UUID,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for AI analytics
CREATE INDEX idx_ai_conversations_timestamp ON ai_conversations(timestamp DESC);
CREATE INDEX idx_ai_conversations_purchase ON ai_conversations(led_to_purchase) 
  WHERE led_to_purchase = true;
CREATE INDEX idx_ai_conversations_confidence ON ai_conversations(confidence);

-- ============================================
-- ORDERS TABLE
-- Track all marketplace transactions
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  order_number TEXT UNIQUE DEFAULT 'ORD-' || LPAD(nextval('order_number_seq')::text, 8, '0'),
  
  -- Order details stored as JSONB for flexibility
  items JSONB NOT NULL,
  
  -- Financial information
  total_amount INTEGER NOT NULL CHECK (total_amount > 0),
  currency TEXT DEFAULT 'USD',
  
  -- Payment information
  payment_provider TEXT CHECK (payment_provider IN ('stripe', 'paypal', 'coinbase')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'
  )),
  payment_intent_id TEXT,
  
  -- Attribution
  discovered_via TEXT CHECK (discovered_via IN ('search', 'ai', 'browse', 'direct')),
  search_query TEXT,
  ai_conversation_id UUID REFERENCES ai_conversations(id),
  
  -- Customer information
  customer_email TEXT,
  customer_name TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Indexes for order queries
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_provider ON orders(payment_provider);

-- ============================================
-- USER COMPONENTS TABLE
-- Track user's purchased/downloaded components
-- ============================================

CREATE TABLE IF NOT EXISTS user_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  component_id UUID NOT NULL REFERENCES components(id),
  order_id UUID REFERENCES orders(id),
  license_type TEXT NOT NULL CHECK (license_type IN ('individual', 'team', 'enterprise')),
  
  -- Access information
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP WITH TIME ZONE,
  license_key TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Metadata
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE, -- NULL means lifetime license
  
  UNIQUE(user_id, component_id, license_type)
);

-- Indexes for user component access
CREATE INDEX idx_user_components_user ON user_components(user_id);
CREATE INDEX idx_user_components_component ON user_components(component_id);
CREATE INDEX idx_user_components_license_key ON user_components(license_key);

-- ============================================
-- INITIAL DATA - NOBS PAY
-- Insert NOBS Pay as the inaugural product
-- ============================================

INSERT INTO components (
  name, 
  slug, 
  tagline, 
  description,
  formal_name, 
  fintech_name, 
  api_name, 
  consumer_tagline,
  category, 
  price_individual, 
  price_team, 
  price_enterprise,
  tags,
  keywords,
  tech_stack,
  flip_card_theme,
  is_api_product, 
  featured, 
  is_published, 
  is_active,
  rating,
  download_count
) VALUES (
  'NOBS Pay', 
  'nobs-pay', 
  'Universal payment component for modern apps',
  'The only payment component that gives your users maximum choice while giving you minimum complexity. Integrate Stripe, PayPal, and crypto payments with a single, beautiful component. Built by marketplace experts, for marketplace success.',
  'Neural Omni Balance System', 
  'Next Open Billing Stack', 
  'Next Open Billing Software', 
  'No BS pay less',
  'payment-processing', 
  19900,  -- $199.00
  49900,  -- $499.00
  149900, -- $1,499.00
  ARRAY['payment', 'stripe', 'paypal', 'crypto', 'universal', 'component'],
  ARRAY['payment gateway', 'checkout', 'e-commerce', 'fintech', 'billing'],
  ARRAY['svelte', 'typescript', 'stripe-api', 'paypal-api', 'coinbase-commerce'],
  'wallet',
  true, 
  true, 
  true, 
  true,
  5.0,
  0
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable security policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_components ENABLE ROW LEVEL SECURITY;

-- Public read access to published components
CREATE POLICY "Public components are viewable by everyone" ON components
  FOR SELECT USING (is_published = true AND is_active = true);

-- Authenticated users can view their own data
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own components" ON user_components
  FOR SELECT USING (auth.uid() = user_id);

-- Analytics data is insert-only for all
CREATE POLICY "Anyone can insert search analytics" ON search_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert AI conversations" ON ai_conversations
  FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to relevant tables
CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(component_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE components 
  SET download_count = download_count + 1
  WHERE slug = component_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to update component rating
CREATE OR REPLACE FUNCTION update_component_rating(component_id UUID, new_rating INTEGER)
RETURNS void AS $$
DECLARE
  current_rating DECIMAL(3,2);
  current_count INTEGER;
BEGIN
  -- This is a simplified version - in production you'd want a reviews table
  SELECT rating, download_count INTO current_rating, current_count
  FROM components WHERE id = component_id;
  
  -- Calculate new average (simplified)
  UPDATE components
  SET rating = ((current_rating * current_count) + new_rating) / (current_count + 1)
  WHERE id = component_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Popular components view
CREATE OR REPLACE VIEW popular_components AS
SELECT 
  id,
  name,
  slug,
  tagline,
  consumer_tagline,
  category,
  price_individual,
  rating,
  download_count,
  flip_card_theme,
  flip_card_size
FROM components
WHERE is_published = true AND is_active = true
ORDER BY download_count DESC, rating DESC;

-- Recent searches view (for trending)
CREATE OR REPLACE VIEW trending_searches AS
SELECT 
  query,
  COUNT(*) as search_count,
  AVG(response_time_ms) as avg_response_time,
  SUM(CASE WHEN converted_to_purchase THEN 1 ELSE 0 END) as conversions
FROM search_analytics
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY query
ORDER BY search_count DESC
LIMIT 20;

-- ============================================
-- GRANTS (Adjust based on your Supabase setup)
-- ============================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select on public tables/views
GRANT SELECT ON components, popular_components, trending_searches TO anon, authenticated;

-- Grant insert on analytics tables
GRANT INSERT ON search_analytics, ai_conversations TO anon, authenticated;

-- Grant full access to authenticated users on their data
GRANT ALL ON orders, user_components TO authenticated;

-- Grant sequence usage
GRANT USAGE ON SEQUENCE order_number_seq TO authenticated;
