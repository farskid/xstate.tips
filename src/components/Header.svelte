<script>
  import metadata from "../../data/metadata.json";
  import ExternalIcon from "./ExternalIcon.svelte";
</script>

<style>
  header {
    background-color: var(--white);
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

  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  ul > li + li {
    margin-left: 1em;
  }
</style>

<header>
  <h1>
    <a href="/">{metadata.site.title}</a>
  </h1>

  <div class="right">
    <nav>
      <ul>
        <li>
          <a
            rel="noopener noreferrer"
            href="https://github.com/farskid/xstate.tips"
            target="_blank">
            Github
            <ExternalIcon />
          </a>
        </li>
      </ul>
    </nav>
  </div>

</header>
