import React from 'react'
import styles from './FilterSidebar.module.css';
import filterIcon from '../../assets/filterIcon.png';
import SortFilter from './components/sortFilter/SortFilter';

export default function FilterSidebar() {
  return (
    <div className={styles.filterSidebarWrapper}>
        <div className={styles.filterSidebarHeader}>
            <h3>Filter</h3>
            <img src={filterIcon} alt="filter"/>
        </div>
        <div className={styles.filterSidebarBody}>
            <SortFilter/>
        </div>
    </div>
  )
}
