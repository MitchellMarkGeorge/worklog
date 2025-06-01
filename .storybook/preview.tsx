import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import styles from "./preview.module.css";

import "../src/renderer/index.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circle",
        items: [
          { value: "light", title: "Light", left: "☀️" },
          { value: "dark", title: "Dark", left: "🌙" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        return () => document.documentElement.removeAttribute("data-theme");
      }, [theme]);
      return (
        <div className={styles.preview}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
