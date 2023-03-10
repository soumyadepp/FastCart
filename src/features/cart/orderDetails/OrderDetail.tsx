import styles from './OrderDetail.module.css';
import { mockProductData } from '../../../app/data/products';
import { Product } from '../cartSlice';

type OrderDetailPropType = {
    product: Product;
}

export default function OrderDetail(props:OrderDetailPropType) {
    const {id,price,quantity} = props.product;
    const productData = mockProductData.find(p => p.id === id);
    return (
    <div className={styles.orderDetailRow} key={id}>
        {productData && <div className={styles.productRow}>
            <div className={styles.productName}>{productData?.name} ({quantity})</div>
            <div className={styles.productTotalPrice}>$ {price*quantity}</div>
        </div>}
    </div>
  )
}
