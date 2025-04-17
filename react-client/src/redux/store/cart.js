import { createSlice} from '@reduxjs/toolkit';

const cartInitialState = {
    cart:[]
};
const cartSlice = createSlice({
    name:"cart",
    initialState: cartInitialState,
    reducers:{
        create(state, action) {
            const existing = state.cart.find(p => p.id === action.payload.id);
            if (existing) return state;
            return {
              ...state,
              cart: [...state.cart, { ...action.payload, quantity: 1}],
            };
        },
        clearCart(state) {
            return {
              ...state,
              cart: [],
            };
        },
        delete(state, action) {
            return {
              ...state,
              cart: state.cart.filter(item => item.id !== action.payload),
            };
        },
        updateItem(state, action) {
            const { id, quantity } = action.payload;
            return {
              ...state,
              cart: state.cart.map(item =>
                item.id === id ? { ...item, quantity } : item
              ),
            };
        }
    }
});
export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

export default cartSlice;