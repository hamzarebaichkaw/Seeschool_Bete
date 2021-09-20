import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import UpdateIcon from '@material-ui/icons/Update';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, Redirect } from 'react-router-dom';






const useStyless = makeStyles({
  flexGrow: {
    flex: '1',
  },
  button: {
    fontSize: 20,
    width: 400,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 50,
    letterSpacing: 4,
    backgroundColor: "#0E0D47",
    color: "#F6F7FF",
    alignSelf: 'center',
    '&:hover': {
      fontSize: 20,
      width: 400,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderRadius: 50,
      letterSpacing: 4,
      backgroundColor: "#F6F7FF",
      color: "#0E0D47",
      alignSelf: 'center'
    },
  }
})
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

export default function MatiereAdmin() {

  const [redirection, setRedirection] = useState(false)
  const classes = useStyless();
  const [CoursM, seCoursM] = useState([]);

  useEffect(() => {
    getClasseAdmin()
  }, []);

  const getClasseAdmin = async () => {
    const d = localStorage.getItem('user_id')
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        seCoursM(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }

  const [mat, setmat] = useState([]);

  async function reg(id) {

    const d = localStorage.getItem('user_id')
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/MatiereByClass/${id}`)
      .then(res => {
        setmat(res.data)
        console.log(res.data)
      }, 2000)
  }

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

  async function reg(nv) {
    const d = localStorage.getItem('user_id')
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesMAdmin/${nv}`)
      .then(res => {
        setmat(res.data)
      }, 2000)
  }

  const [section, setSection] = useState('');

  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])

  const [typ, settyp] = useState("")
  const [niveau, setNiveau] = useState('')

  const [niveaux, setNiveaux] = useState([
    { id: 1, niveau: '1ère année', type: 'Primaire' },
    { id: 2, niveau: '2ème année', type: 'Primaire' },
    { id: 3, niveau: '3ème année', type: 'Primaire' },
    { id: 14, niveau: '3ème ', type: 'Primaire' },
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

  const [numeros, setNumeros] = useState([])

  const getNumerosNiveau = async (niv) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
      .then(res => {
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }

  const [tableMeta, setTableMeta] = useState([])

  const [Sectionx, setSectionx] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 2, section: 'Mathématiques' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

 
   
  let history = useHistory();
    const handleClickk = () => {
     
      history.push("/admin/matieres");
    }
  
 

  const [updateLoading, setUpdateLoading] = useState(false)

  const changeClassMatiere = async () => {
    
  
    setUpdateLoading(true)
    await axios
      .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/matieres/${UpdatedID}`, {
        Nom: UpdateMat,
        coefficient: UpdateCoef,
        nbHeure: UpdateSeance
      })
      .then(res => {
        console.log(res.data)
        // setRedirection(true)
        // handleClickk()
        
      })
      .catch(e => {
        console.log(e)
      })
    setUpdateLoading(false)
    
  }
  const [UpdatedID, setUpdatedID] = useState()

  const Table = () =>
    <div style={{ display: 'flex', justifyContent: 'space-around' }} >
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

                    if (type == "Primaire" || type === "Collège") { setShowwwTable(true) } {
                      setShowwTextclass(true)
                      getnvbyMat(e.target.value)
                    }
                    setNiveau(e.target.value)
                    if (type === "Primaire" || type === "Secondaire")
                      getNumerosNiveau(e.target.value)
                    // getnvbyMat(e.target.value)
                    // setShowwwTable(!showwwTable)
                    // setShowwText(null) 
                    // setShowwTextclass(!showwTextclass)
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
            </div>
          )
      }
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
                onChange={ async e => {
                  getnvbyMat(e.target.value)
                  setSection(e.target.value)
                  setShowwTextclass(true)
                }}
              >
                {
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

    </div>;

  const Tableclass = () =>
    <div>
      <MUIDataTable

        title="Economie"
        data={Matiere}
        columns={[
          { name: "id", label: "ID" },
          { name: "Nom_Matière", label: " Nom de Matière" },
          { name: "Nb_seances", label: " Nombre de Seance" },
          { name: "Coefficient", label: " Coefficient" },
          {
            name: "Modifier ",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button
                    variant={"contained"}

                    onClick={
                      () => {
                        console.log(tableMeta.rowData)
                        setTableMeta(tableMeta.rowData)
                        popup(tableMeta.rowData[0])
                        setUpdatedID(tableMeta.rowData[0])
                        setUpdateMat(tableMeta.rowData[1])
                        setUpdateSeance(tableMeta.rowData[2])
                        setUpdateCoef(tableMeta.rowData[3])
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
                'Désolé, il n\'y a aucune donnée correspondante à afficher',
            },
          },
        }}

      />

    </div>;

  const TableMat = () =>
    <div  >
      <MUIDataTable
        title="Liste des Matières"
        data={mati}
        columns={[
          { name: "id", label: "ID" },
          { name: "Nom", label: " Nom de Matière" },
          { name: "Description", label: " Description" },
          { name: "Coefficient", label: " Coefficient" },
          { name: "nbHeure", label: " Nombre de Heures" },
          { name: "sous_niveau", label: " Niveau" },
          {
            name: "Détails",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button
                    variant={"contained"}

                    onClick={
                      () => {
                        setShowwMatp(true)
                        setShowwTextmat(false)
                        getclassprof(tableMeta.rowData[1])
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
              noMatch: loadprof ?
                <CircularProgress /> :
                'Désolé, il n\'y a aucune donnée correspondante à afficher',
            },
          },
        }}
      />

    </div>;
  const Text = () =>
    <div  >
      <div style={{ textAlign: 'center' }}>
        <h3>Voulez-vous Filtrer par : </h3>
        <br /><br /><br />
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>



          <Button style={typ === ("1") ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
            color="primary"
            variant="contained"
            onClick={() => {
              settyp("1")
              setShowwwTable(true)
              setShowwTextmat(null)
              setShowwMatp(false)
            }}
          > Classe
          </Button>

          <Button style={typ === ("2") ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
            color="primary"
            variant="contained"
            onClick={() => {
              settyp("2")
              setShowwTextmat(true)
              setShowwMatp(false)
              setShowwTextclass(null)
              setShowwwTable(null)
              getmati()
            }}
          > Matière
          </Button>
        </div>
      </div>
    </div>;

  const Matp = () =>
    <div>
      <div>
        <Button style={{ color: 'white', borderWidth: 1, backgroundColor: '#0e0d47', borderColor: "#0E0D47", width: '20px', fontSize: 13 }}
          color="primary"
          variant="contained"
          onClick={() => {

            setShowwTextmat(true)
            setShowwMatp(false)
            setShowwTextclass(null)
            setShowwwTable(null)
            getmati()
          }}
        > <ArrowBackIcon />
        </Button>
        <MUIDataTable

          title="Liste des professeurs"
          data={classporf}
          columns={[
            { name: "id", label: "ID" },
            { name: "nom_classe", label: " Nom de Classe" },
            { name: "nom_prof", label: " Nom de Professeur" },
            {
              name: "Changer ",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Button
                      variant={"contained"}

                      onClick={
                        () => {
                          console.log(tableMeta.rowData)
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
                noMatch: loadpc ?
                  <CircularProgress /> :
                  'Désolé, il n\'y a aucune donnée correspondante à afficher',
              },
            },
          }}

        />

      </div>;
    </div>;


  const [showwMatp, setShowwMatp] = useState(false);


  const [showwTextmat, setShowwTextmat] = useState(false);
  const [showwTextclass, setShowwTextclass] = useState(false);
  const [showwText, setShowwText] = useState(false);
  const [showwwTable, setShowwwTable] = useState(false);
  const [type, setType] = useState('')
  const [typees, setTypees] = useState('')


  const [mati, setMati] = useState()
  const [classporf, setclassprof] = useState()
  const [loadprof, setloadprof] = useState(false)
  const [loadpc, setloadpc] = useState(false)

  function getmati() {
    setloadprof(true)
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/matieres`)
      .then(res => {
        console.log(res.data)
        setMati(res.data)
        setloadprof(false)
      })
  }

  async function getclassprof(nom) {
    var T = []
    setloadpc(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/MatiereByClassbyProf/${nom}`)
      .then(res => {

        res.data.map(e => {
          for (var i = 0; i < e.classe.length; i++) {
            T.push({
              "id": e.classe[i].id,
              "nom_classe": e.classe[i].nom_classe,
              "nom_prof": e.profs[i].nom_prof
            })
          }
          setclassprof(T)
        }
        )
      })
    setloadpc(false)
  }

  const [Matiere, setMatiere] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getnvbyMat = async (niveau) => {
    //  dispatch({ type: "OPEN_GRID" })
    //  console.log(http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NiveauBYMatiere/${niveau})
    setIsLoading(true)

    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NiveauBYMatiere/${niveau}`)
      .then(async res => {
        setMatiere(res.data)
      }, 2000)
      .catch((e) => {
        console.log(e)
      })
    setIsLoading(false)

  }

  const [UpdateMat, setUpdateMat] = useState('')
  const [UpdateSeance, setUpdateSeance] = useState('')
  const [UpdateCoef, setUpdateCoef] = useState('')
  // if (redirection) {
  //   //Affichage de la redirection
  //   return <Redirect to='/admin/matieres' />;
  // }

  // function HomeButton() {
  //   let history = useHistory();
  
  //   function handleClickk() {
  //     history.push("/admin/matieres");
  //   }
  
  // }
  // onClick={handleClickk}

  return (
    <div>
      <div>

        <div>

          <div className={classes.flexGrow} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Gestion des Matières</h1>
            <Button variant="contained" href="http://localhost:3000/#/admin/Addmatiere"
              className={classes.button}
            >
              Ajouter une Matière
              <AddCircleIcon />
            </Button>
          </div>

        </div>
        <div style={{ marginTop: 50 }}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setType(t.type)
                    setShowwText(true)
                  }}

                > {t.type}
                </Button>
              )
            }

          </div>

          {showwText ? <Text /> : null}
          <br /> <br />
          {showwwTable ? <Table /> : null}
          <br /> <br />

          {showwTextclass ? <Tableclass /> : null}
          {showwTextmat ? <TableMat /> : null}
          {showwMatp ? <Matp /> : null}
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
            <DialogTitle id="alert-dialog-title">{"Matière : Info"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                component={"div"}
              >
                <div>
                  <center>
                    <h4>Effectuer Le Changement :  </h4>
                    <br /> <br />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                      <TextField required id="standard-required" label="Nom de Matière" value={UpdateMat} onChange={(e) => setUpdateMat(e.target.value)} />
                      <TextField required id="standard-required" label="Nombre de seances" value={UpdateSeance} onChange={(e) => setUpdateSeance(e.target.value)} />
                      <TextField required id="standard-required" label="Coefficient" value={UpdateCoef} onChange={(e) => setUpdateCoef(e.target.value)} />
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
                onClick={() => {
                  dispatch({ type: "CLOSE_GRID" })
                  changeClassMatiere()
                  handleClickk()
                  
                }}
                color="primary"
              >
                {
                  updateLoading ? <CircularProgress /> : 'Enregistrer'
                }
              </Button>

            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}