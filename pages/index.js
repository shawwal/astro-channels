import Head from 'next/head';
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import FilterButton from '../components/FilterButton';
import FilterChips from '../components/FilterChips';
import { Button, Container, FormControlLabel, Grid, SwipeableDrawer, Typography, TextField, Chip, Switch } from '@material-ui/core';
import ChannelList from '../components/ChannelList';
import { makeStyles } from '@material-ui/core/styles';
import { themeAtom, filterAtom } from '../src/atoms';
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
  buttons: {
    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const Home = ({ data }) => {

  const classes = useStyles();
  const [themeValue, setThemeValue] = useRecoilState(themeAtom);
  const [open, setOpen] = useState(false);
  const initialData = data;
  const [channelData, setChannelData] = useState(initialData);
  const [categoryList, setCategoryList] = useRecoilState(filterAtom);

  const handleDrawerOpen = () => {
    setCategoryList([]);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Handle Sort By Channel Name
  const [sortNameValue, setSortNameValue] = useState(false);
  const handleSortByName = () => {
    setSortNumberValue(false);
    if (sortNameValue == false) {
      let sorted = [...initialData].sort(function (a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      setChannelData(sorted);
      setSortNameValue(true);
    } if (sortNameValue == true) {
      // let newSorted = [...initialData].sort(function (a, b) {
      //   var x = a.title.toLowerCase();
      //   var y = b.title.toLowerCase();
      //   if (x > y) { return -1; }
      //   if (x < y) { return 1; }
      //   return 0;
      // });
      // setChannelData(newSorted);
      setChannelData([...initialData]);
      setSortNameValue(false);
    }
  };
  // Handle Sort By Channel Name

  // Handle Sort By Channel Number
  const [sortNumberValue, setSortNumberValue] = useState(false);
  const handleSortByNumber = () => {
    setSortNameValue(false);
    if (sortNumberValue == false) {
      let sorted = [...initialData].sort(function (a, b) {
        var x = a.stbNumber.toLowerCase();
        var y = b.stbNumber.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      setChannelData(sorted);
      setSortNumberValue(true);
    } if (sortNumberValue == true) {
      setChannelData([...initialData]);
      setSortNumberValue(false)
    }
  };
  // Handle Sort By Channel Number

  // Handle Search By Channel Name
  const [searchName, setSearchName] = useState("");
  const handleSearchName = e => {
    searchNo != "" ? setSearchNo("") : null;
    setSearchName(e.target.value);
  };
  useEffect(() => {
    const results = initialData.filter(obj =>
      obj.title.toLowerCase().includes(searchName.toLowerCase()));
    setChannelData(results);
  }, [searchName]);
  // Handle Search By Channel Name

  // Handle Search By Channel Number
  const [searchNo, setSearchNo] = useState("");
  const handleSearchNo = e => {
    searchName != "" ? setSearchName("") : null;
    setSearchNo(e.target.value);
  };
  useEffect(() => {
    const results = initialData.filter(obj =>
      obj.stbNumber.toLowerCase().includes(searchNo.toLowerCase()));
    setChannelData(results);
  }, [searchNo]);
  //  Handle Search By Channel Number


  const [switchChecked, setSwitch] = useState(themeValue == 'dark' ? true : false);
  const handleSwitch = () => {
    setSwitch(switchChecked == true ? false : true);
    setThemeValue(themeValue == 'dark' ? 'light' : 'dark');
  }

  const handleFilter = () => {
    var result = initialData.filter(function(e) {
      return categoryList.includes(e.category) && e.isHd == true
    });
    setChannelData(result);
    handleDrawerClose();
  }

  const handleReset = () => {
    setChannelData([...initialData]);
    handleDrawerClose();
  }

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
              <FilterChips />
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
                <Chip color="primary" label="HD" />
              </div>
            </div>
            <div>
              <Button variant="outlined" onClick={() => handleReset()}>RESET</Button>
              <Button variant="contained" className={classes.buttons} onClick={() => handleFilter()} color="primary">APPLY</Button>
            </div>
          </div>
        </SwipeableDrawer>

        <div className={styles.headerRow}>
          <Typography variant="h5" component="h2">Channels List</Typography>
          <FormControlLabel
            label="Dark Mode"
            style={{ marginRight: 0 }}
            control={
              <Switch checked={switchChecked} color="primary" onChange={handleSwitch} />
            }
          />
        </div>

        <Grid container item>
          <Grid xs={12} sm={4} item>
            <TextField
              type="text"
              variant="outlined"
              label="Search Channel Name"
              margin="dense"
              fullWidth
              placeholder="Type here ..."
              value={searchName}
              onChange={handleSearchName}
            />
            <TextField
              type="text"
              variant="outlined"
              label="Search Channel Number"
              margin="dense"
              fullWidth
              placeholder="Type here ..."
              value={searchNo}
              onChange={handleSearchNo}
            />
          </Grid>
          <Grid xs={12} item container sm={8} className={styles.topRight}>
            <div className={styles.filterRow} onClick={() => handleDrawerOpen()}>
              <Typography variant="subtitle1" className={styles.filterText}>Filter</Typography>
              <FilterButton color={themeValue == 'light' ? '#333' : '#FFF'} />
            </div>
            <div className={classes.buttons}>
              <Button mr={2} onClick={() => handleSortByName()} variant="contained" color={sortNameValue == true ? 'primary' : 'default'}>SORT NAME</Button>
              <Button onClick={() => handleSortByNumber()} variant="contained" color={sortNumberValue == true ? 'primary' : 'default'}>SORT NUMBER</Button>
            </div>
          </Grid>
        </Grid>
        <ChannelList data={channelData} />
        <footer className={styles.footer}>
          <p>
            Created by&nbsp;<a href="https://shawwals.vercel.app/" target="_blank" rel="noreferrer">شَوَّال‎</a>&nbsp;©2020
          </p>
        </footer>
      </Container>
    </main >
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