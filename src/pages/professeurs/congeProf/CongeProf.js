import 'date-fns';
import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, CircularProgress } from "../../../components/Wrappers/Wrappers";
import Widget from "../../../components/Widget";
import {
  Grid,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import axios from 'axios';
import BlueRadio from "@material-ui/core/Radio"
import MUIDataTable from "mui-datatables";
import DateFnsUtils from "@date-io/date-fns"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_GRID":
      return {
        ...state,
        toggleGrid: true
      };
    case "CLOSE_GRID":
      return {
        ...state,
        toggleGrid: false
      };
  }
};

export default function CongeProf() {

  const [dateDep, setDateDep] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [maladie, setMaladie] = useState('Oui')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingConges, setLoadingConges] = useState(false)

  const [selectedDatedb, setSelectedDatedb] = React.useState(new Date())
  const [selectedDatedf, setSelectedDatedf] = React.useState(new Date())

  useEffect(() => {
    getConge()
  }, [])

  const getConge = async () => {
    const id_prof = localStorage.getItem('user_id')
    setLoadingConges(true)
    await axios
       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/CongessByProf/${id_prof}`)
     
      .then((res) => {
        setConges(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
    setLoadingConges(false)
  }

  const ajouterConge = async () => {
    setLoading(true)
    await axios
      .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/conges`, {
        "Cause": description,
        "Description": description,
        "maladie": maladie,
        "Created_At": selectedDatedb,
        "modified_at": selectedDatedf,
      
        "prof": "/public/api/enseignants/1",
        "status": "En Cours"
      })
      .then(res => {
        console.log(res.data)
        dispatch({ type: "CLOSE_GRID" })
      })
      .catch(e => {
        console.log(e)
      })
    setLoading(false)
  }

  const [disdd, setdisdd] = useState(true)
  const [disdf, setdisdf] = useState(true)
  const [disdisc, setdisdisc] = useState(true)
  const [dismala, setdismala] = useState(true)
  const [conges, setConges] = useState([])

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  function verif() {
    var test = true
    if (selectedDatedb.getTime() == NaN) {
      setdisdd(false)
      test = false
    }
    else { setdisdd(true) }

    if (selectedDatedf.getTime() === NaN) {
      setdisdf(false)
      test = false
    }
    else { setdisdf(true) }

    if (description === "") {
      setdisdisc(false)
      test = false
    }
    else { setdisdisc(true) }


    return test
  }

  const handleChange = (e) => {
    setMaladie(e.target.value)
  }
  const handleDateChange = (date) => {
    setSelectedDatedb(date);
  }
  const handleDateChange2 = (date) => {
    setSelectedDatedf(date);
  }
  function spiltdat(dat) {

    if (dat !== null) {
      var p = dat.date.split(' ')
      return (p[0])
    } else { return ("-") }


  }

  return (
    <Grid item xs={12} item>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des congés</h1>
        <Button
          onClick={() => dispatch({ type: "OPEN_GRID" })}
          style={{
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: '#0984e3',
            color: "#fff",
            alignSelf: 'center'
          }}
        >
          Demande de congé
        </Button>
      </div>

      <Grid item xs={12} style={{ marginTop: 50 }}>
        <MUIDataTable
          title="Vos demandes de congé"
          data={conges}
          columns={[
            {
              name: 'Début', label: 'Date Début', options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <>
                      {spiltdat(value)}
                    </>
                  )
                }
              }
            },
            {
              name: 'Fin', label: 'Date Fin', options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <>
                      {spiltdat(value)}
                    </>
                  )
                }
              }
            },
            { name: 'maladie', label: 'Maladie' },
            { name: 'Description', label: 'Description' },
            { name: 'Status', label: 'État de la demande' }
          ]}
          options={{
            filterType: "checkbox",
            textLabels: {
              body: {
                noMatch: loadingConges ?
                  <CircularProgress /> :
                  'Désolé, il n\'y a aucune donnée correspondante à afficher',
              },
            },
          }}
        />
      </Grid>


      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid}
        onClose={() => dispatch({ type: "CLOSE_GRID" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Demande de congé"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div>
                <h3>Début de Congé </h3>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                      disablePast
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date final"
                      value={selectedDatedb}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}

                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <h3>Fin de congé</h3>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent="space-around">
                    <KeyboardDatePicker

                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      disablePast
                      label="Date final"
                      value={selectedDatedf}
                      onChange={handleDateChange2}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}

                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>

            </div>

            <Grid item style={{ marginTop: 20 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Maladie?</FormLabel>
                <RadioGroup aria-label="maladie" name="maladie1" value={maladie} onChange={handleChange}>
                  <FormControlLabel value="Oui" control={<BlueRadio />} label="Oui" />
                  <FormControlLabel value="Non" control={<BlueRadio />} label="Non" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item style={{ marginTop: 20 }}>
              {disdisc ? <p>Description</p> : <p style={{ color: "red" }} >Description</p>}
              <TextareaAutosize
                style={{ width: '1220px', paddingLeft: 5, paddingTop: 5 }}
                aria-label="minimum height"
                rowsMin={7}
                placeholder="Saisir votre texte..."
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              if (verif()) {
                ajouterConge()
              }
            }}
            color="primary"
          >
            {
              loading ?
                <CircularProgress size={25} />
                :
                "Enregistrer"
            }
          </Button>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="danger"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
    </Grid>
  )
}