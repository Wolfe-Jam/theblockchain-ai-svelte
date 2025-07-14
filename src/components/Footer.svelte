<!-- src/components/Footer.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import { version } from '../lib/version.js';
  
  const dispatch = createEventDispatcher();
  
  function openAbout() {
    dispatch('openAbout');
  }
</script>

<footer>
  <div class="footer-content">
    <div class="footer-left">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span class="about-link" on:click={openAbout}>About: Version {version}</span>
    </div>
    <div class="footer-center">
      <p class="main-text">&copy; 2025 theBlockchain.ai - Building the Future of Trusted AI</p>
      <p class="contact-text">Contact: <a href="mailto:invest@theblockchain.ai?subject=theBlockchain.ai%20Business%20Inquiry">invest@theblockchain.ai</a> | <a href="mailto:support@theblockchain.ai?subject=theBlockchain.ai%20Support">support@theblockchain.ai</a></p>
    </div>
    <div class="footer-right">
      <div class="legal-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <span class="separator">•</span>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </div>
  </div>
  
  <!-- Business Information Row -->
  <div class="business-info">
    <p class="business-text">
      Wolfe James LLC • 722 Ridgecrest Road, Lagrange, GA 30240 • Georgia LLC #23200618
    </p>
  </div>
</footer>

<style>
  footer {
    background-color: #000000;
    padding: 2rem;
    border-top: 1px solid #1e293b;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    margin-top: auto;
    opacity: 0.8;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-left {
    justify-self: start;
  }

  .footer-center {
    text-align: center;
  }

  .footer-right {
    justify-self: end;
  }

  .legal-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  .legal-links a {
    color: #94A3B8;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .legal-links a:hover {
    color: var(--brand-cyan);
    text-decoration: underline;
  }

  .separator {
    color: #64748b;
    font-size: 0.7rem;
  }

  .business-info {
    text-align: center;
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid #1e293b;
  }

  .business-text {
    color: #64748b;
    font-size: 0.6rem;
    margin: 0;
    font-family: 'Roboto Mono', monospace;
  }

  .about-link {
    color: #94A3B8;
    cursor: pointer;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.8rem;
    transition: color 0.3s ease;
    user-select: none;
  }

  .about-link:hover {
    color: var(--brand-cyan);
  }

  .main-text {
    color: #ffffff;
    margin: 0.25rem 0;
  }

  .contact-text {
    color: #ffffff;
    margin: 0.25rem 0;
  }

  .footer-content a {
    color: var(--brand-cyan);
    text-decoration: underline;
  }

  .footer-content a:hover {
    color: #ffffff;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 1rem;
    }
    
    .footer-left,
    .footer-center,
    .footer-right {
      justify-self: center;
    }

    .legal-links {
      justify-content: center;
      flex-wrap: wrap;
    }

    .business-info {
      padding-top: 0.5rem;
      margin-top: 0.5rem;
    }

    .business-text {
      font-size: 0.55rem;
      line-height: 1.4;
    }
  }
</style>