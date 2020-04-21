<script>
  import { onMount } from "svelte";
  let mode = "light";

  const getPrefersColorSchemeQuery = () =>
    window.matchMedia("(prefers-color-scheme)");
  const getDarkModeQuery = () =>
    window.matchMedia("(prefers-color-scheme: dark)");
  const isDarkModeSupportedInOSLevel = () =>
    getPrefersColorSchemeQuery().media !== "not all";
  const isDarkModeActiveOnOSLevel = () =>
    isDarkModeSupportedInOSLevel() && getDarkModeQuery().matches;

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
    //   Enable dark mode if user's OS is in dark mode
    if (isDarkModeActiveOnOSLevel()) {
      goDark();
    }

    function onDarkModeChange(e) {
      if (e.matches) {
        goDark();
      } else {
        goLight();
      }
    }

    // Reflect to dark mode changes on OS level
    getDarkModeQuery().addListener(onDarkModeChange);

    return () => {
      getDarkModeQuery().removeListener(onDarkModeChange);
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
    justify-content: space-around;
    width: 4em;
    padding: 0.25em;
    color: inherit;
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
    z-index: 1;
  }

  span:not(.handle) {
    font-size: 1.2em;
    color: inherit;
  }

  :global(.is-dark) .handle {
    transform: translate3d(100%, 0, 0);
  }
</style>

<!-- Allow for manual change in case color scheme media query is not supported or user needs an override -->
<div>
  <button on:click={toggleMode} aria-label="Toggle dark and light mode">
    <span class="handle" />
    <span title="dark">&#9790;</span>
    <span title="light">&#9728;</span>
  </button>
</div>
