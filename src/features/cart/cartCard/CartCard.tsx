import { useAppDispatch } from '../../../app/hooks';
import { addToCart, Product, removeFromCart } from '../cartSlice'
import styles from './CartCard.module.css';
import { mockProductData } from '../../../app/data/products';
import { ProductData } from '../../../app/types/types';
import { toast } from 'react-hot-toast';
import { Rating } from 'react-simple-star-rating';
import { Link } from 'react-router-dom';

type CartCardPropType = {
    product: Product;
}

export default function CartCard(props: CartCardPropType) {
    const { id, quantity, price } = props.product;
    const { name, description, imageURL,rating } = mockProductData.find(p => p.id === id) as ProductData;
    const dispatch = useAppDispatch();
    const editableProduct: Product = {
        id,
        quantity: 1,
        price
    }
    const renderCurrency = (amount: number) => {
        return `$ ${amount.toFixed(2)}`
    }
    const handleAddToCart = () => {
        dispatch(addToCart({
            product: editableProduct
        }));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({
            product: editableProduct
        }));
        if (quantity === 1)
            toast.success(`${name} removed from cart`);
    };

    return (
        <div className={styles.cartCardWrapper} key={id}>
            <div className={styles.cartCardImage}>
                <img src={imageURL} className={styles.productImage} alt={name} />
            </div>
            <div className={styles.cartCardDescription}>
                <h3>{name}</h3>
                <div className={styles.priceRatingWrapper}>
                    <p className={styles.price}>{renderCurrency(price)}</p>
                    <Rating initialValue={rating} readonly fillColor='#0d6efd' size={20}/>
                </div>
                <p className={styles.description}>{description}</p>
                <Link style={{textDecoration:'none'}} to ={`/product/${id}`} state={{product:mockProductData.find(p => p.id === id)}}>
                    <button className={styles.seeMoreButton}>See More</button>
                </Link>
            </div>
            <div className={styles.cartCardProductActions}>
                <button className={styles.editButton} onClick={handleRemoveFromCart}>-</button>
                <input readOnly className={styles.quantityInput} type="text" value={quantity} />
                <button className={styles.editButton} onClick={handleAddToCart}>+</button>
            </div>
        </div>
    )
}
