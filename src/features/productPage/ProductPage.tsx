import { useParams } from 'react-router-dom';
import { mockProductData, ProductData } from '../../app/data/products';
import styles from './ProductPage.module.css';


export default function ProductPage() {
  const {id} = useParams();
  const product = mockProductData.find(p => p.id === parseInt(id as string) as unknown as number) as ProductData;
  console.log(product);
  const {id:pid,name,description,details,imageURL,price} = product;
  return (
    <div className={styles.productPageWrapper} key={pid}>
        <div className={styles.productPageLeft}>
            <img src={imageURL} alt={name} className={styles.productImage}/>
            <div className={styles.productPageOptions}>
              <button type="button" className={styles.addToCartButton}>Add to Cart</button>
              <button type="button" className={styles.buyNowButton}>Buy Now</button>
            </div>
        </div>
        <div className={styles.productPageRight}>
            <div className={styles.productPageHeader}>
                <h2>{name}</h2>
            </div>
            <div className={styles.productPageDescription}>
              <div className={styles.productPageDescriptionUpper}>
                <p>{description}</p>
              </div>
              <div className={styles.productPageDescriptionLower}>
                <p>{details}</p>
              </div>
              <div className={styles.productPrice}>
                <h4>${price}</h4>
              </div>
            </div>
        </div>
    </div>
  )
}
