import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { withStyles, useTheme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { DataGrid } from '@material-ui/data-grid';
import Widget from "../../../components/Widget/Widget";


import {
  Print as PrintIcon,
  ArrowForward as RightArrowIcon
} from "@material-ui/icons";
import { Link, Button, Avatar, Typography } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

} from "@material-ui/core";

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

const windowPrint = () => {
  window.print();
};



export default function ComptaCommande() {
  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(function () {
    reg()
  }, [])
  const reg = async () => {
    const d = localStorage.getItem('user_id')
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/CommandCompt`)
      .then(res => {
        setmat(res.data)
        console.log(res.data)
      }, 2000)

      .catch((e) => {
        console.log("ERROR: " + e)
      });
    setIsLoading(false)
  };
  
  const [listeProduitss, setListeProduitss] = useState([])

  const columns = [
    { field: "Nom de poduit", headerName: "Produit", width: 180, },
    {
      field: 'Type',
      headerName: 'Type',
      width: 180,
    },
    {
      field: 'Quantite',
      headerName: 'Quantité',
      width: 180,
    },
    {
      field: 'prix_unitaire',
      headerName: 'Prix Unitaire',
      width: 180,
    },
    {
      field: 'Total',
      headerName: 'Total',
      width: 180,

    },
    {
      field: 'Description',
      headerName: 'Description',
      width: 180,

    },
  ];

  const [mat, setmat] = useState([]);

  function opened() {
    dispatch({ type: "OPEN_GRID" })
  }

  const [listeProduits, setListeProduits] = useState([])

  var [idfac, setidfac] = useState("");

  async function addfac(order_id) {
    await axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/ApiP/AddFacture', {
        "order_id": order_id,
      })
      .then(
        res => {
          setidfac(res.data)
        }
      )
      .catch((e) => {
        console.log(e)
      })
  }

  const [showwwTable, setShowwwTable] = useState(false);
  const [first, setfirst] = useState(true);

  const Table = () =>
    <div>
      <Button
        onClick={() => {
          setfirst(true)
          setShowwwTable(null)
        }}
        variant="contained" color="primary" style={{ backgroundColor: "#ba181b", borderRadius: 10, letterSpacing: 4, width: '180px', height: '60px' }} >Return </Button>
      <br /><br />
      <MUIDataTable
        title="Liste des produits"
        data={listeProduits}
        columns={[
          { name: "Nom de poduit", label: "Produit" },
          "Type", "Quantite", "prix_unitaire", "Total", "Description"
        ]}
      />
    </div>;

  const FirstTable = () =>
    <div>

      <MUIDataTable
        title="Bons de commande"
        data={mat}
        columns={["REF", {
          name: "fornisseurs", label: "Fournisseur",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <>
                  {
                    value[0].fornisseur
                  }
                </>
              )
            }
          }
        }, {
            name: "Produits", label: "Listes des Poduits",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <>
                    <div style={{ display: "flex", alignItems: "space-around", justifyContent: "space-around" }}>
                      <Button
                        variant={"contained"}
                        className={classes.marginRight}
                        onClick={() => {
                          setListeProduits(value)
                          setShowwwTable(true)
                          setfirst(null)
                        }}
                      >
                        <AddToQueueIcon color="primary" />
                      </Button>
                    </div>
                  </>
                )
              }
            }
          },

          { name: "date de paiement", label: "Date de création" },
          { name: "Status" },

          {
            name: "Produits", label: "Générer la facture",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button
                    variant={"contained"}
                    className={classes.marginRight}
                    // value={order_id}
                    // onChange={e => setorder_id(e.target.value)}
                    onClick={
                      () => {
                        setListeProduitss(value)
                        addfac(tableMeta.rowData[0])
                        opened()
                      }
                    }
                  >
                    <MoreVertIcon />
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
    </div>;





  return (
    <div>
      <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
        <h1>Bon de commande </h1>
        <Button variant="contained" color="primary" href="http://localhost:3000/#/comptabilite/addordre" style={{ backgroundColor: "#ba181b", borderRadius: 10, letterSpacing: 4, width: '180px', height: '60px' }}>
          <AddShoppingCartIcon style={{ width: '50px', height: '50px' }} />   Ordre
        </Button>
      </div>
      <div style={{ backgroundColor: '', }}>
        <br />
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {first ? <FirstTable /> : null}
            {showwwTable ? <Table /> : null}
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
                        <div className={classes.tableWrapper} style={{ height: 400, width: '100%' }} >

                          <DataGrid

                            rows={listeProduitss}
                            columns={columns}
                          // pageSize={5}
                          // checkboxSelection
                          // disableSelectionOnClick
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
                          {/* <Button
                  variant="contained"
                  color="success"
                  aria-label="Proceed"
                >
                  <RightArrowIcon className={classes.iconButton} />
                  Proceed with Payment
                </Button> */}
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
  );
}
