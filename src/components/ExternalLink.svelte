<script>
  import ExternalIcon from "./ExternalIcon.svelte";
  export let href;
  export let hasIcon = false;
</script>

<a rel="noopener noreferrer" target="_blank" {href}>
  <slot />
  {#if hasIcon}
    <ExternalIcon />
  {/if}
</a>
