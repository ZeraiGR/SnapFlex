
import { NavLink } from "react-router-dom"

import styles from './Navigation.module.css';

const MenuItem = ({link, title}) => {
	return (
		<li>
			<NavLink to={link} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>{title}</NavLink>
		</li>
	)
}

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
			<ul>
				<MenuItem link={"/users"} title={"Users"} />
				<MenuItem link={"/posts"} title={"Posts"} />
			</ul>
    </nav>
  )
}