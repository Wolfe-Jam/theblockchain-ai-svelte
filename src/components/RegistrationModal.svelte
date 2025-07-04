<!-- src/components/RegistrationModal.svelte -->
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
  
  // Dropdown options for better UX
  const titleOptions = [
    { value: '', label: 'Select Title' },
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' },
    { value: 'ceo', label: 'CEO' },
    { value: 'cto', label: 'CTO' },
    { value: 'cfo', label: 'CFO' },
    { value: 'vp', label: 'VP' },
    { value: 'director', label: 'Director' },
    { value: 'manager', label: 'Manager' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'other', label: 'Other' }
  ];
  
  const organizationOptions = [
    { value: '', label: 'Select Organization Type' },
    { value: 'technology-company', label: 'Technology Company' },
    { value: 'startup', label: 'Startup' },
    { value: 'enterprise', label: 'Enterprise Corporation' },
    { value: 'consulting', label: 'Consulting Firm' },
    { value: 'financial-services', label: 'Financial Services' },
    { value: 'healthcare', label: 'Healthcare Organization' },
    { value: 'education', label: 'Educational Institution' },
    { value: 'government', label: 'Government Agency' },
    { value: 'non-profit', label: 'Non-Profit Organization' },
    { value: 'research', label: 'Research Institution' },
    { value: 'freelancer', label: 'Independent/Freelancer' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' }
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
        <div class="register-form">
          <h3 class="modal-title">Join the Founder's Program</h3>
          <p class="modal-description">🎉 Congrats, you've got Early Access.<br>Claim your Founder's Stake now & help shape<br>the future of open-source with Trusted AI.</p>
          
          <form on:submit={handleSubmit} name="founder-registration" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="founder-registration">
            
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
            
            <!-- Row 2: Email -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required>
            </div>
            
            <!-- Row 3: Organization -->
            <div class="form-row">
              <div class="form-group form-group-half">
                <label for="organizationType">Organization Type</label>
                <select id="organizationType" name="organizationType" class="select-input">
                  {#each organizationOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>
              <div class="form-group form-group-half">
                <label for="organizationName">Organization Name</label>
                <input type="text" id="organizationName" name="organizationName" placeholder="Company/Institution">
              </div>
            </div>
            
            <!-- Professional Role/Interest -->
            <div class="form-group">
              <label class="checkbox-group-label">I'm interested in... (Select all that apply)</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="ai-automation">
                  <span>AI Automation Tools</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="blockchain-integration">
                  <span>Blockchain Integration</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="software-monetization">
                  <span>Software Monetization</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="open-source-tools">
                  <span>Open Source Development</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="enterprise-solutions">
                  <span>Enterprise Solutions</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="investment-opportunities">
                  <span>Investment Opportunities</span>
                </label>
              </div>
            </div>
            
            <button type="submit" class="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get Early Access'}
            </button>
          </form>
        </div>
      {:else}
        <div class="thank-you-message">
          <h3 class="modal-title">Welcome to the Founder's Program!</h3>
          <p class="modal-description">You're on the list. We'll be in touch soon with next steps and your early access materials.</p>
          <div class="next-steps">
            <h4>What's Next:</h4>
            <ul>
              <li>Early access to beta platform</li>
              <li>Founder's program benefits</li>
              <li>Exclusive updates and insights</li>
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
    max-width: 500px;
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
    flex: 0 0 80px;
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
    
    .checkbox-group {
      grid-template-columns: 1fr;
    }
    
    .modal-content {
      padding: 1.5rem;
      margin: 1rem;
    }
  }
</style>
