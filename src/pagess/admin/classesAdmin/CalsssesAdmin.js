import React, { useState } from "react"
import Button from '@material-ui/core/Button'
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {
  Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import axios from "axios"
import MUIDataTable from "mui-datatables"
import * as Icons from "@material-ui/icons"
import UpdateIcon from '@material-ui/icons/Update'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'

import useStyles from "./styles";

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

export default function ClassesAdmin() {

  const classes = useStyles();
 
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  async function popup(id) {
    dispatch({ type: "OPEN_GRID" })

  }
  const [sssshow, setsssshow] = useState(false)
  const [showText, setShowText] = useState(false);
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [mat, setmat] = useState([]);

  const [section, setSection] = useState([])

  const [numero, setNumero] = useState([])

  const [classStudents, setClassStudents] = useState([])

  const [tableMeta, setTableMeta] = useState([])

  const [selectedClass, setSelectedClass] = useState([])

  async function getClassStudents(id) {
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListEtudiantID/${id}`)
      .then(res => {
        setClassStudents(res.data)
      })
      .catch(e => {
        console.log(e)
      })
      setIsLoading(false)
  }

  function reg(nv) {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesMAdmin/${nv}`)
      .then(res => {
        setmat(res.data)
      }, 2000)
  }

  const handleChangeS = e => {
    setSection([
      { id: 1, section: "Science Informatique" },
      { id: 2, section: "Math??matique" },
      { id: 3, section: "Economie et Gestion" },
      { id: 4, section: "Lettre" },
      { id: 5, section: "Science Exprimentale" },
      { id: 6, section: "Technique" }
    ])
  };

  const toggleHover = () => {
    setHover(!hover)
  }

  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Coll??ge' },
    { id: 3, type: 'Secondaire' }
  ])
  const [niveau, setNiveau] = useState('')

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
    { id: 13, niveau: '4??me ann??e', type: 'Secondaire' }
  ])

  const [numeross, setNumeross] = useState([])
  const [numeros, setNumeros] = useState([])

  const getNumerosSection = async (niv, sec) => {
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
      .then(res => {
        setNumeross(res.data)
      }, 2000)
      .catch((e) => {
        console.log(e)
      })
      setIsLoading(false)
  }

  const getClasses = async (niv) => {
    setIsLoading(true)
    console.log(niv)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListAdminclasses/Secondaire/3eme`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ListAdminclasses/${type}/${niv}`)
      .then(res => {
        setNumeros(res.data)
        setShow(true)
      }, 2000)
      .catch((e) => {
      console.log(e)
      })
      setIsLoading(false)
  }

  const [Numeroo, setNumeroo] = useState(selectedClass[3])

  const [Numeroox, setNumeroox] = useState([
    { id: 1, numero: ' 1' },
    { id: 2, numero: ' 3' },
    { id: 3, numero: ' 4' },

  ])
  const [Classe, setClasse] = useState(selectedClass[1])

  const [Classex, setClassex] = useState([
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
    { id: 13, niveau: '4??me ann??e', type: 'Secondaire' }

  ])
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

  const handleChangeNiveau = e => {
    setNiveau(e.target.value)
    getClasses(e.target.value)
    setShowwwTable(true)
    setShowwText(null)
  }

  const Table = () =>
    <div  >
      {show ?
        <MUIDataTable
          title="Liste des classes"
          data={numeros}
          columns={[
            { name: "id", label: "ID" },
            { name: "niveau", label: " Niveau" },
            { name: "section", label: "Section" },
            { name: "num??ro", label: "Num??ro du classe" },
            { name: "capacit??", label: "Capacit??" },
            { name: "nombreEleve", label: "Nombre des ??l??ves" },
            {
              name: "Liste des ??l??ves",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Button
                      variant={"contained"}
                      onClick={
                        () => {
                          getClassStudents(tableMeta.rowData[0])
                          setSelectedClass(tableMeta.rowData)
                          setShowwText(!showwText)
                          setShowwwTable(null)
                        }
                      }
                    >
                      <SupervisedUserCircleIcon style={{ width: 30, height: 30 }} />
                    </Button>
                  )
                }
              }
            }]}
          options={{
            filterType: "checkbox",
            textLabels: {
              body: {
                noMatch: isLoading ?
                  <CircularProgress /> :
                  'D??sol??, il n\'y a aucune donn??e correspondante ?? afficher',
              },
            },
          }}
        />
        :
        null
      }
    </div>;

  const Text = () =>
    <div  >
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button style={{ backgroundColor: '#0E0D47', color: 'white' }}
          onClick={
            () => {
              setShowwwTable(true)
              setShowwText(null)
            }
          }
        > Retour</Button></div> <br />
      <MUIDataTable
        title={selectedClass[1] + ' ' + selectedClass[2] + ' ' + selectedClass[3]}
        data={classStudents}
        columns={[
          { name: "id_Student", label: "ID" },
          { name: "Nom et Prenom", label: " Nom & Pr??nom" },
          {
            name: "Modifier Classe",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button
                    variant={"contained"}
                    onClick={
                      () => {
                        setTableMeta(tableMeta.rowData)
                        popup()
                        console.log(tableMeta.rowData)
                        setUpdatedID(tableMeta.rowData[0])
                        setid_Student(tableMeta.rowData[0])
                      }
                    }
                  >
                    <UpdateIcon style={{ width: 30, height: 30 }} />
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
                'D??sol??, il n\'y a aucune donn??e correspondante ?? afficher',
            },
          },
        }}

      />
    </div>;

  const [showwText, setShowwText] = useState(false);
  const [showwwTable, setShowwwTable] = useState(false);
  const [type, setType] = useState('')

  const [updateLoading, setUpdateLoading] = useState(false)

  const changeClassMatiere = async () => {
    setUpdateLoading(true)
    await axios
      .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/students/${id_Student}`, {
     
        "classe": "/public/api/classes/" +  UpdatedID 
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setUpdateLoading(false)
  }
  const [UpdatedID, setUpdatedID] = useState()
  const [id_Student, setid_Student] = useState()

  // const [Updatesous_niveau, setUpdatesous_niveau] = useState('')
  // const [UpdateNiveau, setUpdateNiveau] = useState('')
  // const [upSection, setupSection] = useState('')





  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des classes</h1>
        <Button variant="contained" href="http://localhost:3000/#/admin/addclasse"
          style={hover ? {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#F6F7FF",
            color: "#0E0D47",
            alignSelf: 'center'
          } : {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#0E0D47",
            color: "#F6F7FF",
            alignSelf: 'center'
          }}
          onMouseEnter={toggleHover} onMouseLeave={toggleHover}
        >
          Ajouter une Classe
          <AddCircleIcon />
        </Button>
      </div>
      <div style={{ marginTop: 50 }}>
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
                    onChange={handleChangeNiveau}
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
              </div>
            )
        }
      </div>
      <div>
        {showwwTable ? <Table /> : null}
        {showwText ? <Text /> : null}

      </div>
      <div>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={state.toggleGrid}
          onClose={() => dispatch({ type: "CLOSE_GRID" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Modifier Classe: {tableMeta[1]}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >
              <div>
                <center>
                  <h4>Effectuer ?? :</h4>
                  <br /> <br />
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid>
                      <p>Niveau:</p>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{ width: 250, height: 20, marginBottom: 80 }}
                        value={Classe}
                        onChange={e => {
                          setClasse(e.target.value)
                          if (type === 'Primaire' || type === 'Coll??ge')
                            getNumerosSection(e.target.value, Sectionn)
                         
                        }}
                      >
                        {
                          Classex.map((n) =>
                            n.type === type ?
                              <MenuItem value={n.niveau} key={n.id}>
                                {n.niveau}
                              </MenuItem>
                              : null
                          )
                        }

                      </Select>
                    </Grid>

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
                              getNumerosSection(Classe, e.target.value)
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
                    }

                    <Grid>
                      <p>Num??ro:</p>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{ width: 250, height: 20, marginBottom: 80 }}
                        value={Numeroo}
                        onChange={e => {
                          setNumeroo(e.target.value)
                        }}
                      >
                        {
                          numeross.map((n) =>
                            <MenuItem value={n["Num??ro des classes"]} key={n.id}>
                              {n["Num??ro des classes"]}
                            </MenuItem>
                          )
                        }

                      </Select>
                    </Grid>
                  </div>
                </center>
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{ backgroundColor: "#0E0D47", color: 'white' }}
              onClick={() => dispatch({ type: "CLOSE_GRID" })}
              color="primary"
            >
              Fermer
            </Button>
            <Button style={{ backgroundColor: "#0E0D47", color: 'white' }}
              onClick={() => {dispatch({ type: "CLOSE_GRID" })
                            changeClassMatiere()}
            }
              color="primary"
            >
              Enregistrer
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
