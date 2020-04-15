<script>
  import ExternalLink from "./ExternalLink.svelte";
  import tips from "../../data/_tips.json";
  import metadata from "../../data/metadata.json";
  import Search from "./Search.svelte";
  import Hamburger from "./Hamburger.svelte";
  export let segment;
  let filteredTips = tips;
  let sidebarShownOnMobile = false;

  function isPageActive(segment, tip, index) {
    return (segment === undefined && index === 0) || segment === tip.slug;
  }

  function filterTips(searchQuery) {
    if (!searchQuery) {
      filteredTips = tips;
    }
    filteredTips = tips.filter(t => t.title.includes(searchQuery));
  }

  function getAuthorUrl(author) {
    return author.twitter || author.github;
  }

  function getSidebarClassname(sidebarShownOnMobile) {
    return sidebarShownOnMobile ? "shown" : undefined;
  }

  function getFloatingButtonText(sidebarShownOnMobile) {
    return sidebarShownOnMobile ? "Close" : "All Tips";
  }

  function toggleSidebar() {
    sidebarShownOnMobile = !sidebarShownOnMobile;
  }

  function closeSidebar() {
    sidebarShownOnMobile = false;
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 1em 2em;
    transition: 0.2s ease-out;
    background-color: var(--white);
  }

  aside :global(form),
  aside footer {
    flex-shrink: 0;
  }

  aside ul {
    margin: 2em -2em;
    padding: 0;
    list-style: none;
    flex: 1;
  }

  aside li + li {
    margin-top: 1em;
  }

  aside ul a {
    width: 100%;
    display: block;
    padding: 0.5em 2em;
    text-decoration: none;
    transition: background-color 150ms ease-in-out;
  }

  aside ul a[aria-current] {
    background-color: var(--selected);
  }

  aside ul a:not([aria-current]):hover {
    background-color: var(--hover);
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

  .heart {
    color: var(--red);
  }

  .floating-button {
    position: fixed;
    bottom: 0.5em;
    right: 0.5em;
    z-index: 1;
    background-color: var(--white);
    color: var(--text-primary);
    font-size: 1rem;
    border: 1px solid var(--border);
    display: none;
    padding: 0.5em;
    text-align: center;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  /* Responsiveness */
  @media screen and (max-width: 768px) {
    aside {
      z-index: 1;
      position: fixed;
      top: var(--site-header-height);
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateY(100%);
    }

    aside.shown {
      transform: translateY(0);
    }

    .floating-button {
      display: block;
    }

    aside,
    .main-content {
      padding: 0.5em;
    }
  }
</style>

<div class="site-container">
  <aside class={getSidebarClassname(sidebarShownOnMobile)} id="navigation">
    <Search onChange={filterTips} />
    <ul>
      {#each filteredTips as tip, index}
        <li>
          <a
            on:click={closeSidebar}
            href={tip.slug}
            aria-current={isPageActive(segment, tip, index) ? 'page' : undefined}>
            {tip.title}
          </a>
        </li>
      {/each}
    </ul>
    <footer>
      <small>
        Made with
        <span class="heart" title="Love">&#10084;</span>
        <br />
        By
        {#each metadata.authors as author, index}
          <ExternalLink href={getAuthorUrl(author)}>{author.name}</ExternalLink>
          {index !== metadata.authors.length - 1 ? ' and ' : ''}
        {/each}
      </small>
    </footer>
  </aside>

  <main class="scroll-container">
    <div class="main-content">
      <!-- Required for sapper to inject page content -->
      <slot />
      <button
        class="floating-button"
        on:click={toggleSidebar}
        aria-label="Menu"
        type="button"
        aria-controls="navigation">
        <Hamburger isActive={sidebarShownOnMobile} />
      </button>
    </div>
  </main>
</div>
