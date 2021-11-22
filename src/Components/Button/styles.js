import styled from "styled-components";

export const Container = styled.button`
  background: ${(props) =>
    props.greenSchema ? "var(--green)" : "var(--purple)"};
  color: var(--white);
  width: 452px;
  height: 55px;
  border-radius: 8px;
  border: none;
  font-family: "Roboto", sans-serif;
  margin-top: 16px;
  transition: 0.5s;
  :hover {
    filter: brightness(1.5);
  }
`;
