

import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";

import axios from "axios";
import ToDo from '../../profile/Components/ToDo';
import { useTheme } from "@material-ui/styles";
import { Badge, Chip, Button } from '../../../components/Wrappers/Wrappers';
import Widget from "../../../components/Widget/Widget";
import useStyles from "./styles";
import Calendar from '../../profile/Components/Calendar/Calendar';
import Donut from '../../profile/Components/DonutChart';

import RNSWidget from '../../profile/Components/RNSWIdget';









 export default function DashboardParent(){

    var classes = useStyles();
    var theme = useTheme();
  
    const [user, setUser] = useState({})
 
    const [photo,setphotos] = useState({})
   const getUserById = () => {   
    const d= sessionStorage.getItem('user_id')
      // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${d}`)     
      axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Parents/10`)    
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
    axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByparents/10`)   
     .then((res) => setphotos(res.data["0"] )) 
     
     .catch((err) => console.log(err));
    
    
    
    };
  // console.log("photos",getMatiere())
  useEffect(() => {    getphotos();  }, []);
   
  


    return(
        <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={6} lg={5}>
        <Widget>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <div className={classes.visualProfile}>
                <div className={classes.profileImage}>
                  <img width="100%" src={photo.photo} alt="profile" />
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
               
                  {user.fullName}  
                  < br /> 
                  {user. username} 
                  < br /> 
                  {user. email} 
                  < br /> 
                  {user. Nationalite} 
                  < br /> 
                  {user. phone} 


                </Typography>
                <span className={classes.profileSubtitle}>Student's Mother</span>
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
      <Grid item xs={12} lg={4}>
        <Widget
          title="Tasks"
          bodyClass={classes.widgetBody}
          widgetWithDropdown
        >
          <ToDo />
        </Widget>
        
      </Grid>
      <Grid item xs={3} >
            <Widget>
              <Calendar />
            </Widget>
          </Grid>
          <Grid item xs={5}>
            <Widget>
              <RNSWidget />
            </Widget>
          </Grid>
          <Grid item xs={7}>
            <Widget widgetWithDropdown
              className={classes.adjustHeight}
              title="Absences"
            >
              <Donut />
            </Widget>
          </Grid>
</Grid>

    )}
// //     var classes = useStyles();
// //     var theme = useTheme();


// //     const [user, setUser] = useState({})
 
// //     const [photos,setphotos] = useState({})
// //    const getUserById = () => {   
// //     const d= sessionStorage.getItem('user_id')
// //       // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${d}`)     
// //       axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/1`)    
// //        .then((res) => setUser(res.data[0])) 
       
// //        .catch((err) => console.log(err));  };
// //   // console.log("user",user)
// //   useEffect(() => {    getUserById();  }, []);
   
  
// //   // const getMatiere = () => {   
// //   //   axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/1`)     
// //   //    .then((res) => setmatiere(res.data )) 
     
// //   //    .catch((err) => console.log(err)) ; 
    
    
    
    
// //   //  [] };
// //   // // console.log("Matiere",matiere)
// //   // useEffect(() => {    getMatiere();  }, []);
   
// //   const [mat, setmat] = useState([]);
  
// //   useEffect(function () {
// //     const d= sessionStorage.getItem('user_id')
// //     axios
// //       // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
// //       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/1`)
// //       .then(res => {
// //         setmat(res.data.result)
// //       }, 2000)
// //       .catch(() => {
// //         console.log("ERROR")
// //       });
// //   }, []);
   
   
  
  
// //   const getphotos = () => {   
// //     const d= sessionStorage.getItem('user_id')
// //     // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/${d}`)    
// //     axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/1`)   
// //      .then((res) => setphotos(res.data["0"] )) 
     
// //      .catch((err) => console.log(err));
    
    
    
// //     };
// //   // console.log("photos",getMatiere())
// //   useEffect(() => {    getphotos();  }, []);
   
  
// //     return(
// //         <Grid container spacing={4}>
// //         {/* {currentUser} */}
// //         <Grid item xs={12} sm={6} md={6} lg={5}>
// //           <Widget>
// //             <Grid container spacing={1}>
// //               <Grid item xs={12} sm={5} md={5} lg={5}>
// //                 <div className={classes.visualProfile}>
// //                   <div className={classes.profileImage}>
// //                     <img width="100%" src={photos.photo} alt="profile" />
// //                   </div>
// //                   <Chip
// //                     className={classes.chipMargin}
// //                     color="secondary"
// //                     label={"ID: 19930456"}
// //                   />
// //                 </div>
// //               </Grid>
// //               <Grid item xs={12} sm={7} md={7} lg={7}>
// //                 <div className={classes.profileDescription}>
// //                   <Typography variant="h3" className={classes.profileTitle}>
                 
// //                     {user.username}   
  
               
  
  
  
// //                   </Typography>
// //                   <span className={classes.profileSubtitle}>Etudiant</span>
// //                   <a className={classes.profileExternalRes}> {user.Classe} </a>
// //                   <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                     {/* <Badge type="tag" badgeContent={"UI/UX"} color="primary"/> */}
// //                     {/*   */}
    
                    
  
       
// //        {mat.map((item) => (
      
// //         <Badge type="tag" badgeContent={item.matieress} color="primary"/>
// //       )) 
                 
               
// //                     }    
// //                     {/* 
// //   { 
// //    getMatiere((c) => (
// //     <Badge type="tag" badgeContent={c.matieress} color="warning" /> 
  
  
   
// //               ) )
// //             matiere.map((user) => (
// //                 <div className="user">{user}</div>
// //                )) 
    
// //     } */}
    
// //                   </div>
// //                 </div>
// //               </Grid>   
// //                            </Grid>    
// //                                   </Widget>      
// //                                        </Grid>    
// //                                          </Grid>
// //     )
// // }