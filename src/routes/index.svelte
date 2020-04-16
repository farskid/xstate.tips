<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(readme => {
        return { readme };
      });
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import metadata from "../../data/metadata.json";
  import Tip from "../components/Tip.svelte";
  import Meta from "../components/Meta.svelte";
  export let readme;

  const { page } = stores();
</script>

<svelte:head>
  <Meta
    tip={metadata.site}
    fullPageUrl={[metadata.site.baseUrl, $page.path].join('')} />
</svelte:head>

{@html readme.html}
