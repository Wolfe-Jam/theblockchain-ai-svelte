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
        <div class="register-form">
          <h3 class="modal-title">Join the Founder's Program</h3>
          <p class="modal-description">🎉 Congrats, you've got Early Access.<br>Claim your Founder's Stake now & help shape<br>the future of open-source with Trusted AI.</p>
          
          <form on:submit={handleSubmit} name="founder-registration" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="founder-registration">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required>
            </div>
            
            <div class="form-group">
              <label class="checkbox-group-label">I am a... (Tick all that apply)</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" name="role" value="developer">
                  <span>Developer</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="role" value="business">
                  <span>Business / Enterprise</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="role" value="data-research">
                  <span>Data Owner / Researcher</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" name="role" value="other">
                  <span>Other</span>
                </label>
              </div>
            </div>
            
            <button type="submit" class="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get In Early'}
            </button>
          </form>
        </div>
      {:else}
        <div class="thank-you-message">
          <h3 class="modal-title">Thank You!</h3>
          <p class="modal-description">You're on the list. We'll be in touch soon with next steps.</p>
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
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 28rem;
    padding: 2rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background-color: #1e293b;
    border: 1px solid #0CC0DF;
    color: white;
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
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .modal-description {
    margin-bottom: 1.5rem;
    color: #cbd5e1;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: #d1d5db;
  }

  .checkbox-group-label {
    margin-bottom: 0.75rem;
  }

  input[type="email"] {
    width: 100%;
    padding: 0.75rem;
    background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 0.375rem;
    color: white;
    font-size: 1rem;
  }

  input[type="email"]:focus {
    outline: none;
    border-color: #0CC0DF;
    box-shadow: 0 0 0 3px rgba(12, 192, 223, 0.1);
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: normal;
    margin-bottom: 0;
  }

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    accent-color: #0CC0DF;
  }

  .submit-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: rgba(255, 145, 77, 0.5); /* 50% transparency */
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .submit-btn:hover {
    background-color: rgba(255, 145, 77, 0.7); /* Slightly more opaque on hover */
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn:disabled:hover {
    background-color: rgba(255, 145, 77, 0.5);
    transform: none;
  }

  .thank-you-message {
    text-align: center;
  }
</style>