import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link, Button, Avatar } from "../../../components/Wrappers/Wrappers";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";

import axios from "axios";

import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { red } from "@material-ui/core/colors";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


export default function CongesAdmin() {
  const classes = useStyles();
  const [CoursM, seCoursM] = useState([]);
  const [buttonload, setbuttonload] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    getStats()
  }, [])


  const getStats = async () => {
    const d = localStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/CongeByProf`)
      .then(res => {
        seCoursM(res.data)
        console.log(res.data)
      }, 2000)


    setIsLoading(false)

  };
  const upemdate = async (id) => {
    setbuttonload(true)
    await axios.put(`http://www.pointofsaleseedigitalaency.xyz/public/api/conges/${id}`,
      {
        "status": "acceptée"
      }

    ).then(res => {
      console.log(res.data)
      setbuttonload(false)
    }).catch(e => { console.log(e) })
    console.log(id)
  }

  const uprefuse = async (id) => {
    setbuttonload(true)
    await axios.put(`http://www.pointofsaleseedigitalaency.xyz/public/api/conges/${id}`,
      {
        "status": "Refusé"
      },
      console.log("updated")
    ).then(res => {
      console.log(res.data)
      setbuttonload(false)
    }).catch(e => { console.log(e) })

  }



  function setcolor(sd) {
    let colo
    if (sd == "En Cours") { colo = "#ffc107" }
    else if (sd == "acceptée") { colo = "#2ecc71" }
    else colo = "#dc3545"

    return (colo)
  }
  function acept(pos) {
    upemdate(CoursM[pos].id)
    let zog = CoursM
    zog[pos].Status = "acceptée"
    console.log(zog[pos].Status)
    seCoursM(zog)

  }
  function refus(pos) {

    uprefuse(CoursM[pos].id)
    let zog = CoursM
    zog[pos].Status = "Refusé"
    console.log(zog[pos].Status)
    seCoursM(zog)

  }
  const [value, setValue] = useState();
  const refresh = () => {
    // re-renders the component
    setValue({});
  }

  //   function check(c) {
  // let icon

  //  if (c == "acceptée") {
  //    icon = <CheckCircleIcon />
  //  }

  //  else {

  //  }
  //   }




  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Congés </h1>
      </div>
      <div style={{ backgroundColor: '', }}>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between', }}>

        </div>
        <br />
        <br />
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Gestion des Congés"
              data={CoursM}
              columns={[
                { name: "Monsieur\/Madame", label: "Monsieur / Madame" },
                { name: "Description", label: "Description" },
                { name: "maladie", label: "Maladie" },
                { name: "Début", label: "Début" },
                { name: "Fin", label: "Fin" },

                {
                  name: "Status",
                  options: {

                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>

                          <p style={{ backgroundColor: setcolor(tableMeta.rowData["5"]), color: 'white', borderRadius: 10, textAlign: 'center' }} >{tableMeta.rowData["5"]}</p>
                        </>
                      )
                    }
                  }
                },
                {
                  name: "Actions",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <div>

                          {buttonload ? <CircularProgress size={25} /> :
                            tableMeta.rowData[5] === 'acceptée' ?
                            <div style={{textAlign:'center'}}> 
                              <CheckCircleIcon color="primary" style={{color:'#2ecc71'}} />
                              </div>
                              : tableMeta.rowData[5] === 'Refusé' ?
                              <div style={{textAlign:'center'}}>
                                <CancelIcon color="error" />
                                </div>
                                :
                                <div style={{ display: "flex", alignItems: "space-around", justifyContent: "space-around" }}>

                                  <Button
                                    variant={"contained"}
                                    className={classes.marginRight}
                                    onClick={() => {
                                      acept(tableMeta.rowIndex)
                                      console.log(tableMeta.rowIndex);

                                      refresh()
                                    }}

                                  >
                                    <CheckIcon color="primary" />
                                  </Button>
                                  <Button
                                    variant={"contained"}
                                    className={classes.marginRight}
                                    onClick={
                                      () => {
                                        refus(tableMeta.rowIndex)
                                        console.log(tableMeta.rowIndex);

                                        refresh()

                                      }
                                    }
                                  >
                                    <CancelIcon color="error" />
                                  </Button>



                                </div>
                          }
                        </div>
                      )
                    }
                  }
                }
              ]}
              options={{
                filterType: "checkbox",

                textLabels: {
                  body: {
                    noMatch: isLoading ?
                      <CircularProgress /> :
                      'Désolé, il n\'y a aucune donnée correspondante à afficher',
                  },
                },
              }}
            />
          </Grid>
        </Grid>

      </div>
    </div>
  );
}