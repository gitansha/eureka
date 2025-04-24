import React from 'react';
import PropTypes from 'prop-types';
import './card.css';
import { Button } from '../Button/Button.jsx';
import { SI } from '../Si/SI';
import img from '../../assets/images/batikglassflowerwallunmasked.jpeg'



/**
 * Primary UI component for user interaction
 */
export const Card = ({ orientation, content, title, subtitle, mediaURL, subcontent, inverted, rating, className,
  buttonProps: {
    button, type, label, rounded, disabled, onClick,
    leadIcon: {
      icon, family
    }
  }, ...props }) => {
  
  // rating is out of 5 stars
  const MAX_RATING = 5;

  let mode = inverted ? "sia-card-inverted" : "sia-card-normal";

  let media;
  if (mediaURL) {
    media = 'sia-card-with-media';
  }

  return (
    <div className={["sia-card", mode, `sia-card-${orientation}`, media, `${className}`].join(' ')}>
        {/* add card image */}
        {mediaURL && 
        <div
        className="sia-card-img"
        style={{
          backgroundImage:
            `url('${mediaURL}')`,
        }}
      >
      </div>
        }

        <div className="sia-card-text">

            <div className="sia-card-header">
                <div className="sia-card-title">{title}</div>
                {subtitle ? <div className="sia-card-subtitle">{subtitle}</div>: ""}
            </div>

            {/* horizontal Card has star ratings whereas vertical Card does not */}
            {orientation === 'horizontal' && (rating > 0) &&
            <div className="sia-card-star-container">
                {[...Array(MAX_RATING)].map((_, index) => (
                  // if the current star index < rating given, display a filled star. Else, display an empty star
                index < rating ? 
                (<SI icon="star-rate" family="solid" key={index} className="sia-card-rating-star" />) : 
                (<SI icon="star-rate" family="lined" key={index} className="sia-card-rating-star" />)))}
                
            </div>
            }
            <div className="sia-card-content">{content}</div>
            {subcontent && <div className="sia-card-content sia-card-separator">{subcontent}</div>}
            {/* show Button if button of buttonProps is true */}
            {button && <div className="action-btn">
                <Button type={type} rounded={rounded} label={label} disabled={disabled} onClick={onClick}
                leadIcon={{
                  icon: icon,
                  family: family
                }}/>
            </div>}

        </div>
        
    </div>
    
  );
};

Card.propTypes = {
    /**
     * Type of Card.
     */
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    /**
     * Title text.
     */
    title: PropTypes.string,
    /**
     * Subtitle on top right corner (only numbers).
     * Enter 0 to display no value.
     */
    subtitle: PropTypes.number,
    /**
     * Properties of Button component.
     * 
     * Set `button: true` to display the Button.
     * The remaining items are properties of Button component.
     * 
     * `icon` and `family` can be chosen from the `Icons` section in the sidebar. There is no icon if `icon` or `family` is empty.
     */
    buttonProps: PropTypes.shape({
      button: PropTypes.bool,
      type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
      label: PropTypes.string.isRequired,
      rounded: PropTypes.bool,
      disabled: PropTypes.bool,
      leadIcon: PropTypes.shape({
        icon: PropTypes.string,
        family: PropTypes.string
      }),
      onClick: PropTypes.func
    }),
    /**
     * URL for media to be displayed in Card.
     * 
     * Media should be imported first if it is stored locally. If it is a link, it can be copy pasted.
    */
    mediaURL: PropTypes.string,
    /**
     * Content text below title.
     */
    content: PropTypes.string,
    /**
     * Subcontent text below content.
     */
    subcontent: PropTypes.string,
    /**
     * Number of stars out of 5, only for horizontal Card.
     */
    rating: PropTypes.number,
    /**
     * Whether Card is in dark mode.
     */
    inverted: PropTypes.bool,
};

Card.defaultProps = {
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
};