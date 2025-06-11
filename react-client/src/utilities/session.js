import { v4 as uuidv4 } from 'uuid';

export const getOrSetUUID = () => {
    let uuid = localStorage.getItem('shop_uuid');
    if (!uuid) {
        uuid = uuidv4(); 
        localStorage.setItem('shop_uuid', uuid);
    }
    return uuid;
};

