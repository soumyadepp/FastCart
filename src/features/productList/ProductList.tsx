import { useEffect, useState } from 'react';
import { mockProductData, ProductData } from '../../app/data/products';
import ProductCard from '../productCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList() {
  const [productListData, setProductListData] = useState<ProductData[]>(mockProductData);
  const [searchInput, setSearchInput] = useState<string>("");
  
  useEffect(() => {
    setProductListData(mockProductData.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase())));
  },[searchInput])
  return (
    <div className={styles.productListWrapper}>
      <div className={styles.productSearchFilter}>
        <input className={styles.searchBarInput} value={searchInput} onChange={e=>setSearchInput(e.target.value)} type="search" placeholder="Search" />
      </div>
      <div className={styles.productList}>
        {productListData.map((product: ProductData) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    </div>
  )
}
