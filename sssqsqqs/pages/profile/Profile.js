import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import { Badge, Chip, Button } from '../../components/Wrappers';
import Tabs from './Components/Tabs';
import Donut from './Components/DonutChart';
import RNSWidget from './Components/RNSWIdget';
import ToDo from './Components/ToDo';
import Calendar from './Components/Calendar/Calendar';
import MediaBlock from './Components/MediaBlock';
import ViewsWidget from './Components/ViewsWidget';
import ProfileIcon from '../../images/profile/profilePhoto.svg';
import BehanceIcon from '../../images/profile/BehanceIcon.svg';
import MediumIcon from '../../images/profile/MediumIcon.svg';
import FacebookIcon from '../../images/profile/FacebookIcon.svg';
import DribbleIcon from '../../images/profile/DribbleIcon.svg';
import InstagramIcon from '../../images/profile/InstagramIcon.svg';
import CloudIcon from './Icons/CloudIcon';
import Chat from "../../components/Chat";
import ChatWidget from "../../components/ChatWidget/ChatWidget";
import { rows } from  "../ecommerce/mock";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";

function Profile() {
  var classes = useStyles();
  var theme = useTheme();

  // const [currentUser, setCurrentUser] = useState();

  // useEffect(function () {
  //   axios
  //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/1`)
  //     .then(res => {
  //       console.log(res.data[0].username)
  //       setCurrentUser(res.data[0]);
  //     })
  //     .catch(() => {
  //       console.log("ERROR")
  //     });
  // }, []);

  const [user, setUser] = useState({})
 
  const [photos,setphotos] = useState({})
 const getUserById = () => {   
  const d= sessionStorage.getItem('user_id')
    // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${d}`)     
    axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/1`)    
     .then((res) => setUser(res.data[0])) 
     
     .catch((err) => console.log(err));  };
// console.log("user",user)
useEffect(() => {    getUserById();  }, []);
 

// const getMatiere = () => {   
//   axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/1`)     
//    .then((res) => setmatiere(res.data )) 
   
//    .catch((err) => console.log(err)) ; 
  
  
  
  
//  [] };
// // console.log("Matiere",matiere)
// useEffect(() => {    getMatiere();  }, []);
 
const [mat, setmat] = useState([]);

useEffect(function () {
  const d= sessionStorage.getItem('user_id')
  axios
    // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
    .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/1`)
    .then(res => {
      setmat(res.data.result)
    }, 2000)
    .catch(() => {
      console.log("ERROR")
    });
}, []);
 
 


const getphotos = () => {   
  const d= sessionStorage.getItem('user_id')
  // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/${d}`)    
  axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/1`)   
   .then((res) => setphotos(res.data["0"] )) 
   
   .catch((err) => console.log(err));
  
  
  
  };
// console.log("photos",getMatiere())
useEffect(() => {    getphotos();  }, []);
 

 
  return (
  
    <Grid container spacing={4}>
      {/* {currentUser} */}
      <Grid item xs={12} sm={6} md={6} lg={5}>
        <Widget>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <div className={classes.visualProfile}>
                <div className={classes.profileImage}>
                  <img width="100%" src={photos.photo} alt="profile" />
                </div>
                <Chip
                  className={classes.chipMargin}
                  color="secondary"
                  label={"ID: 19930456"}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <div className={classes.profileDescription}>
                <Typography variant="h3" className={classes.profileTitle}>
               
                  {user.username}   

             



                </Typography>
                <span className={classes.profileSubtitle}>Etudiant</span>
                <a className={classes.profileExternalRes}> {user.Classe} </a>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* <Badge type="tag" badgeContent={"UI/UX"} color="primary"/> */}
                  {/*   */}
  
                  

     
     {mat.map((item) => (
    
      <Badge type="tag" badgeContent={item.matieress} color="primary"/>
    )) 
               
             
                  }    
                  {/* 
{ 
 getMatiere((c) => (
  <Badge type="tag" badgeContent={c.matieress} color="warning" /> 


 
            ) )
          matiere.map((user) => (
              <div className="user">{user}</div>
             )) 
  
  } */}
  
                </div>
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={7}>
        <Widget title="Files" disableWidgetMenu>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Tabs />
            </Grid>
          </Grid>
        </Widget>
      </Grid>

      <Grid item xs={12} lg={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={8} lg={12}>
            {/* <Widget widgetWithDropdown
              bodyClass={classes.mediaBlockPadding}
              title="Media"
            >
              <Grid container spacing={1}>
                <MediaBlock />
              </Grid>
            </Widget> */}
            <Widget className={classes.adjustHeight} title="Chat">
              <ChatWidget />
            </Widget>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={12}>
            <Widget>
              <RNSWidget />
            </Widget>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Widget
          title="Tasks"
          bodyClass={classes.widgetBody}
          widgetWithDropdown
        >
          <ToDo />
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={12}>
            <Widget>
              <Calendar />
            </Widget>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12}>
            <Widget widgetWithDropdown
              className={classes.adjustHeight}
              title="Projects"
            >
              <Donut />
            </Widget>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12}>
            {/* <Widget>
              <ViewsWidget color={theme.palette.primary.main} title="Views" subtitle="7.2%" value={7.156} />
            </Widget> */}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* <div className={classes.updateWidget}>
              <div className={classes.updateWidgetFlexContainer}>
                <CloudIcon />
                <div className={classes.updateLabel}>Updates</div>
                <div className={classes.spacer}></div>
                <Button className={classes.detailsBtn} variant="outlined" color="transparent">DETAILS</Button>
              </div>
            </div> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// #######################################################################

export default Profile;
