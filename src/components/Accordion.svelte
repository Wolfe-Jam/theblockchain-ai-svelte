<!-- src/components/Accordion.svelte -->
<script>
  export let title;
  export let type = 'problem'; // 'problem' or 'solution'
  export let isOpen = false;
  
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="accordion-item" class:problem-accordion={type === 'problem'} class:solution-accordion={type === 'solution'} class:active={isOpen}>
  <div class="accordion-header" on:click={toggle}>
    <h2>{@html title}</h2>
    <i class="fas fa-chevron-down icon" class:rotated={isOpen}></i>
  </div>
  <div class="accordion-content">
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </div>
</div>

<style lang="postcss">
  .accordion-item {
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow: hidden;
    border: 1px solid transparent;
  }

  .accordion-header {
    padding: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    backdrop-filter: blur(5px);
  }

  .accordion-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out, padding 0.5s ease-out;
    padding: 0 1.5rem;
  }

  .accordion-content .content-wrapper {
    padding: 1.5rem 0;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #cbd5e1;
  }

  .accordion-content :global(ul li) {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
  }

  .accordion-item.active .accordion-content {
    max-height: 500px;
  }

  .icon {
    transition: transform 0.3s ease;
  }

  .icon.rotated {
    transform: rotate(180deg);
  }

  /* Problem Accordion Styling */
  .problem-accordion {
    border-color: rgba(30, 41, 59, 0.8);
  }

  .problem-accordion .accordion-header {
    background-color: rgba(30, 41, 59, 0.8);
  }

  .problem-accordion .accordion-content {
    background-color: #0f172a;
  }

  .problem-accordion .accordion-content :global(ul li::before) {
    content: '❌';
    position: absolute;
    left: 0;
    font-size: 1.25rem;
  }

  /* Solution Accordion Styling */
  .solution-accordion {
    border-color: rgba(0, 74, 174, 0.8);
  }

  .solution-accordion .accordion-header {
    background-color: rgba(0, 74, 174, 0.8);
  }

  .solution-accordion .accordion-content {
    background-color: #002d6b;
  }

  .solution-accordion .accordion-content :global(ul li::before) {
    content: '✅';
    position: absolute;
    left: 0;
    font-size: 1.25rem;
  }

  /* Highlight Spans */
  :global(.highlight-problem) {
    color: #0CC0DF;
    text-shadow: 0 0 8px rgba(12, 192, 223, 0.5);
  }

  :global(.highlight-trust) {
    color: #FF914D;
    text-shadow: 0 0 8px rgba(255, 145, 77, 0.5);
  }

  :global(.highlight-solution-cyan) {
    color: #0CC0DF;
    text-shadow: 0 0 8px rgba(12, 192, 223, 0.6);
  }

  :global(.highlight-solution-orange) {
    color: #FF914D;
    text-shadow: 0 0 8px rgba(255, 145, 77, 0.6);
  }

  :global(.term) {
    font-weight: 700;
    color: #f8fafc;
    background-color: rgba(12, 192, 223, 0.2);
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
    border: 1px solid rgba(12, 192, 223, 0.4);
  }
</style>