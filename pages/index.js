import Head from 'next/head';
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import FilterButton from '../components/FilterButton';
import CloseButton from '../components/CloseButton';
import { Button, Container, FormControlLabel, Grid, SwipeableDrawer, Typography, TextField, Chip, Switch } from '@material-ui/core';
import ChannelList from '../components/ChannelList';
import { makeStyles } from '@material-ui/core/styles';
import { themeAtom } from '../src/atoms';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Home = ({ data }) => {

  const classes = useStyles();
  const [themeValue, setThemeValue] = useRecoilState(themeAtom);
  const [open, setOpen] = useState(false);
  const initialData = data;
  // console.log('check', initialData);
  const [channelData, setChannelData] = useState(initialData);
  const [newData, setNewData] = useState('Sort By Channel Number');

  const [searchValue, setSearchValue] = useState('');

  const searchByName = e => {
    e.preventDefault();
    // console.log('ok');
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

  const [switchChecked, setSwitch] = useState(themeValue == 'dark' ? true : false);
  const handleSwitch = () => {
    setSwitch(switchChecked == true ? false : true);
    setThemeValue(themeValue == 'dark' ? 'light' : 'dark');
  }

  // console.log('test', data);
  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Head>
          <title>Astro Channels List</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Astro Channels List" />
          <meta name="keywords" content="Astro, Channels, TV" />
        </Head>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => handleDrawerOpen()}
          onClose={() => handleDrawerClose()}
        >
          <div className={styles.drawerStyle}>
            <div>
              <div className={styles.rowEnd} onClick={() => handleDrawerClose()}>
                <img
                  src="/close.svg"
                  alt="Close Icon"
                  className={styles.closeIcon}
                />
              </div>
              <Typography>Categories</Typography>
              <div className={classes.chips}>
                <Chip label="Movies" />
                <Chip label="Sport" />
                <Chip label="Kids" />
                <Chip label="Learning" />
                <Chip label="Music" />
                <Chip label="News" />
                <Chip label="Lifestyle" />
                <Chip label="Variety Entertainment" />
                <Chip label="Special Interest" />
                <Chip label="Radio" />
              </div>
              <Typography>Languages</Typography>
              <div className={classes.chips}>
                <Chip label="International" />
                <Chip label="Malay" />
                <Chip label="Chinese" />
                <Chip label="Indian" />
                <Chip label="Korean & Japanese" />
                <Chip label="Multiple Languages" />
              </div>
              <Typography>Resolution</Typography>
              <div className={classes.chips}>
                <Chip label="SD" />
                <Chip label="HD" />
              </div>
            </div>
            <div>
              <Button variant="outlined">RESET</Button> <Button variant="contained" color="primary">APPLY</Button>
            </div>
          </div>
        </SwipeableDrawer>

        <div className={styles.headerRow}>
          <Typography variant="h5" component="h2">Channels</Typography>
          <div className={styles.filterRow} onClick={() => handleDrawerOpen()}>
            <Typography variant="subtitle1" className={styles.filterText}>Filter</Typography>
            <FilterButton color={themeValue == 'light' ? '#333' : '#FFF'} />
            {/* <img
              src="/filter.svg"
              alt="Filter Icon"
              style={{
                height: '0.9rem',
                paddingLeft: '0.5rem',
                cursor: 'pointer'
              }}
            /> */}
          </div>
        </div>
        <div className={styles.headerRow}>
          <form>
            <TextField
              type="text"
              variant="outlined"
              label="Search Channel Name"
              placeholder="Type here ..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
          <FormControlLabel
            control={
              <Switch checked={switchChecked} color="primary" onChange={handleSwitch} />
            }
            label="Dark Mode"
          />
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

export async function getServerSideProps() {

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