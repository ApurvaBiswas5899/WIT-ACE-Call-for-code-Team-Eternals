import Cart from '../../client/cart';
import { CART} from '../../utils/cart';



export function showCart() {
    return async (dispatch) => {
        const result = await Cart.showCart();
        if (result.success) {
            dispatch({  
                type: CART.showCart,
            });
        }
        return result;
    };
}
export function addItems(values) {
    return async (dispatch) => {
        const result = await Cart.addItems(values);
        if (result.success) {
            dispatch({  
                type:CART.addItems,
            });
        }
       
        return result;
    };
}
export function removeItems(values) {
    return async (dispatch) => {
        const result = await Cart.removeItems(values);
        if (result.success) {
            dispatch({  
                type: CART.removeItems,
            });
        }
        return result;
    };
}
