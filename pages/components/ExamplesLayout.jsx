import * as React from "react";
import styled from "styled-components";
import NextLink from "next/link";

const LayoutContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LayoutSidebar = styled.aside`
  position: sticky;
  top: 100px;
  display: block;
  width: 25%;
  min-width: 0;
  flex: none;
  max-height: 100vh;
  overflow-y: auto;
  padding-bottom: 2rem;
`;

const LayoutMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;

  @media screen and (min-width: 48em) {
    flex-direction: row;
  }
`;
const LayoutContent = styled.div`
  min-width: 0;
  width: 100%;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
`;

const LayoutHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  border: 1px solid;
`;
const SearchInput = styled.input``;
const LinksList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
`;
const MenuLink = styled.li``;

export function ExamplesLayout({ children, examples = [] }) {
  console.log({ examples });
  return (
    <LayoutContainer>
      <LayoutHeader>
        <div>
          <Logo />
          <SearchInput />
        </div>
        <LinksList>
          <MenuLink>Link</MenuLink>
          <MenuLink>Link</MenuLink>
          <MenuLink>Link</MenuLink>
        </LinksList>
      </LayoutHeader>
      <LayoutMain>
        <LayoutSidebar>
          <ul>
            {examples.map((ex, index) => (
              <li key={index}>
                <NextLink href={`/example/${ex}`}>
                  <a>{ex}</a>
                </NextLink>
              </li>
            ))}
          </ul>
        </LayoutSidebar>
        <LayoutContent>{children}</LayoutContent>
      </LayoutMain>
    </LayoutContainer>
  );
}
