<script>
  export let onChange;
  let value = "";

  function getLabelClassname(value) {
    return value.length > 0 ? "hidden" : undefined;
  }
</script>

<style>
  form {
    position: relative;
    margin: 1em auto;
    padding: 0 0.5em;
  }

  label {
    position: absolute;
    top: 50%;
    left: 1.25em;
    transform: translateY(-50%);
  }

  input {
    display: block;
    height: 40px;
    width: 100%;
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

<form on:submit|preventDefault>
  <label class={getLabelClassname(value)} for="search">Search</label>
  <input
    bind:value
    on:input={e => onChange(e.target.value)}
    type="search"
    id="search" />
</form>
