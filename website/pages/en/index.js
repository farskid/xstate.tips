/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    return (
      <p>
        XState.tips aims to fill the gap between the world of Finite State
        machines and Statecharts and the real world of development. If you’re
        not familiar with State machines and statecharts, check out XState Docs
        and The world of Statecharts. Even though this website tries to provide
        the code tips in the syntax of XState, the modeling concepts and the
        shared tips are mostly implementation agnostic.
      </p>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    return <HomeSplash siteConfig={siteConfig} language={language} />;
  }
}

module.exports = Index;
