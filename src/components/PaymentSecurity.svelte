<!-- Payment Security Component -->
<script>
  // Payment security display component
</script>

<div class="payment-security">
  <div class="security-header">
    <div class="security-text-line1">Verifiable Trust | Secure payments</div>
    <div class="security-text-line2">powered by:</div>
  </div>
  
  <div class="payment-triangle">
    <!-- Top Row: Stripe and PayPal -->
    <div class="triangle-top">
      <img src="/stripe-logo.svg" alt="Stripe" class="processor-img" />
      <img src="/paypal-logo.svg" alt="PayPal" class="processor-img" />
    </div>
    
    <!-- Center: Zero Fraud Round Logo -->
    <div class="triangle-center">
      <img 
        src="/zero-fraud-icon.svg" 
        alt="Zero Fraud Protection" 
        class="center-logo"
      />
    </div>
    
    <!-- Bottom: Coinbase (15% bigger) -->
    <div class="triangle-bottom">
      <img src="/coinbase-logo.svg" alt="Coinbase" class="processor-img coinbase-img" />
    </div>
  </div>
  
  <div class="developer-note">
    Building the Future of Trusted AI
  </div>
</div>

<style>
  .payment-security {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1rem;
    /* ENSURE: Clean appearance in all modes */
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    text-align: center;
    margin: 1.5rem 0;
  }

  .security-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    text-align: center;
  }

  .security-text-line1 {
    font-weight: 600;
    color: #22d3ee; /* Cyan for light mode */
    font-size: 1rem;
    margin: 0;
  }

  .security-text-line2 {
    font-weight: 500;
    color: #0891b2; /* Darker cyan for light mode */
    font-size: 0.9rem;
    margin: 0;
  }

  .payment-triangle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin: 1rem 0;
  }

  .triangle-top {
    display: flex;
    gap: 4rem;
    align-items: center;
  }

  .triangle-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .triangle-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center-logo {
    height: 80px; /* Slightly larger than payment logos for prominence */
    width: 80px; /* Make it perfectly round/square for circular icon */
    filter: none; /* Keep original colors */
    transition: all 0.3s ease;
    border-radius: 50%; /* Optional: enhance circular appearance */
  }

  .center-logo:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  .processor-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .processor-img {
    height: 70px; /* 2.5x larger than original 28px */
    width: auto;
    max-width: 200px; /* Increased from 90px */
    filter: grayscale(5%) opacity(0.95);
    transition: all 0.3s ease;
  }

  .processor-img:hover {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.05);
  }

  .coinbase-img {
    height: 80px; /* 15% bigger than standard 70px */
    max-width: 230px; /* Proportionally increased */
  }

  .developer-note {
    font-size: 0.875rem; /* Slightly larger for better visibility */
    color: #64748b;
    font-style: italic;
    margin-top: 0.5rem;
  }

  /* Dark mode support */
  :global(.dark) .payment-security {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  :global(.dark) .security-text-line1 {
    color: #f8fafc;
  }

  :global(.dark) .security-text-line2 {
    color: #e2e8f0;
  }

  :global(.dark) .developer-note {
    color: #94a3b8;
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .triangle-top {
      gap: 2rem; /* Closer spacing on mobile */
    }
    
    .payment-triangle {
      gap: 1rem;
    }
    
    .processor-img {
      height: 50px; /* Larger on mobile too (was 24px) */
      max-width: 140px;
    }
    
    .coinbase-img {
      height: 57px; /* 15% bigger than mobile standard 50px */
      max-width: 160px; /* Proportionally increased */
    }
    
    .center-logo {
      height: 60px; /* Proportional scaling on mobile */
      width: 60px; /* Maintain square aspect for round icon */
    }
    
    .security-header {
      font-size: 0.85rem;
    }
    
    .security-text-line1 {
      font-size: 0.9rem;
    }
    
    .security-text-line2 {
      font-size: 0.8rem;
    }
    
    .payment-security {
      padding: 1.5rem 1rem;
    }
  }
</style>