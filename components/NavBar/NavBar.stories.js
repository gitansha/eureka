import { NavBar } from './NavBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/NavBar',
  component: NavBar,
  tags: ['autodocs']
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    type: 'primary',
    logo: 'stacked-linear',
    items: '{"Item1": ["a", "b"],"Item2": ["c", "d"],"Item3": [],"Item4": ["e"]}',
    buttonProps: {
        button: false,
        buttonType: "secondary",
        label: "Select",
        rounded: true,
        buttonLeadIcon: {
          buttonIcon: "",
          buttonIconFamily: ""
        },
        buttonDisabled: false
    },
    textinputProps:{
        textinput: false,
        textinputType: 'filled',
        placeholder: 'Label',
        textinputDisabled: false,
        helpText: "",
        textinputLeadIcon:{
          textinputIcon: "",
          textinputIconFamily: ""
        },
        textinputInverted: false,
        trailingIcon: false,
        error: false
    },
    leftIconProps:{
      leftIcon: "",
      leftIconFamily: ""
    },
    rightIconProps: {
        rightIcon: "",
        rightIconFamily: ""
    },
  },
};

export const Secondary = {
    args: {
        type: 'secondary',
        logo: 'stacked-linear',
    items: '{"Item1": ["a", "b"],"Item2": ["c", "d"],"Item3": [],"Item4": ["e"]}',
    buttonProps: {
        button: false,
        buttonType: "secondary",
        label: "Select",
        rounded: true,
        buttonLeadIcon: {
          buttonIcon: "",
          buttonIconFamily: ""
        },
        buttonDisabled: false
    },
    textinputProps:{
        textinput: false,
        textinputType: 'filled',
        placeholder: 'Label',
        textinputDisabled: false,
        helpText: "",
        textinputLeadIcon:{
          textinputIcon: "",
          textinputIconFamily: ""
        },
        textinputInverted: false,
        trailingIcon: false,
        error: false
    },
    leftIconProps:{
      leftIcon: "",
      leftIconFamily: ""
    },
    rightIconProps: {
        rightIcon: "",
        rightIconFamily: ""
    },
        
    },
};

export const Tertiary = {
    args: {
        type: 'tertiary',
        logo: 'stacked-linear',
        items: '{"Item1": ["a", "b"],"Item2": ["c", "d"],"Item3": [],"Item4": ["e"]}',
        buttonProps: {
            button: false,
            buttonType: "secondary",
            label: "Select",
            rounded: true,
            buttonLeadIcon: {
              buttonIcon: "",
              buttonIconFamily: ""
            },
            buttonDisabled: false
        },
        textinputProps:{
            textinput: false,
            textinputType: 'filled',
            placeholder: 'Label',
            textinputDisabled: false,
            helpText: "",
            textinputLeadIcon:{
              textinputIcon: "",
              textinputIconFamily: ""
            },
            textinputInverted: false,
            trailingIcon: false,
            error: false
        },
        leftIconProps:{
          leftIcon: "",
          leftIconFamily: ""
        },
        rightIconProps: {
            rightIcon: "",
            rightIconFamily: ""
        } 
    },
};


