import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  /* root */
  :root {
    //color
    --primary: #8A5D3B;
    --gray: #767676;
    --light-gray: #dad7d7;
  }

${reset} 

.a11y-hidden {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}

button {
padding: 0;
cursor: pointer;
border: none;
color: inherit;
background-color: transparent;

&:disabled {
  background-color: var(--light-gray);
  cursor: not-allowed;
}
}

a{
text-decoration: none;
  color: inherit;
}

textarea:focus, input:focus{
  outline: none;
}

input {
  /* -webkit-appearance: none;
  -moz-appearance: none; */
  /* appearance: none; */
  box-shadow: none;
  border: none;
  border-radius: 0;
  padding: 0;
  box-sizing: border-box;

  
}

h1 {
margin: 0;
}

body {
box-sizing: border-box;
overflow-y: scroll;
-ms-overflow-style:none;
scrollbar-width: none;

::-webkit-scrollbar {
  display: none;
}

#root {
  min-height: 100vh;
  height: 1px;
}
}
`;

export default GlobalStyle;
