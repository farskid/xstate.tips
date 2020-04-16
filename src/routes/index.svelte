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
  import { stores } from "@sapper/app";
  import metadata from "../../data/metadata.json";
  import Tip from "../components/Tip.svelte";
  import Meta from "../components/Meta.svelte";
  export let latestTip;

  const { page } = stores();
</script>

<svelte:head>
  <Meta
    tip={latestTip}
    fullPageUrl={[metadata.site.baseUrl, $page.path].join('')} />
</svelte:head>

<Tip>
  <h1>{latestTip.title}</h1>
  {@html latestTip.html}
</Tip>
