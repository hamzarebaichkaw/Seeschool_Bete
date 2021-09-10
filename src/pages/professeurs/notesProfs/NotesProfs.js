import React, { useState, useEffect } from "react";
import {
  Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { Select, MenuItem } from "@material-ui/core";
import * as Icons from "@material-ui/icons"
import useStyles from "./styles";
import MUIDataTable from "mui-datatables";
import { Link, Button, CircularProgress } from "../../../components/Wrappers/Wrappers";

import axios from "axios";

export default function NotesProfs() {
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = React.useState(true);
  // <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [profClasses, setProfClasses] = useState([])
  const [notesEleves, setNotesEleves] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [loadingEleves, setLoadingEleves] = useState(false)
  const [showTable, setShowTable] = useState(false)


  useEffect(() => {
    getProfClasses()
  }, [])

  const getProfClasses = async () => {
    // const current_prof = sessionStorage.getItem('user_id')
    setLoadingClasses(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/${current_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/professeurClasse/15`)
      .then(res => {
        setProfClasses(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingClasses(false)
  }

  const getEleves = async () => {
    setLoadingEleves(true)
    setShowTable(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotekByCalsse/${id_classe}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NotekByCalsse/1/15`)
      .then(res => {
        setNotesEleves(res.data)
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingEleves(false)
  }

  return (
    <div>
      <h1>Gestion des Notes</h1>
      <br />
      <h6>Choisissez une classe</h6>
      <br />
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        style={{ width: 300, height: 20, marginBottom: 40 }}
        required
        onChange={e => {
          getEleves()
        }}
      >
        {
          loadingClasses ?
            <CircularProgress size={25} />
            :
            (
              profClasses.map((m) =>
                <MenuItem value={m.Calsse} key={m.id}>
                  {m.Calsse}
                </MenuItem>
              )
            )
        }
      </Select>
      <br />
      <br />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {
            !showTable ?
              null
              :
              loadingEleves ?
                <CircularProgress size={30} />
                :
                (
                  <MUIDataTable
                    title="Liste des notes"
                    data={notesEleves}
                    columns={[
                      { name: "id", label: "ID" },
                      { name: "nom et prenom", label: "Nom et Prénom" },
                      {
                        name: "note", label: "Note Contrôle 1", options: {
                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Controle 1"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "note", label: "Note Contrôle 2", options: {
                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Controle 2"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "note", label: "Note Synthèse", options: {

                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Synthese"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "note", label: "Note Pratique", options: {

                          customBodyRender: (value, tableMeta, updateValue) => {
                            if (value.length == 0) {
                              return (
                                <p>-</p>
                              )
                            } else {
                              return (
                                <>
                                  <p>{value[0]["Pratique"]}</p>
                                </>
                              )
                            }
                          }
                        }
                      },
                      {
                        name: "Modifier", options: {
                          customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                              <Button>
                                <Icons.Update style={{ width: 30, height: 30 }} />
                              </Button>
                            )
                          }
                        }
                      },
                    ]}
                    options={{
                      filterType: "checkbox",
                    }}
                  />
                )
          }
        </Grid>
      </Grid>

      <br />
      <div style={{ justifyContent: "flex-end", float: "right" }}>
        {/* <Button style={{ backgroundColor: "#536dfe", width: '250px' }}
          color="primary"
          variant="contained"
          onClick={() => {

          }}
        >
          Upload
        </Button> */}


      </div>
    </div>
  )

}