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
  import Tip from "../components/Tip.svelte";
  export let tip;
</script>

<style>
  h1 {
    margin-top: 0;
  }
</style>

<svelte:head>
  <title>{tip.title}</title>
  <meta name="description" content={tip.description} />
</svelte:head>

<Tip>
  <h1>{tip.title}</h1>
  {@html tip.html}
</Tip>
