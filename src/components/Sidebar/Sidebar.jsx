import React from 'react'
import styles from './Sidebar.module.scss'
import Logo from '../Logo/Logo'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo}>
        <Logo/>
      </div>

      <div className={styles.sidebar_links}>
        <Link to={'/'}>
          <span className="material-icons"> home </span><label>Home</label>
        </Link>
        <Link to={'/dj'}>
          <span className="material-icons"> album </span><label>Dj</label>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar