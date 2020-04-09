<script>
  import tips from "../routes/_tips.js";
  export let segment;
  let isPageActive;
  $: {
    isPageActive = (tip, index) => {
      console.log(
        segment,
        tip,
        index,
        (segment === undefined && index === 0) || segment === tip.slug
      );
      return (segment === undefined && index === 0) || segment === tip.slug;
    };
  }
</script>

<style>
  .site-container {
    display: flex;
    flex: 1;
    align-items: stretch;
    height: calc(100% - var(--site-header-height));
  }

  aside {
    flex-basis: var(--site-sidebar-width);
    flex-shrink: 0;
    border-right: 1px solid var(--border);
  }

  aside ul {
    margin: 0;
    padding: 2em 0;
    list-style: none;
  }

  aside a {
    width: 100%;
    display: block;
    padding: 1em 2em;
    text-decoration: none;
    transition: background-color 150ms ease-in-out;
  }

  aside a[aria-current] {
    background-color: var(--selected);
  }

  aside a:hover {
    background-color: var(--selected);
  }

  main {
    flex: 1;
    overflow-y: auto;
    height: 100%;
  }

  .main-content {
    height: 10000px; /* Test scroll */
    padding: 1em 2em;
  }
</style>

<div class="site-container">
  <aside>
    <ul>
      {#each tips as tip, index}
        <li>
          <a
            href={tip.slug}
            aria-current={isPageActive(tip, index) ? 'page' : undefined}>
            {tip.title}
          </a>
        </li>
      {/each}
    </ul>
  </aside>

  <main class="scroll-container">
    <div class="main-content">
      <!-- Required for sapper to inject page content -->
      <slot />
    </div>
  </main>
</div>
