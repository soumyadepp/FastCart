import { Toaster } from 'react-hot-toast';
import { getExpandedMockData, mockProductData, ProductData } from '../../app/data/products';
import ProductCard from '../productCard/ProductCard';
import styles from './ProductList.module.css';
import { FC, ReactNode, useEffect, useState } from 'react';
import { AutoSizer as _AutoSizer, InfiniteLoader as _InfiniteLoader, List as _List, ListProps } from 'react-virtualized';

const List = _List as unknown as FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as FC<ListProps>;
const InfiniteLoader = _InfiniteLoader as unknown as FC<ListProps>;

interface ProductListProps {
  fetchData(start: number, limit: number, conditions: string): Promise<any[]>;
  totalItems: number;
  renderCell(item: any): ReactNode;
  noOfItemsInRow: number;
  fetchCondition: string;
}

export default function ProductList() {
  return (
    <div className={styles.productList}>
      <Toaster/>
      {mockProductData.map((product: ProductData) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}
