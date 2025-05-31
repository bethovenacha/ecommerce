
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { persistor } from "../../redux/store/index.js";
import { PayPalButtons} from "@paypal/react-paypal-js";

const PayPal = () => {
  const [error, setError] = useState();
  const [cancelled, setCancelled] = useState(false);
  const cartState = useSelector(state => state.cartReducer.cart);
  const [totalAmount,setTotalAmount] = useState();

  const initializeAmount = ()=>{
     if(!totalAmount){
      const amount = cartState.reduce((sum, product) => {
          return sum + (product.unitPrice * product.quantity);
      }, 0);
      setTotalAmount(amount);
    }
  };

  useEffect(()=>{
   initializeAmount();
  },[cartState]);

  const onPurge = ()=>{
          persistor.purge().then(() => {
          console.log('Persisted state purged.');
          });
      };
  

   const onCreateOrder = async (data,actions)=>{
      return await actions.order.create({
        purchase_units:[{
          amount: {
          currency_code: 'USD', // <--- REQUIRED
          value: (totalAmount || 0).toFixed(2)     // <--- REQUIRED
          }
        }]
      })
    };
    
    const onApproveOrder = async (data,actions)=>{
      const order = await actions.order.capture();
      if(order.status==="APPROVED"){
        //redirect to account page
        console.log(order);
        onPurge();
      }
    };
  return  (
  
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
    }}
  
  />
) 
};

export default PayPal;
