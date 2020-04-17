<script>
  import { onMount } from "svelte";
  let mode = "light";

  const goDark = () => {
    mode = "dark";
    document.body.classList.add("is-dark");
  };

  const goLight = () => {
    mode = "light";
    document.body.classList.remove("is-dark");
  };

  const toggleMode = () => {
    if (mode === "light") {
      goDark();
    } else {
      goLight();
    }
  };

  onMount(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    //   Enable dark mode if user's OS is in dark mode
    const isDarkModeOnByDefault = darkModeQuery.matches;
    if (isDarkModeOnByDefault) {
      goDark();
    }

    function onDarkModeChange(e) {
      console.log(e);
      if (e.matches) {
        goDark();
      } else {
        goLight();
      }
    }

    // Reflect to dark mode changes on OS level
    darkModeQuery.addEventListener("change", onDarkModeChange);

    return () => {
      darkModeQuery.removeEventListener("change", onDarkModeChange);
    };
  });
</script>

<style>
  div {
    border-radius: 1em;
    border: 1px solid var(--border);
  }
  button {
    background-color: var(--bg);
    border: 1px solid var(--border-secondary);
    cursor: pointer;
    border-radius: inherit;
    position: relative;
    display: flex;
    align-items: center;
  }
  button:focus {
    outline-offset: 0;
    outline-width: 0;
  }

  .handle {
    border-radius: 50%;
    background-color: var(--switch);
    width: 50%;
    padding-top: 50%;
    display: block;
    position: absolute;
    left: 0;
    transform: translate3d(0, 0, 0);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.is-dark) .handle {
    transform: translate3d(100%, 0, 0);
  }
</style>

<!-- Allow for manual change in case color scheme media query is not supported or user needs an override -->
<div>
  <button on:click={toggleMode} aria-label="Toggle dark and light mode">
    <span class="handle" />
    <span title="dark">🌜</span>
    <span title="light">🌝</span>
  </button>
</div>
