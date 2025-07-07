<!-- src/components/WaitingListModal.svelte -->
<script>
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let isOpen = false;
  
  let showThankYou = false;
  let isSubmitting = false;
  let email = '';
  let firstName = '';
  let lastName = '';
  
  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
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
        <div class="waiting-list-form">
          <div class="modal-header">
            <div class="icon-container">
              <i class="fas fa-rocket"></i>
            </div>
            <h3 class="modal-title">Join the Waiting List</h3>
            <p class="modal-description">
              Be the first to know when Founder's Proof minting goes live. 
              Get exclusive early access and priority notifications.
            </p>
          </div>
          
          <form on:submit={handleSubmit} name="founders-proof-waitlist" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="founders-proof-waitlist">
            
            <!-- Name Row -->
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  bind:value={firstName}
                  placeholder="John" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  bind:value={lastName}
                  placeholder="Doe" 
                  required
                >
              </div>
            </div>
            
            <!-- Email -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                bind:value={email}
                placeholder="you@example.com" 
                required
              >
            </div>
            
            <!-- Interest Level -->
            <div class="form-group">
              <label class="checkbox-group-label">I'm interested in... (Optional)</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="early-access">
                  <span>Early access notifications</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="founder-benefits">
                  <span>Founder program benefits</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="community">
                  <span>Exclusive community access</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="interest" value="updates">
                  <span>Project updates & insights</span>
                </label>
              </div>
            </div>
            
            <button type="submit" class="submit-btn" disabled={isSubmitting}>
              {#if isSubmitting}
                <div class="loader"></div>
                Joining...
              {:else}
                <i class="fas fa-bell mr-2"></i>
                Join Waiting List
              {/if}
            </button>
            
            <p class="privacy-note">
              We respect your privacy. No spam, just important updates about the Founder's Proof launch.
            </p>
          </form>
        </div>
      {:else}
        <div class="thank-you-message">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h3 class="modal-title">You're on the list!</h3>
          <p class="success-description">
            Thanks for joining the Founder's Proof waiting list, <strong>{firstName}</strong>! 
            We'll notify you as soon as minting goes live.
          </p>
          
          <div class="next-steps">
            <h4>What happens next?</h4>
            <ul>
              <li>You'll receive a confirmation email shortly</li>
              <li>Get priority access when minting opens</li>
              <li>Exclusive updates on the convergent economy</li>
              <li>Early access to founder benefits</li>
            </ul>
          </div>
          
          <button class="secondary-btn" on:click={closeModal}>
            <i class="fas fa-arrow-left mr-2"></i>
            Back to Founder's Proof
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* Modal Base Styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
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

  /* Header Styles */
  .modal-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .icon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, #FF914D 0%, #0CC0DF 100%);
    border-radius: 50%;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: white;
  }

  .modal-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0CC0DF;
    margin-bottom: 0.75rem;
  }

  .modal-description {
    color: #cbd5e1;
    line-height: 1.6;
    font-size: 1rem;
  }

  /* Form Styles */
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .form-group {
    flex: 1;
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #f1f5f9;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    background-color: #334155;
    color: #f1f5f9;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #0CC0DF;
    box-shadow: 0 0 0 3px rgba(12, 192, 223, 0.1);
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
    accent-color: #0CC0DF;
  }

  .checkbox-item span {
    color: #cbd5e1;
    font-size: 0.875rem;
  }

  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #FF914D 0%, #0CC0DF 100%);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(255, 145, 77, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .privacy-note {
    text-align: center;
    color: #94a3b8;
    font-size: 0.75rem;
    margin-top: 1rem;
    font-style: italic;
  }

  /* Thank You Message Styles */
  .thank-you-message {
    text-align: center;
  }

  .success-icon {
    font-size: 4rem;
    color: #10b981;
    margin-bottom: 1rem;
  }

  .success-description {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .next-steps {
    background: rgba(12, 192, 223, 0.1);
    border: 1px solid rgba(12, 192, 223, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    text-align: left;
  }

  .next-steps h4 {
    color: #0CC0DF;
    margin-bottom: 1rem;
    font-size: 1rem;
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
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
  }

  .next-steps li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }

  .secondary-btn {
    background: rgba(12, 192, 223, 0.1);
    border: 1px solid rgba(12, 192, 223, 0.3);
    color: #0CC0DF;
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .secondary-btn:hover {
    background: rgba(12, 192, 223, 0.2);
    transform: translateY(-1px);
  }

  /* Loader Animation */
  .loader {
    width: 16px;
    height: 16px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Utility Classes */
  .mr-2 {
    margin-right: 0.5rem;
  }

  /* Responsive Design */
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

    .modal-title {
      font-size: 1.5rem;
    }

    .icon-container {
      width: 3rem;
      height: 3rem;
      font-size: 1.25rem;
    }
  }
</style>
