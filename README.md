<div align="center">
  <img src="/static/xstate.tips.png" alt="XState.tips" />
</div>

<div align="center">
  <span>
    <img src="https://api.netlify.com/api/v1/badges/db07f96a-ec3a-4306-8eba-3064e42e4b02/deploy-status" alt="Netlify Status" />  
  </span>
  
  <span>
    <img src="https://lighthouse-badge.appspot.com/?score=100" alt="Lighthouse score: 100/100" />
  </span>
</div>

<br />

XState.tips aims to fill the gap between the world of Finite State machines and Statecharts and the real world of development.

If you're not familiar with State machines and statecharts, check out [XState Docs](https://xstate.js.org) and [The world of Statecharts](https://statecharts.github.io).

Even though this website tries to provide the code tips in the syntax of XState, the modeling concepts and the shared tips are mostly implementation agnostic.

## How to add a tip

- Tips live under `/data/tips` directory in markdown format. Either clone the repo and add a new markdown file or try adding it on Github.

- Run `yarn prepare` to collect and compile the tips into `data/_tips.json` which will be consumed by the website.

  > Note: This will also regenerate a new `static/feed.xml` to update RSS feed based on the new compiled tips.

- Send a PR!

## Generate RSS Feed

The RSS file lives under `static` directory. This file is autogenerated based on `data/_tips.json`.

To generate a new RSS feed, run `yarn prepare`.

## Authors

Farzad YZ [Twitter](https://twitter.com/@farzad_yz) [farzadyz.com](https://farzadyz.com)

Taylor Thompson [Github](https://github.com/jamestthompson3) [teukka.tech](https://teukka.tech/)

## License

MIT.
