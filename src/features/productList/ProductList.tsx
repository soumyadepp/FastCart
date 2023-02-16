import { useEffect, useState } from 'react';
import { mockProductData } from '../../app/data/products';
import { useAppSelector } from '../../app/hooks';
import { CategoryEnum, ProductData } from '../../app/types/types';
import { selectFilter, SortingAttributeEnum, SortTypeEnum } from '../filterSidebar/filterSlice';
import ProductCard from '../productCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList() {
  const [filterCategory, setFilterCategory] = useState<string>("");
  const categories = Object.keys(CategoryEnum);
  const categoryValues = Object.values(CategoryEnum);
  const { priceSortOrder, ratingSortOrder, sortByAttribute } = useAppSelector(selectFilter);
  const [productListData, setProductListData] = useState<ProductData[]>(mockProductData);
  const handleFilterChange = (e: any) => setFilterCategory(e.target.value);
  
  useEffect(() => {
    if (filterCategory.length === 0) setProductListData(mockProductData);
    else setProductListData(mockProductData.filter(item => item.category === filterCategory));
  }, [filterCategory]);

  useEffect(() => {
    if (sortByAttribute === null && priceSortOrder === null && ratingSortOrder === null) {
      if (filterCategory.length > 0) setProductListData([...mockProductData.filter(item => item.category === filterCategory)]);
      else setProductListData([...mockProductData]);
    }
    if (sortByAttribute === SortingAttributeEnum.price) {

      if (priceSortOrder === SortTypeEnum.asc) setProductListData([...productListData.sort((a, b) => a.price - b.price)]);

      else setProductListData([...productListData.sort((a, b) => b.price - a.price)]);
    }
    if (sortByAttribute === SortingAttributeEnum.rating) {

      if (ratingSortOrder === SortTypeEnum.asc) setProductListData([...productListData.sort((a, b) => a.rating - b.rating)]);

      else setProductListData([...productListData.sort((a, b) => b.rating - a.rating)]);
    }
  }, [filterCategory,priceSortOrder, ratingSortOrder, sortByAttribute]);

  const renderFilterHeader = () => {
    if (priceSortOrder !== null) {
      return <div className={styles.filterHeader}>
        {filterCategory !== "" ? filterCategory : 'All'} Products Sorted {priceSortOrder === SortTypeEnum.asc ? 'low to high' : 'high to low'} by Price.
      </div>
    }
    if (ratingSortOrder !== null) {
      return <div className={styles.filterHeader}>
        {filterCategory !== "" ? filterCategory : 'All'} Products Sorted {ratingSortOrder === SortTypeEnum.asc ? 'low to high' : 'high to low'} by Rating.
      </div>
    }
  }

  return (
    <div className={styles.productListWrapper}>
      <div className={styles.productSearchFilter}>
        <select className={styles.filterCategoryDropdown} value={filterCategory} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map((c, index) => {
            return (
              <option key={index} value={categoryValues[index]}>{c}</option>
            )
          })}
        </select>
      </div>
      <div className={styles.listHeader}>
        {renderFilterHeader()}
      </div>
      <div className={styles.productList}>
        {productListData.map((product: ProductData,index) => {
          return <ProductCard key={index} uniqueKey={index} product={product} />
        })}
      </div>
    </div>
  )
}
