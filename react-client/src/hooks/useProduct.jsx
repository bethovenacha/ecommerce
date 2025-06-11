import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productActions } from '../redux/store/product';
import { getOrSetUUID } from "../utilities/session";

const useProduct = () => {
    const dispatch = useDispatch();
    const url = 'http://localhost:3000/api/product';
    //Fetches product via shop id
     const fetchProductsByShopId = async (shopId) => {
            try {
                const res = await fetch(`${url}/shop/?shopId=${shopId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        const products = data.map(prod => ({...prod,sessionId: getOrSetUUID()}));
                        dispatch(productActions.clear());
                        dispatch(productActions.create(products));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        //fetches product by product id
    const fetchProductByProductId = async (productId) => {
            try {
                const res = await fetch(`${url}/?productId=${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        const products = data.map(prod => ({...prod,sessionId: getOrSetUUID()}));
                        dispatch(productActions.clear());
                        dispatch(productActions.create(products));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
    return {fetchProductByProductId,fetchProductsByShopId};
};

export default useProduct;
