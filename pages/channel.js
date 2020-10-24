import React, { useState } from 'react';
import Head from 'next/head';
import { Container } from '@material-ui/core';
import styles from '../styles/Details.module.css';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
}));

const ChannelDetails = ({ data }) => {

  const theme = useTheme();

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