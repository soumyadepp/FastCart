import React from 'react'
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
                    {products.map(p => {
                        if (p.quantity > 0)
                            return (
                                <li key={p.id}><OrderDetail product={p} /></li>
                            )
                        else return <></>
                    })}
                </ul>
            </div>
            <div className={styles.orderDetailsFooter}>
                <div className={styles.orderDetailsContent}>
                    <td>
                        Total:
                    </td>
                    <td>
                        $ {totalValue}
                    </td>
                </div>
                <div className={styles.orderDetailsButton}>
                    <button type="button" className={styles.checkoutButton}>Checkout</button>
                </div>
            </div>
        </div>
    )
}
