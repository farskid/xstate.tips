import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import NextLink from "next/link";
import cls from "classnames";

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

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LayoutSidebar = styled.aside`
  display: block;
  width: 20%;
  min-width: 0;
  flex: none;
  max-height: 100vh;
  overflow-y: auto;
  padding-bottom: 2em;
  position: sticky;
  top: 0;

  @media screen and (max-width: 48em) {
    display: none;
    max-height: none;
    width: 100%;
    position: relative;

    &.open {
      display: block;
    }
  }
`;

const LayoutMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;

  @media screen and (max-width: 48em) {
    flex-direction: column;
  }
`;
const LayoutContent = styled.div`
  min-width: 0;
  width: 100%;
  max-width: 64em;
  margin-left: auto;
  margin-right: auto;
  padding: 2em;

  @media screen and (max-width: 48em) {
    flex-direction: column;
    padding: 1em;
  }

  a {
    color: blue;
  }

  iframe {
    display: block;
    margin: 1em auto;
  }
`;

const LayoutHeader = styled(Flex)`
  justify-content: space-between;
  padding: 1em;
`;
const Logo = styled.div`
  width: 2em;
  height: 2em;
  border: 1px solid;
`;
const SearchInput = styled.input`
  display: inline-block;
  border: 1px solid;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;

  @media screen and (min-width: 48em) {
    width: 15em;
  }

  &:focus {
    outline-color: blue;
  }
`;
const LinksList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
`;
const MenuLink = styled.li``;
const List = styled.ul`
  list-style: none;
  padding: 1em 0;
  margin: 0;
`;
const ListItem = styled.li`
  a {
    padding: 0 1em;
    display: block;
    font-weight: 500;
    color: #444;
    font-size: 0.8em;

    &:hover {
      color: blue;
    }
  }
`;

const MenuTriggerButton = styled.button`
  display: none;
  background: none;
  border: none;
  width: 3em;
  height: 3em;
  padding: 0;

  &:focus {
    outline: 1px solid;
  }

  @media (max-width: 48em) {
    display: block;
  }

  svg {
    width: 3em;
    display: block;
  }
`;

export function ExamplesLayout({ children, examples = [] }) {
  const [isMenuOpen, setMenuOpenState] = React.useState(false);
  const sidebarRef = React.useRef();
  React.useEffect(() => {
    const onClickHandler = (e) => {
      console.log(e.target.id, sidebarRef.current.id);
      if (!e.target.id !== sidebarRef.current.id) {
        setMenuOpenState(false);
      }
    };
    document.addEventListener("click", onClickHandler);
    return () => {
      document.removeEventListener("click", onClickHandler);
    };
  }, []);
  return (
    <LayoutContainer>
      <GlobalStyle />
      <LayoutHeader as="header" className="spacing-horizontal">
        <Flex className="spacing-horizontal">
          <Logo />
          <form>
            <SearchInput placeholder="🔎 Search" />
          </form>
        </Flex>
        <Flex className="spacing-horizontal">
          <LinksList className="spacing-horizontal">
            <MenuLink>
              <a href="#" target="_blank">
                Link
              </a>
            </MenuLink>
            <MenuLink className="hidden-mobile">
              <a href="#" target="_blank">
                Link
              </a>
            </MenuLink>
            <MenuLink className="hidden-mobile">
              <a href="#" target="_blank">
                Link
              </a>
            </MenuLink>
          </LinksList>
          <MenuTriggerButton
            onClick={() => {
              setMenuOpenState(!isMenuOpen);
            }}
          >
            <svg viewBox="0 0 35 35" width="20" height="20">
              <rect width="35" height="5"></rect>
              <rect y="15" width="35" height="5"></rect>
              <rect y="30" width="35" height="5"></rect>
            </svg>
          </MenuTriggerButton>
        </Flex>
      </LayoutHeader>
      <LayoutMain>
        <LayoutSidebar
          ref={sidebarRef}
          id="sidebar"
          className={cls({
            open: isMenuOpen,
          })}
        >
          <List className="spacing-vertical">
            {examples.map((ex, index) => (
              <ListItem key={index}>
                <NextLink href={`/example/${ex}`}>
                  <a>{ex}</a>
                </NextLink>
              </ListItem>
            ))}
          </List>
        </LayoutSidebar>
        <LayoutContent>{children}</LayoutContent>
      </LayoutMain>
    </LayoutContainer>
  );
}
