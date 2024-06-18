import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/index.css";

window.jQuery = $;


createRoot(document.getElementById("root")).render(<App />);
