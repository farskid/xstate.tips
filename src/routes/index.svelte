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
  import Tip from "../components/Tip.svelte";
  export let latestTip;
</script>

<svelte:head>
  <title>{metadata.site.title}</title>
  <meta name="description" content={metadata.site.description} />
</svelte:head>

<Tip>
  <h1>{latestTip.title}</h1>
  {@html latestTip.html}
</Tip>
