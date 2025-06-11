import { useDispatch } from "react-redux";
import { shopActions } from "../redux/store/shop";
import { getOrSetUUID } from "../utilities/session";

const useShop = () => {
    const url = 'http://localhost:3000/api/shop';
    const dispatch = useDispatch();
    //Fetches shop by shop Id
    const fetchShopByShopId = async (shopId) => {
            try {
                const res = await fetch(`${url}/?shopId=${shopId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        const shop = data.map(shop => ({...shop,sessionId: getOrSetUUID()}));
                        dispatch(shopActions.clear());
                        dispatch(shopActions.create(shop));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch shop:", error);
            }
        };
        //fetches shop by product id
    const fetchShopByProductId = async (productId) => {
            try {
                const res = await fetch(`${url}/product/?productId=${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        const shop = data.map(shop => ({...shop,sessionId: getOrSetUUID()}));
                        dispatch(shopActions.clear());
                        dispatch(shopActions.create(shop));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch shop:", error);
            }
        };

    return {fetchShopByProductId,fetchShopByShopId};

};

export default useShop;
