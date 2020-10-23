import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Typography, Container, Grid } from '@material-ui/core';
import { LensTwoTone } from '@material-ui/icons';

const Home = ({ data }) => {

  console.log('check', data)

  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Head>
          <title>Astro Coding Challage</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Typography variant="h5" component="h2">Channels</Typography>
        </div>
        <Grid container spacing={2} item>
          {
            data.map((obj, index) => {

              let timeStamp = Date.parse(obj.currentSchedule[0].datetime);
              let dateObject =  new Date(timeStamp); 
              const getTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div className={styles.card}>
                    <div className={styles.header}>
                      <div className={styles.imgWrapper}>
                        <img className={styles.channellogo} src={obj.imageUrl} />
                      </div>
                      <div className={styles.channelWrapper}>
                        <p>CH{obj.stbNumber}</p>
                        <p className={styles.channelTitle}>{obj.title}</p>
                      </div>
                    </div>
                    <hr className={styles.borderTop} />
                    <div className={styles.channelDetails}>
                      <div>
                        <p>On Now</p>
                        <p>{getTime}</p>
                      </div>
                      <div>
                        <p>{obj.currentSchedule[0].title}</p>
                        <p>test</p>
                      </div>
                    </div>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </Container>
    </main>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const fecthData = await fetch('https://contenthub-api.eco.astro.com.my/channel/all.json')
  const result = await fecthData.json();
  const data = result.response;

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  }
}

export default Home