
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { persistor } from "../../redux/store/index.js";
import { PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

const PayPal = () => {
  const [error, setError] = useState();
  const [cancelled, setCancelled] = useState(false);
  
  const [totalAmount,setTotalAmount] = useState();
  const [currency, setCurrency] = useState();
  const [clientId, setClientId] = useState();

  const shop = useSelector(state => state.shopReducer.shop?.[0] || {});
  const cart = useSelector(state => state.cartReducer.cart);

  


  useEffect(() => {
    if (!totalAmount && cart.length > 0) {
      const amount = cart.reduce((sum, product) => {
        return sum + product.unitPrice * product.quantity;
      }, 0);
      setTotalAmount(amount);
    }

    if (!clientId && shop.clientId) {
      setClientId(shop.clientId);
    }

    if (!currency && shop.currency) {
      setCurrency(shop.currency);
    }
}, [cart, shop]);


  const onPurge = ()=>{
    persistor.purge().then(() => {
    console.log('Persisted state purged.');
    });
  };

   const onCreateOrder = async (data,actions)=>{
      return await actions.order.create({
        purchase_units:[{
          amount: {
          currency_code: currency, // <--- REQUIRED
          value: (totalAmount || 0).toFixed(2)     // <--- REQUIRED
          }
        }]
      })
    };
    
    const onApproveOrder = async (data,actions)=>{
      const order = await actions.order.capture();
      if(order.status == "COMPLETED"){
        console.log(order);
      }
    };
  return  (
  (cart && shop) ? 
  <PayPalScriptProvider options={{"client-id":clientId}}>
    <PayPalButtons   
      createOrder={ (data,actions)=>{
        return onCreateOrder(data,actions);
      }}

      onApprove={async(data,actions)=>{
        await onApproveOrder(data,actions);
      }}

      onError={(err)=>{
        setError(err);
        console.log(error);
      }}

      onCancel={()=>{
        setCancelled(true);
      }} /> 
    </PayPalScriptProvider>
    : 'Payment Successful'
) 
};

export default PayPal;
