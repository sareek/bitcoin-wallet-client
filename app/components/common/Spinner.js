import React from 'react';
import Loader from 'assets/images/loader.svg';

const Spinner = () => {
  return <div className="spinner"><img src={Loader} alt="loader" /></div>;
};

export default Spinner;
