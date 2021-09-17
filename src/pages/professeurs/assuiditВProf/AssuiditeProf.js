import React, { useState, useEffect } from 'react';
import { Link, Button } from "../../../components/Wrappers/Wrappers";
import CheckIcon from '@material-ui/icons/Check';
import axios from "axios";
import useStyles from "./styles";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import Widget from "../../../components/Widget";
import { Redirect, useHistory } from 'react-router-dom'
import {
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Paper
} from "@material-ui/core";

import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import MUIDataTable from "mui-datatables";


export default function AssuiditeProf() {

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [profClasses, SetProfClasses] = useState([])
  const [listEtudiants, SetlistEtudiants] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [loadList, setLoadList] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [selectedClasse, setSelectedClasse] = useState()
  const [IdClasse, setIdClasse] = useState()
  useEffect(() => {
    getProfClasses()
  }, [])

  const getProfClasses = async () => {
   const current_prof = localStorage.getItem('user_id')
    setLoadingClasses(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
      .then(res => {
        SetProfClasses(res.data)
       
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
    setLoadingData(false)
  }

  const initNewState = (data) => {
    let arr = new Array()
    data.map(d => {
      arr.push({ id: d.id, fullName: d.fullName, pres: "" })
    })
    SetlistEtudiants(arr)
  }

  const getClassList = async () => {
    setLoadList(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/StudentByClass/${id_classe}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/StudentByClass/${IdClasse}`)
      .then((res) => {
        // SetlistEtudiants(res.data)
        initNewState(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const saveAttendance = async () => {
    let empty = false
    let date = new Date()
    let dateTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T'
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    listEtudiants.map(e => {
      if (e.pres === "")
        empty = true
    })
    if (empty == true) {
      seterror(true)
    }
    else {
      setIsLoading(true)
      listEtudiants.map(async e => {
        await axios
          .post(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Addssiduite`,
            (e.pres === "Présent") ?
              {
                "date": dateTime,
                "id_matiere": selectedClasse,
                "id_student": e.id,

                "absent": "false"
              }
              :
              {
                "date": dateTime,
                "id_matiere": selectedClasse,
                "id_student": e.id,

                "absent": "true"
              }
          )
          .then(res => {
            console.log(res.data)
          })
          .catch(e => {
            console.log(e)
          })
      })
      setIsSubmitted(true)
      setIsLoading(false)
    }
  }
  const [error, seterror] = useState(false)
  const [types, setTypes] = useState([
    { id: 1, type: 'Présent' },
    { id: 2, type: 'Absent' },
  ])

  function updatetable(id, type) {
    var inter = listEtudiants
    inter[id].pres = type
    console.log(listEtudiants)
    SetlistEtudiants(inter)
  }

  const [value, setValue] = useState();

  const refresh = () => {
    // re-renders the component
    setValue({});
  }
  const [redirection, setRedirection] = useState(false)
  if (redirection) {
    //Affichage de la redirection
    return <Redirect to='/Professeur/dashboard' />;
  }


  return (
    <div>
      <h1>Gestion d'assiduité</h1>
      <br />
      <h6>Liste des Classes</h6>
      <br />
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        style={{ width: 300, height: 20, marginBottom: 40 }}
        required
        onChange={e => {
          getClassList(e.target.value)
          setIdClasse(e.target.value)
          console.log(e.target.value)
          setSelectedClasse(e.target.value)
        }}
      >
        {
          loadingClasses ?
            <CircularProgress size={25} />
            :
            (
              profClasses.map((m) =>
                <MenuItem value={m.id} key={m.id}>
                  {m.Calsse}
                </MenuItem>
              )
            )
        }
      </Select>

      <br />
      <br />
      {
        loadList ?

          isSubmitted ?
            <Grid item xs={12} item justify={'center'} container>
              <Widget>
                <h1> <CheckIcon style={{ fontSize: 80 }} />SUBMITED</h1>

                <Button style={{ backgroundColor: "#536dfe", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setRedirection(true)
                    refresh()
                  }
                  }


                >
                  Return to Dashbord
                </Button>
              </Widget>
            </Grid>
            :

            <Grid container spacing={4}>
              <Grid item xs={12}>



                <MUIDataTable
                  title="Gestion des assiduités"
                  data={listEtudiants}
                  columns={[
                    { name: "id", label: 'ID' },
                    {
                      name: "fullName", label: 'Nom et Prénom',
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <div>
                              {error ?
                                listEtudiants[tableMeta.rowIndex].pres === "" ? <p style={{ color: "red" }}>{value}</p> : <p>{value}</p> :

                                <p>{value}</p>
                              }
                            </div>

                          )
                        }
                      }


                    },


                    {
                      name: "Présence", options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <div style={{ display: 'flex', }}>
                              {
                                types.map((t) =>
                                  <Button
                                    style={
                                      (listEtudiants[tableMeta.rowIndex].pres === "Présent" && t.type === "Présent") ?
                                        { color: 'white', borderWidth: 1, backgroundColor: '#28a745', borderColor: "#red", width: '30px', padding: 5, fontSize: 12, marginLeft: "10px" } :
                                        (listEtudiants[tableMeta.rowIndex].pres === "Absent" && t.type === "Absent") ? { color: 'white', borderWidth: 1, backgroundColor: '#dc3545', borderColor: "#0E0D47", width: '30px', padding: 5, fontSize: 12, marginLeft: "10px" } :
                                          { fontSize: 12, padding: 5, backgroundColor: "#536dfe", width: '30px', marginLeft: "10px" }}
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                      updatetable(tableMeta.rowIndex, t.type)
                                      refresh()
                                    }}
                                  > {t.type}
                                  </Button>
                                )
                              }
                            </div>

                          )
                        }
                      }
                    },
                  ]}
                  options={{
                    filterType: "checkbox",
                    rowsPerPage: 100,
                    textLabels: {
                      body: {
                        noMatch: loadingData ?
                          <CircularProgress /> :
                          'Désolé, il n\'y a aucune donnée correspondante à afficher',
                      }
                    }
                  }}
                />


              </Grid>
              <Grid item xs={12}>
                <Button style={{ backgroundColor: "#536dfe", width: '250px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    saveAttendance()
                  }}

                >
                  {isLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Envoyer'}
                </Button>
              </Grid>


            </Grid>


          : null
      }
    </div>
  )

}