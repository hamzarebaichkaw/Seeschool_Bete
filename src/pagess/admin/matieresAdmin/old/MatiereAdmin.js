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
import * as Icons from "@material-ui/icons";
import UpdateIcon from '@material-ui/icons/Update';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import TextField from '@material-ui/core/TextField';
import useStyles from "./styles";
import { makeStyles } from '@material-ui/styles';
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
// const [mat, setmat] =  
export default function MatiereAdmin() {
  const classes = useStyless();
  const [CoursM, seCoursM] = useState([]);
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        seCoursM(res.data.result)
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  const [mat, setmat] = useState([]);
  function reg(id) {

    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
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

  const [showText, setShowText] = useState(false);
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)


  const [action1, setAction1] = useState("Choisissez Année...");
  const [action2, setAction2] = useState("Choisissez Section...");
  const [action3, setAction3] = useState("Choisissez Numéro...");

  const [year, setYear] = useState([
    { id: 1, year: "1ère Année" },
    { id: 2, year: "2ème Année" },
    { id: 3, year: "3ème Année" }
  ]);

  const [numero, setNumero] = useState([]);

  function reg(nv) {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesMAdmin/${nv}`)
      .then(res => {
        setmat(res.data)
      }, 2000)
  }

  const [section, setSection] = useState([]);
  const handleChangeS = e => {
    setSection([
      { id: 1, section: "Science Informatique" },
      { id: 2, section: "Mathématique" },
      { id: 3, section: "Economie et Gestion" },
      { id: 4, section: "Lettre" },
      { id: 5, section: "Science Exprimentale" },
      { id: 6, section: "Technique" }
    ])
    setAction1("1ère Année")
  };

  const handleChangeN = e => {
    setNumero([
      { id: 1, numero: 1 },
      { id: 2, numero: 2 },
      { id: 3, numero: 3 }
    ])
    setAction2("Science Informatique")
  };

  const handleChange = e => {
    reg("bac")
    setAction3("3")
    setShow(true)
  };

  const toggleHover = () => {
    setHover(!hover)
  }

  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])
  const [typess, setTypess] = useState([
    { id: 1, type: 'Classe' },
    { id: 2, type: 'Matiere' },

  ])
  const [niveau, setNiveau] = useState('')

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

  const [Sec, setSec] = useState([
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
  const [numeros, setNumeros] = useState([])

  const getNumerosNiveau = async (niv) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
      .then(res => {
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }
  const profTables = [
    ["1", "4°année  ", "1", "Math", "25", "14",],
    ["2", "4°année", "2", "Math", "25", "12",],
    ["3", "4°année", "1", "Eco", "25", "18",],
    ["4", "4°année ", "1", "Eco", "25", "18",],
    ["5", "4°année ", "2", "Eco", "25", "15",],
    ["6", "4°année", "1", "SVT", "25", "14",],
    ["7", "4°année", "2", "SVT", "25", "13",],
    ["8", "4°année", "1", "Info", "25", "20",],
    ["9", "4°année", "2", "Info", "25", "21",],
    ["10", "4°année", "1", "Lettre", "25", "15"],
  ];


  const elevedata = [
    ["1", "Info", "2", "1"],
    ["2", "Eco", "8", "4"],
    ["3", "Gestion", "8", "4"],
    ["4", "Math", "5", "2"],
    ["5", "Histoire / Geo", "5", "3"],
    ["6", "Francais", "3", "2"],
    ["7", "Anglais", "3", "2"],
    ["8", "Arabe", "2", "1"],
    ["9", "Italien", "1", "1"],
    ["10", "Sport", "1", "1"],

  ];


  const clasprof = [
    ["1", "4 eco 1 ", "Wahida Drine",],
    ["2", "4 Eco 2", "Amal Baccouche",],
    ["3", " 4 Math 1", "Taoufik Najjar",],
    ["4", " 4 Math 2 ", "Samia Jegham",],
    ["5", "4 Tech 1", "Mohamed Abouda",],
    ["6", "4 Info 1", "Olfa Damak",],
    ["7", "4 Info 2", "Noura Ouerfelli",],
    ["8", "4 lettre 1", "Lamia Choour",],
    ["9", "4 Lettre 2", "Basma Hmis",],
    ["10", " 4 Sport 1", "Mourad Ben Hmiden",],

  ];


  const [Numeroo, setNumeroo] = useState('')

  const [Numeroox, setNumeroox] = useState([
    { id: 1, numero: ' 1' },
    { id: 2, numero: ' 3' },
    { id: 3, numero: ' 4' },

  ])
  const [Classe, setClasse] = useState('')

  const [Classex, setClassex] = useState([
    { id: 1, classe: '4 Math ' },
    { id: 2, classe: '4 Math ' },
    { id: 3, classe: '4 Math ' },

  ])
  const [Sectionn, setSectionn] = useState('')

  const [Sectionx, setSectionx] = useState([
    { id: 1, section: 'Math' },
    { id: 2, section: 'Eco' },
    { id: 3, section: 'Info' },
    { id: 4, section: 'SVT' },
    { id: 5, section: 'Lettre' },
  ])

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
                    setNiveau(e.target.value)
                    if (type === "Primaire" || type === "Secondaire")
                      getNumerosNiveau(e.target.value)
                    handleChange()
                  }}
                >
                  {
                    niveaux.map((n) =>
                      n.type === type ?
                        <MenuItem value={n.id} key={n.id}>
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
                onChange={e => {
                  setSection(e.target.value)
                  handleChangeS()
                  setShowwTextclass(!showwTextclass)
                }}
              >
                {
                  Sectionx.map((s) =>
                    <MenuItem value={s.id} key={s.id}>
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
    <div  >
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button style={{ backgroundColor: '#0E0D47', color: 'white' }}
          onClick={
            () => {
              setShowwwTable(!showwwTable)
              setShowwTextclass(null)
              setShowwTextclass(null)
            }
          }
        >Retour</Button></div> <br />
      <MUIDataTable

        title="Economie"
        data={elevedata}
        columns={[
          { name: "id", label: "ID" },
          { name: "Nom de Matiére", label: " Nom de Matiére" },
          { name: "Nombre de Seance", label: " Nombre de Seance" },
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

                        popup()
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
          filterType: "checkbox"
        }}
      />
    </div>;

  const TableMat = () =>
    <div>
      <br />
      <MUIDataTable

        title="Liste des Matières"
        data={elevedata}
        columns={[
          { name: "id", label: "ID" },
          { name: "Nom de Matiére", label: " Nom de Matiére" },
          { name: "Nombre de Seance", label: " Nombre de Seance" },
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

                        setShowwMatp(!showwMatp)
                        setShowwTextmat(null)
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
          filterType: "checkbox"
        }}
      />

    </div>;
  const Text = () =>
    <div  >

      <div style={{ textAlign: 'center' }}>
        <h3>Voulez-vous Filtrer par : </h3>
        <br /><br /><br />
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>

          <Button style={typees === type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
            color="primary"
            variant="contained"
            onClick={() => {
              setShowwwTable(!showwwTable)
              setShowwTextmat(null)
            }}
          > Classe
          </Button>

          <Button style={typees === ("ok") ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
            color="primary"
            variant="contained"
            onClick={() => {
              setShowwTextmat(!showwTextmat)
              setShowwTextclass(null)
              setShowwwTable(null)
            }}
          > Matiére
          </Button>
        </div>
      </div>
    </div>;

  const Matp = () =>
    <div  >
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button style={{ backgroundColor: '#0E0D47', color: 'white' }}
          onClick={
            () => {


              setShowwTextmat(!showwTextmat)
              setShowwMatp(null)

            }
          }
        >Retour</Button></div> <br />
      <div>
        <MUIDataTable

          title="Liste des Matières"
          data={clasprof}
          columns={[
            { name: "id", label: "ID" },
            { name: "Noeeeeeeem de eee", label: " Nom des Classes" },
            { name: "Nombre deeeeeeee Seance", label: " Nombre des Professeurs" },
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
            filterType: "checkbox"
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

  return (
    <div>
      <div>
        <div >

          <div className={classes.flexGrow} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Gestion des Matiéres</h1>
            <Button variant="contained" href="http://localhost:3000/#/admin/Addmatiere"
              className={classes.button}
            >
              Ajouter une Matiére
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
                      <TextField required id="standard-required" label="Nom de Matiére" defaultValue="Info" />
                      <TextField required id="standard-required" label="Nombre de Seance" defaultValue="2" />
                      <TextField required id="standard-required" label="Coefficient" defaultValue="1" />
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
                onClick={() => dispatch({ type: "CLOSE_GRID" })}
                color="primary"
              >
                Enregistrer
              </Button>

            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}