import { useAppSelector } from '../../app/hooks'
import { Product, selectCart } from './cartSlice'
import styles from './Cart.module.css';
import CartCard from './cartCard/CartCard';
import OrderDetails from './orderDetails/OrderDetails';
import emptyCartImage from '../../assets/empty_cart.svg';
export default function Cart() {
  const cart = useAppSelector(selectCart);
  const products: Product[] = cart.products;
  const itemsToBeShown = cart.products.reduce((acc, item) => {
    if (item.quantity > 0) return acc + 1;
    else return acc;
  }, 0)
  if (cart.value > 0)
    return (
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>
          <h3>{itemsToBeShown} {itemsToBeShown === 1 ? 'item' : 'items'}</h3>
        </div>
        <div className={styles.cartBody}>
          <div className={styles.cartBodyLeft}>
            <div className={styles.cartWrapper}>
              {products && products.map((p: Product,index) => {
                if (p.quantity > 0)
                  return <CartCard product={p} key={index} />
                else return <></>
              })}
            </div>
          </div>
          <div className={styles.cartBodyRight}>
            <OrderDetails/>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className={styles.emptyCart}>
        <img src={emptyCartImage} className={styles.emptyCartImage} alt="Empty Cart"/>
        <h2>Your Cart is Empty!</h2>

      </div>
    );
}
