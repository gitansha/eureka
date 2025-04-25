import { Card } from './Card';
import img from '../../assets/images/batikglassflowerwallunmasked.jpeg'


export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export const Vertical = {
  args: {
    orientation: 'vertical',
    title: 'Add title',
    subtitle: 123,
    content: 'Add content here',
    subcontent: 'Add subcontent here',
    mediaURL: img,
    rating: 0,
    buttonProps: {
      button: false,
      type: "secondary",
      label: "Rounded Button",
      rounded: true,
      disabled: false,
      leadIcon: {
        icon: "",
        family: ""
      }
    },
    inverted: false,
  },
};

export const Horizontal = {
  args: {
    orientation: 'horizontal',
    title: 'Add title',
    subtitle: 123,
    content: 'Add content here',
    subcontent: 'Add subcontent here',
    mediaURL: img,
    rating: 0,
    buttonProps: {
      button: false,
      type: "secondary",
      label: "Rounded Button",
      rounded: true,
      disabled: false,
      leadIcon: {
        icon: "",
        family: ""
      }
    },
    inverted: false,
  },
};