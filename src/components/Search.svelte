<script>
  export let value;

  $: labelClassname = value.length > 0 ? "hidden" : undefined;
</script>

<style>
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
  <label class={labelClassname} for="search">Search</label>
  <input {value} on:input type="search" id="search" />
</form>
