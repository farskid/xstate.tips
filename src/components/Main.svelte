<script>
  import ExternalLink from "./ExternalLink.svelte";
  import tips from "../../data/_tips.json";
  import metadata from "../../data/metadata.json";
  import Search from "./Search.svelte";
  import Hamburger from "./Hamburger.svelte";
  import MainContent from "./MainContent.svelte";

  export let segment;

  let isHomeSetAsDefault = false;
  let filteredTips = tips;
  let sidebarShownOnMobile = false;
  let searchQuery = "";

  $: sidebarClassname = sidebarShownOnMobile ? "shown" : undefined;

  function filterTips(searchQuery) {
    if (!searchQuery) {
      filteredTips = tips;
    }
    filteredTips = tips.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function getAuthorUrl(author) {
    return author.twitter || author.github;
  }

  function toggleSidebar() {
    sidebarShownOnMobile = !sidebarShownOnMobile;
  }

  $: {
    if (!sidebarShownOnMobile) {
      // Reset search box and filteredTips when menu closes on mobile;
      searchQuery = "";
      filteredTips = tips;
    }
  }

  // Close menu when segment changes
  $: {
    if (segment) {
      sidebarShownOnMobile = false;
    }
  }
</script>

<style>
  :global(.is-dark) .site-container {
    border-top: 1px solid var(--border-secondary);
  }

  :global(.is-dark) .main-container {
    border-left: 1px solid var(--border-secondary);
  }

  :global(.is-dark) aside {
    border-top: 1px solid var(--border-secondary);
  }

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
    transition: transform 0.2s ease-out;
    -webkit-transition: transform 0.2s ease-out;
    background-color: var(--bg);
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

  .heart {
    color: var(--red);
  }

  .floating-button {
    position: fixed;
    bottom: 0.5em;
    right: 0.5em;
    z-index: 1;
    background-color: var(--bg);
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
      height: calc(100% - var(--site-header-height));
      transform: translate3d(0, 100%, 0);
      -webkit-transform: translate3d(0, 100%, 0);
    }

    aside.shown {
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
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
  <aside class={sidebarClassname} id="navigation">
    <Search
      value={searchQuery}
      on:input={e => {
        searchQuery = e.target.value;
        filterTips(e.target.value);
      }} />
    <ul>
      <li>
        <a href="/" aria-current={segment === undefined ? 'page' : undefined}>
          Introductions
        </a>
      </li>
      {#each filteredTips as tip, index}
        <li>
          <a
            href={tip.slug}
            aria-current={segment === tip.slug ? 'page' : undefined}>
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

  <main class="scroll-container main-container">
    <!-- Required for sapper to inject page content -->
    <MainContent>
      <slot />
    </MainContent>
    <button
      class="floating-button"
      on:click={toggleSidebar}
      aria-label="Menu"
      type="button"
      aria-controls="navigation">
      <Hamburger isActive={sidebarShownOnMobile} />
    </button>
  </main>
</div>
