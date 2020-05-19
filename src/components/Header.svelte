<script>
  import metadata from "../../data/metadata.json";
  import ExternalLink from "./ExternalLink.svelte";
  import ModeToggle from "./ModeToggle.svelte";
</script>

<style>
  header {
    background-color: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 0.5em 2em;
    height: var(--site-header-height);
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 1.5em;
    margin: 0;
    font-style: italic;
  }

  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  nav {
    margin-left: 1em;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  ul > li + li {
    margin-left: 1em;
  }

  @media only screen and (max-width: 767px) {
    header {
      padding: 0.5em;
      font-size: 0.8em;
    }

    h1 {
      font-size: 1.25em;
    }
  }
</style>

<header>
  <h1>
    <a href="/">{metadata.site.title}</a>
  </h1>

  <div class="right">
    <ModeToggle />
    <nav>
      <ul>
        <li>
          <ExternalLink
            hasIcon={true}
            href="https://github.com/farskid/xstate.tips">
            Github
          </ExternalLink>
        </li>
      </ul>
    </nav>
  </div>

</header>
