import React, { memo } from "react";
import styles from '../styles/Channel.module.css';
import { Grid, Typography, Card } from '@material-ui/core';
import { useRouter } from 'next/router';
import moment from 'moment';

const ChannelList = ({ data }) => {

  const router = useRouter()

  return (
    data.length === 0 ? <Grid container justify="center"><Typography>No Channel Found</Typography></Grid> :
      data.map((obj, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              className={styles.card}
              onClick={() => router.push('/channel?TV=' + obj.id).then(() => window.scrollTo(0, 0))}
            >
              <div className={styles.header}>
                <div className={styles.imgWrapper}>
                  <img className={styles.channellogo} src={obj.imageUrl} />
                </div>
                <div className={styles.channelWrapper}>
                  <Typography>CH{obj.stbNumber}</Typography>
                  <Typography className={styles.channelTitle}><strong>{obj.title}</strong></Typography>
                </div>
              </div>
              <hr className={styles.borderTop} />
              <div className={styles.channelDetails}>
                {
                  obj.currentSchedule.slice(0, 3).map((schedule, i) => {
                    let itemDate = moment(schedule.datetime);
                    const scheduleTime = moment(itemDate, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A');
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
            </Card>
          </Grid>
        )
      })
  )
};

export default memo(ChannelList);