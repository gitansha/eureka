import { Chip } from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
  },
};


export const Success = {
  args: {
    type: 'success',
    message: 'Success',
    indicator: true
  },
};

export const NotStarted = {
  args: {
    type: 'not-started',
    message: 'Not Started',
    indicator: true
  },
};

export const Warning = {
  args: {
    type: 'warning',
    message: 'Warning',
    indicator: true
  },
};

export const Error = {
  args: {
    type: 'error',
    message: 'Error',
    indicator: true
  },
};

export const Active = {
  args: {
    type: 'active',
    message: 'Active',
    indicator: true
  },
};