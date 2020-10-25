import Head from 'next/head';
import React, { useEffect, useState, memo, useCallback } from "react";
import styles from '../styles/Home.module.css';
import { Button, Container, Grid, SwipeableDrawer, Typography, TextField } from '@material-ui/core';
import ChannelList from '../components/ChannelList';

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
    // window.scrollTo(0, 0);
    const results = initialData.filter(obj =>
    obj.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setChannelData(results);
  }, [searchTerm]);



  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Head>
          <title>Astro Channels List</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Astro Channels List" />
          <meta name="keywords" content="Astro, Channels, TV" />
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
              variant="outlined"
              label="Search Channel Name"
              placeholder="Type here ..."
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
        <Grid
          container
          spacing={2}
          item
          // justify="center"
        >
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