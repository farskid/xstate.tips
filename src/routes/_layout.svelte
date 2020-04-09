<script>
  import { stores } from "@sapper/app";
  import Header from "../components/Header.svelte";
  import Main from "../components/Main.svelte";

  // The active route
  export let segment;
</script>

<Header {segment} />
<Main {segment}>
  <!-- Sapper will inject page content as children (slot) -->
  <slot />
</Main>
