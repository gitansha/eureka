import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './textinput.css';
import { SI } from '../Si/SI.jsx';

export const TextInput = ({
  inverted,
  type,
  placeholder,
  disabled,
  helpText,
  trailingIcon,
  error,
  value,
  onChange,
  className,
  leadIcon: { icon, family, name },
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const updateInput = (event) => {
    setInputValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  const clearText = () => {
    setInputValue('');
    onChange && onChange('');
  };

  const mode =
    type === 'outlined'
      ? 'sia-textinput-outlined'
      : type === 'lined'
      ? 'sia-textinput-lined'
      : 'sia-textinput-filled';

  const changeClass = error
    ? 'sia-textinput-error-class'
    : disabled
    ? 'sia-textinput-disabled-class'
    : '';

  const invertedMode = inverted ? 'sia-textinput-inverted-class' : '';

  const clearIcon = disabled
    ? 'clear-disabled'
    : error
    ? 'clear-error'
    : inverted
    ? 'clear-light'
    : 'clear';

  return (
    <div className={['sia-textinput', className].join(' ')}>
      <div className={[mode, changeClass, invertedMode].join(' ')}>
        {icon ? (
          <div className="sia-textinput-user-icon">
            <SI icon={icon} family={family} name={name} />
          </div>
        ) : (
          <div></div>
        )}
        <div className="sia-textinput-input-wrapper">
          <input
            type="text"
            id="entered-text"
            className="sia-textinput-input"
            placeholder="Label"
            value={inputValue}
            onChange={updateInput}
            {...props}
          />
          <label htmlFor="entered-text" className="sia-textinput-label">
            {placeholder}
          </label>
        </div>
        {trailingIcon && (
          <div className="sia-textinput-cross-icon" onClick={clearText}>
            <SI icon={clearIcon} family="solid" />
          </div>
        )}
      </div>
      {helpText && <div className="sia-textinput-text-below">{helpText}</div>}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.oneOf(['outlined', 'lined', 'filled']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  leadIcon: PropTypes.shape({
    icon: PropTypes.string,
    family: PropTypes.string,
    name: PropTypes.bool,
  }),
  trailingIcon: PropTypes.bool,
  error: PropTypes.bool,
  inverted: PropTypes.bool,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
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
};
