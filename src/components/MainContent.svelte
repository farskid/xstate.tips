<style>
  .main-content {
    padding: 1em 2em;
  }

  .main-content :global(code) {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: var(--code-bg);
    border-radius: 0.25em;
    border: 1px solid var(--border-secondary);
  }

  .main-content :global(img),
  .main-content :global(svg) {
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    .main-content {
      padding: 0.5em;
    }
  }
</style>

<div class="main-content">
  <slot />
</div>
