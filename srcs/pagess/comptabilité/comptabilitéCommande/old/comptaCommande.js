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
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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
  const [CoursM, seCoursM] = useState([]);
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

      }, 2000)

      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };

  const [mat, setmat] = useState([]);
  // async function  reg  ( id ) {
  //  const d = localStorage.getItem('user_id')
  //  setIsLoading(true)
  //  await axios
  //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/CommandCompt`)
  //     .then(res => {
  //    setmat(res.data)
  //     }, 2000)
  //     setIsLoading(false)
  // } 

  const [mats, setmats] = useState([]);

  async function regs(id) {
    const d = localStorage.getItem('user_id')
    dispatch({ type: "OPEN_GRID" })
    setIsLoading(true)
    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
        setmats(res.data)
      }, 2000)
    setIsLoading(false)
  }
function opened() {
  dispatch({ type: "OPEN_GRID" })
}
  const clasprof = [
    ["1", "Wahida Drine", "920 D ", "250 g  ", "16/8/2021  ",],
    ["2", "Amal Baccouche", "200 D", "500 g  ", "16/8/2021  ",],
    ["3", "Taoufik Najjar", "350 D ", "200 g  ", "16/8/2021  ",],
    ["4", "Samia Jegham", "250 D ", "700 g  ", "16/8/2021  ",],
    ["5", "Mohamed Abouda", "3150 D ", "800 g  ", "16/8/2021  ",],
    ["6", "Olfa Damak", "150 D ", "2800 g  ", "16/8/2021  ",],
    ["7", "Noura Ouerfelli", "750 D ", "200 g  ", "16/8/2021  ",],
    ["8", "Lamia Choour", "500 D ", "700 g  ", "16/8/2021  ",],
    ["9", "Basma Hmis", "350 D ", "500 g  ", "16/8/2021  ",],
    ["10", "Mourad Ben Hmiden", "350 D ", "7500 g  ", "16/8/2021  ",],

  ];

  function setcolor(sd) {
    let colo
    if (sd == "en_cours") { colo = "#ffc107" }
    else if (sd == "acceptée") { colo = "#28a745" }
    else colo = "#dc3545"
    return (colo)
  }

  function acept(pos) {
    let zog = clasprof
    zog[pos].Status = "acceptée"
    console.log(zog[pos].Status)
    // setclasprof(zog)

  }
  function refus(pos) {
    let zog = clasprof
    zog[pos].Status = "Refusé"
    console.log(zog[pos].Status)
    // setclasprof(zog)

  }

  const [value, setValue] = useState();
  const [listeProduits, setListeProduits] = useState([])

  const refresh = () => {
    // re-renders the component
    setValue({});
  }

  var [order_id, setorder_id] = useState("1");

  var [idfac, setidfac] = useState("");
  async function addfac(order_id) {
    await axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/ApiP/AddFacture', {
        "order_id": order_id,
      })
      .then(
        res => {
          console.log(res.data)
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
          "Type", "Quantite","prix_unitaire" ,"Total", "Description"
        ]}
      />
    </div>;

  const FirstTable = () =>
    <div >

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
           
          //  {
          //   name: "Actions",
          //   options: {
          //     customBodyRender: (value, tableMeta, updateValue) => {
          //       return (
          //         <div style={{ display: "flex", alignItems: "space-around", justifyContent: "space-around" }}>
          //           <Button
          //             variant={"contained"}
          //             className={classes.marginRight}
          //             onClick={() => {
          //               acept(tableMeta.rowIndex)
          //               console.log(tableMeta.rowIndex);
          //               refresh()
          //             }}
          //           >
          //             <CheckIcon color="primary" />
          //           </Button>
          //           <Button
          //             variant={"contained"}
          //             className={classes.marginRight}
          //             onClick={
          //               () => {
          //                 refus(tableMeta.rowIndex)
          //                 console.log(tableMeta.rowIndex);
          //                 refresh()
          //               }
          //             }
          //           >
          //             <CancelIcon color="error" />
          //           </Button>
          //         </div>
          //       )
          //     }
          //   }
          // },
           {
            name: "Details", label: "Générer la facture",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button
                    variant={"contained"}
                    className={classes.marginRight}
                    value={order_id}
                    onChange={e => setorder_id(e.target.value)}
                    onClick={
                      () => { addfac(order_id) 
                      
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
        {/* <div style={{display:'flex', justifyContent:'space-between'}}>
      
   {/* <Button style={{backgroundColor: "#ba181b",width:'150px'}}
     color="primary"
     variant="contained"
     onClick={()=>{reg("3")}} 
   > 
   Details
   </Button> 
   <Button  variant="contained" color="primary" href="http://localhost:3000/#/comptabilite/addordre" style={{backgroundColor: "#ba181b", borderRadius:50 , letterSpacing:4,height:'60px'}}>
      Ajouter un Ordre  <AddCircleIcon />
      </Button>
         </div> */}
        <br />
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
                {/* <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow className={classes.tableFooter}>
                      <TableCell>#</TableCell>
                      <TableCell>ITEM</TableCell>
                      <TableCell>DESCRIPTION</TableCell>
                      <TableCell>QUANTITY</TableCell>
                      <TableCell>PRICE PER UNIT</TableCell>
                      <TableCell>TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(c => (
                      <TableRow key={c.id}>
                        <TableCell>{c.id}</TableCell>
                        <TableCell>{c.item}</TableCell>
                        <TableCell>{c.desc}</TableCell>
                        <TableCell>{c.quantity}</TableCell>
                        <TableCell>{c.price}</TableCell>
                        <TableCell>{c.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
<DataGrid

  rows={rows}
  columns={columns}
  pageSize={5}
  checkboxSelection
  disableSelectionOnClick
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
