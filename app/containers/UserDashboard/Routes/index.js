import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';

import { makeSelectStatus } from '../selectors';
import Profile from 'components/Profile';
import { Redirect } from 'react-router-dom';
// import PackageList from '../containers/PackageList/';
// import PackageDetails from '../containers/PackageList/Detail/Loadable'
// import MyPackage from '../containers/PackageList/Cart/SubscribedPackage';

import Wallet from '../containers/Wallet/Loadable'
import WalletAddress from '../containers/WalletAddress';
//  import ReportDetails from '../containers/Report/Detail'

// import Cart from '../containers/Cart/Loadable'
// import Payment from '../containers/Payment/Loadable'

// import ProductList from '../containers/ProductList/'
// import ProductDetails from '../containers/ProductList/Detail/Loadable'
// import SubscribedProducts from '../containers/ProductList/Cart/SubscribedProduct'

// import ProductDisplay from '../containers/ProdutDisplay/Loadable';
// import ViewQuestions from '../containers/ProdutDisplay/ViewQuestions/Loadable';
// import ViewProductQuestions from '../containers/ProdutDisplay/ViewQuestions/Loadable';

// import UserDashboard from '../containers/DashboardView/Loadable'



function check(status) {
	let isValid = false,
		expired = true;

	if (status === 200 || status === 404) {
		(isValid = true), (expired = false);
		// return isValid;
	} else if (status === 410) {
		(isValid = false), (expired = true);
		// return expired;
	} else {
		(isValid = false), (expired = true);
		// return null
	}
	let value, v, e;
	value = { isValid: isValid, expired: expired };
	return value;
}

function UserRoutes({ location, status }) {
	return (
		<Switch location={location} >
			<Route
				path="/user/dashboard/profile"
				render={(props) => (
					<Profile
						tabs={[
							{ to: '/user/dashboard/profile/basic-info', label: 'KYC' },
							{ to: '/user/dashboard/profile/password', label: 'Password' },
							{
								to: '/user/dashboard/profile/multi-factor-auth',
								label: 'Two Factor Auth',
							},
						]}
						{...props}
					/>
				)}
			/>

			<Route
				path="/user/dashboard/wallet-address"
				render={(props) => (
					<WalletAddress
						tabs={[
							{ to: '/user/dashboard/wallet-address/list', label: 'Wallet Addresses' },
							{ to: '/user/dashboard/wallet-address/watchonly', label: 'Watch Only' },
						]}
						{...props}
					/>
				)}
			/>

			<Route exact path="/user/dashboard/wallet" component={Wallet} />
			
			{/* <Route exact path="/user/dashboard/report/detail/:id" component={ReportDetails} /> */}

			{/* <Route 
			   exact 
			   path="/user/dashboard/cart" 
			   render={props => {
				   return <Cart handleCartSize={handleCartSize} />;
			   }}  
			/>
            
			<Route 
			   exact 
			   path="/user/dashboard/payment-info" 
			   component={Payment} 
			   />

			<Route exact path="/user/dashboard/package" component={PackageList} />
			<Route exact path="/user/dashboard/package/detail/:id" component={PackageDetails} />
			<Route exact path="/user/dashboard/my-packages" component={MyPackage} />

			<Route exact path="/user/dashboard/product" component={ProductList} />
			<Route exact path="/user/dashboard/product/detail/:id" component={ProductDetails} />
			<Route exact path="/user/dashboard/my-products" component={SubscribedProducts} />

			<Route
        exact
        path="/user/dashboard/product-display"
        component={ProductDisplay}
      />
    
      <Route
        exact
        path="/user/dashboard/product-display/:package_id"
        component={ProductDisplay}
      />
      <Route
        exact
        path="/user/dashboard/trial/product-display/:package_id"
        component={ProductDisplay}
      />
      <Route
        exact
        path="/user/dashboard/trial/product-display/practice-quiz/:exam_id"
        component={ViewQuestions}
      />
	   <Route
        exact
        path="/user/dashboard/product-display/questions/:product_id"
        component={ViewProductQuestions}
      />
	   <Route
        exact
        path="/user/dashboard/product-display/questions/summary/:product_id"
        component={ViewProductQuestions}
      />
      <Route
        exact
        path="/user/dashboard/product-display/practice-quiz/:exam_id"
        component={ViewQuestions}
	  /> */}
	  {location.pathname !== '/user/dashboard' && 
		<Redirect from="*" to="/user/dashboard" />
	    }
	</Switch>
	);
}

const mapStateToProps = createStructuredSelector({
	location: makeSelectLocation(),
	status: makeSelectStatus(),
});

export default connect(mapStateToProps)(UserRoutes);
