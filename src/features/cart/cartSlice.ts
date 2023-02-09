import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Product {
    id: number;
    quantity: number;
    price:number;
}

export interface CartState {
    value: number;
    products: Array<Product>;
}

export type ActionType = {
    type: string;
    payload: {
        product: Product;
    };
}

const initialState: CartState = {
    value: 0,
    products: [],
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: ActionType) => {
            /**
             * This reducer will add a product to the cart. If the product already exists,
             * then it will just increment the quantity of the product by one,
             * else it will just append the product to the list of all the products.
             * In all cases, it will increase the cart value by the cost of a single instance of that product. 
             * **/
            const { product } = action.payload;
            const existingProductIndex = state.products.findIndex(p => p.id === product.id);
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].quantity += 1;
            }
            else {
                state.products = [...state.products, product];
            }
            state.value += product.price;
        },
        removeFromCart: (state, action: ActionType) => {
            /** 
             * This reducer will remove a product from the cart. If the product already exists,
             * then it will just decrement the quantity of the product by one.
             * If the quantity of the product becomes 0 after the decrement,
             * it will filter out the product from the list of products.
             * **/
            const { product } = action.payload;
            const existingProductIndex = state.products.findIndex(p => p.id === product.id);
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].quantity -= 1;
                if (state.products[existingProductIndex].quantity === 0) {
                    state.products.filter(p => p.id !== product.id);
                }
                state.value -= product.price;
            }
        },
        /** 
         * This reducer will clear the cart and remove all the products
         * and will set the value to 0, indicating that there is nothing in the cart.
         * **/
        clearCart: (state) => {
            state.value = 0;
            state.products = [];
        },
    },
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
