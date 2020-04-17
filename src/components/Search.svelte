<script>
  export let value;

  $: labelClassname = value.length > 0 ? "hidden" : undefined;
</script>

<style>
  form {
    position: relative;
  }

  label {
    border: 1px solid var(--border);
    display: block;
  }

  span {
    position: absolute;
    top: 50%;
    left: 0.75em;
    transform: translateY(-50%);
  }

  input {
    color: inherit;
    display: block;
    height: 40px;
    width: 100%;
    font-size: 1rem;
    padding: 0.25em 0.75em;
    border: 1px solid var(--border-secondary);
    background-color: var(--bg);
    box-shadow: none;
    border-radius: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input:focus {
    outline-color: var(--selected);
    outline-offset: 0;
    outline-style: solid;
    border-color: transparent;
  }

  .hidden {
    opacity: 0;
  }
</style>

<form on:submit|preventDefault>
  <label for="search">
    <span class={labelClassname}>Search</span>
    <input {value} on:input type="search" id="search" />
  </label>
</form>
