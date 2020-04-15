<script>
  export let isActive = false;

  function getHamburgerClassname(isActive) {
    return isActive ? "hamburger is-active" : "hamburger";
  }
</script>

<style>
  .hamburger {
    padding: 0 0;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
  }
  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: var(--text-primary);
  }

  .hamburger-box {
    width: 20px;
    height: 14px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -1px;
  }
  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 20px;
    height: 2px;
    background-color: var(--text-primary);
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: "";
    display: block;
  }
  .hamburger-inner::before {
    top: -6px;
  }
  .hamburger-inner::after {
    bottom: -6px;
  }

  /*
   * Spring
   */
  .hamburger .hamburger-inner {
    top: 1px;
    transition: background-color 0s 0.13s linear;
  }
  .hamburger .hamburger-inner::before {
    top: 6px;
    transition: top 0.1s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
      transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  .hamburger .hamburger-inner::after {
    top: 12px;
    transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
      transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  .hamburger.is-active .hamburger-inner {
    transition-delay: 0.22s;
    background-color: transparent !important;
  }
  .hamburger.is-active .hamburger-inner::before {
    top: 0;
    transition: top 0.1s 0.15s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
      transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 6px, 0) rotate(45deg);
  }
  .hamburger.is-active .hamburger-inner::after {
    top: 0;
    transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
      transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 6px, 0) rotate(-45deg);
  }
</style>

<span class={getHamburgerClassname(isActive)}>
  <span class="hamburger-box">
    <span class="hamburger-inner" />
  </span>
</span>
