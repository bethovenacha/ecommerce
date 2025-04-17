import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    products:
    [
    {id:"5e9b3b6a-183a-4817-8358-be330879fa68",name:"HP Laptop", video:"hpLaptop.mp4", image:"hpLaptop.jfif", unitPrice:20000, stockCount:10},
    {id:"e0140363-c313-43fc-9b79-62f642a30e56",name:"Mac Laptop", video:"macLaptop.mp4", image:"macLaptop.jfif", unitPrice:30000, stockCount:20},
    {id:"e7922260-b1eb-4320-b58f-425aedb51058",name:"Acer Laptop", video:"acerLaptop.mp4", image:"acerLaptop.jfif", unitPrice:40000, stockCount:30}
    ]
};

const productSlice = createSlice({
    name:"product",
    initialState: initialState,
    reducers:{
        create(state, action){
            if (state.products.some(p => p.id === action.payload.id)) {//NOTE: "payload" is the default property when accessing your data passed from actions
                return state; // Don't add duplicate
            }
            return {
                ...state,
                products: [...state.products, action.payload]
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
        }
    }
});
export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

export default productSlice;
