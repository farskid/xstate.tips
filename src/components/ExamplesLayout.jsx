import * as React from "react";
import { useRouter } from "next/router";
import styled, { createGlobalStyle } from "styled-components";
import NextLink from "next/link";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    background: #181914
    url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==")
    repeat left top;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LayoutContainer = styled.div``;

const LayoutSidebar = styled.aside`
  border-right: 1px solid rgb(36, 36, 36);
  width: 25%;
  display: flex;
  flex-direction: column;
  padding-top: 2em;

  @media screen and (min-width: 86rem) {
    width: 20rem;
  }

  @media screen and (max-width: 64rem) {
    width: 100%;
    border-right: none;
    padding-top: 0;
  }

  a {
    white-space: nowrap;
    overflow-x: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
  }
`;

const LayoutMain = styled.main`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 64rem) {
    flex-direction: column;
  }
`;
const LayoutContent = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
  font-size: 1.25em;
  padding: 0 2em;
  width: 75%;

  @media screen and (min-width: 86rem) {
    width: 80rem;
  }

  @media screen and (max-width: 86rem) {
    padding: 0 2em;
    font-size: 1em;
  }

  @media screen and (max-width: 64rem) {
    margin-top: 0;
    width: 100%;
  }

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
    border-radius: 0.25rem !important;
  }

  .mdx-embed {
    @media screen and (max-width: 64rem) {
      margin-left: -2em !important;
      margin-right: -2em !important;
    }
  }

  img {
    max-width: 100%;
    background: rgb(36, 36, 36);
    border: 1px solid rgb(36, 36, 36);
    border-radius: 0.25em !important;
  }

  pre {
    background: rgb(21, 21, 21);
    padding: 1em;
    border-radius: 0.25em !important;
    margin: 2em 0 4em;
    line-height: 1.5;
    font-feature-settings: normal;
    font-size: 1em;
    width: auto;
    display: inline-block;

    @media screen and (max-width: 64rem) {
      margin-right: -2em;
      margin-left: -2em;
      border-radius: 0 !important;
      border-right: none !important;
      border-left: none !important;
      display: block;
    }
  }

  code {
    background: rgb(21, 21, 21);
    padding: 0.25em 0.5em;
    font-size: 85%;
    margin: 0;
    border-radius: 0.25em;
    line-height: 1.45em;
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  pre code {
    background-color: transparent;
    padding: 0;
    font-size: 100%;
  }

  blockquote {
    background-color: rgb(220, 207, 143);
    padding: 0 1em;
    margin: 0 auto;
    font-weight: 700;
    border-left: 0.5em solid rgb(136 126 81);
    display: inline-block;
    width: auto;

    * {
      color: #222;
      margin: 0 auto;
    }

    @media screen and (max-width: 64rem) {
      margin: 0 -2em;
      display: block;
    }
  }

  .break::before {
    content: "***";
    display: block;
    width: 100%;
    height: 1em;
    text-align: center;
    letter-spacing: 1em;
  }

  .standalone-viz {
    @media screen and (max-width: 64rem) {
      margin-right: -2em;
      margin-left: -2em;
    }
  }
`;

const LayoutHeader = styled.div`
  border-bottom: rgb(36, 36, 36) 1px solid;
  height: 3em;
  width: 100%;
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

  @media screen and (max-width: 64rem) {
    width: auto;
  }
`;
const LinksList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: baseline;
`;
const MenuLink = styled.li``;
const List = styled.ul`
  list-style: none;
  padding: 1em 0;
  margin: 0;
`;
const ListItem = styled.li`
  &:hover {
    background-color: #242424;
    a {
      color: #40a9f3;
    }
  }

  a {
    padding: 0.5em 1em;
    display: block;
    font-weight: 500;
    text-transform: capitalize;
    color: rgb(153, 153, 153);
  }

  a.current {
    color: #fff;
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

const MobileList = styled.nav`
  @media screen and (min-width: 64rem) {
    display: none;
  }

  details {
    summary {
      list-style-type: none;
      padding: 0.75em 1.5em;
      font-size: 1.5em;
      border-bottom: 1px solid rgb(36, 36, 36);
      z-index: 10;

      &::-webkit-details-marker {
        display: none;
      }
      &:focus {
        outline: none;
      }
    }

    &[open] summary {
      position: sticky;
      top: 0;
      background-color: rgba(36, 36, 36);
      border-bottom: 1px solid rgb(0, 0, 0);
    }
  }

  ${List} {
    border-bottom: 1px solid rgb(36, 36, 36);
  }
`;

const DesktopList = styled.nav`
  position: sticky;
  top: 1em;
  @media screen and (max-width: 64rem) {
    display: none;
  }
`;

export function ExamplesLayout({ children, examples }) {
  const router = useRouter();
  const mobileMenu = React.useRef();
  // Close mobile menu after page changes
  React.useEffect(() => {
    mobileMenu.current.open = false;
  }, [router.pathname]);
  return (
    <LayoutContainer>
      <GlobalStyle />
      <LayoutHeader as="header" className="spacing-horizontal">
        <HeaderNav>
          <HeaderNavContent>
            <Flex className="spacing-horizontal">
              <LinksList className="spacing-horizontal">
                <MenuLink>
                  <a href="https://xstate.tips">
                    <em
                      style={{
                        fontSize: "1.5em",
                      }}
                    >
                      XState.tips
                    </em>
                  </a>
                </MenuLink>
              </LinksList>
            </Flex>
            <Flex>
              {/* TODO: enable when Algolia is ready */}
              {/* <form>
                <SearchInput placeholder="Search" className="hidden-mobile" />
                <details className="hidden-desktop">
                  <summary>Search</summary>
                  <SearchInput placeholder="Search" />
                </details>
              </form> */}
              <LinksList className="spacing-horizontal">
                <MenuLink>
                  <a
                    href="https://github.com/farskid/xstate.tips"
                    target="_blank"
                  >
                    Contribute
                  </a>
                </MenuLink>
              </LinksList>
            </Flex>
          </HeaderNavContent>
        </HeaderNav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutSidebar>
          <DesktopList>
            <List>
              {examples.length > 0 &&
                examples.map((ex, index) => (
                  <ListItem key={index}>
                    <NextLink href={ex.href}>
                      <a
                        className={
                          router.pathname.split("/").pop() === ex.slug
                            ? "current"
                            : ""
                        }
                      >
                        {ex.title.repeat(5)}
                      </a>
                    </NextLink>
                  </ListItem>
                ))}
            </List>
          </DesktopList>
          <MobileList>
            <details ref={mobileMenu}>
              <summary>All tips</summary>
              <List>
                {examples.length > 0 &&
                  examples.map((ex, index) => (
                    <ListItem key={index}>
                      <NextLink href={ex.href}>
                        <a
                          className={
                            router.pathname.split("/").pop() === ex.slug
                              ? "current"
                              : ""
                          }
                        >
                          {ex.title}
                        </a>
                      </NextLink>
                    </ListItem>
                  ))}
              </List>
            </details>
          </MobileList>
        </LayoutSidebar>
        <LayoutContent>{children}</LayoutContent>
      </LayoutMain>
    </LayoutContainer>
  );
}
