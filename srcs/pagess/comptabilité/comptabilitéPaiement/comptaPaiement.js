import React, { useState, useEffect } from 'react'
import { Button } from "../../../components/Wrappers/Wrappers";
import {
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { CircularProgress } from "../../../components/Wrappers"
import PieChartIcon from '@material-ui/icons/PieChart'
import TocIcon from '@material-ui/icons/Toc'
import DetailsIcon from '@material-ui/icons/MoreVert'
import ReactApexChart from './DonutCharts'
import { ClassSharp } from '@material-ui/icons';

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

export default function ComptaPaiement() {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const [mat, setmat] = useState([]);

  async function reg() {
    const d = localStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/PaimentCompt`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Students`)
      .then(res => {
        console.log(res.data)
        setmat(res.data)
      }, 2000)
    setIsLoading(false)
  }

  async function showPaiementDetails(id) {
    dispatch({ type: "OPEN_GRID" })
    setIsLoadingDetails(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Paimentadmin/${id}`)
      .then(res => {
        console.log(id)
        setdet(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    setIsLoadingDetails(false)
  }

  const [showcharge, setshowcharge] = useState(false);
  const [ShowEntree, setShowEntree] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [tableMetaRow, setTableMetaRow] = useState([])

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  const [det, setdet] = useState([]);

  const [type, setType] = useState('')
  const [types, setTypes] = useState([
    { id: 1, type: 'Débit' },
    { id: 2, type: 'Crédit' },

  ])
  const [listclass,setlistclass] = useState('')
  function classs(id) {
    if  (mat[id].section === "0") {
       
      var s = mat[id].niveau 
    }
     else 
     {var s = mat[id].niveau +"  " + mat[id].section}

   
    return (s)
  }

  const [entrees, setentree] = useState([{ id: 1, type: 'Étudiant' }])

  const [change, setchange] = useState([
    { id: 1, type: 'Étudiant' },
    { id: 2, type: 'Professeur' },
    { id: 3, type: 'Ouvriers' },
    { id: 4, type: 'Autre Change' },
  ])

  const [pay, setPay] = useState([])
  const [showlist, setshowlist] = useState("none")


  const Entree = () =>
    <div>
      <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
        color="primary"
        variant="contained"
      > Etudiant
      </Button>
    </div>;

  const Charge = () =>
    <div  >
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

        <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
          color="primary"
          variant="contained"
        > Etudiant
        </Button>
        <Button style={{ backgroundColor: "grey", width: '150px' }}
          color="primary"
          variant="contained"
        > Professeur
        </Button>
        <Button style={{ backgroundColor: "grey", width: '150px' }}
          color="primary"
          variant="contained"
        > Ouvriers
        </Button>
        <Button style={{ backgroundColor: "grey", width: '150px' }}
          color="primary"
          variant="contained"
        > Autre charge
        </Button>
      </div>
    </div>;

  const Text = () =>
    <div  >
      <ReactApexChart />
    </div>;

  const Table = () =>
    <div  >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion de paiement"
            data={mat}
            columns={[
              { name: 'ID', label: 'ID' },
              { name: 'Nom et prenom', label: 'Nom et Prénom' },
               { name :'class', label: 'Class' , options : {customBodyRender: (value, tableMeta, updateValue) => {
                
                return (<p>{classs(tableMeta.rowIndex)}</p>)
                
          }


               } },
              { name: 'phone', label: 'Téléphone' },
              {
                name: "parents",
                label: 'Parent',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {

                    if (value.length == 0) {
                      return (
                        <p style={{ color: 'red' }}>-</p>
                      )
                    }
                    else {
                      return (
                        <p>{value[0].fullname}</p>
                      )
                    }
                  }
                }
              },
              {
                name: "parents",
                label: 'Numéro du Parent',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {

                    if (value.length == 0) {
                      return (
                        <p style={{ color: 'red' }}>-</p>
                      )
                    }
                    else {
                      return (
                        <p>{value[0].phone}</p>
                      )
                    }
                  }
                }
              },
              {
                name: "parents",
                label: 'Numéro d\'urgence Parent',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {

                    if (value.length == 0) {
                      return (
                        <p style={{ color: 'red' }}>-</p>
                      )
                    }
                    else {
                      return (
                        <p>{value[0].Urgence}</p>
                      )
                    }
                  }
                }
              },
              {
                name: "parents",
                label: 'Adresse du Parent',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {

                    if (value.length == 0) {
                      return (
                        <p style={{ color: 'red', alignItems: 'center', justifyContent: 'center' }}>-</p>
                      )
                    }
                    else if ((value[0].addresse) == null) {
                      return (
                        <p style={{ color: 'red' }}>Pas d'adresse</p>
                      )
                    }
                    else {
                      return (
                        <p>{value[0].addresse}</p>
                      )
                    }
                  }
                }
              },
              {
                name: "Détail",
                label: 'Détail',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                      <div style={{ width: 100 }}>
                        <Button
                          onClick={() => {
                            setTableMetaRow(tableMeta.rowData)
                            showPaiementDetails(tableMeta.rowData[0])
                          }}
                        >
                          <DetailsIcon />
                        </Button>
                      </div>
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
                    <CircularProgress size={35} /> :
                    'Désolé, il n\'y a aucune donnée correspondante à afficher',
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </div>;

  return (

    <div>
      <h1>Gestion de Paiement</h1>
      <br />
      <center>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
          {
            types.map((t) =>
              <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: '#0E0D47', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "rgb(157, 2, 8)", width: '300px' }}
                color="primary"
                variant="contained"
                onClick={() => {
                  setType(t.type)
                  if (t.type === "Entrée") {

                    setPay(entrees)
                    setshowcharge(null)
                    setshowlist("block")
                  }
                  else {
                    setPay(change)
                    setShowEntree(null)
                    setshowlist("block")
                  }
                }}
              > {t.type}
              </Button>
            )
          }
        </div>
      </center>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

        <div style={{ display: showlist }}>
          <p style={{ fontSize: 20 }}>Type:</p>
          <br />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: 850, height: 20, marginBottom: 80 }}
            value={type}
            onChange={e => {

              setType(e.target.value)
              reg()
              setShowTable(true)

            }}
          >
            {
              pay.map((n) =>

                <MenuItem value={n.id} key={n.id}>
                  {n.type}
                </MenuItem>
              )
            }
          </Select>
        </div>
      </div>
      <br />   <br />
      {ShowEntree ? <Entree /> : null}
      {showcharge ? <Charge /> : null}

      <br />
      <br />

      {/* <Donut /> */}
      {showText ?
        <div >
          <div style={{ justifyContent: "flex-end", float: "right" }}>


            <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
              color="primary"
              variant="contained"
              onClick={() => {
                { reg() };
                setShowTable(!showTable)
                setShowText(null)
              }}
            >  <TocIcon /> Tableau
            </Button>


            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

            <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
              color="primary"
              variant="contained"

              onClick={() => {
                setShowTable(null)
                setShowText(!showText)
              }

              }
            > <PieChartIcon /> Chart
            </Button>
          </div>
          <Text />
        </div> : null}

      {showTable ?
        <>
          <div style={{ justifyContent: "flex-end", float: "right" }}>
            <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
              color="primary"
              variant="contained"
              onClick={() => {
                { reg() };
                setShowTable(true)
                setShowText(null)
              }}
            >
              <TocIcon /> Tableau
            </Button>

            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;


            <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
              color="primary"
              variant="contained"

              onClick={() => {
                setShowText(true)
                setShowTable(null)

              }
              }
            >
              <PieChartIcon /> Chart
            </Button>
          </div>

          <Table />
        </>
        : null}
      <br />
      <br />

      <div>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={state.toggleGrid}
          onClose={() => dispatch({ type: "CLOSE_GRID" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Historique de paiement"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >
              {isLoadingDetails ?
                <CircularProgress size={35} /> :
                <MUIDataTable
                  title={<h2>Nom et Prénom: {tableMetaRow[1]}</h2>}
                  data={det}
                  columns={[
                    { name: "id", label: "ID" },
                    { name: "tranche", label: "N° Tranche" },
                    { name: "Montant", label: "Montant" },
                    { name: "date de paiment", label: "Date de paiement" },
                    { name: "Status", label: "État" },
                  ]}
                  options={{
                    filterType: "checkbox",
                    textLabels: {
                      body: {
                        noMatch: 'Désolé, il n\'y a aucune donnée correspondante à afficher',
                      },
                    },
                  }}
                />
              }
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

  )
}