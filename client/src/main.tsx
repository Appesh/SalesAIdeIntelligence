import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import debug scripts for development
import "./debug-ai";
import "./test-env";

createRoot(document.getElementById("root")!).render(<App />);
