import { useState } from "react";
import { useSelector } from "react-redux";
import { cartActions } from "../../redux/store/cart";
import { useDispatch } from "react-redux";

const Cart = ()=>{
    const cartState = useSelector(state => state.cartReducer.cart);
    
    const dispatch = useDispatch();

    const onOrderQuantityChange = (event, id) => {
        const quantity = parseInt(event.target.value, 10);
        dispatch(cartActions.updateItem({ id, quantity }));
    };

     // Calculate the total amount
    const totalAmount = cartState.reduce((sum, product) => {
        return sum + (product.unitPrice * product.quantity);
    }, 0);

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        }).format(totalAmount);
      

    return(
        <>
            <button>Back</button>
            <button>Complete Order</button>
            <table>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Sub Total</th>
                {
                    cartState && cartState.map((product)=>{
                        return (
                                <tr key={product.id} id={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                    <input
                                        type="number"
                                        min={1}
                                        max={product.stockCount}
                                        value={product.quantity}
                                        onChange={(e) => onOrderQuantityChange(e, product.id)}
                                        />
                                    </td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.unitPrice * product.quantity}</td>
                                </tr>
                                )
                    })
                }
                
            </table>
            <h3 style={{ marginTop: '1rem' }}>
                Total: {formattedTotal}
            </h3>
            <button>Back</button>
            <button>Complete Order</button>
            
        </>
    );
};

export default Cart;