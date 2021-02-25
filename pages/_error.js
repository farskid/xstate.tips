import * as React from "react";
import styled from "styled-components";

const Title = styled.h1`
  height: calc(100% - 3em);
`;

const NotFound = () => {
  return <Title>404</Title>;
};
export default NotFound;
