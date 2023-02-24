import React from 'react'
import styles from './Card.module.scss'
import play_btn from '../../assets/play_btn.png'
const Card = ({title, imgUrl, requestHandler, showBtn}) => {

  return (
    <div className={styles.card} style={{backgroundImage: `url(${imgUrl})`}}>
        <button onClick={requestHandler} className={styles.play_btn} style={{display: showBtn === false ? 'none' : ''}}><img src={play_btn} alt="Play button"/></button>
        <div className={styles.cardTitle}>{title}</div>
    </div>
  )
}

export default Card