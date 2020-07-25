import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem,
      };

      this._handleItemClick = this._handleItemClick.bind(this);
    }

    _handleItemClick(activeItem) {
      this.setState({
        activeItem
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          onItemClick={this._handleItemClick}
          activeItem={this.state.activeItem}
        />
      );
    }
  }
  WithActiveItem.propTypes = {
    activeItem: PropTypes.string.isRequired
  };

  return WithActiveItem;
};

export default withActiveItem;
