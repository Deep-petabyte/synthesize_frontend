import { useState, useEffect } from 'react'
import styles from './Home.module.scss'
import Card from '../../components/Card/Card'
import { endpoint } from '../../utils/endpoint'
import { Confirm } from '../../utils/Confirm'
import Spinner from '../../components/Spinner/Spinner'
import { toast } from 'react-toastify';
import io from 'socket.io-client'
import Toolbar from '../../components/Toolbar/Toolbar'
import {useNavigate} from 'react-router-dom'

let socket;
const Home = () => {

  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [musics, setMusics] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    fetch(`${endpoint}/user`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({userId: localStorage.getItem('_id')})
    })
    .then(res => res.json())
    .then(result =>{
      localStorage.setItem('_id', result.userId)
    })
    .catch(error => {
      setError(true)
      console.log(error)
    })

  }, [])

  useEffect(() => {
    setLoading(true)
    fetch(`${endpoint}/musics/${page}`)
      .then(res => res.json())
      .then(result => {
        setMusics(result.data)
      })
      .then(() => setLoading(false))
      .catch(error =>{
        setError(true)
        console.log(error)
      })

  }, [page])

  const requestHandler = (musicId, title) => {

    Confirm.open({
      title: `Synthesize - ${title}`,
      message: 'Are you sure you want to send this music request to the DJ?',
      onok: () => {
        requestMusic(musicId)
      }
    })
  }

  const requestMusic = (musicId) =>{
    fetch(`${endpoint}/music`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem('_id'),
        musicId: musicId
      })
    })
    .then(res => res.json())
    .then(result =>{
      console.log(musicId)
      if(result.error){
        toast.error(result.error)
      }else{
        // Emit the music id to socket.io
        socket = io(endpoint)
        socket.emit('musicId-to-dj', musicId)

        setTimeout(()=>{
          navigate('/dj')
        }, 2000)
      }
    })
    .catch(error =>{
      setError(true)
      console.log(error)
    })
  }

  const nextPage = () =>{
    setPage(e => e += 1)
  }
  const prevPage = () =>{
    setPage(e => e <= 1 ? e : e -= 1)
  }

  const mainContent = loading ? <div className={styles.loader}>
    <Spinner />
  </div> : <div className={styles.content}>
    {
      musics.map(music => (
        <Card key={music._id} requestHandler={() => requestHandler(music._id, music.name)} title={music.name} imgUrl={music.image_url} />
      ))
    }
  </div>


  return (
    <section className="page_scaffold">
    <Toolbar/>
      <div className={styles.title}>
        <h1>Your Top Music Mixes</h1>
      </div>
      {
        error ?
        <div className={styles.loader}>
          <span className={styles.errorText}>An error occurred! ☹️ </span>
        </div>
        :
        mainContent
      }

      { !error && <div className={styles.btnBox}>
      <button className={styles.btn}><span className="material-icons" onClick={prevPage}> chevron_left </span></button>
      <button className={styles.btn}><span className="material-icons" onClick={nextPage}> chevron_right </span></button>
      </div>}
    </section>
  )
}

export default Home