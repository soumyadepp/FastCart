import { ArrowUpward, SortOutlined } from '@mui/icons-material';
import styles from './SortFilter.module.css';
export default function SortFilter() {
    return (
        <div className={styles.sortFilterWrapper}>
            <div className={styles.sortFilterHeader}>
                <div className={styles.sortHeader}>
                    <h3>Sort By</h3>
                </div>
                <div className={styles.sortHeaderIcon}>
                    <SortOutlined />
                </div>
            </div>
            <div className={styles.sortFilterBody}>
                <button className={styles.sortActionButton}>Price <ArrowUpward color='primary'/></button>
                <button className={styles.sortActionButton}>Rating <ArrowUpward color='primary'/></button>
            </div>
        </div>
    )
}
