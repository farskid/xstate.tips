import * as React from "react";
import styled, {
  createGlobalStyle,
} from "styled-components";
import NextLink from "next/link";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LayoutContainer = styled.div``;

const LayoutSidebar = styled.aside`
  border-right: 1px solid
    rgb(36, 36, 36);
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding-top: 2em;
`;

const LayoutMain = styled.main`
  display: flex;
  flex-direction: row;
`;
const LayoutContent = styled.div`
  position: relative;
  max-width: 48em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5em;
  font-size: 1.25em;

  h1 {
    font-size: 2.5em;
    font-weight: 700;
    line-height: normal;
    color: inherit;
  }

  h2 {
    font-size: 1.5em;
    margin: 1em 0;
  }

  p,
  ul {
    color: rgb(200, 200, 200);
  }

  a {
    color: #40a9f3;
  }

  iframe {
    display: block;
    margin: 1em auto;
  }

  img {
    max-width: 100%;
    width: 100%;
    background: rgb(36, 36, 36);
    border: 1px solid rgb(36, 36, 36);
  }

  pre {
    background: rgb(21, 21, 21);
    border: 1px solid rgb(36, 36, 36);
    padding: 1em;
    border-radius: 0.25rem;
    margin: 2rem 0px 4rem;
    line-height: 1.5;
    font-feature-settings: normal;
    font-size: 1em;
  }

  code {
    background: rgb(21, 21, 21);
    padding: 0.25em 0.5em;
    font-size: 85%;
    margin: 0;
    border-radius: 0.25em;
    line-height: 1.45em;
    font-family: source-code-pro, Menlo,
      Monaco, Consolas, "Courier New",
      monospace;
  }

  pre code {
    background-color: transparent;
  }
`;

const LayoutHeader = styled.div`
  box-shadow: rgb(36, 36, 36) 0px 1px
    0px;
  height: 3em;
  width: 100%;
  background: rgb(4, 4, 4);
`;

const SearchInput = styled.input`
  background: rgb(36, 36, 36);
  height: 2em;
  line-height: 1.5em;
  margin-right: 1.5em;
  padding: 0.5em 0.5em 0.5em 1.5em;
  width: 320px;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(52, 52, 52);
  border-radius: 2px;
`;
const LinksList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  align-items: baseline;
`;
const MenuLink = styled.li``;
const List = styled.ul`
  list-style: none;
  padding: 1em 0;
  margin: 0;
  position: sticky;
  top: 2em;
`;
const ListItem = styled.li`
  a {
    padding: 0 1em;
    display: block;
    font-weight: 500;
    text-transform: capitalize;
    color: rgb(153, 153, 153);

    &:hover {
      color: #fff;
    }
  }
`;

const HeaderNav = styled.nav`
  padding: 0px 1em;
  margin: auto;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const HeaderNavContent = styled.div`
  display: flex;
  align-items: center;
  width: calc(100vw - 2em);
  justify-content: space-between;
`;

export function ExamplesLayout({
  children,
  examples = [],
}) {
  return (
    <LayoutContainer>
      <GlobalStyle />
      <LayoutHeader
        as="header"
        className="spacing-horizontal"
      >
        <HeaderNav>
          <HeaderNavContent>
            <Flex className="spacing-horizontal">
              <LinksList className="spacing-horizontal">
                <MenuLink>
                  <a href="https://xstate.tips">
                    <span
                      style={{
                        fontSize:
                          "1.5em",
                      }}
                    >
                      XState.tips
                    </span>
                  </a>
                </MenuLink>
                <MenuLink>
                  <a
                    href="https://github.com/farskid/xstate.tips"
                    target="_blank"
                  >
                    Github
                  </a>
                </MenuLink>
              </LinksList>
            </Flex>
            <Flex>
              <form>
                <SearchInput placeholder="Search" />
              </form>
            </Flex>
          </HeaderNavContent>
        </HeaderNav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutSidebar>
          <List className="spacing-vertical">
            {examples.map(
              (ex, index) => (
                <ListItem key={index}>
                  <NextLink
                    href={`/example/${ex.slug}`}
                  >
                    <a>{ex.title}</a>
                  </NextLink>
                </ListItem>
              )
            )}
          </List>
        </LayoutSidebar>
        <LayoutContent>
          {children}
        </LayoutContent>
      </LayoutMain>
    </LayoutContainer>
  );
}
