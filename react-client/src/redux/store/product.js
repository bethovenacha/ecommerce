import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    products:[]
};

const productSlice = createSlice({
    name:"product",
    initialState: initialState,
    reducers:{
        create(state, action) {
            const newProducts = Array.isArray(action.payload) ? action.payload : [action.payload];
            const filtered = newProducts.filter(s => 
                Array.isArray(state.products) && !state.products.some(existing => existing.id === s.id)
            );
            return {
                ...state,
                products: [...state.products, ...filtered]
            };
        },
        update(state, action){
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id
                        ? { ...product, ...action.payload }
                        : product
                )
            };
        },
        delete(state, action){
            return {
                ...state,
                products: state.products.filter(product =>
                    product.id !== action.payload
                )
            };
        },
        retrieveProductByName(state){
            return state.products.filter(product => 
                product.name.toLowerCase().includes(action.payload)
            );
        },
        retrieve(state){
            return state;
        },
        clear(state) {
            return {
                ...state,
                products: []
            };
        }
    }
});
export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

export default productSlice;
