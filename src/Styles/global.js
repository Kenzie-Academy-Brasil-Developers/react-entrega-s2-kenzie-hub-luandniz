import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html,
body,
header,
div,
ul,
li,
a,
p,
h1,
h2,
h3,
figure,
nav,
span,
footer {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  outline: 0;
}

:root{
    --purple: #403CAA;
    --gray: #333333;
    --green: #11995E;
    --white: #FFFFFF ;
    --offwhite:  #DCDCDC
    --lightgray: #999999;
    --red: #c53030;

body{
    background-color: #DCDCDC;
    color: var(--black); 
}

body, input, button{
font-family: "Roboto", sans-serif;
font-size: 1rem;
}

h1, h2, h3, h4{
    font-family: "Roboto", sans-serif;
    font-weight: 700;
}
button{
    cursor: pointer;
}

a{
    text-decoration: none;
}
}
`;
