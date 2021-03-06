import React, { useState, useEffect } from "react";
import {
  Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { Badge, Typography } from "../../../components/Wrappers/Wrappers";
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
  const [type, setType] = useState('')
  const [niveau, setNiveau] = useState('')
  const [section, setSection] = useState('0')
  const [capacity, setCapacity] = useState('')
  const [numeros, setNumeros] = useState([])

  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Coll??ge' },
    { id: 3, type: 'Secondaire' }
  ])

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
  const [sections, setSections] = useState([
    { id: 1, section: 'Science Informatique' },
    { id: 2, section: 'Science Exprimentale' },
    { id: 7, section: 'Math??matiques' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

  function reg(niv, sec, num) {

    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfMAdmin/${niv}`)
      .then(res => {
        setmat(res.data)
        setIsLoading(false)
        console.log(res.data)
      }, 2000)

  }

  const [tableMeta, setTableMeta] = useState([])

  useEffect(function () {
    getStats()
  }, [])

  const getStats = async () => {
    const d = localStorage.getItem('user_id')

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


  function reg(niv, sec, num) {

    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfMAdmin/${niv}`)
      .then(res => {
        setmat(res.data)
        setIsLoading(false)
        console.log(res.data)
      }, 2000)
  }

  const toggleHover = () => {
    setHover(!hover)
  }

  const [profClasse, setProfClasse] = useState([])
  const [loadingProfClass, setLoadingProfClass] = useState(false)

  const getClassByProf = async () => {
    setLoadingProfClass(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Profclasse/${id_prof}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Profclasse/2`)
      .then(res => {
        setProfClasse(res.data)
        console.log(res.data[0].type[0])
      })
      .catch(e => {
        console.log(e)
      })
    setLoadingProfClass(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des professeurs</h1>
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

        <br />
        <br />
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Listes des  Professeurs"
              data={mat}
              columns={[
                { name: "id", label: "ID" },
                { name: "Nom et Prenom", label: "Nom et Pr??nom" },
                { name: "email", label: "Mati??re" },
                { name: "Telephone", label: "Telephone" },
                { name: "matiere", label: "Mati??re" },
                { name: "Description", label: "Description" },

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
                              dispatch({ type: "OPEN_GRID" })
                              setTableMeta(tableMeta.rowData)
                              getClassByProf()
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
                      'D??sol??, il n\'y a aucune donn??e correspondante ?? afficher',
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
                  title="Nom & Prenom : Wahida Drine"
                  disableWidgetMenu
                  inheritHeight
                >
                  {
                    loadingProfClass ? <CircularProgress size={35} style={{ color: 'white' }} />
                      :
                      <Grid>
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
                              {/* <ul>{profClasse[0].type[0]}</ul> */}
                              <li>Secondaire</li>
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
                              <li>4 Ann??e</li>
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
                              <div style={{ display: 'block', justifyContent: 'center' }}>
                                <li>Math</li>
                                <br />
                                <li>Informatique</li>
                                <br />
                                <li>Economie</li>
                                <br />
                              </div>
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel disabled>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                          >
                            <Typography>Mati??re : Math??matique</Typography>
                          </ExpansionPanelSummary>
                        </ExpansionPanel>
                      </Grid>
                  }

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