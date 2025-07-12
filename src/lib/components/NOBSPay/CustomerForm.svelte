<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { validateEmail } from './config';
  
  let email = '';
  let emailError = '';
  
  const dispatch = createEventDispatcher();
  
  const handleSubmit = () => {
    if (!email) {
      emailError = 'Email is required';
      return;
    }
    
    if (!validateEmail(email)) {
      emailError = 'Please enter a valid email';
      return;
    }
    
    dispatch('submit', { email });
  };
  
  const handleBack = () => {
    dispatch('back');
  };
</script>

<div class="customer-form">
  <h3 class="form-title">Enter Your Email</h3>
  <p class="form-description">We'll send your receipt and download link here</p>
  
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <input
        type="email"
        bind:value={email}
        placeholder="you@example.com"
        class="email-input"
        class:error={emailError}
        on:input={() => emailError = ''}
      />
      {#if emailError}
        <span class="error-text">{emailError}</span>
      {/if}
    </div>
    
    <div class="form-actions">
      <button type="button" class="back-button" on:click={handleBack}>
        ← Back
      </button>
      <button type="submit" class="continue-button">
        Continue →
      </button>
    </div>
  </form>
</div>

<style>
  .customer-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0;
    color: var(--bai-text-primary, #111827);
  }
  
  .form-description {
    font-size: 0.875rem;
    color: var(--bai-text-secondary, #6b7280);
    margin: 0;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .email-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid var(--bai-border, #e5e7eb);
    border-radius: 0.5rem;
    background: var(--bai-bg-light, #ffffff);
    color: var(--bai-text-primary, #111827);
    transition: border-color 0.2s;
  }
  
  .email-input:focus {
    outline: none;
    border-color: var(--brand-cyan-text);
  }
  
  .email-input.error {
    border-color: #dc2626;
  }
  
  .error-text {
    font-size: 0.875rem;
    color: #dc2626;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .back-button,
  .continue-button {
    flex: 1;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .back-button {
    background: transparent;
    border: 2px solid var(--bai-border, #e5e7eb);
    color: var(--bai-text-secondary, #6b7280);
  }
  
  .back-button:hover {
    background: var(--bai-bg-hover, #f3f4f6);
    color: var(--bai-text-primary, #111827);
  }
  
  .continue-button {
    background: var(--brand-cyan-text);
    border: 2px solid var(--brand-cyan-text);
    color: white;
  }
  
  .continue-button:hover {
    background: var(--brand-blue-text);
    border-color: var(--brand-blue-text);
    transform: translateY(-1px);
  }
</style>