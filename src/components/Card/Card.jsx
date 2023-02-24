import React from 'react'
import styles from './Card.module.scss'
import play_btn from '../../assets/play_btn.png'
const Card = ({title, imgUrl, requestHandler, showBtn}) => {

    let parsedTitle = title.split("").slice(0, 20).join("")

  return (
    <div className={styles.card} style={{backgroundImage: `url(${imgUrl})`}}>
        <button onClick={requestHandler} className={styles.play_btn} style={{display: showBtn === false ? 'none' : ''}}><img src={play_btn} alt="Play button"/></button>
        <div className={styles.cardTitle}>{parsedTitle}{title.length > 20 ? '...': ''}</div>
    </div>
  )
}

export default Card