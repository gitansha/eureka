import { TextInput } from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export const Outlined = {
  args: {
    type: 'outlined',
    placeholder: 'Label',
    disabled: false,
    helpText: '',
    leadIcon: {
      icon: '',
      family: '',
      name: false,
    },
    trailingIcon: false,
    error: false,
    inverted: false,
  },
};

export const Lined = {
  args: {
    type: 'lined',
    placeholder: 'Label',
    disabled: false,
    helpText: '',
    leadIcon: {
      icon: '',
      family: '',
      name: false,
    },
    trailingIcon: false,
    error: false,
    inverted: false,
  },
};

export const Filled = {
  args: {
    type: 'filled',
    placeholder: 'Label',
    disabled: false,
    helpText: '',
    leadIcon: {
      icon: '',
      family: '',
      name: false,
    },
    trailingIcon: false,
    error: false,
    inverted: false,
  },
};