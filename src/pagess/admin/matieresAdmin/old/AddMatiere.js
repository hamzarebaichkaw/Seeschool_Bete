import React, { useState, useEffect } from 'react'
// import Stepper from '@material-ui/core/Stepper'
// import Step from '@material-ui/core/Step'
// import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useHistory } from 'react-router-dom'
// import useStyles from './styles'
// import { toast } from 'react-toastify'
import Axios from 'axios'
// import config from '../../../config'
// import uuid from 'uuid/v4'
// import Notification from "../../../components/Notification";
import { Button, Typography } from '../../../components/Wrappers'
// import Widget from '../../../components/Widget'
// import { actions } from '../../../context/ManagementContext'
// import {
//   useManagementDispatch,
// } from '../../../context/ManagementContext'
export default function AddMatiere(props) {
  var [NomValue, setNomValue] = useState("");
  var [Descrption, setDescrption] = useState("");
  var [coefficient, setcoefficient] = useState("");
  const [clas, setclas] = useState("");
  var [numh, setnumh] = useState("")
  const [CoursM, seCoursM] = useState([]);
  const [displaynom, setDiscplaynom] = useState("none")
  const [displaydesc, setdisplaydesc] = useState("none")
  const [displaycoef, setdisplaycoef] = useState("none")
  const [displaynumbh, setdisplaynumbh] = useState("none")
  const [displayniv, setdisplayniv] = useState("none")

  function verif1(nom, ds, co, nm, cl) {
    var test = true
    if (nom === "") {
      setDiscplaynom("block")
    } else { setDiscplaynom("none") }

    if (ds === "") {
      setdisplaydesc("block")
    } else { setdisplaydesc("none") }

    if (co === "") {
      setdisplaycoef("block")
    } else { setdisplaycoef("none") }

    if (nm === "") {
      setdisplaynumbh("block")

    } else { setdisplaynumbh("none") }


    if (cl === "") {
      setdisplayniv("block")
    } else { setdisplayniv("none") }
  }
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    Axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        seCoursM(res.data.result)
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  function AddMat(NomValue, coefficient, Descrption, clas) {

    Axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/api/matieres', {
        "classe": "/public/api/classes/" + clas,
        "nom": NomValue,
        "description": Descrption,
        "coefficient": coefficient
      })
      .then(

        console.log("yessssssssssssssssssss".clas)
      )
  }

  const [niveaux, setNiveaux] = useState([
    { id: 1, niveau: '1ère année', type: 'Primaire' },
    { id: 2, niveau: '2ème année', type: 'Primaire' },
    { id: 3, niveau: '3ème année', type: 'Primaire' },
    { id: 4, niveau: '4ème année', type: 'Primaire' },
    { id: 5, niveau: '5ème année', type: 'Primaire' },
    { id: 6, niveau: '6ème année', type: 'Primaire' },
    { id: 7, niveau: '7ème année', type: 'Collège' },
    { id: 8, niveau: '8ème année', type: 'Collège' },
    { id: 9, niveau: '9ème année', type: 'Collège' },
    { id: 10, niveau: '1ère année', type: 'Secondaire' },
    { id: 11, niveau: '2ème année', type: 'Secondaire' },
    { id: 12, niveau: '3ème année', type: 'Secondaire' },
    { id: 13, niveau: '4ème année', type: 'Secondaire' }
  ])


  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])

  const [type, setType] = useState('')


  return (
    <Grid item justify={'center'} container>
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={600}
      >
        <Typography
          variant={'h5'}
          weight={'medium'}
          style={{ marginBottom: 30 }}
        >
        </Typography>
        <h1>Ajouter une matiére</h1>
        <>
          <TextField
            id="outlined-basic"
            label={displaynom === ("none") ? "Nom De Matière" :
              <p style={{ color: "red", display: displaynom }}>Nom de matière</p>}
            // onChange={}
            name="Nom"
            value={NomValue}
            onChange={e => setNomValue(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}

          />
          <TextField
            id="outlined-basic"
            label={displaydesc === ("none") ? "Description" :
              <p style={{ color: "red", display: displaydesc }}>Description</p>}
            // onChange={}
            // value={}
            name="Description"
            value={Descrption}
            onChange={e => setDescrption(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}

            type={'textera'}
          />
          <TextField
            id="outlined-basic"
            label={displaycoef === ("none") ? "coefficient" :
              <p style={{ color: "red", display: displaycoef }}>coefficient</p>}
            // onChange={}
            // value={}
            name="coefficient"
            value={coefficient}
            onChange={e => setcoefficient(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}

            type={'textera'}
          />
          <TextField
            id="outlined-basic"
            label={displaynumbh === ("none") ? "nombre d'heur" :
              <p style={{ color: "red", display: displaynumbh }}>nombre d'heur</p>}
            // onChange={}
            // value={}
            name="nombre d'heur"
            value={numh}
            onChange={e => setnumh(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}

            type={'textera'}
          />

          <div>
            <p style={{ fontSize: 20, color: displayniv === "block" ? "red" : "black" }}>Type:</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: 250, height: 20, width: 600, marginBottom: 80 }}
              value={type}
              onChange={e => {
                setType(e.target.value)
              }}
            >
              {
                types.map((t) =>
                  <MenuItem value={t.type} key={t.id}>{t.type}</MenuItem>
                )
              }
            </Select>
          </div>

          <div>
            <p style={{ fontSize: 20, color: displayniv === "block" ? "red" : "black" }}>Niveau:</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: 250, height: 20, width: 600, marginBottom: 80 }}
              value={clas}
              onChange={e => {
                setclas(e.target.value)
              }}
            >
              {
                niveaux.map((n) =>
                  n.type === type ?
                    <MenuItem value={n.niveau} key={n.id}>{n.niveau}</MenuItem> : null
                )
              }
            </Select>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (verif1(NomValue, Descrption, coefficient, numh, clas)) {
                AddMat(NomValue, Descrption, coefficient, numh, clas)
              }
            }}
          >
            Envoyer
          </Button>
        </>
      </Box>
    </Grid>
  )
}