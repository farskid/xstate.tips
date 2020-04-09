<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(latesttip => {
        return { latesttip };
      });
  }
</script>

<script>
  export let latesttip;
</script>

<svelte:head>
  <title>Real World XState tips</title>
</svelte:head>

<div class="content">
  {@html latesttip.html}
</div>
