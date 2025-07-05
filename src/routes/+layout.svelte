<script>
  // Import global styles and components
  import '../app.css';
</script>

<!-- Main layout wrapper -->
<main>
  <slot />
</main>

<style>
  :global(html) {
    font-family: 'Inter', sans-serif;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #020617;
    color: #f8fafc;
  }
</style>
