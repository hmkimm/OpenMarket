import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

// if (container.hasChildNodes()) {
//   ReactDOM.hydrateRoot(
//     container,
//     <HelmetProvider>
//       <App />
//     </HelmetProvider>
//   );
// } else {
//   root.render(
//     <HelmetProvider>
//       <App />
//     </HelmetProvider>
//   );
// }

// const container = document.getElementById("root") as Element | DocumentFragment;
// const root = createRoot(container);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
