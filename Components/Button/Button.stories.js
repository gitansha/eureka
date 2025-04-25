import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'select', options: ['Primary', 'Secondary', 'Tertiary'] } },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    type: 'primary',
    rounded: false,
    label: 'Primary Button',
    leadIcon: {
      icon: "",
      family: "",
      name: false,
    },
    disabled: false,
  },
};

export const Secondary = {
    args: {
        type: 'secondary',
        rounded: false,
        label: 'Secondary Button',
        leadIcon: {
          icon: "",
          family: "",
          name: false,
        },
        disabled: false,
    },
};

export const Tertiary = {
    args: {
        type: 'tertiary',
        rounded: false,
        label: 'Tertiary Button',
        leadIcon: {
          icon: "",
          family: "",
          name: false,
        },
        disabled: false,
    },
};