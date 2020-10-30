import React, { memo, useState } from "react";
import styles from '../styles/Channel.module.css';
import { Grid, Typography, Card, Backdrop, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ChannelList = ({ data }) => {

  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (id) => {
    setLoading(true);
    router.push('/channel?TV=' + id).then(() => window.scrollTo(0, 0));
  }

  return (
    <div>
      {loading == true ?
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop> : <div />}
      <Grid
        container
        spacing={2}
        style={{ paddingTop: 20 }}
        item
      >
        {data.length === 0 ? <Grid container justify="center"><Typography>No Channel Found</Typography></Grid> :
          data.map((obj, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  variant="outlined"
                  className={styles.card}
                  onClick={() => handleNavigate(obj.id)}
                >
                  <div className={styles.header}>
                    <div className={styles.imgWrapper}>
                      <img className={styles.channellogo} src={obj.imageUrl} />
                    </div>
                    <div className={styles.channelWrapper}>
                      <Typography>CH{obj.stbNumber}</Typography>
                      <p className={styles.channelTitle}><strong>{obj.title}</strong></p>
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
                                <span className={i == 0 ? styles.timeActive : styles.time}>{scheduleTime ? scheduleTime : 'N/A'}</span>
                                <span className={i == 0 ? styles.timeActive : styles.time}>{schedule.title}</span>
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
        }
      </Grid>
    </div>
  )
};

export default memo(ChannelList);