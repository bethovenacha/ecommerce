import { useSelector } from "react-redux";
import { cartActions } from "../../redux/store/cart";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import storage from 'redux-persist/lib/storage';

const Cart = ()=>{
    const shop = useSelector(state => state.shopReducer.shop);
    const result = useSelector(state => state.cartReducer.cart);
    let uuid = localStorage.getItem('shop_uuid');
    const cart = result.filter(c=>c.shopId == shop[0].id && c.sessionId == uuid);    

    const dispatch = useDispatch();

    const onOrderQuantityChange = (event, id) => {
        const quantity = parseInt(event.target.value, 10);
        dispatch(cartActions.updateItem({ id, quantity }));
    };

     // Calculate the total amount
    const totalAmount = cart.reduce((sum, product) => {
        return sum + (product.unitPrice * product.quantity);
    }, 0);

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        }).format(totalAmount);

    const onPurge = ()=>{
        let uuid = localStorage.getItem('shop_uuid');
        storage.removeItem(`persist:cartReducer_${uuid}`).then(() => {
            dispatch(cartActions.clear()); // Clear in-memory cart state
            console.log('Cart state purged.');
        });
    };
    return(
        <>
            <button>Back</button>
            <Link to={`/Paypal`}><button>Complete Order</button></Link>
            <button onClick={onPurge}>Clear</button>
            <table>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Sub Total</th>
                {
                    cart && cart.map((product)=>{
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