import React , { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import { Bookmark as BookmarkIcon } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import rnsHero from "../../../images/profile/rnsHero.png";
import axios from "axios";
const styles = (theme) => ({
  header: {
    fontSize: 18,
    fontWeight: 500,
  },
  rnsImgWrap: {
    '& img': {
      maxWidth: '100%',
    },
  },
  author: {
    opacity: .8,
    fontSize: 12,
  },
  text: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  date: {
    opacity: .6,
    fontSize: 12,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconColor: {
    color: '#FFC35F',
    padding: 0,
  },
})

const RNSWidget = ({ classes }) => {
  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    details()
  }, [])
  const details = async () => {
 
    const d = localStorage.getItem('user_id')
  await  axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Events/${d}`)
      .then(res => {
        seCoursM(res.data[0])
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      })
    
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <span className={classes.header}>Derniers Evenements</span>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <div className={classes.rnsImgWrap}>
          <img src={CoursM.photo} alt="RNS" />
        </div>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <div>
          <span className={classes.author}>{CoursM.Nom}</span>
          <p className={classes.text} >{CoursM.Description}</p>
          <div className={classes.flexContainer}>
            <span className={classes.date}>11 Sep 2020 | 5 min read</span>
            <IconButton classes={{ root: classes.iconColor }} aria-label="bookmark">
              <BookmarkIcon/>
            </IconButton>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(RNSWidget);