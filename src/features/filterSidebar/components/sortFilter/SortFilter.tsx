import { SortOutlined } from '@mui/icons-material';
import React from 'react'
import styles from './SortFilter.module.css';
export default function SortFilter() {
  return (
    <div className={styles.sortFilterWrapper}>
        <div className={styles.sortFilterHeader}>
            <div className={styles.sortHeader}>
                <h3>Sort By</h3>
            </div>
            <div className={styles.sortHeaderIcon}>
            <SortOutlined/>
            </div>
        </div>
    </div>
  )
}
