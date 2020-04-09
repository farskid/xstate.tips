<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(latestTip => {
        return { latestTip };
      });
  }
</script>

<script>
  import metadata from "../../data/metadata.json";
  export let latestTip;
</script>

<svelte:head>
  <title>{metadata.site.title}</title>
  <meta name="description" content={metadata.site.description} />
</svelte:head>

<h1>{latestTip.title}</h1>
<div class="content">
  {@html latestTip.html}
</div>
