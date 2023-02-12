import React from 'react'
import ProductList from '../productList/ProductList';
import styles from './Homepage.module.css';
export default function Homepage() {
  return (
    <div className={styles.homepagewrapper}>
        <div className={styles.homepageBody}>
        <ProductList/>
        </div>
    </div>
  )
}
