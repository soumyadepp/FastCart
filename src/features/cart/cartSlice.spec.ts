import cartReducer, {
    CartState,
    addToCart,
    removeFromCart,
    Product
} from './cartSlice';

const TEST_PRODUCT: Product = {
    id: 4,
    price: 90000,
    quantity: 1
};

const TEST_PRODUCTS: Product[] = [
    {
        id: 1,
        price: 100,
        quantity: 1
    },
    {
        id: 2,
        price: 200,
        quantity: 2
    },
    {
        id: 3,
        price: 50000,
        quantity: 1
    }
];

const AFTER_ADDED_EXISTING: Product[] = [
    {
        id: 1,
        price: 100,
        quantity: 2
    },
    {
        id: 2,
        price: 200,
        quantity: 2
    },
    {
        id: 3,
        price: 50000,
        quantity: 1
    }
];

const AFTER_REMOVED_EXISTING: Product[] = [
    {
        id: 1,
        price: 100,
        quantity: 1
    },
    {
        id: 2,
        price: 200,
        quantity: 1
    },
    {
        id: 3,
        price: 50000,
        quantity: 1
    }
];

describe('cart reducer', () => {
    const initialState: CartState = {
        value: 50500,
        products: TEST_PRODUCTS
    };
    it('should handle initial state', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
            value: 0,
            products: []
        });
    });

    it('should handle add to cart when there are no instances of the current product in the cart', 
    () => {
        const actual = cartReducer(initialState, addToCart({
            product: TEST_PRODUCT
        }));
        const afterAdded = [...TEST_PRODUCTS, TEST_PRODUCT];
        expect(actual.value).toEqual(140500);
        expect(actual.products).toBe(afterAdded);
    });

    it('should handle add to cart when there is already an instance of the current product in the cart', 
    () => {
        const actual = cartReducer(initialState,addToCart({
            product: {
                id: 1,
                price: 100,
                quantity: 1
            }
        }));
        
        expect(actual.value).toBe(50400);
        expect(actual.products).toBe(AFTER_ADDED_EXISTING);
    });

    it('should handle remove from cart when there is single instance of a product', () => {
        const actual = cartReducer(initialState, removeFromCart({
            product: {
                id: 1,
                price: 100,
                quantity: 1
            }
        }));
        const afterRemoved = TEST_PRODUCTS.filter(p => p.id !== 1);
        expect(actual.value).toEqual(50200);
        expect(actual.products).toEqual(afterRemoved);
    });

    it('should handle remove from cart when there is existing instance of a product in the cart', 
    () => {
        const actual = cartReducer(initialState,removeFromCart({
            product: {
                id: 2,
                price: 200,
                quantity: 1
            }
        }));
        
        expect(actual.value).toBe(50300);
        expect(actual.products).toBe(AFTER_REMOVED_EXISTING);
    })
});
