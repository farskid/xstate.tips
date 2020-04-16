<script>
  export let tip;
  export let fullPageUrl;
</script>

<title>{tip.title}</title>
<meta name="description" content={tip.description} />
<meta property="og:title" content={tip.title} />
<meta property="og:description" content={tip.description} />
<meta property="og:url" content={fullPageUrl} />
<meta property="article:author" content={tip.author} />
{#each tip.tags as tag}
  <meta property="article:tag" content={tag} />
{/each}
