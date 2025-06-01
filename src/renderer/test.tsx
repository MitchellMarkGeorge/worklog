import syles from "./styles/test.module.css"
import { createRoot } from "react-dom/client";

export function render() {
    const test = <h1 className={syles.test}>Hello</h1>
    const root = createRoot(document.getElementById("app") as HTMLElement);
    root.render(test);
}