<!-- Brand Color Test Component -->
<script>
  // Test component to verify all brand colors are working correctly
</script>

<div class="p-8 bg-slate-900 text-white">
  <h1 class="text-3xl font-bold mb-8 text-center">Brand Color Test</h1>
  
  <!-- Graphics Test -->
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4 text-brand-blue-text">Graphics Colors (Exact Brand Hex)</h2>
    <div class="flex gap-4 justify-center">
      <div class="w-24 h-24 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">
        BAI<br>#004AAE
      </div>
      <div class="w-24 h-24 bg-brand-cyan rounded-lg flex items-center justify-center text-white font-bold">
        CIA<br>#0CC0DF
      </div>
      <div class="w-24 h-24 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold">
        OUTPUT<br>#FF914D
      </div>
    </div>
  </section>

  <!-- Text Test -->
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4 text-brand-cyan-text">Text Colors (Readable Variants)</h2>
    <div class="text-center space-y-2">
      <p class="text-brand-blue-text text-lg font-medium">Blue Text (#2563EB) - Perfect for headings and links</p>
      <p class="text-brand-cyan-text text-lg font-medium">Cyan Text (#06B6D4) - Great for secondary content</p>
      <p class="text-brand-orange-text text-lg font-medium">Orange Text (#EA580C) - Excellent for emphasis</p>
    </div>
  </section>

  <!-- CSS Variables Test -->
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4 text-brand-orange-text">CSS Variables Test</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 rounded-lg" style="background: var(--brand-blue); color: white;">
        var(--brand-blue)
      </div>
      <div class="p-4 rounded-lg" style="color: var(--brand-blue-text);">
        var(--brand-blue-text)
      </div>
      <div class="p-4 rounded-lg" style="background: var(--brand-cyan); color: white;">
        var(--brand-cyan)
      </div>
      <div class="p-4 rounded-lg" style="color: var(--brand-cyan-text);">
        var(--brand-cyan-text)
      </div>
      <div class="p-4 rounded-lg" style="background: var(--brand-orange); color: white;">
        var(--brand-orange)
      </div>
      <div class="p-4 rounded-lg" style="color: var(--brand-orange-text);">
        var(--brand-orange-text)
      </div>
    </div>
  </section>

  <!-- Button Test -->
  <section class="text-center">
    <h2 class="text-xl font-semibold mb-4 text-brand-blue-text">Button Test</h2>
    <div class="space-x-4">
      <button class="btn-primary">Primary Button</button>
      <button class="btn-secondary">Secondary Button</button>
      <button class="btn-accent">Accent Button</button>
    </div>
  </section>
</div>

<style>
  /* Test specific styles */
  .test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>
