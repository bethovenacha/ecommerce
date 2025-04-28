import { script_to_head,getAccessToken } from "../../utilities/paypal";
import {useEffect,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const PayPal = ()=>{
    const id = uuidv4();
    const customerId = id;
    const [loaded, setLoaded] = useState(false);
    const [clientToken, setClientToken] = useState(null);
    const [error, setError] = useState(null);

    const currency = "USD";
    const intent = "capture";
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
    const PAYPAL_SDK_URL = import.meta.env.VITE_PAYPAL_SDK_URL;
    // or 'authorize'
     // 1. Make sure user is logged in (replace this with your actual logic)
     //const isLoggedIn = await is_user_logged_in(); // <-- define this somewhere
     //if (!isLoggedIn) throw new Error("User not logged in");

     const loadScriptToHead = async ()=>{
        await script_to_head({
            src: `${PAYPAL_SDK_URL}?client-id=${CLIENT_ID}&enable-funding=venmo,card,credit&currency=${currency}&intent=${intent}`
          });
     };
     useEffect(()=>{
        try {
            const accessToken = getAccessToken();
            console.log(accessToken);
            loadScriptToHead();
            setLoaded(true);           
        } catch (error) {
            setLoaded(false);
        }  
     },[customerId]);

     useEffect(() => {
        if (!clientToken || !window.paypal?.HostedFields) return;
    
        window.paypal.HostedFields.render({
          createOrder: function () {
            // Replace with your backend order create
            return fetch("/api/create-order", { method: "POST" })
              .then((res) => res.json())
              .then((data) => data.jsonResponse.id);
          },
          styles: {
            input: {
              "font-size": "16px",
              "font-family": "helvetica, tahoma, calibri, sans-serif",
              color: "#3a3a3a",
            },
            ":focus": {
              color: "blue",
            },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "123",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM/YY",
            },
          },
        }).then((hostedFieldsInstance) => {
          document
            .getElementById("submit-button")
            .addEventListener("click", (event) => {
              event.preventDefault();
    
              hostedFieldsInstance
                .submit({
                  contingencies: ["3D_SECURE"],
                })
                .then(({ orderId }) => {
                  console.log("Payment captured for order:", orderId);
                })
                .catch((err) => {
                  console.error("Payment failed:", err);
                });
            });
        });
      }, [clientToken]);
    
    return ((loaded) ? 
                        <form id="card-form">
                            <div>
                            <label htmlFor="card-number">Card Number</label>
                            <div id="card-number" className="hosted-field" />
                            </div>
                            <div>
                            <label htmlFor="expiration-date">Expiration Date</label>
                            <div id="expiration-date" className="hosted-field" />
                            </div>
                            <div>
                            <label htmlFor="cvv">CVV</label>
                            <div id="cvv" className="hosted-field" />
                            </div>
                        <button id="submit-button">Pay</button>
                    </form>: <div>An error has occured!!</div>
                            
    );
};

export default PayPal;