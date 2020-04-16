<script>
  export let tip;
  export let fullPageUrl;
</script>

<title>{tip.title}</title>
<meta name="description" content={tip.description} />
<meta property="og:title" content={tip.title} />
<meta property="og:description" content={tip.description} />
<meta property="og:url" content={fullPageUrl} />
{#if tip.author}
  <meta property="article:author" content={tip.author} />
{/if}
{#if tip.tags}
  {#each tip.tags as tag}
    <meta property="article:tag" content={tag} />
  {/each}
{/if}
