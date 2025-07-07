<!-- SerenityBoat.svelte - Global navigation component -->
<script>
  function navigateToDeepDive() {
    window.location.href = '/deep-dive/the-convergent-economy';
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="serenity-boat" on:click={navigateToDeepDive}>
  <i class="fas fa-ship"></i>
</div>

<style>
  /* Serenity Boat - Global Navigation */
  .serenity-boat {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s ease;
    z-index: 1000;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .serenity-boat:hover {
    opacity: 0.8;
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.7);
  }

  .serenity-boat i {
    color: white;
    font-size: 1.2rem;
  }
</style>
