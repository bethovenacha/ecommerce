import { createSlice} from '@reduxjs/toolkit';

const shopInitialState = {
    shop:[]
};

const shopSlice = createSlice({
    name:"shop",
    initialState: shopInitialState,
    reducers:{
        create(state, action) {
            const newShops = Array.isArray(action.payload) ? action.payload : [action.payload];
            const filtered = newShops.filter(s => 
                Array.isArray(state.shop) && !state.shop.some(existing => existing.id === s.id)
            );
            return {
                ...state,
                shop: [...state.shop, ...filtered]
            };
        },
        clear(state) {
            return {
                ...state,
                shop: []
            };
        }
    }
});

export const shopReducer = shopSlice.reducer;
export const shopActions = shopSlice.actions;

export default shopSlice;