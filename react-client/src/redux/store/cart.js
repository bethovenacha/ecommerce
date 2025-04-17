import { createSlice} from '@reduxjs/toolkit';

const cartInitialState = {
    cart:[]
};
const cartSlice = createSlice({
    name:"cart",
    initialState: cartInitialState,
    reducers:{
        add(state , action){
            if (cartInitialState.cart.some(p => p.id === action.payload.id)) {
                return state; // Don't add duplicate
            }
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        }
    }
});
export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

export default cartSlice;