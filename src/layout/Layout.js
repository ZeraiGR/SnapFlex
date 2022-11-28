import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import classNames from 'classnames';

function Layout() {
  return (
    <div className={classNames('container', styles.wrapper)}>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
    </div>
  );
}

export default Layout;
