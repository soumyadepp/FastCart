import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../../app/hooks';
import { addToCart, Product, removeFromCart } from '../../cart/cartSlice';
import Button from '../button/Button';
import styles from './DynamicButton.module.css';

type DynamicButtonPropType = {
    editableProduct: Product;
    name: string;
    fullRoundedBase?:boolean;
    isQuantity?:boolean | 0 | undefined;
    quantityFromCart: number | undefined;
}

export default function DynamicButton(props: DynamicButtonPropType) {
    const { quantityFromCart,fullRoundedBase, name, editableProduct,isQuantity } = props;
    const dispatch = useAppDispatch();
    const [toastId,setToastId] = useState<any>(null);
    const handleAddToCart = (e: React.MouseEvent) => {
        toast.dismiss(toastId);
        e.preventDefault();
        e.stopPropagation();
        if (quantityFromCart) {
            setToastId(toast.success(`Added ${quantityFromCart + 1} ${name}s to cart.`,{
                duration:500
            }));    
        }
        else {
            setToastId(toast.success(`Added ${name} to cart.`,{
                duration:500
            }));
        }
        dispatch(addToCart({
            product: editableProduct
        }));
    }
    const handleRemoveFromCart = (e: React.MouseEvent) => {
        toast.dismiss(toastId);
        e.preventDefault();
        e.stopPropagation();
        if(quantityFromCart === 1){
            toast.success(`Removed ${name} from cart.`);
        }
        dispatch(removeFromCart({
            product: editableProduct
        }))
    }
    return (
        <div className={isQuantity ? styles.quantityButtonDiv : styles.buttonDiv}>
            {(!quantityFromCart || quantityFromCart === 0) && <Button fullRounded={fullRoundedBase} text="Add To Cart" full handleClick={handleAddToCart}/>}
            {quantityFromCart !== 0 && quantityFromCart !== undefined && <div className={styles.itemQuantity} onClick={e => e.preventDefault()}>
                <button className={styles.actionButton} onClick={handleRemoveFromCart}>-</button>
                <input type="text" readOnly value={quantityFromCart} className={styles.quantityInput} />
                <button className={styles.actionButton} onClick={handleAddToCart}>+</button>
            </div>}
        </div>
    )
}
