import React , { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import mock from '../../draggablegrid/mock';
import axios from "axios";
import ListAltIcon from '@material-ui/icons/ListAlt';
const styles = (theme) => ({
  newsList: {
    marginBottom: 0,
    paddingLeft: 0,
  },
  listRow: {
    display: 'flex',
    listStyle: 'none',
    boxSizing: 'content-box',
    borderTop: `2px solid rgba(185, 185, 185, 0.3)`,
    padding: '12px 12px 12px 0',
    cursor: 'pointer',
    '&:last-child': {
      height: 'auto'
    }
  },
  iconBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    '@media (max-width: 425px)': {
      display: 'none',
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    width: 40,
    height: 40,
   borderRadius: '50%',
    color: '#fff',
  },
  newsItemInfo: {
    marginLeft: '1rem',
  },
  newsHeader: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#536DFE',
  },
  timeBlock: {
    marginTop: 10,
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    display: 'block',
  }
})

const Newss = ({ classes }) => {

  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Notfication/1`)
      .then(res => {
        seCoursM(res.data)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
const iconn = <ListAltIcon />



  return (
    <ul className={classes.newsList}>
      {CoursM.map((m,) => (
        <li className={classes.listRow} key={m.title}>
          <div className={classes.iconBlock}>
            <span className={`${classes.icon}`} style={{ backgroundColor:'#536dfe' }}>
              <ListAltIcon />
              
            </span>
          </div>
          <div className={classes.newsmInfo}>
            <Typography variant="h3"><a className={classes.newsHeader} href="#/app/grid"> {"m.title"} </a></Typography>
            <div>
              {m.Message}
            </div>
            <time className={classes.timeBlock}>{m.date_s}</time>
          </div>
          {/* <div style={{color:'white', backgroundColor:'#668cff', borderRadius:15, display:'flex', alignItems:'center',height:'50px', marginTop:'20px' }}>    {m.Status}</div> */}
      
        </li>
      ))}
    </ul>
  )
}

export default withStyles(styles)(Newss);