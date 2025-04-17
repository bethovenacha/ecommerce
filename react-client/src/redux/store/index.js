import { configureStore} from '@reduxjs/toolkit'; // Use ES module import
import {cartReducer} from './cart';
import {productReducer} from './product';
// contains the reducer that changes the data state
const store = configureStore({
    reducer:{cartReducer, productReducer}
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