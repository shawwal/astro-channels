import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Tabs, Tab, Backdrop, CircularProgress } from '@material-ui/core';
import TabPanel from '../components/TabPannel';
import styles from '../styles/Details.module.css';
import moment from 'moment';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabWidth: {
    minWidth: 50
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ChannelDetails = ({ data }) => {

  const classes = useStyles();
  const router = useRouter()
  const scheduleDate = Object.keys(data.schedule);
  const scheduleList = Object.values(data.schedule);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGoBack = () => {
    setLoading(true);
    router.push('/')
  }

  return (
    <main>

      <Head>
        <title>{data.title + ' | Channels | Astro Content Guide'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={data.description} />
        <meta name="keywords" content={"Astro, Channels, Astro Content Guide, " + data.title} />
      </Head>

      <Container maxWidth="md">
        {loading == true ?
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop> : <div />}
        <div
          className={styles.backButton}
          onClick={() => handleGoBack()}
        >
          ⇦ Go Back
        </div>
        <div className={styles.channelHeader}>
          <div className={styles.imgWrapper}>
            <img className={styles.channellogo} src={data.imageUrl} />
          </div>
          <div className={styles.channelWrapper}>
            <p>CH{data.stbNumber}</p>
            <p className={styles.channelTitle}>{data.title}</p>
          </div>
        </div>
        <p>{data.description}</p>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabWidth}
          variant="standard"
        >
          {scheduleDate.map((obj, index) => {
            let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const timeStamp = Date.parse(obj);
            let dateObject = new Date(timeStamp);
            const days = daysOfWeek[dateObject.getDay()];
            let currentDate = new Date();
            const today = daysOfWeek[currentDate.getDay()]
            return (
              <Tab
                key={index}
                classes={{ root: classes.tabWidth }}
                label={days == today ? 'Today' : days}
              />
            )
          })}
        </Tabs>
        {scheduleList.map((schedule, tabIndex) => {
          return (
            <TabPanel key={tabIndex} value={value} index={tabIndex}>
              <div>
                {schedule.map((item, i) => {
                  let itemDate = moment(item.datetime);
                  const scheduleTime = moment(itemDate, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A');
                  return (
                    <div className={styles.scheduleItems} key={i}>
                      <span>{scheduleTime}</span><span className={styles.scheduleTitle}>{item.title}</span>
                    </div>
                  )
                })}
              </div>
            </TabPanel>
          )
        })}
      </Container>
    </main >
  );
}

ChannelDetails.getInitialProps = async function (context) {
  const { TV = '' } = context.query;
  const jsonUrl = 'https://contenthub-api.eco.astro.com.my/channel/';
  const res = await fetch(jsonUrl + TV + '.json');
  const channdelData = await res.json();
  return {
    data: channdelData.response,
  };
};

export default ChannelDetails;