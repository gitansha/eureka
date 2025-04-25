import React from 'react';
import PropTypes from 'prop-types';
import './chip.css';

export const Chip = ({type, message, indicator, className}) => {
    return (
        <div className={["sia-chip", `sia-chip-${type}`,`${className}`].join(' ')}>
            {indicator && <div className='sia-chip-indicator'></div>}
            <div className='sia-chip-message'>{message}</div>
        </div>
    )
};

Chip.propTypes = {
    /**
     * Type of Chip.
     */
    type: PropTypes.oneOf(['success', 'not-started', 'warning', 'error', 'active']),
    /**
     * Message on Chip.
     */
    message: PropTypes.string.isRequired,
    /**
     * Whether there is an indicator.
     */
    indicator: PropTypes.bool,
}

Chip.defaultProps = {
    type: 'success',
    indicator: true,
    message: 'Success'
}

