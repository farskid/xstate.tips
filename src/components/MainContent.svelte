<style>
  .main-content {
    height: 10000px; /* Test scroll */
    padding: 1em 2em;
  }

  .main-content :global(code) {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 0.25em;
  }

  .main-content :global(img) {
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
