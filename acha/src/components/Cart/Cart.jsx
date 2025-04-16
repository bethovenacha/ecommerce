import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Cart = ()=>{
    const [orderQuantity,setOrderQuantity] = useState(1);
    const params = useParams();
    const state = useSelector(state => state.reduxProducts);

    const product = state.filter(prod => prod.id == params.id);
    console.log(product[0]);

    const onOrderQuantityChange = (event)=>{
        setOrderQuantity(event.target.value);
    };
    return(
        <>
            <button>Back</button>
            <button>Complete Order</button>
            <table>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Sub Total</th>
                <tr key={params.id} id={params.id}>
                    <td>{}</td>
                    <td>
                        <input type="number" min={1} value={orderQuantity} onChange={onOrderQuantityChange}/>
                    </td>
                    <td>{}</td>
                    <td>{}</td>
                </tr>
            </table>
            <button>Back</button>
            <button>Complete Order</button>
            
        </>
    );
};

export default Cart;