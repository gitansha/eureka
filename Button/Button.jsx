import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { SI } from '../Si/SI.jsx'



export const Button = ({ rounded, type, label, disabled, onClick, className,
  leadIcon: {
    icon, family, name
  }, ...props }) => {
    let border = rounded && "sia-button-rounded";
    let withIcon = icon && family ? "sia-button-with-icon" : "sia-button-without-icon";

    let mode;
    if (disabled) {
        mode = "sia-button-disabled";
    }
  
  return (
    // add onClick and when using Button component in another component, specify onClick = {some action}
    <div className={["sia-button", border, withIcon, mode, `sia-button-${type}`,`${className}`].join(' ')} onClick={onClick}>
      {icon && family ? <div className="button-userIcon">
            <SI icon={icon} family={family} name={name}/>
        </div> : null}

        <div className="sia-button-label">{label}</div>
    </div>
  );
};

Button.propTypes = {
  /**
   * Whether the Button is rounded. 
   * 
   * Set `rounded: true` to display a Button with rounded corners.
   */
  rounded: PropTypes.bool,
  /**
   * Type of Button.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  /**
   * Text to be written in the Button.
   */
  label: PropTypes.string.isRequired,
  /**
   * Type of Lead Icon. There is no icon if `icon` or `family` is empty.
   */
  leadIcon: PropTypes.shape({
    icon: PropTypes.string,
    family: PropTypes.string.isRequired,
    name: PropTypes.bool
  }),
   /**
   * Whether the Button is in disabled state. No action can be taken when the Button is disabled.
   */
   disabled: PropTypes.bool,
  /**
   * Optional click handler.
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'primary',
  rounded: false,
  label: 'Primary Button',
  icon: false,
  disabled: false,
  leadIcon: {
    icon: "",
    family: "",
    name: false,
  },
};
