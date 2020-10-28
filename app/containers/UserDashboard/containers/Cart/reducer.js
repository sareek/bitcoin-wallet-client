import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  loading: false,
  requesting: false,
  response: '',
  cartProductList: {
    dataList: [],
    totalItems: 0,
    currentPage: 1
  },
  error: '',
  public_url: '',
  paymentSuccessData: null
});

function agentSettings(state = initialState, action) {
  switch (action.type) {
    case types.GET_PRODUCTS_IN_CART_REQUEST:
      return state.merge({
        loading: true,
        response: '',
        cartProductList: '',
        error: '',
      });

    case types.PLACE_ORDER_REQUEST:  
    return state.merge({
      loading: true,
      response: '',
      error: '',
    });   

    case types.PAY_THROUGH_CARD_REQUEST:  
    return state.merge({
      loading: true,
      response: '',
      error: '',
      paymentSuccessData: null
    }); 

    case types.PAY_THROUGH_CARD_SUCCESS:
      return state.merge({
        loading: false,
        response: action.response.message,
        paymentSuccessData: action.response.data
      });



    case types.REMOVE_CART_REQUEST:
        return state.merge({
          loading: true,
          response: '',
          error: '',
        });  

      case types.GET_PRODUCTS_IN_CART_SUCCESS:
      return state.merge({
        loading: false,
        response: '',
        cartProductList: fromJS(action.response.data)
      });

      // case types.REMOVE_CART_SUCCESS:
      //   return state.merge({
      //     loading: false,
      //     response: '',
      //     response: action.response.message
      //   }); 

      case types.REMOVE_CART_SUCCESS:
          return state
            .merge({
              loading: false,
              response: action.response.message,
              error: null,
            })
            .set(
              'cartProductList',
              fromJS({
                dataList: state
                  .get('cartProductList')
                  .get('dataList')
                  .filter(eachRule => {
                    return eachRule.get('_id') !== action.response.data._id;
                  }),
                totalItems: 10,
                currentPage: 1,
              }),
            );

      case types.PLACE_ORDER_SUCCESS:
        return state
          .merge({
            loading: false,
            response: action.response.message,
            error: null,
          })

      case types.GET_PRODUCTS_IN_CART_FAILURE:
      case types.REMOVE_CART_FAILURE:
      case types.PLACE_ORDER_FAILURE: 
      case types.PAY_THROUGH_CARD_FAILURE:
      return state.merge({
        error: action.error.message,
        response: '',
        loading: false,
      });

      case types.CLEAR_MESSAGE:
      return state.merge({
        response: '',
        error: '',
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default agentSettings;
