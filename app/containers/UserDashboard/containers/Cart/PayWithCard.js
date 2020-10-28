import React, { Component } from 'react'
import { DOCUMENT_URL_UPDATE, API_BASE  } from '../../../App/constants';
import './style.scss';
import { Modal, Header, Button } from 'semantic-ui-react'

var paymentForm

export class PayWithCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            payButtonClick: false
        }
    }

    componentDidMount() {
      var temp = this
          // const price = this.props.totalPrice
            //   paymentForm = new SqPaymentForm({
            //     //TODO: Replace with your sandbox application ID
            //     applicationId: "sandbox-sq0idb-uMCOPGva0o2SCGWsuBcdkA",
            //     inputClass: 'sq-input',
            //     autoBuild: false,
            //     // Customize the CSS for SqPaymentForm iframe elements
            //     inputStyles: [{
            //         fontSize: '16px',
            //         lineHeight: '24px',
            //         padding: '16px',
            //         placeholderColor: '#a0a0a0',
            //         backgroundColor: 'transparent',
            //     }],
            //     // Initialize the credit card placeholders
            //     cardNumber: {
            //         elementId: 'sq-card-number',
            //         placeholder: 'Card Number'
            //     },
            //     cvv: {
            //         elementId: 'sq-cvv',
            //         placeholder: 'CVV'
            //     },
            //     expirationDate: {
            //         elementId: 'sq-expiration-date',
            //         placeholder: 'MM/YY'
            //     },
            //     postalCode: {
            //         elementId: 'sq-postal-code',
            //         placeholder: 'Postal'
            //     },
            //     // SqPaymentForm callback functions
            //     callbacks: {
            //         /*
            //         * callback function: cardNonceResponseReceived
            //         * Triggered when: SqPaymentForm completes a card nonce request
            //         */
            //         cardNonceResponseReceived: function (errors, nonce, cardData) {
            //         if (errors) {
                       
            //             var errmsg = ''
            //             errors.forEach(function (error) {
            //                 // console.error('  ' + error.message);
            //                 errmsg = errmsg + error.message + '<br>'
            //             });
            //             document.getElementById("payment-errors").innerHTML = errmsg;
            //             var element = document.getElementById("payment-errors")
            //             element.classList.remove("hide");
            //             return;
            //         } else if(!errors) {
            //             var element = document.getElementById("payment-errors")
            //             element.classList.add("hide");
            //         }
                     
            //                  temp.props.payFromCardRequest(nonce)
            //         }
            //     }
            //   });
            //   paymentForm.build();
      }

      componentWillReceiveProps(nextProps) {
        const temp = this
        const { payButtonClick } = this.state;
          if(nextProps.showModal == true && !payButtonClick ) {
            // const price = nextProps.totalPrice
              paymentForm = new SqPaymentForm({
                //TODO: Replace with your sandbox application ID
                applicationId: "sandbox-sq0idb-uMCOPGva0o2SCGWsuBcdkA",
                inputClass: 'sq-input',
                autoBuild: false,
                // Customize the CSS for SqPaymentForm iframe elements
                inputStyles: [{
                    fontSize: '16px',
                    lineHeight: '24px',
                    padding: '16px',
                    placeholderColor: '#a0a0a0',
                    backgroundColor: 'transparent',
                }],
                // Initialize the credit card placeholders
                cardNumber: {
                    elementId: 'sq-card-number',
                    placeholder: 'Card Number'
                },
                cvv: {
                    elementId: 'sq-cvv',
                    placeholder: 'CVV'
                },
                expirationDate: {
                    elementId: 'sq-expiration-date',
                    placeholder: 'MM/YY'
                },
                postalCode: {
                    elementId: 'sq-postal-code',
                    placeholder: 'Postal'
                },
                // SqPaymentForm callback functions
                callbacks: {
                    /*
                    * callback function: cardNonceResponseReceived
                    * Triggered when: SqPaymentForm completes a card nonce request
                    */
                    cardNonceResponseReceived: function (errors, nonce, cardData) {
                    if (errors) {
                        var errmsg = ''
                        errors.forEach(function (error) {
                            errmsg = errmsg + error.message + '<br>'
                        });
                        document.getElementById("payment-errors").innerHTML = errmsg;
                        var element = document.getElementById("payment-errors")
                        element.classList.remove("hide");
                        return;
                    } else if(!errors) {
                        var element = document.getElementById("payment-errors")
                        element.classList.add("hide");
                    }
                       temp.props.payFromCardRequest(nonce)
                    }
                }
              });
              paymentForm.build();
            }
      }
    
    onGetCardNonce = (event) => {
        event.preventDefault();
        this.setState({payButtonClick: true})
        paymentForm.requestCardNonce()
      }

     

    render() {
        const { totalPrice, cartSection, showModal, closeModal, isRequesting } = this.props;
        const { success } = this.state;
        return (
          <Modal size='fullscreen' className="multi-fac-modal" open={showModal} size="mini" style={{leftMargin :  "20%"}} 
          onClose={closeModal}
          closeOnDimmerClick={false} 
          closeIcon={{ style: { top: '0.0535rem', right: '.05rem' }, color: 'red', name: 'close' }}
              >
          <Header icon='question circle' content='Enter your card Details' />
          <Modal.Content style={{minHeight :  "80px"}}>
          <div id="payment-errors" className="ui negative message hide" ></div>
          <div id="sq-card-number"></div>
          <div className="third" id="sq-expiration-date"></div>
          <div className="third" id="sq-cvv"></div>
          <div className="third" id="sq-postal-code"></div>
          </Modal.Content>
          <Modal.Actions>
          <Button loading={isRequesting} id="sq-creditcard" className="button-credit-card" onClick={() => this.onGetCardNonce(event)}>Pay With Card</Button>
          </Modal.Actions>
          </Modal>
                
        )
    }
}

export default PayWithCard






