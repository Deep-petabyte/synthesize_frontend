import React from 'react'
import sync from '../../assets/sync.svg'
import styles from './Logo.module.scss'
const Logo = () => {
  return (
    <span className={styles.logo}><img height="40" src={sync} alt="Synthesize"/> <span className={styles.logo_caption}>Synthesize</span></span>
  )
}

export default Logo