import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StyledButton } from "./Button";

export default {
  title: "Example/Button",
  component: StyledButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StyledButton>;

const Template: ComponentStory<typeof StyledButton> = (args) => (
  <StyledButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: "warning",
  label: "Button",
  variant: "text",
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "primary",
  label: "Button",
  variant: "contained",
};

export const Large = Template.bind({});
Large.args = {
  color: "success",
  size: "large",
  label: "Button",
  variant: "contained",
};

export const Small = Template.bind({});
Small.args = {
  color: "inherit",
  size: "small",
  label: "hi",
  variant: "outlined",
};
