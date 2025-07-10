# EXACT Marketplace Implementation Requirements 🛒
## For Claude Opus 4 Development

---

## **PROJECT OVERVIEW**

**Task:** Build a complete e-commerce marketplace integrated into existing theblockchain.ai SvelteKit application  
**Timeline:** 6 weeks, following revised sprint plan  
**Architecture:** Extend existing SvelteKit app with `/marketplace/` routes  
**Goal:** Transform DataBox.svelte and TimelineBox.svelte into purchasable products

---

## **TECHNOLOGY STACK - EXACT SPECIFICATIONS**

### **Frontend (Extend Existing)**
- **Framework:** SvelteKit (existing) - no framework changes
- **Styling:** Tailwind CSS (existing) + marketplace-specific components
- **Payment:** Stripe Elements, PayPal SDK, Coinbase Commerce
- **State Management:** Svelte stores for cart and user session

### **Backend Services (New)**
- **Database:** Supabase (PostgreSQL + Auth)
- **File Storage:** AWS S3 with presigned URLs
- **Payments:** Stripe, PayPal, Coinbase Commerce
- **Email:** SendGrid or Resend for transactional emails

---

## **FILE STRUCTURE - EXACT IMPLEMENTATION**

### **New SvelteKit Routes (Create These)**
```
src/routes/marketplace/
├── +layout.svelte                          # Marketplace-specific layout
├── +layout.server.js                       # Auth checks, user data loading
├── +page.svelte                            # Main catalog page
├── +page.server.js                         # Load all components from DB
├── components/
│   ├── [id]/
│   │   ├── +page.svelte                    # Component detail page
│   │   └── +page.server.js                 # Load specific component data
├── cart/
│   ├── +page.svelte                        # Shopping cart page
│   └── +page.server.js                     # Cart validation
├── checkout/
│   ├── +page.svelte                        # Checkout flow
│   ├── +page.server.js                     # Create payment sessions
│   ├── success/
│   │   └── +page.svelte                    # Payment success page
│   └── cancel/
│       └── +page.svelte                    # Payment cancelled page
├── dashboard/
│   ├── +page.svelte                        # User purchase dashboard
│   ├── +page.server.js                     # Load user purchases
│   └── download/
│       └── [componentId]/
│           └── +server.js                  # Generate secure download links
└── api/
    ├── create-checkout-session/
    │   └── +server.js                      # Stripe session creation
    ├── webhooks/
    │   ├── stripe/
    │   │   └── +server.js                  # Stripe webhook handler
    │   ├── paypal/
    │   │   └── +server.js                  # PayPal webhook handler
    │   └── coinbase/
    │       └── +server.js                  # Coinbase webhook handler
    └── admin/
        ├── orders/
        │   └── +server.js                  # Admin order management
        └── components/
            └── +server.js                  # Admin component management
```

### **New Components (Create These)**
```
src/lib/components/marketplace/
├── ProductCard.svelte                       # Component showcase card
├── ShoppingCart.svelte                      # Cart functionality  
├── CheckoutFlow.svelte                      # Payment flow
├── PurchaseHistory.svelte                   # User purchase list
├── LicenseSelector.svelte                   # Individual/Team/Enterprise
├── PaymentOptions.svelte                    # Stripe/PayPal/Crypto choice
├── DownloadButton.svelte                    # Secure download trigger
└── AdminPanel.svelte                        # Basic order management
```

### **New Stores (Create These)**
```
src/lib/stores/marketplace/
├── cart.js                                  # Shopping cart state
├── user.js                                  # User authentication state  
├── components.js                            # Component catalog state
└── orders.js                               # Order status state
```

---

## **DATABASE SCHEMA - EXACT IMPLEMENTATION**

### **Supabase Setup Instructions**
1. Create new Supabase project: `theblockchain-marketplace`
2. Enable Row Level Security (RLS) on all tables
3. Set up the following tables with EXACT schema:

### **Table 1: components**
```sql
CREATE TABLE components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price_individual INTEGER NOT NULL, -- in cents
  price_team INTEGER NOT NULL,
  price_enterprise INTEGER NOT NULL,
  demo_url TEXT,
  documentation_url TEXT,
  preview_image_url TEXT,
  download_file_key TEXT NOT NULL, -- S3 key for download file
  category TEXT NOT NULL CHECK (category IN ('ai-automation', 'blockchain-integration', 'defi-tools', 'enterprise-solutions')),
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial products
INSERT INTO components (name, slug, description, price_individual, price_team, price_enterprise, demo_url, download_file_key, category) VALUES
('DataBox', 'databox', 'Perfect alignment system for data visualization', 19900, 49900, 199900, '/invest', 'components/databox/databox-v1.zip', 'ai-automation'),
('TimelineBox', 'timelinebox', 'Investment urgency tracker with visual timeline', 29900, 79900, 299900, '/invest', 'components/timelinebox/timelinebox-v1.zip', 'ai-automation');
```

### **Table 2: orders**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL, -- Human readable: ORD-2025-001
  total_amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'USD',
  payment_provider TEXT NOT NULL CHECK (payment_provider IN ('stripe', 'paypal', 'coinbase')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  external_transaction_id TEXT, -- Stripe session_id, PayPal order_id, etc.
  payment_metadata JSONB DEFAULT '{}',
  billing_email TEXT NOT NULL,
  billing_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generate order numbers automatically
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT := EXTRACT(YEAR FROM NOW())::TEXT;
  sequence_num INTEGER;
  order_num TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 'ORD-\d{4}-(\d+)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM orders
  WHERE order_number LIKE 'ORD-' || year_part || '-%';
  
  order_num := 'ORD-' || year_part || '-' || LPAD(sequence_num::TEXT, 3, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();
```

### **Table 3: order_items**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  component_id UUID REFERENCES components(id),
  license_type TEXT NOT NULL CHECK (license_type IN ('individual', 'team', 'enterprise')),
  quantity INTEGER DEFAULT 1,
  unit_price INTEGER NOT NULL, -- in cents
  total_price INTEGER NOT NULL, -- in cents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Table 4: user_components (Purchase Ledger)**
```sql
CREATE TABLE user_components (
  user_id UUID REFERENCES auth.users(id),
  component_id UUID REFERENCES components(id),
  order_id UUID REFERENCES orders(id),
  license_type TEXT NOT NULL CHECK (license_type IN ('individual', 'team', 'enterprise')),
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE, -- For future subscription models
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (user_id, component_id, license_type)
);
```

### **Row Level Security (RLS) Policies**
```sql
-- Enable RLS
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_components ENABLE ROW LEVEL SECURITY;

-- Components: Public read, admin write
CREATE POLICY "Components are publicly readable" ON components FOR SELECT USING (is_active = true);
CREATE POLICY "Only admins can modify components" ON components FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders for themselves" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: Users can only see items from their orders
CREATE POLICY "Users can view their own order items" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);

-- User components: Users can only see their own purchases
CREATE POLICY "Users can view their own purchases" ON user_components FOR SELECT USING (auth.uid() = user_id);
```

---

## **AUTHENTICATION SETUP - EXACT IMPLEMENTATION**

### **Supabase Auth Configuration**
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
```

### **Environment Variables (.env.local)**
```env
# Supabase
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Coinbase Commerce
COINBASE_COMMERCE_API_KEY=your_coinbase_commerce_api_key
COINBASE_COMMERCE_WEBHOOK_SECRET=your_coinbase_webhook_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=theblockchain-marketplace-components
AWS_REGION=us-east-1

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
```

---

## **COMPONENT SPECIFICATIONS - EXACT IMPLEMENTATION**

### **ProductCard.svelte - IMAGE-FIRST DESIGN**
```svelte
<!-- src/lib/components/marketplace/ProductCard.svelte -->
<script>
  export let component;
  export let size = 'medium'; // 'small', 'medium', 'large', 'list'
  export let showPricing = true;
  export let showDescription = true;
  
  const formatPrice = (cents) => `$${(cents / 100).toLocaleString()}`;
  
  // Size configurations for responsive grid
  const sizeClasses = {
    small: 'w-full aspect-square',
    medium: 'w-full aspect-[4/3]', 
    large: 'w-full aspect-[3/2]',
    list: 'w-full aspect-[16/9]'
  };
  
  const cardClasses = {
    small: 'group cursor-pointer',
    medium: 'group cursor-pointer',
    large: 'group cursor-pointer',
    list: 'group cursor-pointer flex gap-4'
  };
  
  let isHovered = false;
</script>

<div class="product-card {cardClasses[size]}" 
     on:mouseenter={() => isHovered = true}
     on:mouseleave={() => isHovered = false}>
  
  {#if size === 'list'}
    <!-- LIST VIEW: Horizontal layout -->
    <div class="image-container relative overflow-hidden rounded-xl flex-shrink-0 w-80">
      <img 
        src={component.preview_image_url || '/placeholder-component.jpg'} 
        alt={component.name}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      <!-- Overlay on hover -->
      <div class="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 left-4 right-4">
          <div class="flex gap-2">
            <a href={component.demo_url} 
               class="btn-secondary text-sm" 
               target="_blank"
               on:click|stopPropagation>
              👁️ Demo
            </a>
            <a href="/marketplace/components/{component.slug}" 
               class="btn-primary text-sm"
               on:click|stopPropagation>
              View Details
            </a>
          </div>
        </div>
      </div>
      
      <!-- Category badge -->
      <div class="absolute top-3 left-3">
        <span class="category-badge bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {component.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>
      
      <!-- Price tag (always visible in list) -->
      <div class="absolute top-3 right-3">
        <span class="price-badge bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          from {formatPrice(component.price_individual)}
        </span>
      </div>
    </div>
    
    <!-- Content area for list view -->
    <div class="content-area flex-1 py-2">
      <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
        {component.name}
      </h3>
      <p class="text-slate-300 mb-4 line-clamp-2">{component.description}</p>
      
      {#if showPricing}
        <div class="pricing-tiers space-y-2 mb-4">
          <div class="flex justify-between items-center">
            <span class="text-slate-400">Individual License</span>
            <span class="text-cyan-400 font-bold">{formatPrice(component.price_individual)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-400">Team License</span>
            <span class="text-cyan-400 font-bold">{formatPrice(component.price_team)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-400">Enterprise License</span>
            <span class="text-cyan-400 font-bold">{formatPrice(component.price_enterprise)}</span>
          </div>
        </div>
      {/if}
      
      <!-- Tags -->
      {#if component.tags && component.tags.length > 0}
        <div class="tags flex flex-wrap gap-2 mb-4">
          {#each component.tags.slice(0, 3) as tag}
            <span class="tag bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          {/each}
        </div>
      {/if}
      
      <a href="/marketplace/components/{component.slug}" class="btn-primary inline-block">
        View Component →
      </a>
    </div>
  {:else}
    <!-- GRID VIEW: Image-first card design -->
    <a href="/marketplace/components/{component.slug}" class="block">
      <div class="card-container bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
        
        <!-- Hero Image Container -->
        <div class="image-container relative {sizeClasses[size]} overflow-hidden">
          <img 
            src={component.preview_image_url || '/placeholder-component.jpg'} 
            alt={component.name}
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          <!-- Gradient overlay for better text readability -->
          <div class="gradient-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          
          <!-- Interactive overlay on hover -->
          <div class="interactive-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div class="flex gap-3">
                  <div class="action-btn bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors">
                    👁️ Demo
                  </div>
                  <div class="action-btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-colors">
                    View Details
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Category badge (always visible) -->
          <div class="absolute top-3 left-3">
            <span class="category-badge bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
              {component.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          
          <!-- Price badge (visible on hover or always for small cards) -->
          <div class="absolute top-3 right-3 {size === 'small' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300">
            <span class="price-badge bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              {formatPrice(component.price_individual)}
            </span>
          </div>
          
          <!-- Download count or popularity indicator -->
          {#if component.download_count}
            <div class="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="stats-badge bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                ⬇️ {component.download_count} downloads
              </span>
            </div>
          {/if}
        </div>
        
        <!-- Content area (visible for medium/large, hidden for small unless hovered) -->
        {#if size !== 'small'}
          <div class="content-area p-4">
            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {component.name}
            </h3>
            
            {#if showDescription && size !== 'small'}
              <p class="text-slate-300 text-sm mb-3 line-clamp-2">{component.description}</p>
            {/if}
            
            {#if showPricing && size === 'large'}
              <div class="pricing-compact flex items-center justify-between text-sm">
                <span class="text-slate-400">Starting at</span>
                <div class="flex items-center gap-2">
                  <span class="text-cyan-400 font-bold">{formatPrice(component.price_individual)}</span>
                  <span class="text-slate-500">→</span>
                  <span class="text-slate-400">{formatPrice(component.price_enterprise)}</span>
                </div>
              </div>
            {/if}
            
            <!-- Tags for large cards -->
            {#if component.tags && component.tags.length > 0 && size === 'large'}
              <div class="tags flex flex-wrap gap-1 mt-3">
                {#each component.tags.slice(0, 3) as tag}
                  <span class="tag bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        {:else}
          <!-- Small card: minimal content overlay -->
          <div class="small-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 class="text-white font-semibold text-sm line-clamp-1">{component.name}</h4>
            <div class="flex items-center justify-between mt-1">
              <span class="text-cyan-400 text-xs font-bold">{formatPrice(component.price_individual)}</span>
              <span class="text-white text-xs">View →</span>
            </div>
          </div>
        {/if}
      </div>
    </a>
  {/if}
</div>

<style lang="postcss">
  .product-card {
    transition: transform 0.2s ease;
  }
  
  .product-card:hover {
    transform: translateY(-2px);
  }
  
  .btn-primary {
    @apply bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 text-center;
  }
  
  .btn-secondary {
    @apply bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200 text-center;
  }
  
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  
  .action-btn {
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .category-badge, .price-badge, .stats-badge {
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-container {
    backdrop-filter: blur(8px);
  }
  
  /* Ensure proper aspect ratios */
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  
  .aspect-\[4\/3\] {
    aspect-ratio: 4 / 3;
  }
  
  .aspect-\[3\/2\] {
    aspect-ratio: 3 / 2;
  }
  
  .aspect-\[16\/9\] {
    aspect-ratio: 16 / 9;
  }
</style>
```

### **Component Usage Examples**
```svelte
<!-- Different size variants -->
<ProductCard {component} size="small" />
<ProductCard {component} size="medium" showDescription={true} />
<ProductCard {component} size="large" showPricing={true} />
<ProductCard {component} size="list" showDescription={true} showPricing={true} />

<!-- Grid layouts -->
<div class="grid grid-cols-6 gap-4">
  <!-- Small thumbnails -->
  {#each components as component}
    <ProductCard {component} size="small" />
  {/each}
</div>

<div class="grid grid-cols-3 gap-6">
  <!-- Medium cards -->
  {#each components as component}
    <ProductCard {component} size="medium" />
  {/each}
</div>

<div class="grid grid-cols-2 gap-8">
  <!-- Large feature cards -->
  {#each featuredComponents as component}
    <ProductCard {component} size="large" />
  {/each}
</div>

<!-- List view -->
<div class="space-y-6">
  {#each components as component}
    <ProductCard {component} size="list" />
  {/each}
</div>
```

### **ShoppingCart.svelte**
```svelte
<!-- src/lib/components/marketplace/ShoppingCart.svelte -->
<script>
  import { cart } from '$lib/stores/marketplace/cart.js';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  const formatPrice = (cents) => `$${(cents / 100).toLocaleString()}`;
  
  function removeItem(componentId, licenseType) {
    cart.removeItem(componentId, licenseType);
  }
  
  function updateQuantity(componentId, licenseType, quantity) {
    if (quantity <= 0) {
      removeItem(componentId, licenseType);
    } else {
      cart.updateQuantity(componentId, licenseType, quantity);
    }
  }
  
  function proceedToCheckout() {
    dispatch('checkout');
  }
  
  $: total = $cart.items.reduce((sum, item) => sum + item.total_price, 0);
</script>

<div class="shopping-cart">
  <h2 class="text-2xl font-bold text-white mb-6">Shopping Cart</h2>
  
  {#if $cart.items.length === 0}
    <div class="empty-cart text-center py-12">
      <div class="text-6xl mb-4">🛒</div>
      <h3 class="text-xl text-slate-400 mb-4">Your cart is empty</h3>
      <a href="/marketplace" class="btn-primary">Browse Components</a>
    </div>
  {:else}
    <div class="cart-items space-y-4 mb-6">
      {#each $cart.items as item}
        <div class="cart-item bg-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div class="item-info flex-1">
            <h4 class="text-lg font-semibold text-white">{item.component.name}</h4>
            <p class="text-slate-400 text-sm">{item.license_type} License</p>
            <p class="text-cyan-400 font-bold">{formatPrice(item.unit_price)}</p>
          </div>
          
          <div class="quantity-controls flex items-center space-x-2">
            <button 
              on:click={() => updateQuantity(item.component_id, item.license_type, item.quantity - 1)}
              class="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded flex items-center justify-center"
            >-</button>
            <span class="text-white w-8 text-center">{item.quantity}</span>
            <button 
              on:click={() => updateQuantity(item.component_id, item.license_type, item.quantity + 1)}
              class="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded flex items-center justify-center"
            >+</button>
          </div>
          
          <div class="item-total ml-6">
            <p class="text-lg font-bold text-white">{formatPrice(item.total_price)}</p>
            <button 
              on:click={() => removeItem(item.component_id, item.license_type)}
              class="text-red-400 hover:text-red-300 text-sm"
            >Remove</button>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="cart-summary bg-slate-800 rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg text-slate-300">Total:</span>
        <span class="text-2xl font-bold text-cyan-400">{formatPrice(total)}</span>
      </div>
      <button 
        on:click={proceedToCheckout}
        class="btn-primary w-full py-3 text-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  {/if}
</div>

<style lang="postcss">
  .btn-primary {
    @apply bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 text-center block;
  }
</style>
```

---

## **PAYMENT INTEGRATION - EXACT IMPLEMENTATION**

### **Stripe Integration**
```javascript
// src/routes/marketplace/api/create-checkout-session/+server.js
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { supabase } from '$lib/supabase-admin.js';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({ request, url }) {
  try {
    const { items, user_id } = await request.json();
    
    // Validate items and calculate total
    let line_items = [];
    let total_amount = 0;
    
    for (const item of items) {
      const { data: component } = await supabase
        .from('components')
        .select('*')
        .eq('id', item.component_id)
        .single();
        
      if (!component) {
        throw new Error(`Component ${item.component_id} not found`);
      }
      
      const price_key = `price_${item.license_type}`;
      const unit_price = component[price_key];
      const total_price = unit_price * item.quantity;
      total_amount += total_price;
      
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${component.name} - ${item.license_type} License`,
            description: component.description,
          },
          unit_amount: unit_price,
        },
        quantity: item.quantity,
      });
    }
    
    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id,
        total_amount,
        payment_provider: 'stripe',
        payment_status: 'pending',
        billing_email: '', // Will be updated from webhook
        billing_name: '',  // Will be updated from webhook
      })
      .select()
      .single();
      
    if (orderError) throw orderError;
    
    // Create order items
    const order_items = items.map(item => ({
      order_id: order.id,
      component_id: item.component_id,
      license_type: item.license_type,
      quantity: item.quantity,
      unit_price: components.find(c => c.id === item.component_id)[`price_${item.license_type}`],
      total_price: unit_price * item.quantity,
    }));
    
    await supabase.from('order_items').insert(order_items);
    
    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${url.origin}/marketplace/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/marketplace/checkout/cancel`,
      metadata: {
        order_id: order.id,
        user_id,
      },
    });
    
    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({ external_transaction_id: session.id })
      .eq('id', order.id);
    
    return json({ url: session.url });
    
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return json({ error: error.message }, { status: 400 });
  }
}
```

### **Stripe Webhook Handler**
```javascript
// src/routes/marketplace/api/webhooks/stripe/+server.js
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { supabase } from '$lib/supabase-admin.js';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({ request }) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return json({ error: 'Invalid signature' }, { status: 400 });
  }
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  return json({ received: true });
}

async function handleCheckoutCompleted(session) {
  try {
    const order_id = session.metadata.order_id;
    const user_id = session.metadata.user_id;
    
    // Update order status
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        billing_email: session.customer_details.email,
        billing_name: session.customer_details.name,
        payment_metadata: session,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id);
      
    if (orderError) throw orderError;
    
    // Get order items to create user_components records
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*, components(*)')
      .eq('order_id', order_id);
      
    if (itemsError) throw itemsError;
    
    // Create user_components records (purchase ledger)
    const userComponents = orderItems.map(item => ({
      user_id,
      component_id: item.component_id,
      order_id,
      license_type: item.license_type,
      purchased_at: new Date().toISOString(),
    }));
    
    const { error: componentsError } = await supabase
      .from('user_components')
      .insert(userComponents);
      
    if (componentsError) throw componentsError;
    
    // Send confirmation email (implement based on your email service)
    await sendPurchaseConfirmationEmail(session.customer_details.email, orderItems);
    
    console.log(`Order ${order_id} completed successfully`);
    
  } catch (error) {
    console.error('Error handling checkout completion:', error);
  }
}

async function handlePaymentFailed(paymentIntent) {
  try {
    // Find order by payment intent ID and mark as failed
    const { error } = await supabase
      .from('orders')
      .update({ 
        payment_status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('external_transaction_id', paymentIntent.id);
      
    if (error) throw error;
    
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}
```

---

## **CART STORE - EXACT IMPLEMENTATION**

```javascript
// src/lib/stores/marketplace/cart.js
import { writable } from 'svelte/stores';
import { browser } from '$app/environment';

function createCart() {
  // Initialize from localStorage if available
  const initialState = {
    items: [],
    total: 0,
  };
  
  if (browser) {
    const stored = localStorage.getItem('marketplace-cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        initialState.items = parsed.items || [];
        initialState.total = parsed.total || 0;
      } catch (e) {
        console.error('Error parsing stored cart:', e);
      }
    }
  }
  
  const { subscribe, set, update } = writable(initialState);
  
  return {
    subscribe,
    
    addItem: (component, licenseType, quantity = 1) => {
      update(state => {
        const existingIndex = state.items.findIndex(
          item => item.component_id === component.id && item.license_type === licenseType
        );
        
        const priceKey = `price_${licenseType}`;
        const unitPrice = component[priceKey];
        
        if (existingIndex >= 0) {
          // Update existing item
          state.items[existingIndex].quantity += quantity;
          state.items[existingIndex].total_price = state.items[existingIndex].quantity * unitPrice;
        } else {
          // Add new item
          state.items.push({
            component_id: component.id,
            component,
            license_type: licenseType,
            quantity,
            unit_price: unitPrice,
            total_price: unitPrice * quantity,
          });
        }
        
        // Recalculate total
        state.total = state.items.reduce((sum, item) => sum + item.total_price, 0);
        
        // Save to localStorage
        if (browser) {
          localStorage.setItem('marketplace-cart', JSON.stringify(state));
        }
        
        return state;
      });
    },
    
    removeItem: (componentId, licenseType) => {
      update(state => {
        state.items = state.items.filter(
          item => !(item.component_id === componentId && item.license_type === licenseType)
        );
        
        // Recalculate total
        state.total = state.items.reduce((sum, item) => sum + item.total_price, 0);
        
        // Save to localStorage
        if (browser) {
          localStorage.setItem('marketplace-cart', JSON.stringify(state));
        }
        
        return state;
      });
    },
    
    updateQuantity: (componentId, licenseType, quantity) => {
      update(state => {
        const itemIndex = state.items.findIndex(
          item => item.component_id === componentId && item.license_type === licenseType
        );
        
        if (itemIndex >= 0) {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            state.items.splice(itemIndex, 1);
          } else {
            state.items[itemIndex].quantity = quantity;
            state.items[itemIndex].total_price = state.items[itemIndex].unit_price * quantity;
          }
          
          // Recalculate total
          state.total = state.items.reduce((sum, item) => sum + item.total_price, 0);
          
          // Save to localStorage
          if (browser) {
            localStorage.setItem('marketplace-cart', JSON.stringify(state));
          }
        }
        
        return state;
      });
    },
    
    clear: () => {
      set({ items: [], total: 0 });
      if (browser) {
        localStorage.removeItem('marketplace-cart');
      }
    },
    
    getItemCount: () => {
      let count = 0;
      update(state => {
        count = state.items.reduce((sum, item) => sum + item.quantity, 0);
        return state;
      });
      return count;
    }
  };
}

export const cart = createCart();
```

---

## **SECURE DOWNLOAD SYSTEM - EXACT IMPLEMENTATION**

```javascript
// src/routes/marketplace/dashboard/download/[componentId]/+server.js
import { json } from '@sveltejs/kit';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION } from '$env/static/private';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { supabase } from '$lib/supabase-admin.js';

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET({ params, url, locals }) {
  try {
    const { componentId } = params;
    const user = locals.user;
    
    if (!user) {
      return json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Verify user owns this component
    const { data: purchase, error: purchaseError } = await supabase
      .from('user_components')
      .select('*, components(*)')
      .eq('user_id', user.id)
      .eq('component_id', componentId)
      .single();
      
    if (purchaseError || !purchase) {
      return json({ error: 'Component not found in your purchases' }, { status: 404 });
    }
    
    // Generate presigned URL (valid for 1 hour)
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: purchase.components.download_file_key,
    });
    
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // Update download tracking
    await supabase
      .from('user_components')
      .update({
        download_count: purchase.download_count + 1,
        last_downloaded_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('component_id', componentId);
    
    return json({ 
      download_url: signedUrl,
      component_name: purchase.components.name,
      expires_in: 3600 
    });
    
  } catch (error) {
    console.error('Download generation error:', error);
    return json({ error: 'Failed to generate download link' }, { status: 500 });
  }
}
```

---

## **MAIN PAGES - EXACT IMPLEMENTATION**

### **Marketplace Catalog Page - IMAGE-FIRST LAYOUTS**
```svelte
<!-- src/routes/marketplace/+page.svelte -->
<script>
  import ProductCard from '$lib/components/marketplace/ProductCard.svelte';
  import { cart } from '$lib/stores/marketplace/cart.js';
  
  export let data;
  
  let selectedCategory = 'all';
  let searchTerm = '';
  let viewMode = 'grid-medium'; // 'grid-small', 'grid-medium', 'grid-large', 'list'
  let sortBy = 'newest'; // 'newest', 'price-low', 'price-high', 'popular'
  
  $: filteredComponents = data.components
    .filter(component => {
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           component.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price_individual - b.price_individual;
        case 'price-high': return b.price_individual - a.price_individual;
        case 'popular': return (b.download_count || 0) - (a.download_count || 0);
        case 'newest':
        default: return new Date(b.created_at) - new Date(a.created_at);
      }
    });
  
  const categories = [
    { value: 'all', label: 'All Components', icon: '🎨' },
    { value: 'ai-automation', label: 'AI Automation', icon: '🤖' },
    { value: 'blockchain-integration', label: 'Blockchain', icon: '🔗' },
    { value: 'defi-tools', label: 'DeFi Tools', icon: '💰' },
    { value: 'enterprise-solutions', label: 'Enterprise', icon: '🏢' }
  ];
  
  const viewModes = [
    { value: 'grid-small', label: 'Small Grid', icon: '⊞', cols: 'grid-cols-6' },
    { value: 'grid-medium', label: 'Medium Grid', icon: '⊡', cols: 'grid-cols-3' },
    { value: 'grid-large', label: 'Large Grid', icon: '⊟', cols: 'grid-cols-2' },
    { value: 'list', label: 'List View', icon: '☰', cols: 'grid-cols-1' }
  ];
  
  const getGridClasses = (mode) => {
    switch (mode) {
      case 'grid-small': return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3';
      case 'grid-medium': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'grid-large': return 'grid-cols-1 lg:grid-cols-2 gap-8';
      case 'list': return 'grid-cols-1 gap-6';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };
  
  const getCardSize = (mode) => {
    switch (mode) {
      case 'grid-small': return 'small';
      case 'grid-medium': return 'medium';
      case 'grid-large': return 'large';
      case 'list': return 'list';
      default: return 'medium';
    }
  };
</script>

<svelte:head>
  <title>Component Marketplace - theBlockchain.ai</title>
  <meta name="description" content="Premium SvelteKit components for AI, blockchain, and DeFi applications" />
</svelte:head>

<div class="marketplace-page min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <!-- Hero Section -->
  <section class="hero bg-gradient-to-r from-blue-900 to-cyan-900 py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-5xl font-bold text-white mb-6">Component Marketplace</h1>
      <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
        Premium SvelteKit components for building the future of AI and blockchain applications. 
        Production-ready, beautifully designed, and rigorously tested.
      </p>
      <div class="stats flex justify-center space-x-8 text-center">
        <div>
          <div class="text-3xl font-bold text-cyan-400">{data.components.length}</div>
          <div class="text-blue-200">Components</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-cyan-400">10k+</div>
          <div class="text-blue-200">Downloads</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-cyan-400">99%</div>
          <div class="text-blue-200">Satisfaction</div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Filters and Controls -->
  <section class="controls py-8 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
    <div class="container mx-auto px-4">
      <!-- Top row: Categories and Search -->
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
        <div class="categories flex flex-wrap gap-2">
          {#each categories as category}
            <button
              class="category-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 {
                selectedCategory === category.value 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
              }"
              on:click={() => selectedCategory = category.value}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              {#if selectedCategory === category.value}
                <span class="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                  {filteredComponents.length}
                </span>
              {/if}
            </button>
          {/each}
        </div>
        
        <div class="search-container relative">
          <input
            type="text"
            placeholder="Search components..."
            bind:value={searchTerm}
            class="search-input px-4 py-2 pl-10 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
          />
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            🔍
          </div>
        </div>
      </div>
      
      <!-- Bottom row: View modes and sorting -->
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="view-modes flex items-center gap-2">
          <span class="text-slate-400 text-sm mr-2">View:</span>
          {#each viewModes as mode}
            <button
              class="view-btn w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-200 {
                viewMode === mode.value
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-white'
              }"
              on:click={() => viewMode = mode.value}
              title={mode.label}
            >
              {mode.icon}
            </button>
          {/each}
        </div>
        
        <div class="sorting flex items-center gap-3">
          <span class="text-slate-400 text-sm">Sort by:</span>
          <select
            bind:value={sortBy}
            class="sort-select px-3 py-2 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-cyan-500 outline-none text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Component Grid/List -->
  <section class="components py-12">
    <div class="container mx-auto px-4">
      {#if filteredComponents.length === 0}
        <div class="empty-state text-center py-20">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl text-slate-400 mb-4">No components found</h3>
          <p class="text-slate-500 mb-6">Try adjusting your search or category filters</p>
          <button 
            on:click={() => { selectedCategory = 'all'; searchTerm = ''; }}
            class="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      {:else}
        <!-- Results count -->
        <div class="results-header mb-6 flex items-center justify-between">
          <p class="text-slate-400">
            Showing {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
            {#if selectedCategory !== 'all'}
              in {categories.find(c => c.value === selectedCategory)?.label}
            {/if}
            {#if searchTerm}
              matching "{searchTerm}"
            {/if}
          </p>
          
          <!-- Featured components toggle -->
          <div class="featured-toggle">
            <button class="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2">
              ⭐ Show Featured Only
            </button>
          </div>
        </div>
        
        <!-- Dynamic grid based on view mode -->
        <div class="components-grid grid {getGridClasses(viewMode)}">
          {#each filteredComponents as component (component.id)}
            <ProductCard 
              {component} 
              size={getCardSize(viewMode)}
              showDescription={viewMode !== 'grid-small'}
              showPricing={viewMode === 'list' || viewMode === 'grid-large'}
            />
          {/each}
        </div>
        
        <!-- Load more button (for pagination) -->
        {#if filteredComponents.length >= 12}
          <div class="load-more text-center mt-12">
            <button class="btn-secondary">
              Load More Components
            </button>
          </div>
        {/if}
      {/if}
    </div>
  </section>
  
  <!-- Cart Summary (floating) -->
  {#if $cart.items.length > 0}
    <div class="cart-float fixed bottom-6 right-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 shadow-2xl border border-cyan-500/50 backdrop-blur-sm z-50">
      <div class="flex items-center space-x-4">
        <div class="cart-icon bg-cyan-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
          {$cart.items.length}
        </div>
        <div>
          <div class="text-white font-semibold">
            {$cart.items.length} item{$cart.items.length !== 1 ? 's' : ''} in cart
          </div>
          <div class="text-cyan-400 font-bold">
            ${($cart.total / 100).toLocaleString()}
          </div>
        </div>
        <a href="/marketplace/cart" class="btn-primary whitespace-nowrap">
          View Cart
        </a>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .btn-primary {
    @apply bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 inline-block text-center;
  }
  
  .btn-secondary {
    @apply bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-center;
  }
  
  .category-btn:hover {
    transform: translateY(-1px);
  }
  
  .view-btn:hover {
    transform: scale(1.05);
  }
  
  .cart-float {
    animation: slideInUp 0.3s ease-out;
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .components-grid {
    transition: all 0.3s ease;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .cart-float {
      left: 1rem;
      right: 1rem;
      bottom: 1rem;
    }
    
    .categories {
      justify-content: center;
    }
    
    .view-modes {
      justify-content: center;
    }
  }
</style>
```

### **Component Detail Page**
```svelte
<!-- src/routes/marketplace/components/[id]/+page.svelte -->
<script>
  import { cart } from '$lib/stores/marketplace/cart.js';
  import LicenseSelector from '$lib/components/marketplace/LicenseSelector.svelte';
  
  export let data;
  
  let selectedLicense = 'individual';
  let quantity = 1;
  
  const formatPrice = (cents) => `$${(cents / 100).toLocaleString()}`;
  
  $: currentPrice = data.component[`price_${selectedLicense}`];
  $: totalPrice = currentPrice * quantity;
  
  function addToCart() {
    cart.addItem(data.component, selectedLicense, quantity);
    // Show success message or redirect to cart
  }
  
  function buyNow() {
    cart.clear();
    cart.addItem(data.component, selectedLicense, quantity);
    window.location.href = '/marketplace/checkout';
  }
</script>

<svelte:head>
  <title>{data.component.name} - Component Marketplace</title>
  <meta name="description" content={data.component.description} />
</svelte:head>

<div class="component-detail min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="breadcrumb mb-8">
      <ol class="flex items-center space-x-2 text-sm text-slate-400">
        <li><a href="/marketplace" class="hover:text-cyan-400">Marketplace</a></li>
        <li class="before:content-['/'] before:mx-2">{data.component.name}</li>
      </ol>
    </nav>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Left Column: Demo and Images -->
      <div class="demo-section">
        <div class="demo-container bg-slate-800 rounded-xl p-6 mb-6">
          <h3 class="text-lg font-semibold text-white mb-4">Live Demo</h3>
          <iframe 
            src={data.component.demo_url} 
            class="w-full h-96 rounded-lg border border-slate-600"
            title="Component Demo"
          ></iframe>
        </div>
        
        {#if data.component.preview_image_url}
          <div class="preview-images">
            <img 
              src={data.component.preview_image_url} 
              alt={data.component.name}
              class="w-full rounded-lg border border-slate-600"
            />
          </div>
        {/if}
      </div>
      
      <!-- Right Column: Product Info and Purchase -->
      <div class="product-info">
        <h1 class="text-4xl font-bold text-white mb-4">{data.component.name}</h1>
        <p class="text-xl text-slate-300 mb-6">{data.component.description}</p>
        
        {#if data.component.long_description}
          <div class="description mb-8">
            <h3 class="text-lg font-semibold text-white mb-3">Description</h3>
            <div class="prose prose-invert text-slate-300">
              {data.component.long_description}
            </div>
          </div>
        {/if}
        
        <!-- Purchase Section -->
        <div class="purchase-section bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Purchase Options</h3>
          
          <!-- License Selector -->
          <div class="license-selector mb-6">
            <label class="block text-sm font-medium text-slate-300 mb-2">License Type</label>
            <div class="grid grid-cols-1 gap-3">
              <label class="flex items-center p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors {selectedLicense === 'individual' ? 'border-cyan-500 bg-cyan-500/10' : ''}">
                <input type="radio" bind:group={selectedLicense} value="individual" class="sr-only" />
                <div class="flex-1">
                  <div class="font-medium text-white">Individual</div>
                  <div class="text-sm text-slate-400">Single developer, up to 3 projects</div>
                </div>
                <div class="text-lg font-bold text-cyan-400">{formatPrice(data.component.price_individual)}</div>
              </label>
              
              <label class="flex items-center p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors {selectedLicense === 'team' ? 'border-cyan-500 bg-cyan-500/10' : ''}">
                <input type="radio" bind:group={selectedLicense} value="team" class="sr-only" />
                <div class="flex-1">
                  <div class="font-medium text-white">Team</div>
                  <div class="text-sm text-slate-400">Up to 10 developers, unlimited projects</div>
                </div>
                <div class="text-lg font-bold text-cyan-400">{formatPrice(data.component.price_team)}</div>
              </label>
              
              <label class="flex items-center p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors {selectedLicense === 'enterprise' ? 'border-cyan-500 bg-cyan-500/10' : ''}">
                <input type="radio" bind:group={selectedLicense} value="enterprise" class="sr-only" />
                <div class="flex-1">
                  <div class="font-medium text-white">Enterprise</div>
                  <div class="text-sm text-slate-400">Unlimited developers, white-label rights</div>
                </div>
                <div class="text-lg font-bold text-cyan-400">{formatPrice(data.component.price_enterprise)}</div>
              </label>
            </div>
          </div>
          
          <!-- Quantity Selector -->
          <div class="quantity-selector mb-6">
            <label class="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
            <div class="flex items-center space-x-3">
              <button 
                on:click={() => quantity = Math.max(1, quantity - 1)}
                class="bg-slate-700 hover:bg-slate-600 text-white w-10 h-10 rounded-lg flex items-center justify-center"
              >-</button>
              <input 
                type="number" 
                bind:value={quantity} 
                min="1"
                class="w-20 px-3 py-2 bg-slate-700 text-white text-center rounded-lg border border-slate-600 focus:border-cyan-500 outline-none"
              />
              <button 
                on:click={() => quantity += 1}
                class="bg-slate-700 hover:bg-slate-600 text-white w-10 h-10 rounded-lg flex items-center justify-center"
              >+</button>
            </div>
          </div>
          
          <!-- Total and Actions -->
          <div class="total-and-actions">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg text-slate-300">Total:</span>
              <span class="text-2xl font-bold text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
            
            <div class="flex space-x-3">
              <button 
                on:click={addToCart}
                class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Add to Cart
              </button>
              <button 
                on:click={buyNow}
                class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        
        <!-- Documentation Link -->
        {#if data.component.documentation_url}
          <div class="documentation mt-6">
            <a 
              href={data.component.documentation_url}
              target="_blank"
              class="inline-flex items-center text-cyan-400 hover:text-cyan-300"
            >
              📚 View Documentation
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
```

---

## **TESTING REQUIREMENTS - EXACT IMPLEMENTATION**

### **Unit Tests (Create These)**
```javascript
// tests/unit/cart.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { cart } from '$lib/stores/marketplace/cart.js';

describe('Cart Store', () => {
  const mockComponent = {
    id: 'test-component-id',
    name: 'Test Component',
    price_individual: 19900,
    price_team: 49900,
    price_enterprise: 199900,
  };
  
  beforeEach(() => {
    cart.clear();
  });
  
  it('should add item to cart', () => {
    cart.addItem(mockComponent, 'individual', 1);
    
    const state = get(cart);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].component_id).toBe('test-component-id');
    expect(state.items[0].license_type).toBe('individual');
    expect(state.items[0].quantity).toBe(1);
    expect(state.items[0].unit_price).toBe(19900);
    expect(state.total).toBe(19900);
  });
  
  it('should update quantity for existing item', () => {
    cart.addItem(mockComponent, 'individual', 1);
    cart.addItem(mockComponent, 'individual', 2);
    
    const state = get(cart);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.total).toBe(59700);
  });
  
  it('should remove item from cart', () => {
    cart.addItem(mockComponent, 'individual', 1);
    cart.removeItem('test-component-id', 'individual');
    
    const state = get(cart);
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });
});
```

### **Integration Tests (Create These)**
```javascript
// tests/integration/checkout.test.js
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import CheckoutFlow from '$lib/components/marketplace/CheckoutFlow.svelte';

describe('Checkout Flow', () => {
  const mockCartItems = [
    {
      component_id: 'databox',
      component: { name: 'DataBox', price_individual: 19900 },
      license_type: 'individual',
      quantity: 1,
      unit_price: 19900,
      total_price: 19900,
    }
  ];
  
  it('should display cart items correctly', () => {
    render(CheckoutFlow, { cartItems: mockCartItems });
    
    expect(screen.getByText('DataBox')).toBeInTheDocument();
    expect(screen.getByText('$199.00')).toBeInTheDocument();
  });
  
  it('should show payment options', () => {
    render(CheckoutFlow, { cartItems: mockCartItems });
    
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
    expect(screen.getByText('PayPal')).toBeInTheDocument();
    expect(screen.getByText('Cryptocurrency')).toBeInTheDocument();
  });
});
```

---

## **DEPLOYMENT CONFIGURATION - EXACT IMPLEMENTATION**

### **Environment Setup**
```bash
# Production deployment checklist
1. Set up Supabase production project
2. Configure AWS S3 bucket with proper CORS
3. Set up Stripe production keys
4. Configure webhook endpoints
5. Set up custom domain SSL
6. Configure email service (SendGrid/Resend)
```

### **package.json Updates**
```json
{
  "devDependencies": {
    "@testing-library/svelte": "^4.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "vitest": "^1.0.0"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "@stripe/stripe-js": "^2.2.0",
    "stripe": "^14.7.0",
    "@aws-sdk/client-s3": "^3.461.0",
    "@aws-sdk/s3-request-presigner": "^3.461.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "marketplace:setup": "node scripts/setup-marketplace.js"
  }
}
```

### **Netlify Configuration**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/marketplace/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/marketplace/api/webhooks/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

---

## **SUCCESS CRITERIA - EXACT VALIDATION**

### **Sprint 1 Success Metrics**
- [ ] User can browse component catalog
- [ ] User can view component details with live demo
- [ ] User can create account via Supabase Auth
- [ ] User can purchase single component via Stripe "Buy Now"
- [ ] Purchase confirmation email sent
- [ ] Order recorded in database with correct status

### **Sprint 2 Success Metrics**
- [ ] User can add multiple items to cart
- [ ] User can checkout with cart items
- [ ] PayPal integration working
- [ ] Secure download system functional
- [ ] User dashboard shows purchase history
- [ ] Admin can view orders in basic panel

### **Sprint 3 Success Metrics**
- [ ] Coinbase Commerce crypto payments working
- [ ] Mobile responsive design complete
- [ ] Security audit passed
- [ ] Performance: page load < 3 seconds
- [ ] $1,000+ revenue achieved in soft launch

---

## **IMMEDIATE NEXT STEPS FOR OPUS 4**

### **IMAGE SPECIFICATIONS & ASSET REQUIREMENTS - CRITICAL**

**Component Preview Images**
```
Required Image Formats:
├── Primary Preview: 1200x800px (3:2 aspect ratio)
├── Thumbnail: 400x400px (1:1 aspect ratio) 
├── Banner: 1600x900px (16:9 aspect ratio)
└── Demo Screenshot: 1920x1080px (16:9 aspect ratio)

File Requirements:
├── Format: WebP (primary), PNG (fallback)
├── Quality: 85-95% compression
├── Max File Size: 500KB per image
└── CDN: Cloudflare optimization
```

**S3 Image Storage Structure**
```
S3 Bucket: theblockchain-marketplace-components
├── /images/components/databox/
│   ├── preview-1200x800.webp
│   ├── thumbnail-400x400.webp
│   └── demo-screenshot.webp
├── /images/components/timelinebox/
│   ├── preview-1200x800.webp
│   ├── thumbnail-400x400.webp
│   └── demo-screenshot.webp
└── /images/placeholders/
    └── component-placeholder.webp
```

### **IMPLEMENTATION STEPS**

1. **Set up Supabase project** and run all database schema SQL
2. **Install required dependencies** from package.json
3. **Create file structure** exactly as specified above
4. **Implement ProductCard.svelte** with image-first design and multiple sizes
5. **Set up Stripe integration** for basic "Buy Now" functionality
6. **Test end-to-end purchase flow** with test data
7. **Implement secure download system** with presigned URLs
8. **Add cart functionality** and multi-item checkout
9. **Integrate PayPal and Coinbase Commerce**
10. **Deploy to staging environment** for testing

---

**This document contains EXACT specifications for building the marketplace. Follow each section precisely for successful implementation.**

## **COINBASE WALLET STYLE NOTES**

**Re: "Does the new asset card view come with the SDK?"**
- Coinbase Wallet's modern asset card UI is part of their mobile app, not a separate SDK
- We replicate the design patterns: glassmorphism, floating elements, smooth animations
- Focus on image-first design with overlay interactions
- Use backdrop-blur, gradient overlays, and hover transformations
- Modern card design references: Coinbase Wallet, Rainbow Wallet, MetaMask Portfolio

**Visual Design Principles:**
- **Image dominance:** 70% visual, 30% text content
- **Glassmorphism:** Backdrop blur with subtle gradients
- **Floating UI:** Overlaid price tags, action buttons, badges
- **Smooth animations:** 300-500ms transitions, scale/transform effects
- **Responsive grids:** Small thumbnails → Medium cards → Large features → List view

## **COINBASE DEVELOPER ECOSYSTEM - COMPLETE INTEGRATION**

**You're right!** Coinbase has extensive desktop APIs beyond just Commerce. Here's the complete developer toolkit:

### **1. Coinbase Commerce** ✅ (Already included)
- **Purpose:** Crypto payment processing
- **Status:** Implemented in requirements above

### **2. Coinbase Wallet SDK** 🔥 **ADD THIS**
```javascript
// src/lib/coinbase/wallet.js
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

const coinbaseWallet = new CoinbaseWalletSDK({
  appName: "theBlockchain.ai Marketplace",
  appLogoUrl: "https://theblockchain.ai/logo.png",
  darkMode: true
});

// Connect wallet for direct crypto transactions
export async function connectCoinbaseWallet() {
  const ethereum = coinbaseWallet.makeWeb3Provider();
  const accounts = await ethereum.request({
    method: 'eth_requestAccounts'
  });
  return accounts[0];
}
```

### **3. Coinbase Cloud APIs** 🔥 **ADD THIS**
```javascript
// Real-time crypto data for component pricing
export async function getCoinbaseTokenPrice(symbol) {
  const response = await fetch(
    `https://api.cloud.coinbase.com/market/v1/ticker?symbol=${symbol}`,
    { headers: { 'Authorization': `Bearer ${COINBASE_CLOUD_API_KEY}` } }
  );
  return response.json();
}
```

### **4. MINT Button Component** 🔥 **LIKE COINBASE WALLET**
```svelte
<!-- Replicate Coinbase Wallet's MINT button design -->
<button class="coinbase-mint-btn" on:click={handleMint}>
  <div class="btn-content">
    {#if minting}
      <div class="spinner"></div>
      <span>Minting NFT License...</span>
    {:else}
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      <span>MINT as NFT</span>
    {/if}
  </div>
</button>

<style>
  .coinbase-mint-btn {
    background: linear-gradient(135deg, #0052FF 0%, #0A84FF 100%);
    @apply rounded-xl px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105;
    box-shadow: 0 4px 20px rgba(0, 82, 255, 0.3);
  }
</style>
```

### **5. Coinbase Design System** 🎨
```css
/* Coinbase's actual design tokens */
:root {
  --coinbase-blue: #0052FF;
  --coinbase-green: #00D395;
  --coinbase-radius-xl: 24px;
  --coinbase-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### **Updated Environment Variables**
```env
# Add to .env.local
COINBASE_CLOUD_API_KEY=your_coinbase_cloud_api_key
PUBLIC_COINBASE_WALLET_APP_NAME="theBlockchain.ai Marketplace"
```

### **Updated Package Dependencies**
```json
{
  "dependencies": {
    "@coinbase/wallet-sdk": "^3.7.0",
    "@coinbase/commerce-js": "^2.1.0",
    "ethers": "^6.8.0"
  }
}
```

**Result:** Full Coinbase ecosystem integration with Wallet SDK, Cloud APIs, Commerce payments, and replicated MINT button design!

**Implementation Priority:**
1. **Image-first ProductCard** with multiple size variants
2. **Dynamic grid layouts** (MidJourney/Pinterest style)
3. **Hover interactions** with overlay controls
4. **Responsive image optimization** with WebP/fallbacks
5. **Modern glassmorphism styling** matching Coinbase aesthetic