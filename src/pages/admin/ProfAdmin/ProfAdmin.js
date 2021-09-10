import React, { useState, useEffect } from "react";
import { Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails, } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { Badge,Typography} from "../../../components/Wrappers/Wrappers";
// components"../../../components/Widget/Widget
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DetailsIcon from '@material-ui/icons/Details';
import Widget from "../../../components/Widget/Widget";
import {
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";


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




export default function Inscription() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  const [action, setAction] = useState("Choisissez...");
  const [mat, setmat] = useState([])
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [CoursM, setCoursM] = useState([]);
  const [popuptype,setpopuptype] = useState([]);
  const [popupniv,setpopupniv] = useState([]);
  const [popupsect,setpopupsect]= useState([]);
  const [noms,setnom] = useState([]);
  const [pers,setper] = useState([]);
  const [actionload,SetActionload]= useState(false);
   function  popup  ( data,nom,per  ) {
     
    console.log(data)
    setnom(nom)
    setper(per)
  data.map(t=> {
  
    setpopuptype(t.type)
    setpopupniv(t.niveaux)
    setpopupsect(t.sections)
    console.log(t.sections)
  })
   }
  async function po () {
    dispatch({ type: "OPEN_GRID" })
  }
  const [type, setType] = useState('')
  const [niveau, setNiveau] = useState('')
  const [section, setSection] = useState('0')
  const [capacity, setCapacity] = useState('')
  const [numeros, setNumeros] = useState([])

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

  // useEffect(function () {
  //   getStats()
  // }, [])

  // const getStats = async () => {
  //   const d = sessionStorage.getItem('user_id')

  //   setIsLoading(true)
  //   setListLoading(true)

  //   await axios
  //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
  //     .then(res => {
  //       setCoursM(res.data.result)
  //       setAction(res.data.result.matieress)
  //       // console.log(res.data.result)
  //     }, 2000)

  //     .catch(() => {
  //       console.log("ERROR")
  //     });
  //   setIsLoading(false)
  //   setListLoading(false)
  // };

  // const getNumerosSection = async (sec) => {
  //   await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niveau}/${sec}`)
  //     .then(res => {
  //       setNumeros(res.data)
  //     }, 2000)
  //     .catch((e) => {

  //     })
  // }

  // const getNumerosNiveau = async (niv) => {
  //   await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
  //     .then(res => {
  //       setNumeros(res.data)
  //     }, 2000)
  //     .catch((e) => {

  //     })
  // }


  function reg(niv,sec,num) {
   
    const d = sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfMAdmin/BAC`)
      .then(res => {
        setmat(res.data)
        setIsLoading(false)
        console.log(res.data)
      }, 2000)
  }
  const [popupdata,setPopupdata] =useState([])
 async function popUpPull (id,nom,per) {
  SetActionload(true)
    await
    axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Profclasse/${id}`)
    .then(res =>{
      popup(res.data,nom,per)
      po()
      SetActionload(false)
    }
      )
  }
  const [tableMeta, setTableMeta] = useState([])
  // const handleChange = e => {
  //   reg(e.target.value)
  // };

  // const toggleHover = () => {
  //   setHover(!hover)
  // }
  const [Numeroq, setNumeroq] = useState([
    { id: 1, numero: '1' },
    { id: 2, numero: '2' },
    { id: 3, numero: '3' }
  ])
  const [Numeroox, setNumeroox] = useState([
    { id: 1, numero: ' 1' },
    { id: 2, numero: ' 3' },
    { id: 3, numero: ' 4' },
  
  ])
  const prof = [
    ["1","Wahida Drine", "Wahida Drine@yahoo.com ","00209021 "," Meilleur Professeur  ",],
    ["2", "Amal Baccouche" ,"Amal Baccouche@yahoo.com ","00113589  ","Meilleur Professeur  ",],
    ["3", "Taoufik Najjar","Taoufik Najjar@yahoo.com ","00987645  ","Meilleur Professeur  ",],
    ["4","Samia Jegham", "Samia Jegham@yahoo.com  ","00987645 ","Meilleur Professeur  ",],
    ["5", "Mohamed Abouda", "Mohamed Abouda@yahoo.com  ","00987645  ","Meilleur Professeur  ",],
    ["6", "Olfa Damak", "Olfa Damak@yahoo.com ","200987645 ","Meilleur Professeur  ",],
    ["7","Noura Ouerfelli","Noura Ouerfelli7@yahoo.com ","00987645 ","Meilleur Professeur  ", ],
    ["8", "Lamia Choour", "Lamia Choour@yahoo.com ","00987645 ","Meilleur Professeur  ",],
    ["9","Basma Hmis",   "Basma Hmis@yahoo.com ","00987645  ","Meilleur Professeur  ",],
    ["10", "Mourad Ben Hmiden","Mourad Ben Hmiden@yahoo.com ", "00987645 ","Meilleur Professeur  ", ],
   
  ];
  // const [mat, setmat] = useState([]);
  // function reg(id) {

  //   const d = sessionStorage.getItem('user_id')
  //   axios
  //     // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
  //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/MatiereByClass/${id}`)
  //     .then(res => {
  //       setmat(res.data)
  //       console.log( res.data)
  //     }, 2000)
  // }
  useEffect(function () {
    getStats()
  }, [])

  const getStats = async () => {
    const d = sessionStorage.getItem('user_id')

    setIsLoading(true)
    setListLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/AllProf`)
      .then(res => {
        setmat(res.data)
        
        // console.log(res.data.result)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
    setListLoading(false)
  };

  const getNumerosSection = async (sec) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niveau}/${sec}`)
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
      }, 2000)
      .catch((e) => {

      })
  }


  function reg(niv,sec,num) {
   
    const d = sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfMAdmin/BAC`)
      .then(res => {
        setmat(res.data)
        setIsLoading(false)
        console.log(res.data)
      }, 2000)
  }

  const handleChange = e => {
    reg(e.target.value)
  };

  const toggleHover = () => {
    setHover(!hover)
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion Des Professeurs</h1>
        <Button variant="contained" href="http://localhost:3000/#/admin/Addprof"
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
          Inscrire un Professeur
          <AddCircleIcon />
        </Button>
        
      </div>
      <div style={{ marginTop: 50 }}>
        {/* <center>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}  > {type === '' ? "Choisissez un type" : show ? "Liste des Professeurs" : "Choisissez une classe"} </h2>
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
                        if (type === "Primaire" || type === "Secondaire")
                          getNumerosNiveau(e.target.value)
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
                              getNumerosSection(e.target.value)
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
                      value={Numeroq}
                      onChange={e => {setNumero(e.target.value)
                                      //  reg(niveau,section,numero)
                                      setShow(true)
                                    }
                                      
                        }
                    >
                      {
                        Numeroox.map((n) =>
                          <MenuItem value={n.numero} key={n.id}>
                            {
                             n.numero
                            }
                          </MenuItem>
                        )
                      }
                    </Select>
                  </div>
                </div>
              )
          }
        </center> */}

        <br />
        <br />
        <br />
        <Grid container spacing={4}>
              <Grid item xs={12}>
                <MUIDataTable
                  title="Listes des  Professeurs"
                  data={mat}
                  columns={[              
                  {name: "id", label: "ID"},
                  {name: "Nom et Prenom", label: "Nom et Prénom"},
                  {name: "email", label: "Email"},
                  {name: "Telephone", label: "Telephone"},
                  {name: "matiere", label: "Matière"},
                  {name: "Description", label: "Description"},
 
                   {
                    name: "Actions",
                     options: {
                      customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                          actionload? 
                          <CircularProgress/>
                          :
                          <Button
  
                            variant={"contained"}
                            className={classes.marginRight}
                            onClick={
                              () => { 
                                popUpPull(tableMeta.rowData[0],tableMeta.rowData[1],tableMeta.rowData[4])
                              
                                setTableMeta(tableMeta.rowData)
                              
                              }
                            
                            }
                          
                          >
                            <DetailsIcon />
                          </Button>
                          // <Button style={{backgroundColor: "#0E0D47" }} onClick={() => console.log( tableMeta.rowData["0"]) }>
                           // Edit
                        // </Button>
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
                          'Sorry, there is no matching data to display',
                      },
                    },
                  }}
                />
              </Grid>

            </Grid>
              

<Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={state.toggleGrid}
          onClose={() => dispatch({ type: "CLOSE_GRID" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Informations Administratifs"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >
              <Grid>
            <Widget
            title={"Nom & Prenom :  " + noms}
            disableWidgetMenu
            inheritHeight
          >
            <ExpansionPanel classes={{ root: classes.expansion }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Type : </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {popuptype.map((se) =>
                    <li>{se[0]}</li>
                  )
                  }
                 
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel classes={{ root: classes.expansion }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Niveau : </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                {popupniv.map((se) =>
                    
                    <li >{se[0]}</li>
                  )
                  }
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel classes={{ root: classes.expansion }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Les Sections :</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography >
                {popupsect.map((se) =>
                    <li>{se[0]}</li>
                  )
                  }
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Matiére : {pers}</Typography>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          </Widget>
          </Grid>
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