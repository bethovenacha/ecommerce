
import { useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import storage from 'redux-persist/lib/storage';
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/store/cart.js";
import { shopActions } from "../../redux/store/shop.js";

const PayPal = () => {
  const [error, setError] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [currency, setCurrency] = useState();
  const [amount, setAmount] = useState();
  const [clientId,setClientId] = useState();
  let uuid = localStorage.getItem('shop_uuid');
  const dispatch = useDispatch();
  const shop = useSelector(state => state.shopReducer.shop?.[0]);
  const cart = useSelector(state => state.cartReducer.cart);
  
  useEffect(()=>{
    if(shop && cart.length > 0){
      setClientId(shop.clientId);
      setCurrency(shop.currency);

      const result = cart.filter(c=>c.shopId == shop.id && c.sessionId == uuid);
      const totalAmount = result.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0);

      setAmount(totalAmount);
      
    }
  });


  const onCartPurge = ()=>{
    dispatch(cartActions.clear());
    storage.removeItem('persist:cartReducer');
  };
 
   const onCreateOrder = async (data,actions)=>{
        return await actions.order.create({
          purchase_units:[{
            amount: {
            currency_code: currency.trim(), // <--- REQUIRED
            value: (amount || 0).toFixed(2)     // <--- REQUIRED
            }
          }]
        })
    };
    
    const onApproveOrder = async (data,actions)=>{
          const order = await actions.order.capture();
          if(order.status == "COMPLETED"){
            setIsSuccessful(true);
          }else{
            setError(true);
            console.log(order.status)
          }
    };

if (isSuccessful) {
  onCartPurge();
  return <div>Payment Successful</div>;
}
if(!clientId){
  return <div>Payment options loading...</div>
}
return (
          <PayPalScriptProvider options={{"client-id":clientId}}>
            <PayPalButtons
              createOrder={onCreateOrder}
              onApprove={onApproveOrder}
              onError={(err) => {
                setError(true);
              }}
              onCancel={() => {
                setCancelled(true);
              }}
            />
          </PayPalScriptProvider>
        )
}

export default PayPal;
