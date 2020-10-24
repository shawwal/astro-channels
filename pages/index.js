import Head from 'next/head';
import React, { useEffect, useState, memo, useCallback } from "react";
import styles from '../styles/Home.module.css';
import { Button, Container, Grid, SwipeableDrawer, Typography, TextField } from '@material-ui/core';

const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];

const ChannelList = memo(({ data }) => {
  console.log('rendered: channelList');
  return (
    data.map((obj, index) => {
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
              {
                obj.currentSchedule.slice(0, 3).map((schedule, i) => {

                  let timeStamp = Date.parse(schedule.datetime);
                  let dateObject = new Date(timeStamp);

                  const scheduleTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });

                  return (
                    <div className={styles.schedule} key={i}>
                      {schedule.title == 'Not Available' ?
                        <>
                          <span className={i == 0 ? styles.timeActive : styles.time}>N/A</span>
                          <span className={i == 0 ? styles.timeActive : styles.time}>No Information Available</span>
                        </>
                        :
                        <>
                          <span className={i == 0 ? styles.timeActive : styles.time}>{i == 0 ? 'On Now' : scheduleTime}</span>
                          <span className={i == 0 ? styles.scheduleActive : styles.scheduleTitle}>{schedule.title}</span>
                        </>
                      }

                    </div>
                  )
                })
              }
            </div>
          </div>
        </Grid>
      )
    })
  )
});

const Home = ({ data }) => {

  const [open, setOpen] = useState(false);
  const initialData = data;
  const [channelData, setChannelData] = useState(initialData);
  const [newData, setNewData] = useState('Sort By Channel Number');

  const [searchValue, setSearchValue] = useState('');

  const searchByName = e => {
    e.preventDefault();
    console.log('ok');
  }

  const handleSortByName = async () => {
    const sortedData = channelData.sort(function (a, b) {
      if (a.stbNumber == b.stbNumber) {
        return a.title - b.title;
      }
      return b.stbNumber - a.stbNumber;
    });
    setNewData('Sorted');
  };

  const handleReset = async () => {
    setNewData('Sort By Channel Number');
    setChannelData(initialData);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = initialData.filter(obj =>
      obj.title.toLowerCase().includes(searchTerm)
    );
    console.log('triggered');
    setChannelData(results);
  }, [searchTerm]);



  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Head>
          <title>Astro Channels List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => handleDrawerOpen()}
          onClose={() => handleDrawerClose()}
        >
          <div className={styles.drawerWidth}>
            <Typography>Test</Typography>
          </div>
        </SwipeableDrawer> */}

        <div className={styles.headerRow}>
          <Typography variant="h5" component="h2">Channels</Typography>
          <div className={styles.filterRow} onClick={() => handleDrawerOpen()}>
            <Typography variant="subtitle1">Filter</Typography>
            <img src="/filter.svg" alt="Filter Icon" className={styles.filterIcon} />
          </div>
        </div>
        <div className={styles.headerRow}>
          {/* <TextField
            variant="outlined"
            label="Search by Title"
            value={searchValue}
            onChange={() => setSearchValue(searchValue)}
          /> */}
          <form>
            <TextField
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
            />
            {/* <ul>
              {searchResults.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul> */}
          </form>
        </div>
        {/* <div className={styles.modifyDataRow}>
          <Button onClick={() => handleReset()} variant="outlined">reset</Button>
          <Button onClick={() => handleSortByName()} variant="outlined">{newData}</Button>
        </div> */}
        <Grid container spacing={2} item>
          <ChannelList data={channelData} />
        </Grid>
        <footer className={styles.footer}>
          <p>
            Created by&nbsp;<a href="https://shawwals.vercel.app/" target="_blank" rel="noreferrer">شَوَّال‎</a>&nbsp;©2020
          </p>
        </footer>
      </Container>
    </main>
  )
}

export async function getStaticProps() {

  const fecthData = await fetch('https://contenthub-api.eco.astro.com.my/channel/all.json')
  const result = await fecthData.json();
  const data = result.response;

  return {
    props: {
      data,
    },
  }
}

export default Home