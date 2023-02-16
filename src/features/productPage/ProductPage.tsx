import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductData } from '../../app/types/types';
import { useAppSelector } from '../../app/hooks';
import { Product, selectCart } from '../cart/cartSlice';
import { Rating } from 'react-simple-star-rating';
import DynamicButton from '../common/dynamicButton/DynamicButton';
import styles from './ProductPage.module.css';
import RatingChip from '../common/ratingChip/RatingChip';
import Button from '../common/button/Button';


export default function ProductPage() {
  const cart = useAppSelector(selectCart);
  const location = useLocation();
  const { id, name, description, imageURL, details, price, rating } = location.state.product as ProductData;
  const [quantityFromCart, setQuantityFromCart] = useState<number | undefined>(location.state.quantityFromCart);
  const editableProduct: Product = {
    id,
    price,
    quantity: 1
  }

  const renderPrice = () => {
    return <h4>$ {price.toFixed(2)}</h4>
  }

  useEffect(() => {
    setQuantityFromCart(cart.products.find(p => p.id === id)?.quantity);
  }, [cart, id]);

  return (
    <div className={styles.productPageWrapper} key={id}>
      <div className={styles.productPageLeft}>
        <img src={imageURL} alt={name} className={styles.productImage} />
      </div>
      <div className={styles.productPageRight}>
        <div className={styles.productPageHeader}>
          <h2>{name}</h2>
          <div className={styles.productPageDescriptionUpper}>
            <p>{description}</p>
          </div>
          <div className={styles.ratingLabel}>
            <Rating style={{ marginInlineEnd: '12px' }} size={24}
              readonly allowFraction fillColor='#0d63fd' initialValue={rating} />
            <RatingChip rating={rating} />
          </div>
          <div className={styles.productPrice}>
            {renderPrice()}
          </div>
        </div>
        <div className={styles.productPageDescription}>
          <div className={styles.productPageDescriptionLower}>
            <p>{details}</p>
          </div>
          <div className={styles.buttonWrapper}>
            <DynamicButton isQuantity={quantityFromCart && quantityFromCart > 0}
              fullRoundedBase quantityFromCart={quantityFromCart}
              editableProduct={editableProduct} name={name} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button text="Buy Now" full={true} outlined={true} handleClick={() => console.log('hello')} />
          </div>
        </div>
      </div>
    </div>
  )
}
