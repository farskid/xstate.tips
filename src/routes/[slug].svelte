<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`./${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { tip: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import metadata from "../../data/metadata.json";
  import Tip from "../components/Tip.svelte";
  import Meta from "../components/Meta.svelte";
  export let tip;

  const { page } = stores();
</script>

<svelte:head>
  <Meta {tip} fullPageUrl={[metadata.site.baseUrl, $page.path].join('')} />
</svelte:head>

<Tip>
  <h1>{tip.title}</h1>
  {@html tip.html}
</Tip>
