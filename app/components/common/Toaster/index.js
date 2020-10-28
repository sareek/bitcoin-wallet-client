import React, { PureComponent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


class Toaster extends PureComponent {
  render() {

    if (this.props.successMessage) {
      toast.success(this.props.successMessage)
    }
    if (this.props.errorMessage) {
      toast.error(this.props.errorMessage)
    }
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }
}

export default Toaster
