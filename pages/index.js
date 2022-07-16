import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() {

  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);

  const getNews = async () => {
		try {
			const res = await axios.get('api/news/', {
				params: {page}
			});
			const {data} = res;
			setResponse(data.data[0].screen_data.news);
		} catch (error) {
			console.error(error);
		}
	};

  return (
    <div className={styles.container}>
      <Head>
        <title>Coincoin</title>
        <meta name="description" content="Look up for that Coin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div id='wrapper'>
        <div id='container'>
          <h1>Coincoin News</h1>
        </div>
        
      </div>
      
      <h2>The latest information from the crypto world</h2>
      <br></br><br></br>
      {!response && (<button className="button-85" role="button"  onClick={ () => getNews() }>Get News</button>)}
      <div className='container'>
        {response && response.map(news => {
          return(
            <div key={news.news_ID} className='card'>
            <div className='card-header'>
              <img src={news.related_image_big} width="300" length="300"/>
              </div>
              <a  href={ news.news_link } target="_blank" rel="noopener noreferrer">
                <div className='card-body'>
                <h3>{news.HEADLINE}</h3>
                <p>{news.news_provider_name}</p>
                </div>
              </a>
              </div>
          );
        })}
        </div>
        <br></br><br></br>
            {response && (
              <div>
                <button className="button-85" role="button" onClick={() => { setPage(page+1); getNews();}}>
                  Load Next Page
                </button>
              </div>
            )}
      
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
