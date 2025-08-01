import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { EnhanceButton } from "./EnhanceButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EnhanceButton> = {
  title: "Example/EnhanceButton",
  component: EnhanceButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onPress: fn(), children: "Enhance", size: "default" },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EnhanceButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    size: "default",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Tooltip: Story = {
  args: {
    tooltip: "Enhance",
  },
};

