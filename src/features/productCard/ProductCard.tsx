import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductData } from '../../app/types/types';
import { useAppSelector } from '../../app/hooks';
import { Product, selectCart } from '../cart/cartSlice'
import DynamicButton from '../common/dynamicButton/DynamicButton';
import styles from './ProductCard.module.css';
import { Rating } from 'react-simple-star-rating';

type ProductCardPropType = {
    product: ProductData;
    uniqueKey:number;
}

export default function ProductCard(props: ProductCardPropType) {
    const { id, name, description, price, imageURL, rating } = props.product;
    const {uniqueKey} = props;
    const cart = useAppSelector(selectCart);
    const [quantityFromCart, setQuantityFromCart] =
        useState<number | undefined>(cart.products.find(p => p.id === id)?.quantity);
    const editableProduct: Product = {
        id,
        price,
        quantity: 1,
    };
    const renderCurrency = (amount: number) => {
        return `$ ${amount.toFixed(2)}`
    }
    useEffect(() => {
        setQuantityFromCart(cart.products.find(p => p.id === id)?.quantity);
    }, [cart, id])
    return (
        <Link key={uniqueKey} to={`/product/${id}`} state={{ product: props.product, quantityFromCart: quantityFromCart }}
            style={{ textDecoration: 'none' }}>
            <div className={styles.productCard}>
                <div className={styles.productHeader}>
                    <img className={styles.image} src={imageURL} alt={name} />
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <div className={styles.description}>
                        <p className={styles.price}>{renderCurrency(price)}</p>
                        <Rating fillColor='#0d6efd' size={22} initialValue={Math.max(rating, 0)} allowFraction readonly />
                    </div>
                </div>
                <DynamicButton isQuantity={quantityFromCart && quantityFromCart > 0}
                    quantityFromCart={quantityFromCart} name={name} editableProduct={editableProduct} />
            </div>
        </Link>
    )
}
