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
        // You could show an error message here
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // You could show an error message here
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
            <div class="form-group">
              <label for="email">Professional Email Address</label>
              <input type="email" id="email" name="email" placeholder="investor@firm.com" required>
            </div>
            
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="John Smith" required>
            </div>
            
            <div class="form-group">
              <label for="organization">Organization</label>
              <input type="text" id="organization" name="organization" placeholder="Investment Firm / Company">
            </div>
            
            <div class="form-group">
              <label class="checkbox-group-label">Investment Interest (Select all that apply)</label>
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
              </div>
            </div>
            
            <div class="form-group">
              <label class="checkbox-group-label">Investment Range</label>
              <div class="radio-group">
                <label class="radio-item">
                  <input type="radio" name="investment-range" value="10m-plus">
                  <span>$10M+</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="investment-range" value="2m-5m">
                  <span>$2M - $5M</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="investment-range" value="1m-or-less">
                  <span>$1M or less</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="investment-range" value="tbd-angels">
                  <span>$TBD Angels/Fans/Devs</span>
                </label>
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
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(6px);
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 32rem;
    padding: 2.5rem;
    margin: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    background-color: #0f172a;
    border: 2px solid #334155;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #9ca3af;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .close-btn:hover {
    color: white;
  }

  .modal-title {
    color: #0CC0DF;
    font-weight: 800;
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .modal-description {
    margin-bottom: 2rem;
    color: #cbd5e1;
    line-height: 1.6;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #e2e8f0;
  }

  .checkbox-group-label {
    margin-bottom: 0.75rem;
  }

  input[type="email"],
  input[type="text"] {
    width: 100%;
    padding: 0.875rem;
    background-color: #1e293b;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  input[type="email"]:focus,
  input[type="text"]:focus {
    outline: none;
    border-color: #0CC0DF;
    box-shadow: 0 0 0 3px rgba(12, 192, 223, 0.1);
  }

  .checkbox-group,
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .checkbox-item,
  .radio-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: normal;
    margin-bottom: 0;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease;
  }

  .checkbox-item:hover,
  .radio-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  input[type="checkbox"],
  input[type="radio"] {
    width: 1.125rem;
    height: 1.125rem;
    accent-color: #0CC0DF;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: rgba(12, 192, 223, 0.9);
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .submit-btn:hover {
    background-color: #0CC0DF;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(12, 192, 223, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn:disabled:hover {
    background-color: rgba(12, 192, 223, 0.9);
    transform: none;
    box-shadow: none;
  }

  .accredited-note {
    font-size: 0.75rem;
    color: #64748b;
    font-style: italic;
    text-align: center;
    margin-top: 1rem;
  }

  .thank-you-message {
    text-align: center;
  }

  .next-steps {
    margin-top: 2rem;
    text-align: left;
    background-color: rgba(12, 192, 223, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(12, 192, 223, 0.2);
  }

  .next-steps h4 {
    color: #0CC0DF;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .next-steps ul {
    list-style: none;
    padding: 0;
  }

  .next-steps li {
    padding: 0.25rem 0;
    color: #cbd5e1;
    position: relative;
    padding-left: 1.5rem;
  }

  .next-steps li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #0CC0DF;
  }
</style>