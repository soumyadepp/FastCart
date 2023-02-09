import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import  { addToCart, Product, removeFromCart, selectCart } from '../cartSlice'
import styles from './CartCard.module.css';
import {mockProductData, ProductData} from '../../../app/data/products';
import { toast } from 'react-hot-toast';

type CartCardPropType = {
    product: Product;
}

export default function CartCard(props: CartCardPropType) {
    const {id,quantity,price} = props.product;
    const {name,description,imageURL} = mockProductData.find(p => p.id === id) as ProductData;
    const dispatch = useAppDispatch();
    const editableProduct: Product = {
        id,
        quantity: 1,
        price
    }
    
    const handleAddToCart = () => {
        dispatch(addToCart({
            product:editableProduct
        }));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({
            product:editableProduct
        }));
        if(quantity === 1 ) 
            toast.success(`${name} removed from cart`);
    };

    return (
        <div className={styles.cartCardWrapper}>
            <div className={styles.cartCardImage}>
                <img src={imageURL} className={styles.productImage} alt={name}/>
            </div>
            <div className={styles.cartCardDescription}>
                <h3>{name}</h3>
                <p>$ {price}</p>
                <p>{description}</p>
            </div>
            <div className={styles.cartCardProductActions}>
                <button className={styles.editButton} onClick={handleRemoveFromCart}>-</button>
                <input readOnly className={styles.quantityInput} type="text" value={quantity}/>
                <button className={styles.editButton} onClick={handleAddToCart}>+</button>
            </div>
        </div>
    )
}
