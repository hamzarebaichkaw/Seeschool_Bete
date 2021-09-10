import React, { useState, useEffect } from 'react';
import { Link, Button, Typography } from "../../../components/Wrappers/Wrappers";
import {
  Grid, Box, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PieChartIcon from '@material-ui/icons/PieChart';
import TocIcon from '@material-ui/icons/Toc';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { CircularProgress } from "../../../components/Wrappers"
import ReactApexChart from './DonutCharts'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Widget from "../../../components/Widget/Widget";

import {
  Print as PrintIcon,
  ArrowForward as RightArrowIcon
} from "@material-ui/icons";
import useStyles from "./styles";
import { DataGrid } from '@material-ui/data-grid';

const windowPrint = () => {
  window.print();
};

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

export default function ComptaFacture() {

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

  const [mat, setmat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [facc, setfacc] = useState([]);

  useEffect(function () {
    regss()
  }, [])

  const regss = async () => {
    const d = localStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/FactureCompt`)
      .then(res => {
        setfacc(res.data)
        // setListeProduits(res.data)
      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };
  const [listeProduits, setListeProduits] = useState([])

  const rows = [
    { id: 1, firstName: 'aeraerezr', lastName: 'okaeraa', fullName: 'Status' },
    { id: 2, firstName: 'Cersei', age: 42 },
    { id: 3, firstName: 'Jaime', age: 45 },
    { id: 4, firstName: 'Arya', age: 16 },
    { id: 5, firstName: 'Daenerys', age: null },
    { id: 6, firstName: null, age: 150 },
    { id: 7, firstName: 'Ferrara', age: 44 },
    { id: 8, firstName: 'Rossini', age: 36 },
    { id: 9, firstName: 'Harvey', age: 65 },
  ];

  const columns = [
    { field: 'Produit', headerName: 'Produit', width: 180, },
    {
      field: 'type',
      headerName: 'Type',
      width: 180,
    },
    {
      field: 'Code_produit',
      headerName: 'Quantité',
      width: 180,
    },
    {
      field: 'Prix_Unitaire',
      headerName: 'Prix Unitaire',
      width: 180,
    },
    {
      field: 'Total',
      headerName: 'Total',
      width: 180,

    },
    {
      field: 'description',
      headerName: 'Description',
      width: 180,

    },
  ];

  const [showText, setShowText] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const Text = () =>
    <div>

      <div style={{ justifyContent: "flex-end", float: "right" }}>
        <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            setShowTable(!showTable)
            setShowText(null)
          }}>
          <TocIcon /> Tableau
        </Button>
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            setShowTable(null)
          }}
        >
          <PieChartIcon /> Chart
        </Button>
      </div>
      <ReactApexChart />
    </div>;

  const Table = () =>
    <div>
      <div style={{ justifyContent: "flex-end", float: "right" }}>
        <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            setShowText(null)
          }}>
          <TocIcon /> Tableau
        </Button>
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <Button style={{ backgroundColor: "#ba181b", width: '150px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            setShowText(!showText)
            setShowTable(null)
          }}
        >
          <PieChartIcon /> Chart
        </Button>

      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des Factures"
            data={facc}
            columns={["Fornisseur", "date de paiement", "Total", "Status",
              {
                name: "produit", label: "Facture",
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <div style={{ display: "flex", alignItems: "space-around", justifyContent: "space-around" }}>
                        <Button
                          variant={"contained"}
                          className={classes.marginRight}
                          onClick={() => {
                            popup()
                            setListeProduits(value)
                            console.log(value)
                          }}
                        >
                          <CreditCardIcon style={{ color: 'red' }} />
                        </Button>
                      </div>
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

  return (
    <div>
      <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
        <h1>Gestion des factures</h1>

      </div>

      {showTable ? <Table /> : null}

      <div style={{ display: 'flex', justifyContent: 'center' }} >
        {showText ? <Text /> : null}
      </div >
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
          <DialogTitle id="alert-dialog-title">{"Facture de paiement 2021/2022"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              component={"div"}
            >
              <div>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Widget disableWidgetMenu>
                      <Box display="flex" justifyContent="space-between" mb={3}>
                        <img
                          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH5cngBMdSA76SR6OZYlGYREQVFBOE-H-Q6xl0aZbtP_OxNbI-w6_qXtA_Oj6wZzWdQ2k&usqp=CAU"}
                          alt="Flatlogic"
                          style={{ maxHeight: 100, borderRadius: 10, marginRight: 24 }}
                        />
                        <Box>
                          <Typography weight="bold" display="inline">
                            #9.45613 /
                          </Typography>{" "}
                          <Typography display="inline">17 May 2014</Typography>
                          <Typography>
                            Some Invoice number description or whatever
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Box>
                          <Typography variant="h4" style={{ marginBottom: 16 }}>
                            Company Information
                          </Typography>
                          <Typography variant="h6">Flatlogic LLC</Typography>
                          <Typography weight="bold">2 Infinite Loop</Typography>
                          <Typography>Minsk, Belarus 220004</Typography>
                          <Typography>088.253.5345</Typography>
                          <Typography>
                            <abbr title="Work Email">e-mail:</abbr>
                            <Link color="primary"> email@example.com</Link>
                          </Typography>
                          <Typography>
                            <abbr title="Work Phone">phone:</abbr> (012) 345-678-901
                          </Typography>
                          <Typography>
                            <abbr title="Work Fax">fax:</abbr> (012) 678-132-901
                          </Typography>
                        </Box>
                        <Box
                          display="inline-flex"
                          flexDirection="column"
                          alignItems="flex-end"
                        >
                          <Typography variant="h4" style={{ marginBottom: 16 }}>
                            Client Information
                          </Typography>
                          <Typography variant="h6">Veronica Niasvizhskaja</Typography>
                          <Typography display="inline" weight="bold" block>
                            Consultant
                            <Typography display="inline">
                              {" "}
                              at <Link color="primary">Allspana</Link>
                            </Typography>
                          </Typography>
                          <Typography>
                            <abbr title="Work Email">e-mail:</abbr>{" "}
                            <Link color="primary"> maryna@allspana.by</Link>
                          </Typography>
                          <Typography>
                            <abbr title="Work Phone">phone:</abbr> (012) 345-678-901
                          </Typography>
                          <Typography>
                            <abbr title="Work Fax">fax:</abbr> (012) 678-132-901
                          </Typography>
                          <Typography weight="bold">Note:</Typography>
                          <Typography variant="body2">
                            Some nights I stay up cashing in my bad luck. Some nights I
                            call it a draw
                          </Typography>
                        </Box>
                        <div className={classes.tableWrapper} style={{ height: 380, width: '100%' }} >

                          <DataGrid
                            rows={listeProduits}
                            columns={
                              columns
                            }
                          />

                        </div>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                          mt={3}
                          flexWrap="wrap"
                        >
                          <Typography block style={{ marginBottom: 16 }}>
                            <Typography weight="bold" display="inline">
                              Note:
                            </Typography>
                            Thank you for your business. Keep in mind, sometimes bad
                            things happen. But it's just sometimes.
                          </Typography>
                          <Box display="flex" flexDirection="column">
                            <Box display="flex" justifyContent="space-between">
                              <Box mr={2} mb={2}>
                                Subtotal
                              </Box>
                              <Box>1,598.88</Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                              <Box mr={2} mb={2}>
                                Tax(10%)
                              </Box>
                              <Box>159.89</Box>
                            </Box>
                            <Typography weight="bold" block>
                              <Box display="flex" justifyContent="space-between">
                                <Box mr={2} mb={2}>
                                  Total
                                </Box>
                                <Box>1,758.77</Box>
                              </Box>
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end"
                        mt={3}
                      >
                        <Typography block style={{ marginBottom: 16 }}>
                          Marketing Consultant
                          <Typography weight="bold">Bob Smith</Typography>{" "}
                        </Typography>
                        <Box display="flex">
                          <Button
                            variant="contained"
                            style={{ marginRight: 8 }}
                            aria-label="Print"
                            onClick={windowPrint}
                          >
                            <PrintIcon className={classes.iconButton} />
                            Print
                          </Button>
                        </Box>
                      </Box>
                    </Widget>
                  </Grid>
                </Grid>
              </div>
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