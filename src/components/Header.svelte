<script>
  import metadata from "../../data/metadata.json";
  import ExternalIcon from "./ExternalIcon.svelte";
  let value = "";
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

  form {
    position: relative;
  }

  label {
    position: absolute;
    top: 50%;
    left: 0.75em;
    transform: translateY(-50%);
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

  label.hidden {
    opacity: 0;
  }
</style>

<header>
  <h1>
    <a href="/">{metadata.site.title}</a>
  </h1>

  <div class="right">
    <form>
      <label class={value.length > 0 && 'hidden'} for="search">Search</label>
      <input bind:value type="search" id="search" />
    </form>
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
