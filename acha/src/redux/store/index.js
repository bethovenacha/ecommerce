import { configureStore } from '@reduxjs/toolkit'; // Use ES module import

const initialState = {
    reduxProducts:
    [
    {id:"5e9b3b6a-183a-4817-8358-be330879fa68",name:"HP Laptop", video:"hpLaptop.mp4", image:"hpLaptop.jfif", unitPrice:20000, stockCount:10},
    {id:"e0140363-c313-43fc-9b79-62f642a30e56",name:"Mac Laptop", video:"macLaptop.mp4", image:"macLaptop.jfif", unitPrice:30000, stockCount:20},
    {id:"e7922260-b1eb-4320-b58f-425aedb51058",name:"Acer Laptop", video:"acerLaptop.mp4", image:"acerLaptop.jfif", unitPrice:40000, stockCount:30}
    ]
};
// takes in old state and the action that describes what to do with the state and return a new object state
const salableProductReducer = (state = initialState, action)=>{
    switch(action.type) {
        case "showSalableProducts":
            return state;  // Return the list of products (state)
        case "addProduct":
            if (state.reduxProducts.some(p => p.id === action.newProduct.id)) {
                return state; // Don't add duplicate
            }
            return {
                ...state,
                reduxProducts: [...state.reduxProducts, action.newProduct]
            };
        case "updateProduct":
            return {
                ...state,
                reduxProducts: state.reduxProducts.map(product =>
                    product.id === action.updatedProduct.id
                        ? { ...product, ...action.updatedProduct }
                        : product
                )
            };
        case "deleteProduct":
            return {
                ...state,
                reduxProducts: state.reduxProducts.filter(product =>
                    product.id !== action.productId
                )
            };
        case "retrieveProduct":
            return store.getState().reduxProducts.filter(product => 
                product.name.toLowerCase().includes(action.productName)
            );
        default:
            return state;
    }
};
// contains the reducer that changes the data state
const store = configureStore({
    reducer:salableProductReducer
});
export default store;
/*
//used by the component to subscribe to the store
const salableProductSubscriber = ()=>{
    const state = store.getState();
    console.log(state);
};
//subscribes to the store, so that when the state is changed, the component gets notified
store.subscribe(salableProductSubscriber);

//dispatches an action of type showSalableProducts
store.dispatch({type:"showSalableProducts"});
*/