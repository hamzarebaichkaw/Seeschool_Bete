
import React, { useState, useEffect } from 'react'
import ChatWidget from "../../../components/ChatWidget/ChatWidget";
import Widget from "../../../components/Widget/Widget";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Badge, Chip, Button } from '../../../components/Wrappers';
// import Tabs from './Components/Tabs';
// import Donut from './Components/DonutChart';
// import RNSWidget from './Components/RNSWIdget';
// import ToDo from './Components/ToDo';
// import Calendar from './Components/Calendar/Calendar';
import useStyles from "./styles";
export default function ProfsDashboard() {
  var classes = useStyles()
  const [user, setUser] = useState({})
  const [photos, setphotos] = useState({})
  const getUserById = () => {
    const d = localStorage.getItem('user_id')
    // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${d}`)     
    axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeur/${d}`)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log(err));
  };
  // console.log("user",user)
  useEffect(() => { getUserById(); }, []);
  // const getMatiere = () => {   
  //   axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)     
  //    .then((res) => setmatiere(res.data )) 
  //    .catch((err) => console.log(err)) ; 
  //  [] };
  // // console.log("Matiere",matiere)
  // useEffect(() => {    getMatiere();  }, []);
  const [mat, setmat] = useState([]);
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .then(res => {
        setmat(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  const getphotos = async () => {
    const d = localStorage.getItem('user_id')
    // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByStudent/${d}`)    
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ImageByprofesseur/${d}`)
      .then((res) => setphotos(res.data["0"]))
      .catch((err) => console.log(err));
  };
  // console.log("photos",getMatiere())
  useEffect(() => { getphotos(); }, []);
  return (
    <Grid container spacing={4}>
      {/* {currentUser} */}
      <Grid item xs={12} sm={6} md={6} lg={5}>
        <Widget>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <div className={classes.visualProfile}>
                <div className={classes.profileImage}>
                  <img width="100px" src={photos.photo} alt="profile" />
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
                </Typography>
                <span className={classes.profileSubtitle}>Professeur</span>
                <a className={classes.profileExternalRes}> {user.email} </a>
                <a className={classes.profileExternalRes}> {user.phone} </a>
                <a className={classes.profileExternalRes}> {user.niveau} </a>
                <a className={classes.profileExternalRes}> {user.sous_niveau} </a>
                {/* <a className={classes.profileExternalRes}> {user.matiere} </a> */}
                <Badge type="tag" badgeContent={user.matiere} color="primary" />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* <Badge type="tag" badgeContent={"UI/UX"} color="primary"/> */}
                  {/*   */}
                  {/* {mat.map((item) => (
        <Badge type="tag" badgeContent={item.matieress} color="primary"/>
      )) 
                    }     */}
                </div>
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>

      <br />
      <Grid item xs={12} sm={6} md={6} lg={7}>
        <Widget title="Dashboard Professeur" disableWidgetMenu>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <br /> <br />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/emploi"
                  //   onClick={()=>{reg("1")}} 
                  > Emploi
                  </Button>  <Button style={{ backgroundColor: "#3A86FF", width: '200px', alignItems: 'center', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/cours"
                  //   onClick={()=>{reg("1")}} 
                  > Gestion des cours
                  </Button>
                </div>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/assuidit%C3%A9"
                  //   onClick={()=>{reg("1")}} 
                  > Gestion d'assuidité
                  </Button>  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/homework"
                  //   onClick={()=>{reg("1")}} 
                  > Gestion des examens
                  </Button>
                </div>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/notes"
                  //   onClick={()=>{reg("1")}} 
                  > Gestion des notes
                  </Button>  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/conges"
                  //   onClick={()=>{reg("1")}} 
                  > Gestion des congés
                  </Button>
                </div>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/homework"
                  //   onClick={()=>{reg("1")}} 
                  > homework
                  </Button>  <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/Events"
                  //   onClick={()=>{reg("1")}} 
                  > Evenements
                  </Button>
                </div>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button style={{ backgroundColor: "#3A86FF", width: '500px', height: '100px' }}
                    color="primary"
                    variant="contained"
                    href="http://localhost:3000/#/Professeur/support"
                  //   onClick={()=>{reg("1")}} 
                  > Contacter le Support
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
    </Grid>
  )
}