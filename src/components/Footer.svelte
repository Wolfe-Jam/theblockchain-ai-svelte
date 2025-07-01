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
      <p class="contact-text">Contact: <a href="mailto:invest@theblockchain.ai?subject=Ready to own a piece of %22theBlockchain.ai%22&body=I bet you are, talk to us.%0D%0A%0D%0A">invest@theblockchain.ai</a></p>
    </div>
    <div class="footer-right"></div>
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
  }
</style>