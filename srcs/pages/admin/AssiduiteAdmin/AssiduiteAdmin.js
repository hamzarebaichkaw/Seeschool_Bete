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
import MoreVertIcon from '@material-ui/icons/MoreVert';


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

export default function Assuidite() {

  const classes = useStyles();
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

  const [ischecked, setIsChecked] = useState(false);
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  const [det, setdet] = useState([]);

  function detail(id) {
    dispatch({ type: "OPEN_GRID" })
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
        setdet(res.data)
        console.log(res.data)
      }, 2000)
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

  const [Numeroq, setNumeroq] = useState([
    { id: 1, numero: '1' },
    { id: 2, numero: '2' },
    { id: 3, numero: '3' }
  ])

  async function reg(num) {

    await axios

      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/IDclass/Secondaire/3eme/Maths/3maths`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/IDclass/${type}/${niveau}/${section}/${num}`)
      .then(async res => {


        await axios
          .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/AssiduteAdmin/${res.data[0].id}`)

          .then(async res => {
            setmat(res.data)
          }
            , 2000)
          .catch(e => {
            console.log(e)

          })
        console.log(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/IDclass/${type}/${niveau}/${section}/${num}`)
        console.log(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/AssiduteAdmin/${res.data[0].id}`)
      }
      )
      .catch(e => {
        console.log(e)
      })
  }

  const [section, setSection] = useState('0');
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

  const [typesss, setTypesss] = useState([
    { id: 1, type: 'Eleves' },
    { id: 2, type: 'Professeur' },
    // { id: 3, type: 'Agents Administratifs' }
  ])
  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
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

  const [mats, setmats] = useState([]);


  function regs(id) {
    const d = localStorage.getItem('user_id')
    dispatch({ type: "OPEN_GRID" })

    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
        setmats(res.data)
      }, 2000)

  }

  const [sections, setSections] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 2, section: 'Mathématiques' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

  const [numeros, setNumeros] = useState([])
  const [numero, setNumero] = useState('')
  const getNumerosSection = async (niv, sec) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
      .then(res => {
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }

  const Table = () =>
    <div>
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
                      getNumerosSection(e.target.value, section)
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
                  onChange={e => {
                    setNumero(e.target.value)
                    setShow(true)
                    reg(e.target.value)
                    setShowwTextclass(true)
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

    </div>;

  const Tableclass = () =>
    <div  >
      <br />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Listes des absence"
            data={mat}
            columns={[
              { name: "id", label: "ID" },
              { name: "Nom & Prenom", label: "Nom & Prénom" },
              { name: "nombre absence", label: "nombre d'absence" },
              {
                name: "Actions",
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button

                        variant={"contained"}
                        className={classes.marginRight}
                        onClick={
                          () => {
                            setTableMeta(tableMeta.rowData)

                            detail(tableMeta.rowData[0])
                          }

                        }
                      >
                        <MoreVertIcon />
                      </Button>
                    )
                  }
                }
              }
            ]}
            options={{
              filterType: "checkbox",
              textLabels: {
                // body: {
                //     noMatch:  isLoading? <CircularProgress />:

                //       'Désolé, il n\'y a aucune donnée correspondante à afficher'
                // },

              },
            }}
          />

        </Grid>
      </Grid>


    </div>;

  const TableMat = () =>
    <div  >
      <br />
      <MUIDataTable

        title="Liste des Matières"
        data={elevedata}
        columns={[
          { name: "id", label: "ID" },
          { name: "Nom de Matiére", label: " Nom de Matiére" },
          { name: "Nombre de Seance", label: " Heures d'Absences" },


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
    <div>
      <div style={{ textAlign: 'center' }}>
        <h3>Voulez-vous Filtrer par : </h3>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
          {
            typesss.map((n) =>
              <Button style={typees === n.type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                color="primary"
                variant="contained"
                onClick={() => {
                  setTypees(n.type)
                  setShowwwTable(true)

                }}

              > {n.type}
              </Button>
            )
          }

        </div>

      </div>
    </div>;

  const Matp = () =>
    <div  >
      <br />
      <div  >

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

  const [tableMeta, setTableMeta] = useState([])

  const [selectedClass, setSelectedClass] = useState([])



  return (

    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des assiduités</h1>

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
          <DialogTitle id="alert-dialog-title">{"Absence"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >
              <MUIDataTable
                title={<h2>Nom & Prenom: {tableMeta[1]}</h2>}
                data={det}
                columns={[
                  { name: "matiere", label: "Matiere" },
                  { name: "nombre absence", label: "Heures d'Absences" },
                  { name: "date_absence", label: "Date d'absence" },

                ]}
                options={{
                  filterType: "checkbox"
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => dispatch({ type: "CLOSE_GRID" })}
              color="primary"
            >
              Fermer
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}