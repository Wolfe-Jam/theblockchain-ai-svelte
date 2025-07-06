<!-- src/components/ReportDownload.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  
  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    jobTitle: '',
    industry: '',
    useCase: ''
  };
  
  let isSubmitting = false;
  let showSuccess = false;
  
  const industries = [
    'Technology',
    'Financial Services',
    'Investment/VC',
    'Consulting',
    'Healthcare',
    'Manufacturing',
    'Government',
    'Education',
    'Other'
  ];
  
  const useCases = [
    'Investment Research',
    'Strategic Planning',
    'Market Analysis',
    'Partnership Opportunities',
    'Academic Research',
    'Other'
  ];
  
  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  function handleBackdropKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
  
  async function handleSubmit() {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.organization) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the lead capture (in production, send to your CRM/database)
      // TODO: Send formData to CRM/database
      
      // Show success and trigger download
      showSuccess = true;
      
      // Trigger PDF download
      setTimeout(() => {
        triggerDownload();
        setTimeout(() => {
          closeModal();
          resetForm();
        }, 2000);
      }, 1000);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }
  
  function triggerDownload() {
    // Create download link for the PDF
    const link = document.createElement('a');
    link.href = '/convergent-economy-report.pdf'; // You'll need to place the PDF in the public folder
    link.download = 'The-Convergent-Economy-Report-theBlockchain-ai.pdf';
    link.click();
  }
  
  function resetForm() {
    formData = {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      jobTitle: '',
      industry: '',
      useCase: ''
    };
    showSuccess = false;
  }
</script>

{#if isOpen}
  <div 
    class="modal-backdrop" 
    role="dialog" 
    aria-modal="true" 
    aria-labelledby="report-title"
    on:click={handleBackdropClick}
    on:keydown={handleBackdropKeydown}
    tabindex="-1"
  >
    <div class="modal-content">
      {#if !showSuccess}
        <div class="modal-header">
          <button class="close-btn" on:click={closeModal} aria-label="Close modal">&times;</button>
          <div class="report-preview">
            <h2 id="report-title">The Convergent Economy</h2>
            <p class="report-subtitle">Professional Market Analysis Report</p>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="value-proposition">
            <h3>Download Professional Report</h3>
            <p class="value-exchange">You're receiving our comprehensive $5+ Trillion Market Analysis Report at no cost to you. So, we'd like to know who shares our excitement about the convergent economy.</p>
            <p class="genuine-request">Please provide complete, genuine details below.</p>
          </div>
          
          <form on:submit|preventDefault={handleSubmit} class="download-form">
            <!-- Row 1: Names -->
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  bind:value={formData.firstName}
                  required
                  placeholder="John"
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  bind:value={formData.lastName}
                  required
                  placeholder="Smith"
                />
              </div>
            </div>
            
            <!-- Row 2: Email -->
            <div class="form-group">
              <label for="email">Professional Email *</label>
              <input 
                type="email" 
                id="email" 
                bind:value={formData.email}
                required
                placeholder="john.smith@company.com"
              />
            </div>
            
            <!-- Row 3: Organization & Position -->
            <div class="form-row">
              <div class="form-group">
                <label for="organization">Organization *</label>
                <input 
                  type="text" 
                  id="organization" 
                  bind:value={formData.organization}
                  required
                  placeholder="Company Name"
                />
              </div>
              <div class="form-group">
                <label for="jobTitle">Position *</label>
                <select id="jobTitle" bind:value={formData.jobTitle} required>
                  <option value="">Select Position</option>
                  <option value="ceo">CEO</option>
                  <option value="cto">CTO</option>
                  <option value="cfo">CFO</option>
                  <option value="president">President</option>
                  <option value="vp">Vice President</option>
                  <option value="director">Director</option>
                  <option value="manager">Manager</option>
                  <option value="senior-engineer">Senior Engineer</option>
                  <option value="engineer">Engineer</option>
                  <option value="architect">Architect</option>
                  <option value="analyst">Analyst</option>
                  <option value="consultant">Consultant</option>
                  <option value="researcher">Researcher</option>
                  <option value="founder">Founder</option>
                  <option value="investor">Investor</option>
                  <option value="advisor">Advisor</option>
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <!-- Row 4: Industry & Interest - REQUIRED -->
            <div class="form-row">
              <div class="form-group">
                <label for="industry">Industry *</label>
                <select id="industry" bind:value={formData.industry} required>
                  <option value="">Select Industry</option>
                  {#each industries as industry}
                    <option value={industry}>{industry}</option>
                  {/each}
                </select>
              </div>
              <div class="form-group">
                <label for="useCase">Primary Interest *</label>
                <select id="useCase" bind:value={formData.useCase} required>
                  <option value="">Select Interest</option>
                  {#each useCases as useCase}
                    <option value={useCase}>{useCase}</option>
                  {/each}
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="download-btn"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="spinner"></span>
                Processing...
              {:else}
                Download Report
              {/if}
            </button>
          </form>
        </div>
      {:else}
        <div class="success-content">
          <div class="success-icon">✅</div>
          <h3>Download Starting...</h3>
          <p>Thank you for your interest in our research!</p>
          <p class="success-note">The Convergent Economy report is downloading now.</p>
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
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }
  
  .modal-content {
    background: white;
    border-radius: 1rem;
    max-width: 550px;
    width: 100%;
    max-height: 85vh;
    overflow: hidden;
    position: relative;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }
  
  .modal-header {
    background: linear-gradient(135deg, #007BFF 0%, #17A2B8 100%);
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 1rem 1rem 0 0;
    text-align: center;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  
  .close-btn:hover {
    opacity: 1;
  }
  
  .report-preview {
    text-align: center;
  }
  
  .report-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .report-preview h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .report-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .value-proposition {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .value-proposition h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }
  
  .value-exchange {
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    border-left: 3px solid #007BFF;
  }
  
  .genuine-request {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    text-align: center;
    margin-bottom: 1rem;
    font-style: italic;
  }
  
  .report-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .highlight-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    border-left: 4px solid #007BFF;
  }
  
  .highlight-icon {
    font-size: 1.25rem;
  }
  
  .download-form {
    max-width: 100%;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.625rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  .download-btn {
    width: 100%;
    background: linear-gradient(135deg, #FD7E14 0%, #e55a00 100%);
    color: white;
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .download-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(253, 126, 20, 0.3);
  }
  
  .download-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .privacy-note {
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
    line-height: 1.4;
    margin: 0;
  }
  
  .success-content {
    padding: 3rem 2rem;
    text-align: center;
  }
  
  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .success-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #059669;
    margin-bottom: 1rem;
  }
  
  .success-content p {
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .success-note {
    font-weight: 600;
    color: #374151;
  }
  
  @media (max-width: 768px) {
    .modal-content {
      margin: 1rem;
      max-height: calc(100vh - 2rem);
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .report-highlights {
      grid-template-columns: 1fr;
    }
    
    .modal-header {
      padding: 1.5rem;
    }
    
    .modal-body {
      padding: 1.5rem;
    }
  }
</style>
