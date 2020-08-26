/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

class Footer extends React.Component {
  render() {
    console.log(this.props.config.authors.map((a) => a.link));
    return (
      <footer className="nav-footer" id="footer">
        <section className="copyright">
          Made with
          <span className="heart" title="Love">
            ❤
          </span>{" "}
          by{" "}
          {this.props.config.authors.map((author, index) => (
            <>
              <a
                key={index}
                href={author.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {author.name}
              </a>
              {index < this.props.config.authors.length - 2
                ? ", "
                : index === this.props.config.authors.length - 1
                ? " and "
                : ""}
            </>
          ))}
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
