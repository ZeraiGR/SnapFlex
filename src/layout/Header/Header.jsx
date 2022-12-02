import { Link } from "react-router-dom";

import styles from './Header.module.css';
import { Navigation } from "../Navigation/Navigation";

export const Header = () => {
  return (
    <header className={styles.header}>
			<Link to="/">Logo</Link>
			<Navigation />
    </header>
  )
}