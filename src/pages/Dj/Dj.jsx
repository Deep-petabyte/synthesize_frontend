import React, {useState, useEffect} from 'react'
import styles from './Dj.module.scss'
import {endpoint} from '../../utils/endpoint'
import io from 'socket.io-client'
import Card from '../../components/Card/Card';
import MusicCard from '../../components/MusicCard/MusicCard'
import audio from '../../assets/wave-play-unscreen.gif'
import Toolbar from '../../components/Toolbar/Toolbar';

let socket;

const Dj = () => {

  const [musicReq, setMusicReq] = useState(JSON.parse(localStorage.getItem("currentSong")))

  useEffect(()=>{
    socket = io(endpoint)
    socket.on('requested-musicId', result =>{
      setMusicReq(result)
      localStorage.setItem("currentSong", JSON.stringify(result))
    })
  }, [musicReq])

  function playAudio(url){
    let audio = new Audio(url)
    audio.play()
  }


  return (
    <section className="page_scaffold">
        <Toolbar/>
        <div className={styles.title}>
            <h1>DJ Sync</h1>
        </div>
        <div className={styles.content}>
          {
            musicReq && <MusicCard key={musicReq._id}>
              <Card title={musicReq.name} imgUrl={musicReq.image_url} showBtn={false}/>
              <img className={styles.music_card_audio} src={audio} alt="audio playing"/>
              {playAudio(musicReq.preview_url)}
            </MusicCard>
          }

          {
            !musicReq && <h1 className={styles.no_song}>NO SONG SELECTED! ☹️</h1>
          }
          
        </div>
        
    </section>
  )
}

export default Dj