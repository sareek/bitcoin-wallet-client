import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CustomToaster extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  };

  state = { visible: true };
  componentDidMount() {
    toast.info(this.props.message);
  }

  render() {
    const { visible } = this.state;
    const { message } = this.props;
    if (visible) {
      return (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      );
    }
    return null;
  }
}

export default CustomToaster;
