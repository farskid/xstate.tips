<script>
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

  input {
    display: block;
    height: 40px;
    width: 200px;
    font-size: 1rem;
    padding: 0.25em 0.75em;
    border: 1px solid var(--border);
    background-color: transparent;
  }

  input:focus {
    outline-color: var(--selected);
    outline-offset: -2;
    outline-style: solid;
  }
</style>

<header>
  <h1>
    <a href="/">XState.tips</a>
  </h1>

  <div class="right">
    <input placeholder="Search" type="search" />
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
