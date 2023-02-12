import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCart } from '../cart/cartSlice';
import styles from './Navbar.module.css';
import cartImage from '../../assets/cart.png';


const linkStyles = {
    textDecoration:'none',
    color:'#ffffff'
}

export default function Navbar() {
  const cart = useAppSelector(selectCart);
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.navbarLeft}>
            <Link style={linkStyles} to ="/"><h2 className={styles.logo}>FastCart</h2></Link>
        </div>
        <div className={styles.navbarRight}>
            <div className={styles.cartIcon}>
                <Link to="/cart">
                    <img className={styles.iconButton} src={cartImage} alt="cart"/>
                </Link>
                <div className={styles.cartNumber}>
                    {cart.products.reduce((accumulator,item) => {
                        return accumulator + item.quantity;
                    },0)}
                </div>
            </div>
        </div>
    </div>
  )
}
