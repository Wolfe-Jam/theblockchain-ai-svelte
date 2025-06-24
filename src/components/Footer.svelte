<!-- src/components/Footer.svelte -->
<footer>
  <div class="footer-content">
    <p class="main-text">&copy; 2025 theBlockchain.ai - Building the Future of Trusted AI</p>
    <p class="contact-text">Contact: <a href="mailto:invest@theblockchain.ai?subject=Ready to own a piece of %22theBlockchain.ai%22&body=I bet you are, talk to us.%0D%0A%0D%0A">invest@theblockchain.ai</a></p>
  </div>
</footer>

<style>
  footer {
    background-color: #000000;
    text-align: center;
    padding: 2rem;
    border-top: 1px solid #1e293b;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    margin-top: auto;
    opacity: 0.8;
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
</style>