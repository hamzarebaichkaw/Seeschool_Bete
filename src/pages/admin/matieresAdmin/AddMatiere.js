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
import { useHistory, Redirect } from 'react-router-dom'
import Axios from 'axios'
import { Button, Typography } from '../../../components/Wrappers'
import { actions } from '../../../context/ManagementContext'
import { useManagementDispatch } from '../../../context/ManagementContext'
import Notification from "../../../components/Notification";
import { toast } from 'react-toastify'
import useStyles from './styles'
import { CircularProgress } from '@material-ui/core'

export default function AddMatiere(props) {
  var [NomValue, setNomValue] = useState("");
  var [Descrption, setDescrption] = useState("");
  var [coefficient, setcoefficient] = useState("");
  const [id, setid] = useState("");
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



  const getClasses = async (niv) => {

    console.log(niv)
    await Axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListAdminclasses/Secondaire/3eme`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListAdminclasses/${type}/${niv}`)
      .then(res => {
        setNumeross(res.data)
       console.log(res.data)
       console.log(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListAdminclasses/${type}/${niv}`)
      }, 2000)
      .catch((e) => {
console.log(e)
      })
    
  }


  const [Sectionn, setSectionn] = useState('0')

  const [Sectionx, setSectionx] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 2, section: 'Math??matiques' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])



  const [niveau, setNiveau] = useState('')
  const handleChangeNiveau = e => {
    setNiveau(e.target.value)
    getClasses(e.target.value)

  }
  const [loading, setLoading] = useState(false)

  async function AddMat(NomValue, coefficient, Descrption, numh, Numeroo) {
    setLoading(true)
    await Axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/api/matieres', {
        "Nom": NomValue,
        "Description": Descrption,
        "classe": "/public/api/classes/" + Numeroo,
        "coefficient": coefficient,
        "nbHeure": numh
      })
      .then(res => {
        console.log(res.data)
        sendNotification()
        setRedirection(true)
      })
    setLoading(false)
  }
//  const [numeros, setNumeros] = useState([])
//   const [numero, setNumero] = useState('')
  const getNumerosSection = async (niv, sec) => {
    await Axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
      .then(res => {
        console.log(res.data)
        setNumeross(res.data)
      }, 2000)
      .catch((e) => {

      })
  }
  const [selectedClass, setSelectedClass] = useState([])
  const [numeross, setNumeross] = useState([])
  const [Numeroo, setNumeroo] = useState(selectedClass[3])
 
  const [niveaux, setNiveaux] = useState([
    { id: 1, niveau: '1??re ann??e', type: 'Primaire' },
    { id: 2, niveau: '2??me ann??e', type: 'Primaire' },
    { id: 3, niveau: '3??me ann??e', type: 'Primaire' },
    { id: 4, niveau: '4??me ann??e', type: 'Primaire' },
    { id: 5, niveau: '5??me ann??e', type: 'Primaire' },
    { id: 6, niveau: '6??me ann??e', type: 'Primaire' },
    { id: 7, niveau: '7??me ann??e', type: 'Coll??ge' },
    { id: 8, niveau: '8??me ann??e', type: 'Coll??ge' },
    { id: 9, niveau: '9??me ann??e', type: 'Coll??ge' },
    { id: 10, niveau: '1??re ann??e', type: 'Secondaire' },
    { id: 11, niveau: '2??me ann??e', type: 'Secondaire' },
    { id: 12, niveau: '3??me ann??e', type: 'Secondaire' },
    { id: 13, niveau: '4??me_ann??e', type: 'Secondaire' }
  ])

  const [distyp, setDistyp] = useState("none")
  const [disniv, setDisniv] = useState("none")
  const [dissec, setdissec] = useState("none")
  const [disnv, setdisnv] = useState("none")
  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Coll??ge' },
    { id: 3, type: 'Secondaire' }
  ])

  function sendNotification() {
    const componentProps = {
      type: "feedback",
      message: "Mati??re Ajout?? avec succ??e!",
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
  const [showit, setshowit] = useState('false')
  const [type, setType] = useState('')
  const [Classe, setClasse] = useState(selectedClass[1])
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
          <h1>Ajouter une mati??re</h1>
          <>
            <TextField
              id="outlined-basic"
              label={displaynom === ("none") ? "Nom de mati??re" :
                <p style={{ color: "red", display: displaynom }}>Nom de mati??re</p>}
              // onChange={}
              name="Nom"
              value={NomValue}
              onChange={e => setNomValue(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 35, marginTop: 50 }}

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
                                        <p style={{ fontSize: 20 }}>Type:</p>
                                        <br />
                                        <p style={{ color: "red", display: distyp }} >Choisir un Type </p>
                                        <br />
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: 250, height: 20, marginBottom: 80 }}
                                            value={type}
                                            onChange={e => {
                                                setType(e.target.value)
                                            }}
                                        >
                                            {
                                                types.map((t) =>
                                                    <MenuItem value={t.type} key={t.id}>
                                                        {t.type}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </div>

            {/* <div>
              <p style={{ fontSize: 20, color: displayniv === "block" ? "red" : "black" }}>Niveau:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 250, height: 20, width: 600, marginBottom: 80 }}
                value={niveau}
            // onChange={handleChangeNiveau}
            onChange={e => {
           
              setNiveau(e.target.value)
              getNumerosSection(e.target.value, Sectionn)
              // setid(e.target.value)

            }}
              >
                {
                  niveaux.map((n) =>
                    n.type === type ?
                      <MenuItem value={n.niveau} key={n.id}>{n.niveau}</MenuItem> : null
                  )
                }
              </Select>
            </div> */}

{/* 
  { 
                      type === 'Primaire' || type === 'Coll??ge' ?
                        null
                        :
                        <Grid>
                          <p>Section:</p>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: 250, height: 20, marginBottom: 80 }}
                            value={Sectionn}
                            onChange={e => {
                              setSectionn(e.target.value)
                              getNumerosSection(niveau, e.target.value)
                            }}
                          >
                            {
                              Sectionx.map((n) =>

                                <MenuItem value={n.section} key={n.id}>
                                  {n.section}
                                </MenuItem>
                              )
                            }

                          </Select>
                        </Grid>
                        
                    }  */}

            {/* <div>
              <p style={{ fontSize: 20, color: displayniv === "block" ? "red" : "black" }}>Numero:</p>
              <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{ width: 250, height: 20, marginBottom: 80 }}
                        value={Numeroo}
                        onChange={e => {
                          setNumeroo(e.target.value)
                          getClasses(e.target.value)
                       
                        }}
                      >
                        {
                          numeross.map((n) =>
                            <MenuItem value={n["id"]} key={n.id}>
                              {n["Num??ro des classes"]}
                            </MenuItem>
                          )
                        }

                      </Select>


            </div> */}


                                    {
                                        type === '' ?
                                            null :
                                            (
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <div>
                                                        <p style={{ fontSize: 20 }}>Niveau:</p>
                                                        <br />
                                                        <p style={{ color: "red", display: disniv }} > Choisir niveau </p>
                                                        <br />
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            style={{ width: 100, height: 20, marginBottom: 80 }}
                                                            value={niveau}
                                                            onChange={e => {
                                                                setNiveau(e.target.value)
                                                                getNumerosSection(e.target.value, Sectionn)
                                                                //Sectionn
                                                                   setid(e.target.value)
                                                            }}
                                                        >
                                                            {
                                                                niveaux.map((n) =>
                                                                    n.type === type ?
                                                                        <MenuItem value={n.niveau} key={n.id}>
                                                                            {n.niveau}
                                                                        </MenuItem> : null
                                                                )
                                                            }
                                                        </Select>
                                                    </div>

                                                    {
                                                        type === 'Primaire' || type === 'Coll??ge' ?
                                                            null : (
                                                                <div>
                                                                    <p style={{ fontSize: 20 }}>Section:</p>
                                                                    <br />
                                                                    <p style={{ color: "red", display: dissec }} >Choisir section</p>
                                                                    <br />
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        style={{ width: 150, height: 20, marginBottom: 80 }}
                                                                        value={Sectionn}
                                                                        // Sectionn
                                                                        onChange={async e => {
                                                                            setSectionn(e.target.value)
                                                                            getNumerosSection(niveau, e.target.value)
                                                                        }}
                                                                    >
                                                                        {
                                                                            //Sectionx
                                                                            Sectionx.map((s) =>
                                                                                <MenuItem value={s.section} key={s.id}>
                                                                                    {s.section}
                                                                                </MenuItem>
                                                                            )
                                                                        }
                                                                    </Select>
                                                                </div>
                                                            )
                                                    }
                                                    <div>
                                                        <p style={{ fontSize: 20 }}>Num??ro:</p>

                                                        <br />
                                                        <p style={{ color: "red", display: disnv }} >Section is needed</p>
                                                        <br />
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            style={{ width: 100, height: 20, marginBottom: 80 }}
                                                            value={Numeroo}
                                                            //  value={Numeroo}
                                                            onChange={e => {setNumeroo(e.target.value)
                                                         getClasses(e.target.value)}
                                                            }
                                                        >
                                                            {
                                                                //numeross
                                                                numeross.map((n) =>
                                                                    <MenuItem value={n["id"]} key={n.id}>
                                                                        {
                                                                            n['Num??ro des classes']
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </div>
                                                </div>
                                            )
                                    }

            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                if (verif1(NomValue, Descrption, coefficient, numh)) {
                  AddMat(NomValue, coefficient, Descrption, numh, Numeroo)
                 
                }
              }}
            >
              {loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Envoyer'}
            </Button>
          </>
        </Box>
      </Grid>
    )
  }



}