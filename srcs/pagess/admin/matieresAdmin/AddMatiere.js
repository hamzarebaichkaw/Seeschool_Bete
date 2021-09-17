import React, { useState, useEffect } from 'react'
 
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
 
  
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory, Redirect } from 'react-router-dom'
import Axios from 'axios'
import { Button, Typography } from '../../../components/Wrappers'
import { actions } from '../../../context/ManagementContext'
import { useManagementDispatch } from '../../../context/ManagementContext'
import Notification from "../../../components/Notification";
import { toast } from 'react-toastify'
import useStyles from './styles'

export default function AddMatiere(props) {
  var [NomValue, setNomValue] = useState("");
  var [Descrption, setDescrption] = useState("");
  var [coefficient, setcoefficient] = useState("");
  const [clas, setclas] = useState("");
  var [numh, setnumh] = useState("")
  const [displaynom, setDiscplaynom] = useState("none")
  const [displaydesc, setdisplaydesc] = useState("none")
  const [displaycoef, setdisplaycoef] = useState("none")
  const [displaynumbh, setdisplaynumbh] = useState("none")
  const [displayniv, setdisplayniv] = useState("none")
  const [redirection, setRedirection] = useState(false)
  const classes = useStyles()


  function verif1(nom, ds, co, nm, cl) {
    var test = true
    if (nom === "") {
      setDiscplaynom("block")
      test = false
    } else { setDiscplaynom("none") }

    if (ds === "") {
      setdisplaydesc("block")
      test = false
    } else { setdisplaydesc("none") }

    if (co === "") {
      setdisplaycoef("block")
      test = false
    } else { setdisplaycoef("none") }

    if (nm === "") {
      setdisplaynumbh("block")
      test = false
    } else { setdisplaynumbh("none") }


    if (cl === "") {
      setdisplayniv("block")
      test = false
    } else { setdisplayniv("none") }

    return (test)
  }


  function AddMat(NomValue, coefficient, Descrption, numh, clas) {



    console.log(clas)
    Axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/api/matieres', {
        "Nom": NomValue,
        "Description": Descrption,
        "classe": "/public/api/classes/" + clas,
        "coefficient": coefficient,
        "nbHeure": numh
      })
      .then(res => {
        // sendNotification()
        setRedirection(true)
      })
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

  function sendNotification() {
    const componentProps = {
      type: "feedback",
      message: "Matière Ajouté avec succée!",
      variant: "contained",
      color: "success"
    };
    const options = {
      type: "info",
      position: toast.POSITION.TOP_RIGHT,
      progressClassName: classes.progress,
      className: classes.notification,
      timeOut: 1000
    };
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options
    );
  }

  const [type, setType] = useState('')

  var managementDispatch = useManagementDispatch()
  const history = useHistory()
  const doSubmit = (id, data) => {
    actions.doCreate(data, history)(managementDispatch);

  };

  if (redirection) {
    //Affichage de la redirection
    return <Redirect to='/admin/matieres' />;
  } else {
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
          <h1>Ajouter une matière</h1>
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
              name="Description"
              value={Descrption}
              onChange={e => setDescrption(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35 }}

              type={'textera'}
            />
            <TextField
              id="outlined-basic"
              label={displaycoef === ("none") ? "Coefficient" :
                <p style={{ color: "red", display: displaycoef }}>Coefficient</p>}
              name="coefficient"
              value={coefficient}
              onChange={e => setcoefficient(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35 }}

              type={'textera'}
            />
            <TextField
              id="outlined-basic"
              label={displaynumbh === ("none") ? "Nombre d'heures" :
                <p style={{ color: "red", display: displaynumbh }}>Nombre d'heures</p>}
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
                  AddMat(NomValue, coefficient, Descrption, numh, clas)
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



}