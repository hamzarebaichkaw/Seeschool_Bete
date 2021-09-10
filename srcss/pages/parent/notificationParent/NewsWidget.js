// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';
// import mock from '../../draggablegrid/mock';

// const styles = (theme) => ({
//   newsList: {
//     marginBottom: 0,
//     paddingLeft: 0,
//   },
//   listRow: {
//     display: 'flex',
//     listStyle: 'none',
//     boxSizing: 'content-box',
//     borderTop: `2px solid rgba(185, 185, 185, 0.3)`,
//     padding: '12px 12px 12px 0',
//     cursor: 'pointer',
//     '&:last-child': {
//       height: 'auto'
//     }
//   },
//   iconBlock: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 60,
//     height: 60,
//     '@media (max-width: 425px)': {
//       display: 'none',
//     }
//   },
//   icon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 30,
//     width: 60,
//     height: 60,
//     borderRadius: '50%',
//     color: '#fff',
//   },
//   newsItemInfo: {
//     marginLeft: '1rem',
//   },
//   newsHeader: {
//     textDecoration: 'none',
//     textTransform: 'uppercase',
//     color: '#536DFE',
//   },
//   timeBlock: {
//     marginTop: 10,
//     fontSize: '0.9rem',
//     color: theme.palette.text.secondary,
//     display: 'block',
//   }
// })

// const Newss = ({ classes }) => {
//   return (
//     <ul className={classes.newsList}>
//       {mock.mainData.news.map(item => (
//         <li className={classes.listRow} key={item.title}>
//           <div className={classes.iconBlock}>
//             <span className={`${classes.icon}`} style={{ backgroundColor: item.background }}>
//               <i className={`fa fa-${item.icon}`}></i>
//             </span>
//           </div>
//           <div className={classes.newsItemInfo}>
//             <Typography variant="h5"><a className={classes.newsHeader} href="#/app/grid">{item.title}</a></Typography>
//             <div>
//               {item.description}
//             </div>
//             <time className={classes.timeBlock}>{item.date}</time>
//           </div>
//         </li>
//       ))}
//     </ul>
//   )
// }

// export default withStyles(styles)(Newss);
import React , { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import mock from '../../draggablegrid/mock';
import axios from "axios";
import StarsIcon from '@material-ui/icons/Stars';
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
    width: 60,
    height: 60,
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
    const d= sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Notficationparents/1`)
      .then(res => {
        seCoursM(res.data)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
const iconn = <StarsIcon />



  return (
    <ul className={classes.newsList}>
      {CoursM.map((m,) => (
        <li className={classes.listRow} key={m.title}>
          <div className={classes.iconBlock}>
          <span className={`${classes.icon}`} style={{ backgroundColor: '#ff8080',marginRight:'15px', marginTop:'10px' }}>
              <i className={`fa fa-${ 'bell-o'}`}></i>
              
            </span>
          </div>
          <div className={classes.newsmInfo}>
            <Typography variant="h5"><a className={classes.newsHeader} href="#/app/grid">{"m.title"}</a></Typography>
            <div>
              {m.Message}
            </div>
            <time className={classes.timeBlock}>{m.date_s}</time>
          </div>
          {/* <div style={{color:'white', backgroundColor:'#ff8080', borderRadius:15, display:'flex', alignItems:'center',height:'50px', marginTop:'20px' }}>    {m.Status}</div> */}
      
        </li>
      ))}
    </ul>
  )
}

export default withStyles(styles)(Newss);