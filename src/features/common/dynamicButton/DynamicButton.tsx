import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../../app/hooks';
import { addToCart, Product, removeFromCart } from '../../cart/cartSlice';
import Button from '../button/Button';
import styles from './DynamicButton.module.css';
import io from 'socket.io-client';

const socket = io();

type DynamicButtonPropType = {
    editableProduct: Product;
    name: string;
    fullRoundedBase?:boolean;
    quantityFromCart: number | undefined;
}

export default function DynamicButton(props: DynamicButtonPropType) {
    const { quantityFromCart,fullRoundedBase, name, editableProduct } = props;
    const dispatch = useAppDispatch();
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantityFromCart) {
            toast.success(`Added ${quantityFromCart + 1} ${name}s to cart.`);
        }
        else {
            toast.success(`Added ${name} to cart.`);
        }
        dispatch(addToCart({
            product: editableProduct
        }));
    }
    const handleRemoveFromCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeFromCart({
            product: editableProduct
        }))
    }
    useEffect(() => {
        socket.on('connect',() => {
            console.log('hello');
        });
    },[])
    return (
        <div className={styles.buttonDiv}>
            {(!quantityFromCart || quantityFromCart === 0) && <Button fullRounded={fullRoundedBase} text="Add To Cart" full handleClick={handleAddToCart}/>}
            {quantityFromCart !== 0 && quantityFromCart !== undefined && <div className={styles.itemQuantity} onClick={e => e.preventDefault()}>
                <button className={styles.actionButton} onClick={handleRemoveFromCart}>-</button>
                <input type="text" readOnly value={quantityFromCart} className={styles.quantityInput} />
                <button className={styles.actionButton} onClick={handleAddToCart}>+</button>
            </div>}
        </div>
    )
}
