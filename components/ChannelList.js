import React, { memo } from "react";
import styles from '../styles/Channel.module.css';
import { Grid, Typography } from '@material-ui/core';
import Link from '../src/Link';

const ChannelList = ({ data }) => {

  return (
    data.length === 0 ? <Grid container justify="center"><Typography>No Channel Found</Typography></Grid> :
      data.map((obj, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>

            <div className={styles.card} onClick={() => window.location = '/channel?TV=' + obj.id}>
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
};

export default memo(ChannelList);