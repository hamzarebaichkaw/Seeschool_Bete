
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
  var classes = useStyles();
  const [user, setUser] = useState({})
  const [photos, setphotos] = useState({})
  const getUserById = () => {
    const d = localStorage.getItem('user_id')
    // axios      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Student/${d}`)     
    axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeur/${d}`)
      .then((res) => setUser(res.data[0]))
      .catch((err) => console.log(err));
  };

  useEffect(() => { getUserById(); }, []);

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
    <Grid item xs={12} item justify={'center'} container >
      <Widget>
        <Grid   >

          <Grid container spacing={1}  >
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <div className={classes.visualProfile}>
                <div className={classes.profileImage}>
                  <img width="100px" src={"data:image/jpeg;base64,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"} alt="profile" />
                </div>
                <Chip
                  className={classes.chipMargin}
                  color="secondary"
                  label={"ID: 19930456"}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7}  >

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

        </Grid>
        <Grid spacing={4}>
          {/* {currentUser} */}


          <br />
          <Grid >

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <br /> <br />
                <h3>Dashbord Professeurs</h3>
                <br />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                      color="primary"
                      variant="contained"
                      href="http://localhost:3000/#/Professeur/emploi"
                    //   onClick={()=>{reg("1")}} 
                    > Emploi
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', alignItems: 'center', height: '100px' }}
                      color="primary"
                      variant="contained"
                      href="http://localhost:3000/#/Professeur/cours"
                    //   onClick={()=>{reg("1")}} 
                    > Gestion des cours
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                      color="primary"
                      variant="contained"
                      href="http://localhost:3000/#/Professeur/assuidit%C3%A9"
                    //   onClick={()=>{reg("1")}} 
                    > Gestion d'assiduité
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
                    > Gestion des examens
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                      color="primary"
                      variant="contained"
                      href="http://localhost:3000/#/Professeur/notes"
                    //   onClick={()=>{reg("1")}} 
                    > Gestion des notes
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
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
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                      color="primary"
                      variant="contained"
                      href="http://localhost:3000/#/Professeur/Events"
                    //   onClick={()=>{reg("1")}} 
                    > Evenements
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ backgroundColor: "#3A86FF", width: '200px', height: '100px' }}
                      color="primary"
                      variant="contained"
                      href="http://localhost:3000/#/Professeur/support"
                    //   onClick={()=>{reg("1")}} 
                    > Contacter le Support
                    </Button>
                  </div>
                  <br />
                  <br />

                </div>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Widget>
    </Grid>)
}