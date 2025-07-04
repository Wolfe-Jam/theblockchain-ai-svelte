<!-- src/components/InvestorModal.svelte -->
<script>
  import { fade, scale } from 'svelte/transition';
  
  export let isOpen = false;
  
  function closeModal() {
    isOpen = false;
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  let showThankYou = false;
  let isSubmitting = false;
  
  // Personal titles
  const titleOptions = [
    { value: '', label: 'Title' },
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' }
  ];
  
  // Professional positions
  const positionOptions = [
    { value: '', label: 'Select Position' },
    { value: 'managing-partner', label: 'Managing Partner' },
    { value: 'general-partner', label: 'General Partner' },
    { value: 'partner', label: 'Partner' },
    { value: 'principal', label: 'Principal' },
    { value: 'director', label: 'Director' },
    { value: 'vp', label: 'Vice President' },
    { value: 'analyst', label: 'Investment Analyst' },
    { value: 'associate', label: 'Associate' },
    { value: 'ceo', label: 'CEO' },
    { value: 'cfo', label: 'CFO' },
    { value: 'cio', label: 'Chief Investment Officer' },
    { value: 'portfolio-manager', label: 'Portfolio Manager' },
    { value: 'fund-manager', label: 'Fund Manager' },
    { value: 'investment-advisor', label: 'Investment Advisor' },
    { value: 'wealth-manager', label: 'Wealth Manager' },
    { value: 'family-office-head', label: 'Family Office Head' },
    { value: 'board-member', label: 'Board Member' },
    { value: 'angel-investor', label: 'Angel Investor' },
    { value: 'other', label: 'Other' }
  ];
  
  const organizationTypeOptions = [
    { value: '', label: 'Select Organization Type' },
    { value: 'venture-capital', label: 'Venture Capital Firm' },
    { value: 'private-equity', label: 'Private Equity Firm' },
    { value: 'hedge-fund', label: 'Hedge Fund' },
    { value: 'family-office', label: 'Family Office' },
    { value: 'angel-group', label: 'Angel Investor Group' },
    { value: 'corporate-venture', label: 'Corporate Venture Capital' },
    { value: 'investment-bank', label: 'Investment Bank' },
    { value: 'pension-fund', label: 'Pension Fund' },
    { value: 'sovereign-fund', label: 'Sovereign Wealth Fund' },
    { value: 'endowment', label: 'University Endowment' },
    { value: 'accelerator', label: 'Accelerator/Incubator' },
    { value: 'individual-investor', label: 'Individual Investor' },
    { value: 'strategic-corporate', label: 'Strategic Corporate Investor' },
    { value: 'other', label: 'Other' }
  ];
  
  const geographicFocusOptions = [
    { value: '', label: 'Select Primary Location' },
    { value: 'san-francisco', label: 'San Francisco Bay Area' },
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'boston', label: 'Boston' },
    { value: 'seattle', label: 'Seattle' },
    { value: 'austin', label: 'Austin' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'london', label: 'London' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'hong-kong', label: 'Hong Kong' },
    { value: 'tokyo', label: 'Tokyo' },
    { value: 'beijing', label: 'Beijing' },
    { value: 'toronto', label: 'Toronto' },
    { value: 'tel-aviv', label: 'Tel Aviv' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'other-us', label: 'Other US' },
    { value: 'other-international', label: 'Other International' }
  ];
  
  const investmentFocusOptions = [
    { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { value: 'blockchain-crypto', label: 'Blockchain & Cryptocurrency' },
    { value: 'enterprise-software', label: 'Enterprise Software' },
    { value: 'developer-tools', label: 'Developer Tools & Infrastructure' },
    { value: 'fintech', label: 'Financial Technology' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'data-analytics', label: 'Data & Analytics' },
    { value: 'automation', label: 'Automation & Robotics' },
    { value: 'marketplace', label: 'Marketplace & Platforms' },
    { value: 'open-source', label: 'Open Source Technologies' },
    { value: 'deep-tech', label: 'Deep Technology' },
    { value: 'early-stage', label: 'Early Stage (Seed/Series A)' },
    { value: 'growth-stage', label: 'Growth Stage' },
    { value: 'sector-agnostic', label: 'Sector Agnostic' }
  ];
  
  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;
    
    const formData = new FormData(event.target);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        showThankYou = true;
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={handleBackdropClick} 
       transition:fade={{ duration: 400, easing: 'ease-out' }}>
    <div class="modal-content" 
         transition:scale={{ duration: 400, start: 0.9, easing: 'ease-out' }}>
      <button class="close-btn" on:click={closeModal}>&times;</button>
      
      {#if !showThankYou}
        <div class="investor-form">
          <h3 class="modal-title">Investment Interest</h3>
          <p class="modal-description">Join our investor network for updates on funding rounds, financial reports, and exclusive investment opportunities.</p>
          
          <form on:submit={handleSubmit} name="investor-interest" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="investor-interest">
            
            <!-- Row 1: Title and Name -->
            <div class="form-row">
              <div class="form-group form-group-small">
                <label for="title">Title</label>
                <select id="title" name="title" class="select-input">
                  {#each titleOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>
              <div class="form-group form-group-large">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="John" required>
              </div>
              <div class="form-group form-group-large">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <!-- Row 2: Position -->
            <div class="form-group">
              <label for="position">Professional Position *</label>
              <select id="position" name="position" class="select-input" required>
                {#each positionOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Row 3: Email -->
            <div class="form-group">
              <label for="email">Professional Email Address</label>
              <input type="email" id="email" name="email" placeholder="investor@firm.com" required>
            </div>
            
            <!-- Row 4: Organization Details -->
            <div class="form-row">
              <div class="form-group form-group-half">
                <label for="organizationType">Organization Type</label>
                <select id="organizationType" name="organizationType" class="select-input" required>
                  {#each organizationTypeOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>
              <div class="form-group form-group-half">
                <label for="organizationName">Organization Name</label>
                <input type="text" id="organizationName" name="organizationName" placeholder="Firm/Company Name" required>
              </div>
            </div>
            
            <!-- Row 5: Location -->
            <div class="form-group">
              <label for="location">Primary Investment Location</label>
              <select id="location" name="location" class="select-input">
                {#each geographicFocusOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Separator -->
            <div class="section-separator"></div>
            
            <!-- Investment Profile Section -->
            <div class="investment-section">
              <h4 class="section-heading">Investment Profile</h4>
              
              <!-- Investment Focus Areas -->
              <div class="form-group focus-section">
                <label class="checkbox-group-label">Investment Focus Areas <span class="helper-text">(Select all that apply)</span></label>
                <div class="checkbox-group">
                  {#each investmentFocusOptions as option}
                    <label class="checkbox-item">
                      <input type="checkbox" name="investmentFocus" value={option.value}>
                      <span>{option.label}</span>
                    </label>
                  {/each}
                </div>
              </div>
              
              <!-- Separator Line -->
              <div class="subsection-divider"></div>
              
              <!-- Investment Interest Specific to theBlockchain.ai -->
              <div class="form-group interest-section">
                <label class="checkbox-group-label">Specific Interest <span class="helper-text">(Select all that apply)</span></label>
                <div class="checkbox-group">
                  <label class="checkbox-item">
                    <input type="checkbox" name="interest" value="seed-funding">
                    <span>Seed Round Participation</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="interest" value="series-a">
                    <span>Series A Interest</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="interest" value="strategic-partnership">
                    <span>Strategic Partnership</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="interest" value="due-diligence">
                    <span>Request Due Diligence Materials</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="interest" value="pdf-report">
                    <span>Include Professional PDF Report</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" name="interest" value="advisor-role">
                    <span>Advisory Board Opportunity</span>
                  </label>
                </div>
              </div>
              
              <!-- Separator Line -->
              <div class="subsection-divider"></div>
              
              <!-- Investment Range -->
              <div class="form-group range-section">
                <label class="checkbox-group-label">Typical Investment Range</label>
                <div class="radio-group">
                  <label class="radio-item">
                    <input type="radio" name="investment-range" value="10m-plus">
                    <span>$10M+</span>
                  </label>
                  <label class="radio-item">
                    <input type="radio" name="investment-range" value="2m-10m">
                    <span>$2M - $10M</span>
                  </label>
                  <label class="radio-item">
                    <input type="radio" name="investment-range" value="500k-2m">
                    <span>$500K - $2M</span>
                  </label>
                  <label class="radio-item">
                    <input type="radio" name="investment-range" value="100k-500k">
                    <span>$100K - $500K</span>
                  </label>
                  <label class="radio-item">
                    <input type="radio" name="investment-range" value="25k-100k">
                    <span>$25K - $100K</span>
                  </label>
                  <label class="radio-item">
                    <input type="radio" name="investment-range" value="tbd-angels">
                    <span>Angel/Individual Investor</span>
                  </label>
                </div>
              </div>
            </div>
            
            <button type="submit" class="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Investment Interest'}
            </button>
          </form>
          
          <p class="accredited-note">* This opportunity is available to accredited investors only</p>
        </div>
      {:else}
        <div class="thank-you-message">
          <h3 class="modal-title">Thank You for Your Interest</h3>
          <p class="modal-description">We've received your investment inquiry. Our team will review your information and reach out within 48 hours with next steps.</p>
          <div class="next-steps">
            <h4>What's Next:</h4>
            <ul>
              <li>Initial qualification call</li>
              <li>Due diligence materials</li>
              <li>Investment documentation</li>
              <li>Exclusive investor updates</li>
            </ul>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    border: 1px solid rgba(12, 192, 223, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #94a3b8;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--brand-cyan-text);
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .modal-description {
    color: #cbd5e1;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group-small {
    flex: 0 0 100px;
  }
  
  .form-group-large {
    flex: 1;
  }
  
  .form-group-half {
    flex: 1;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #f1f5f9;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .form-group input,
  .select-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    background-color: #334155;
    color: #f1f5f9;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .form-group input:focus,
  .select-input:focus {
    outline: none;
    border-color: var(--brand-cyan-text);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  .select-input {
    cursor: pointer;
  }

  .select-input option {
    background-color: #334155;
    color: #f1f5f9;
  }

  .checkbox-group-label {
    display: block;
    margin-bottom: 1rem;
    color: #f1f5f9;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
  }

  .checkbox-item:hover {
    background-color: rgba(12, 192, 223, 0.1);
  }

  .checkbox-item input[type="checkbox"] {
    width: auto;
    margin: 0;
    accent-color: var(--brand-cyan-text);
  }

  .checkbox-item span {
    color: #cbd5e1;
    font-size: 0.875rem;
  }

  .radio-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .radio-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
  }

  .radio-item:hover {
    background-color: rgba(12, 192, 223, 0.1);
  }

  .radio-item input[type="radio"] {
    width: auto;
    margin: 0;
    accent-color: var(--brand-cyan-text);
  }

  .radio-item span {
    color: #cbd5e1;
    font-size: 0.875rem;
  }

  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--brand-cyan) 0%, var(--brand-blue) 100%);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(12, 192, 223, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Section Separators and Organization */
  .section-separator {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--brand-cyan-text), transparent);
    margin: 2rem 0 1.5rem 0;
    opacity: 0.3;
  }

  .investment-section {
    background: rgba(12, 192, 223, 0.03);
    border-radius: 0.75rem;
    padding: 1.5rem;
    border: 1px solid rgba(12, 192, 223, 0.1);
  }

  .section-heading {
    color: var(--brand-cyan-text);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(12, 192, 223, 0.2);
    padding-bottom: 0.75rem;
  }

  .subsection-divider {
    height: 1px;
    background: rgba(12, 192, 223, 0.2);
    margin: 1.5rem 0;
  }

  .helper-text {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 400;
    font-style: italic;
  }

  .focus-section {
    background: rgba(12, 192, 223, 0.02);
    border-radius: 0.5rem;
    padding: 1rem;
    border-left: 3px solid var(--brand-cyan-text);
  }

  .interest-section {
    background: rgba(255, 145, 77, 0.02);
    border-radius: 0.5rem;
    padding: 1rem;
    border-left: 3px solid var(--brand-orange-text);
  }

  .range-section {
    background: rgba(37, 99, 235, 0.02);
    border-radius: 0.5rem;
    padding: 1rem;
    border-left: 3px solid var(--brand-blue-text);
  }

  .accredited-note {
    text-align: center;
    color: #94a3b8;
    font-size: 0.75rem;
    margin-top: 1rem;
    font-style: italic;
  }

  .thank-you-message {
    text-align: center;
  }

  .next-steps {
    background: rgba(12, 192, 223, 0.1);
    border: 1px solid rgba(12, 192, 223, 0.3);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1.5rem;
    text-align: left;
  }

  .next-steps h4 {
    color: var(--brand-cyan-text);
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .next-steps ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .next-steps li {
    color: #cbd5e1;
    font-size: 0.875rem;
    padding: 0.25rem 0;
    position: relative;
    padding-left: 1rem;
  }

  .next-steps li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--brand-cyan-text);
  }

  @media (max-width: 640px) {
    .form-row {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .checkbox-group,
    .radio-group {
      grid-template-columns: 1fr;
    }
    
    .modal-content {
      padding: 1.5rem;
      margin: 1rem;
      max-width: none;
    }
  }
</style>
