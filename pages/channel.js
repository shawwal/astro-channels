import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../components/TabPannel';
import styles from '../styles/Details.module.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  tabWidth: {
    minWidth: 50
  }
}));

const ChannelDetails = ({ data }) => {

  const classes = useStyles();
  const scheduleDate = Object.keys(data.schedule);
  const scheduleList = Object.values(data.schedule);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <main>

      <Head>
        <title>{data.title + ' | Channels | Astro Content Guide'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={data.description} />
        <meta name="keywords" content={"Astro, Channels, Astro Content Guide, " + data.title} />
      </Head>

      <Container maxWidth="md">
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

        {/* {console.log('data', scheduleList[value])} */}

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
        {/* {console.log('check item', scheduleList)} */}
        {scheduleList.map((schedule, tabIndex) => {

          return (
            <TabPanel key={tabIndex} value={value} index={tabIndex}>
              <ul>
                {schedule.map((item, i) => {
                  let timeStamp = Date.parse(item.datetime);
                  let dateObject = new Date(timeStamp);
                  const scheduleTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
                  return (
                    <li style={{ listStyleType: 'none' }} key={i}>{scheduleTime + '  ' + item.title}</li>
                  )
                })}
              </ul>
            </TabPanel>
          )
        })}
      </Container>
    </main>
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