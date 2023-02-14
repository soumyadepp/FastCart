import { useEffect, useState } from 'react';
import { mockProductData } from '../../app/data/products';
import { CategoryEnum,ProductData } from '../../app/types/types';
import ProductCard from '../productCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList() {
  const [productListData, setProductListData] = useState<ProductData[]>(mockProductData);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const categories = Object.keys(CategoryEnum);
  const categoryValues = Object.values(CategoryEnum);
  const handleFilterChange = (e: any) => {
    setFilterCategory(e.target.value);
  }
  useEffect(() => {
    if (filterCategory.length === 0) setProductListData(mockProductData);
    if (filterCategory.length > 0)
      setProductListData(mockProductData.filter(item => item.category === filterCategory));
  }, [filterCategory]);
  return (
    <div className={styles.productListWrapper}>
      <div className={styles.productSearchFilter}>
        <select className={styles.filterCategoryDropdown} value={filterCategory} onChange={handleFilterChange}>
          <option value="">All</option>
          {categories.map((c, index) => {
            return (
              <option value={categoryValues[index]}>{c}</option>
            )
          })}
        </select>
      </div>
      <div className={styles.productList}>
        {productListData.map((product: ProductData) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    </div>
  )
}
