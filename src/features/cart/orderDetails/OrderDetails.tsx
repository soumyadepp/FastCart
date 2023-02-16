import { useAppSelector } from '../../../app/hooks';
import { selectCart } from '../cartSlice';
import OrderDetail from './OrderDetail';
import styles from './OrderDetails.module.css';

export default function OrderDetails() {
    const cart = useAppSelector(selectCart);
    const products = cart.products;
    const totalValue = cart.value;
    return (
        <div className={styles.orderDetailsContainer}>
            <div className={styles.orderDetailsHeader}>
                <h2>Order Details</h2>
            </div>
            <div className={styles.orderDetailsContent}>
                <ul className={styles.orderDetailsList}>
                    {products.map((p,index) => {
                        if (p.quantity > 0)
                            return (
                                <li key={index}><OrderDetail product={p} key={index}/></li>
                            )
                        else return <></>
                    })}
                </ul>
            </div>
            <table className={styles.orderDetailsFooter}>
                <tbody>
                    <tr className={styles.orderDetailsContent}>
                        <td>
                            Total:
                        </td>
                        <td>
                            $ {totalValue}
                        </td>
                    </tr>
                    <tr className={styles.orderDetailsButton}>
                        <td>
                            <button type="button" className={styles.checkoutButton}>Checkout</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
