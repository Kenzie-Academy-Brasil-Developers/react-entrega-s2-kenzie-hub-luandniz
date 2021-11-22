import { Container } from "./styles";

export const Button = ({ children, onClick, greenSchema = false, ...rest }) => {
  return (
    <Container
      onClick={onClick}
      greenSchema={greenSchema}
      type="button"
      {...rest}
    >
      {children}
    </Container>
  );
};
