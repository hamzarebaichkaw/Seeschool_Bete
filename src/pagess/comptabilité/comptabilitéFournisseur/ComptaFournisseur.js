import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { CircularProgress } from "../../../components/Wrappers"
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ReactApexChart from './DonutCharts'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/styles';
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
import PieChartIcon from '@material-ui/icons/PieChart';
import TocIcon from '@material-ui/icons/Toc';
import ListIcon from '@material-ui/icons/List';

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

export default function ComptaFournisseur() {

  const [isLoading, setIsLoading] = useState(true);

  async function reg(type) {
    const d = localStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/FornisseurAdmin/${type}`)
      .then(res => {
        setClasProf(res.data)
      }, 2000)
    setIsLoading(false)
  }

  const [type, setType] = useState('')
  const [showText, setShowText] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [clasProf, setClasProf] = useState([])
  const [tableMetaRow, setTableMetaRow] = useState([])

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });


  const useStyless = makeStyles({
    flexGrow: {
      flex: '1',
    },
    button: {
      fontSize: 20,
      width: 250,
      alignItems: 'center',
      justifyContent: 'space-evenly',


      backgroundColor: "#ba181b",
      color: "#F6F7FF",
      alignSelf: 'center',
      '&:hover': {
        fontSize: 20,
        width: 250,
        alignItems: 'center',
        justifyContent: 'space-evenly',


        backgroundColor: "#dc3545",
        color: "#F6F7FF",
        alignSelf: 'center'
      },
    }
  })


  const Text = () =>
    <div  >
      <ReactApexChart />
    </div>;

  const [types, setTypes] = useState([
    { id: 1, type: 'Canitie' },
    { id: 2, type: 'Transport' },
    { id: 3, type: 'Sanitaire' },
    { id: 4, type: 'Imprimerie' },
    { id: 5, type: 'Autre' },
  ])

  const Table = () =>
    <div  >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des fournisseurs"
            data={clasProf}
            columns={[
              { name: "id", label: "ID" },
              { name: "Fornisseur", label: "Fournisseur" },
              { name: "phone", label: "Numéro Téléphone" },
              { name: "Adress", label: "Adresse" },
              { name: "email", label: "Email" },
              {
                name: "produits",
                label: "Liste des produits",
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button
                        variant={"contained"}
                        className={classes.marginRight}
                        onClick={() => {
                          setTableMetaRow(tableMeta.rowData)
                          dispatch({ type: "OPEN_GRID" })
                        }}
                      >
                        <ListIcon />
                      </Button>
                    )
                  }
                }
              },
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
    </div>;

  const classes = useStyless();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Fournisseurs</h1>
        <div style={{ justifyContent: "flex-end", float: "right" }}>

          <Button className={classes.button} variant="contained" color="primary" href="http://localhost:3000/#/comptabilite/addfournisseur" >
            <TransferWithinAStationIcon style={{ width: '80px', height: '50px' }} />      Fournisseur
          </Button>

          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;


          <Button className={classes.button} variant="contained" color="primary" href="/#/comptabilite/addproduit" >
            <AddShoppingCartIcon style={{ width: '80px', height: '50px' }} /> Produit
          </Button>

        </div>
      </div>
      <br /><br /><br /><br />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div>
          <p style={{ fontSize: 20 }}>Type:</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: 850, height: 20, marginBottom: 80 }}
            value={type}
            onChange={e => {
              setType(e.target.value)
              reg(e.target.value)
              setShowTable(true)
            }}
          >
            {
              types.map((n) =>
                <MenuItem value={n.type} key={n.id}>
                  {n.type}
                </MenuItem>
              )
            }
          </Select>
        </div>
      </div>

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
                { reg() }
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
                setShowTable(null)
                setShowText(true)
              }}
            >
              <PieChartIcon /> Chart
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
                setShowTable(!showTable)
                setShowText(null)
              }}
            > <TocIcon /> Tableau
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
          <DialogTitle id="alert-dialog-title">{"Liste Produits"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >

              <MUIDataTable
                title={<h2>Fournisseur: {tableMetaRow[1]}</h2>}
                data={tableMetaRow[5]}
                columns={[
                  { name: "produit", label: "Produit" },
                  { name: "Quantite", label: "Quantité" },
                  { name: "Prix", label: "Prix" },
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