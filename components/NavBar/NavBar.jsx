import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { Button } from '../Button/Button.jsx';
import { TextInput } from '../Textinput/TextInput';
import { SI } from '../Si/SI';

// import { ReactComponent as LinearLogo } from '../stories/assets/logo/linear-yellow.svg'
// import { ReactComponent as TertiaryLinearLogo } from '../stories/assets/logo/tertiary-linear-yellow.svg';
// import { ReactComponent as NoTextLogo } from '../stories/assets/logo/no-text-yellow.svg'
// import { ReactComponent as StackedLinearLogo } from '../stories/assets/logo/linear-stacked-yellow.svg'
// import { ReactComponent as TertiaryStackedLinearLogo } from '../stories/assets/logo/tertiary-linear-stacked-yellow.svg';
import LinearLogo from '../../stories/assets/logo/linear-yellow.svg';
import TertiaryLinearLogo from '../../stories/assets/logo/tertiary-linear-yellow.svg';
import NoTextLogo from '../../stories/assets/logo/no-text-yellow.svg'
import StackedLinearLogo from '../../stories/assets/logo/linear-stacked-yellow.svg'
import TertiaryStackedLinearLogo from '../../stories/assets/logo/tertiary-linear-stacked-yellow.svg';

import { isValidJson } from '../../assets/utils';

export const NavBar = ({ 
    type, logo, items, className,
    buttonProps: {
        button, buttonType, label, rounded, buttonDisabled, onClick,
        buttonLeadIcon: {
            buttonIcon, buttonIconFamily
        }
    },
    textinputProps: {
        /* arguments that will be passed into input later */
        textinput, textinputType, placeholder, textinputDisabled, helpText, trailingIcon, error, textinputInverted,
        textinputLeadIcon: {
            textinputIcon, textinputIconFamily
        }
    },
    leftIconProps: {
        leftIcon, leftIconFamily
    },
    rightIconProps: {
        rightIcon, rightIconFamily
    },
    ...props }) => {

    // detect small screens
    const [isTablet, setIsTablet] = useState(false);
    // considered a tablet if width < 768
    const handleResize = () => {
        setIsTablet(window.innerWidth < 768);
    };
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        // Call handleResize initially to set the initial screen size
        handleResize();
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // hamburger menu
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    // pick the right logo to display
    let selectedLogo = [];

    // if (type === "tertiary") {
    //     if (logo === "linear") {
    //         selectedLogo.push(<div className="sia-navbar-logo" key="tertiary-linear-logo"><TertiaryLinearLogo /></div>)
    //     } else if (logo === "stacked-linear") {
    //         selectedLogo.push(<div className="sia-navbar-logo" key="tertiary-stacked-linear-logo"><TertiaryStackedLinearLogo /></div>)
    //     }
    // } else {
    //     if (logo === "linear") {
    //         selectedLogo.push(<div className="sia-navbar-logo" key="linear-logo"><LinearLogo /></div>)
    //     } else if (logo === "stacked-linear") {
    //         selectedLogo.push(<div className="sia-navbar-logo" key="stacked-linear-logo"><StackedLinearLogo /></div>)
    //     }
    // }
    // if (logo === "no-text") (selectedLogo.push(<div className="sia-navbar-logo" key="no-text-logo"><NoTextLogo /></div>))


    if (type === "tertiary") {
        if (logo === "linear") {
            selectedLogo.push(<div className="sia-navbar-logo" key="tertiary-linear-logo"><img src={TertiaryLinearLogo} alt="tertiary-logo" /></div>)
        } else if (logo === "stacked-linear") {
            selectedLogo.push(<div className="sia-navbar-logo" key="tertiary-stacked-linear-logo"><img src={TertiaryStackedLinearLogo} alt="tertiary-stacked-logo" /></div>)
        }
    } else {
        if (logo === "linear") {
            selectedLogo.push(<div className="sia-navbar-logo" key="linear-logo"><img src={LinearLogo} alt="linear-logo" /></div>)
        } else if (logo === "stacked-linear") {
            selectedLogo.push(<div className="sia-navbar-logo" key="stacked-linear-logo"><img src={StackedLinearLogo} alt="stacked-linear-logo" /></div>)
        }
    }
    if (logo === "no-text") (selectedLogo.push(<div className="sia-navbar-logo" key="no-text-logo"><img src={NoTextLogo} alt="no-text-logo" /></div>))


    // check if json is valid before displaying NavBar
    if (items && isValidJson(items)) {
        const navItems = JSON.parse(items);
        const numItems = navItems.length;
        const keys = Object.keys(navItems);
    
        return (
            <div className={["sia-navbar", `sia-navbar-${type}`,`${className}`].join(' ')}>
                <div className='sia-navbar-left'>
                    {selectedLogo} 
                </div>
                
                {isTablet ? 
                <div className="sia-navbar-hamburger-menu">
                    {/* toggle between hamburger and cross icon for opening and closing hamburger menu */}
                    {hamburgerOpen ?
                    <div className="sia-navbar-cross-icon" onClick={toggleHamburger}><SI icon='clear' family='solid'/></div>
                    : <div className="sia-navbar-hamburger-icon" onClick={toggleHamburger}>
                        <div className='sia-navbar-hamburger-line'></div>
                        <div className='sia-navbar-hamburger-line'></div>
                        <div className='sia-navbar-hamburger-line'></div>
                    </div>
                    }

                    {/* display hamburger items if hamburger is open */}
                    <div className="sia-navbar-hamburger-items" style={{display: hamburgerOpen ? 'grid' : 'none'}}>
                        <div className="sia-navbar-items">
                            {Object.entries(navItems).map(
                                ([key, value], index) => (
                                    <div key={`${key}-tablet`}>{key}</div>
                                )
                            )}
                        </div>

                        {textinput ?
                        (<div className="textinput-and-button">
                            <div className="sia-navbar-textinput">
                                <TextInput type={textinputType} placeholder={placeholder} disabled={textinputDisabled} helpText={helpText} trailingIcon={trailingIcon} error={error} inverted={textinputInverted}
                                leadIcon={{
                                    icon: textinputIcon,
                                    family: textinputIconFamily
                                }}/>
                            </div>
                            {button && 
                            <div className="sia-navbar-btn">
                                <Button type={buttonType} rounded={rounded} label={label} disabled={buttonDisabled} onClick={onClick}
                                leadIcon={{
                                    icon: buttonIcon,
                                    family: buttonIconFamily
                                }}/>
                            </div>}
                            
                        </div>)
                        : null}

                        {(leftIcon && leftIconFamily && rightIcon && rightIconFamily) ? 
                        <div className="sia-navbar-icons">
                            <div className="sia-navbar-user-icon"><SI icon={leftIcon} family={leftIconFamily}/></div>
                            <div className="sia-navbar-ellipsis-icon"><SI icon={rightIcon} family={rightIconFamily}/></div>
                        </div> : null}

                    </div>
                </div>

                :
                <div className="sia-navbar-right">
                    <div className="sia-navbar-items" style={{gridTemplateColumns: `repeat(${keys.length}, auto)`}}>
                        {/* for each key in navItems, create a div and put the key as text */}
                        {Object.entries(navItems).map(
                            ([key, value], index) => (<div key={key}>{key}</div>)
                        )}
                    </div>

                    {/* button can only be displayed if textinput is present */}
                    {textinput ?
                    (<div className="textinput-and-button">
                        <div className="sia-navbar-textinput">
                            <TextInput type={textinputType} placeholder={placeholder} disabled={textinputDisabled} helpText={helpText} trailingIcon={trailingIcon} error={error} inverted={textinputInverted}
                            leadIcon={{
                                icon: textinputIcon,
                                family: textinputIconFamily
                            }}/>
                        </div>
                        {button && 
                        <div className="sia-navbar-btn">
                            <Button type={buttonType} rounded={rounded} label={label} disabled={buttonDisabled} onClick={onClick}
                            leadIcon={{
                                icon: buttonIcon,
                                family: buttonIconFamily
                            }}/>
                        </div>}
                    </div>)
                    : null}

                    {/* If both icons are defined, show the icons */}
                    {(leftIcon && leftIconFamily && rightIcon && rightIconFamily) ? 
                    <div className="sia-navbar-icons">
                        <div className="sia-navbar-user-icon"><SI icon={leftIcon} family={leftIconFamily}/></div>
                        <div className="sia-navbar-ellipsis-icon"><SI icon={rightIcon} family={rightIconFamily}/></div>
                    </div> : null}
                </div>}
            </div> 
        );
    } else {
        return (
            <div>No input or invalid JSON format. Please refer to the default example.</div>
        )
    }

} 

NavBar.propTypes = {
    /**
     * Type of NavBar.
     */
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    /**
     * Type of logo on NavBar.
     */
    logo: PropTypes.oneOf(['stacked-linear', 'linear', 'no-text']),
    /**
     * Header items in JSON string. The keys will be header items, the values are not displayed.
     */
    items: PropTypes.string,
    /**
     * Properties of Button component.
     * 
     * Set `button: true` to display the Button.
     * The remaining items are properties of Button component.
     * 
     * `buttonIcon` and `buttonIconFamily` can be chosen from the `Icons` section in the sidebar. There is no icon if `buttonIcon` or `buttonIconFamily` is empty.
     * 
     * **NOTE: Button can only be displayed if TextInput is displayed.**
     */
    buttonProps: PropTypes.shape({
        button: PropTypes.bool,
        buttonType: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
        label: PropTypes.string,
        rounded: PropTypes.bool,
        buttonLeadIcon: PropTypes.shape ({
            buttonIcon: PropTypes.string,
            buttonIconFamily: PropTypes.string
        }),
        buttonDisabled: PropTypes.bool,
        onClick: PropTypes.func
    }),
    /**
     * Properties of TextInput component.
     * 
     * Set `textinput: true` to display the TextInput.
     * The remaining items are properties of TextInput component.
     * 
     * `textinputIcon` and `textinputIconFamily` can be chosen from the `Icons` section in the sidebar. There is no icon if `textinputIcon` or `textinputIconFamily` is empty.
     * 
     * **NOTE: Either TextInput (and Button) or the icons can be used, but not both.**
     */
    textinputProps: PropTypes.shape({
        textinput: PropTypes.bool,
        textinputType: PropTypes.oneOf(['lined', 'outlined', 'filled']),
        placeholder: PropTypes.string,
        textinputDisabled: PropTypes.bool,
        helpText: PropTypes.string,
        textinputInverted: PropTypes.bool,
        textinputLeadIcon: PropTypes.shape ({
            textinputIcon: PropTypes.string,
            textinputIconFamily: PropTypes.string
        }),
        trailingIcon: PropTypes.bool,
        error: PropTypes.bool
    }),
    /**
     * Properties of the icon on the left side. **Both left and right icons must be present simultaneously.**
     * 
     * `leftIcon` and `leftIconFamily` can be chosen from the `Icons` section. There is no icon if `leftBtnIcon` or `leftBtnIconFamily` is empty.
     */
    leftIconProps: PropTypes.shape({
        leftIcon: PropTypes.string,
        leftIconFamily: PropTypes.string
    }),
    /**
     * Properties of the icon on the right side. **Both left and right icons must be present simultaneously.**
     * 
     * `rightIcon` and `rightIconFamily` can be chosen from the `Icons` section.  There is no icon if `rightBtnIcon` or `rightBtnIconFamily` is empty.
     */
    rightIconProps: PropTypes.shape({
        rightIcon: PropTypes.string,
        rightIconFamily: PropTypes.string
    }),
};

NavBar.defaultProps = {
    type: 'primary',
    logo: 'stacked-linear',
    items: '{"Item1": ["a", "b"],"Item2": ["c", "d"],"Item3": [],"Item4": ["e"]}',
    buttonProps: {
        button: false,
        buttonType: "secondary",
        label: "Select",
        rounded: true,
        buttonDisabled: false,
        buttonLeadIcon: {
            buttonIcon: "",
            buttonIconFamily: ""
        }
    },
    textinputProps:{
        textinput: false,
        textinputType: 'filled',
        placeholder: 'Label',
        textinputDisabled: false,
        helpText: "",
        trailingIcon: false,
        error: false,
        textinputInverted: false,
        textinputLeadIcon:{
            textinputIcon: "",
            textinputIconFamily: ""
        }
    },
    leftIconProps:{
        leftIcon: "",
        leftIconFamily: ""
    },
    rightIconProps: {
        rightIcon: "",
        rightIconFamily: ""
    },
};
