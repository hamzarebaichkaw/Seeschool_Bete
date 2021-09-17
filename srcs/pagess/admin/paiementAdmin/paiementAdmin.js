import React, { useState, useEffect } from "react";

import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import {
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

// components
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Axios from 'axios'



export default function Inscription() {
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
  function setcolor(sd) {
    let colo
    if (sd == "Par Tranche") { colo = "#ffc107" }
    else if (sd == "payeé") { colo = "#28a745" }
    else colo = "#dc3545"
    return (colo)
  }
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false,

    toggleModal1: false,
    toggleBody1: false,
    toggleSmall1: false,
    toggleGrid1: false,
    toggleLarge1: false,
    toggleInputModal1: false
  });
  const classes = useStyles();

  const [action, setAction] = useState("Choisissez...");
  const [mat, setmat] = useState([])
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [CoursM, setCoursM] = useState([]);

  const [type, setType] = useState('')
  const [niveau, setNiveau] = useState('')
  const [section, setSection] = useState('0')
  const [capacity, setCapacity] = useState('')
  // const [numeros, setNumeros] = useState([])
  const [dumpers, setdumpers] = useState([{ id: 1, value: '7eme' }])

  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])

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
  const [sections, setSections] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

  const [numero, setNumero] = useState('')

  useEffect(function () {
    getStats()
  }, [])

  const getStats = async () => {
    const d = sessionStorage.getItem('user_id')

    setIsLoading(true)
    setListLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        setCoursM(res.data.result)
        setAction(res.data.result.matieress)
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
    setListLoading(false)
  };

  const getNumerosSection = async (niv, sec) => {
    await Axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
        .then(res => {
            setNumeros(res.data)
        }, 2000)
        .catch((e) => {

        })
}

  const getNumerosNiveau = async (niv) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
      .then(res => {
        setNumeros(res.data)
        console.log(res.data)
      }, 2000)
      .catch((e) => {

      })
  }


  async function reg(sec,niv,na) {
    const d = sessionStorage.getItem('user_id')
    setIsLoading(true)
    setTableLoading(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListEtudiantsPaiment/${niv}/${sec}/${na}`)
      .then(res => {
         setmat(res.data)
         console.log(res.data)
      }, 2000)
    setIsLoading(false)
    setShow(true)
    setTableLoading(false)
  }

  const [popup, Setpopup] = useState([])
  const [etud, setetud] = useState()

  function regs1(id) {
    
    dispatch({ type: "OPEN_GRID" })
    console.log(mat[id])
    
    setetud(mat[id].["Nom et Prenom"])
    console.log(mat[0].paiment[0])
  }

  const handleChange = e => {
    reg(e.target.value)
  };

  const toggleHover = () => {
    setHover(!hover)
  }
  function showetat(id) {
    let per = [paiement[id]]
    return (per[0].paiment[0].etat)

  }
  function resultat(niv, sec, num) {
    console.log(niv, sec, num)
    axios

      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListEtudiantsPaiment/${niv}/${sec}/${num}`)
      .then(res => {
        setmat(res.data)
        console.log(res.data)
      }, 2000)
  }
 


  const [numeros, setNumeros] = useState([])

  const [paiement, setPaiement] = useState([
    {
      "id_Student": 1,
      "Nom et Prenom": "Ahmed Ben Ahmed",
      "Numéro de carte étudiant": "09630639",
      "paiment": [
        {
          "etat": "Par Tranche"
        }
      ]
    },
    {
      "id_Student": 2,
      "Nom et Prenom": "Khalil Ben Youssef",
      "Numéro de carte étudiant": "06225875",
      "paiment": [
        {
          "etat": "Par Tranche"
        }
      ]
    },
    {
      "id_Student": 3,
      "Nom et Prenom": "Youssef Snoussi",
      "Numéro de carte étudiant": "06225875",
      "paiment": [
        {
          "etat": "Par Tranche"
        }
      ]
    },
    {
      "id_Student": 4,
      "Nom et Prenom": "Firas Ouertani",
      "Numéro de carte étudiant": "06225875",
      "paiment": [
        {
          "etat": "Par Tranche"
        }
      ]
    },
    {
      "id_Student": 5,
      "Nom et Prenom": "Hamza Nafti",
      "Numéro de carte étudiant": "06225875",
      "paiment": [
        {
          "etat": "Par Tranche"
        }
      ]
    }
  ])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Paiements</h1>

      </div>
      <div style={{ marginTop: 50 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}  > {type === '' ? "Choisissez un type" : show ? "Liste des Etudiants" : "Choisissez une classe"} </h2>

        <center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => { setType(t.type) }}
                > {t.type}
                </Button>
              )
            }

          </div>
          {
            type === '' ?
              null :
              (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ fontSize: 20 }}>Niveau:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={niveau}
                      onChange={e => {
                        setNiveau(e.target.value)
                        getNumerosSection(e.target.value, section)
                        // if (type === "Primaire" || type === "Secondaire")
                        // getNumerosNiveau(e.target.value)
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
                    type === 'Primaire' || type === 'Collège' ?
                      null : (
                        <div>
                          <p style={{ fontSize: 20 }}>Section:</p>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: 250, height: 20, marginBottom: 80 }}
                            value={section}
                            onChange={e => {
                              setSection(e.target.value)
                              getNumerosSection(niveau, e.target.value)
                            }}
                          >
                            {
                              sections.map((s) =>
                                <MenuItem value={s.id} key={s.id}>
                                  {s.section}
                                </MenuItem>
                              )
                            }
                          </Select>
                        </div>
                      )
                  }
                  <div>
                    <p style={{ fontSize: 20 }}>Numéro:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={numero}
                      // value={dumpers}
                      onChange={e => {
                        setNumero(e.target.value)
                        
                        reg(section,niveau,e.target.value)
                        // resultat(niveau, section, numero)
                      }}
                    >
                      {
                        numeros.map((n) =>
                        <MenuItem value={n["Numéro des classes"]} key={n.id}>
                            {
                                n['Numéro des classes']
                            }
                        </MenuItem>
                        )
                      }
                    </Select>
                  </div>

                </div>
              )
          }
        </center>

        <br />
        <br />
        <br />
        {tableLoading ?

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <center><CircularProgress size={40} /></center>
            </Grid>
          </Grid>
          :
          show ?
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MUIDataTable
                  title="List Etudiants"
                  data={mat}
                  columns={[
                    { name: "id_Student", label: "ID" },
                    { name: "Nom et Prenom", label: "Nom et prénom" },
                    { name: "Numéro de carte étudiant", label: "Numéro" },
                    // { name: "montent", label: "Montant" },
                    {
                      name: "Etat", label: "État",
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <p style={{ color: setcolor(showetat(tableMeta.rowIndex)) }}>{showetat(tableMeta.rowIndex)}</p>
                          )
                        }
                      }
                    },
                    {
                      name: "Actions",
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <Button onClick={() => regs1(tableMeta.rowIndex)} >
                              <CreditCardIcon />
                            </Button>

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
            :
            null
        }
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid}
        onClose={() => dispatch({ type: "CLOSE_GRID" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div>

            <h2 style={{ textAlign: "left", float: "left" }}>Payment Élevé: &nbsp; {etud}</h2>
            <h2 style={{ textAlign: "right", float: "right", color: setcolor(popup.etat) }}> {popup.etat}</h2>
            <h2 style={{ textAlign: "right", float: "right" }}>État : &nbsp;</h2>


          </div>
        </DialogTitle>
        <DialogContent>
          <center>
            <h3>Montant</h3>
            <input type="text" style={{ width: 300 }} ></input>

          </center>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            dispatch({ type: "CLOSE_GRID" })
          }}
            color="primary"
          >
            Payer
          </Button>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="danger"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}