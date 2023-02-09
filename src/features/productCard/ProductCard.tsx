import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ProductData } from '../../app/data/products';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, Product, removeFromCart, selectCart } from '../cart/cartSlice'
import styles from './ProductCard.module.css';
type ProductCardPropType = {
    product: ProductData;
}

export default function ProductCard(props: ProductCardPropType) {
    const { id, name, description, price, imageURL } = props.product;
    const cart = useAppSelector(selectCart);
    const [quantityFromCart, setQuantityFromCart] =
        useState<number | undefined>(cart.products.find(p => p.id === id)?.quantity);
    const dispatch = useAppDispatch();
    const editableProduct: Product = {
        id,
        price,
        quantity: 1,
    };
    const handleAddToCart = () => {
        if(quantityFromCart){
            toast.success(`Added ${quantityFromCart + 1} ${name}s to cart.`);
        }
        else{
            toast.success(`Added ${name} to cart.`);
        }
        dispatch(addToCart({
            product: editableProduct
        }));
    }
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({
            product: editableProduct
        }))
    }
    useEffect(() => {
        setQuantityFromCart(cart.products.find(p => p.id === id)?.quantity);
    }, [cart])
    return (
        <div className={styles.productCard}>
            <div className={styles.productHeader}>
                <img className={styles.image} src={imageURL} alt={name} />
                <h3>{name}</h3>
                <div className={styles.description}>
                    <p>{description}</p>
                    <p className={styles.price}>$ {price}</p>
                </div>
            </div>
            <div className={styles.buttonDiv}>
                {(!quantityFromCart || quantityFromCart === 0) && <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>}
                {quantityFromCart !== 0  && quantityFromCart !== undefined && <div className={styles.itemQuantity}>
                    <button className={styles.actionButton} onClick={handleRemoveFromCart}>-</button>
                    <input type="number" readOnly value={quantityFromCart} className={styles.quantityInput} />
                    <button className={styles.actionButton} onClick={handleAddToCart}>+</button>
                </div>}
            </div>
        </div>
    )
}
