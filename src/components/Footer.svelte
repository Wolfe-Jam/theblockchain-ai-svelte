<!-- src/components/Footer.svelte -->
<footer>
  <div class="footer-content">
    <p>&copy; 2025 theBlockchain.ai</p>
    <p>Building the Future of Trusted AI</p>
    <p>Version 1.0.0</p>
    <p>Contact: <a href="mailto:info@theblockchain.ai">info@theblockchain.ai</a></p>
  </div>
</footer>

<style>
  footer {
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    padding: 2rem;
    border-top: 1px solid #1e293b;
    font-family: 'Roboto Mono', monospace;
    font-weight: 400;
    font-size: 0.9rem;
    margin-top: auto;
  }

  .footer-content p {
    margin: 0.25rem 0;
  }

  .footer-content a {
    color: #ffffff;
    text-decoration: underline;
  }

  .footer-content a:hover {
    color: #0CC0DF;
    transition: color 0.3s ease;
  }
</style>