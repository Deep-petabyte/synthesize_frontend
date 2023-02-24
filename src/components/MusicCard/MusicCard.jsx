import React from 'react'
import styles from './MusicCard.module.scss'

const MusicCard = ({children}) => {
  return (
    <div className={styles.music_card}>
        {children}
    </div>
  )
}

export default MusicCard