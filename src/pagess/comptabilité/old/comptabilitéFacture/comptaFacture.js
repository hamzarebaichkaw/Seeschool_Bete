import React, { useState, useEffect } from 'react';
import { Link,Button, Typography } from "../../../components/Wrappers/Wrappers";
import { Grid, Box, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow   } from "@material-ui/core";
    import MUIDataTable from "mui-datatables";
    import axios from "axios";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { CircularProgress } from "../../../components/Wrappers"
import ReactApexChart from './DonutCharts'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Widget from "../../../components/Widget/Widget";
import PieChartIcon from '@material-ui/icons/PieChart';
import TocIcon from '@material-ui/icons/Toc';
import {
  Print as PrintIcon,
  ArrowForward as RightArrowIcon
} from "@material-ui/icons";
import useStyles from "./styles";
const rows = [
  {
    id: 1,
    item: "Brand-new 27 monitor",
    desc: "2,560x1,440-pixel (WQHD) resolution supported!",
    quantity: 2,
    price: 700,
    total: 1400.0
  },
  {
    id: 2,
    item: "Domain: okendoken.com",
    desc: "6-month registration",
    quantity: 1,
    price: 10.99,
    total: 21.88
  },
  {
    id: 3,
    item: "Atlas Shrugged",
    desc: "Novel by Ayn Rand, first published in 1957 in the United States",
    quantity: 5,
    price: 35,
    total: 175.0
  },
  {
    id: 4,
    item: "New Song by Dr. Pre",
    desc: "Lyrics: praesent blandit augue non sapien ornare imperdiet",
    quantity: 1,
    price: 2,
    total: 2.0
  }
];

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

  const clasprof = [
    ["1","4 eco 1 ","Wahida Drine", ],
    ["2","4 Eco 2", "Amal Baccouche" ,],
    ["3"," 4 Math 1", "Taoufik Najjar",],
    ["4"," 4 Math 2 ","Samia Jegham", ],
    ["5","4 Tech 1", "Mohamed Abouda", ],
    ["6","4 Info 1", "Olfa Damak", ],
    ["7","4 Info 2", "Noura Ouerfelli", ],
    ["8","4 lettre 1", "Lamia Choour", ],
    ["9","4 Lettre 2","Basma Hmis",   ],
    ["10"," 4 Sport 1", "Mourad Ben Hmiden",  ],
   
  ];

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

  async function  popup  ( id  ) {
    dispatch({ type: "OPEN_GRID" })
  
  }


  const [mat, setmat] =useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async  function  reg  (  ) {
   const d = localStorage.getItem('user_id')
   setIsLoading(true)
   await    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/FactureCompt`)
      .then(res => {
     setmat(res.data)
      }, 2000)
      setIsLoading(false)
  } 



  const [showText, setShowText] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const onClick = () => setShowText(true);
  const onClicktable = () => setShowTable(true);

  const Text = () =>
  <div  >
   <ReactApexChart />
   </div>;
const Table = () =>
<div  >
<Grid container spacing={4}>
                <Grid item xs={12}>
                  <MUIDataTable
                    title="Gestion des Factures"
               data={mat}
                    columns={[ "Order ID","Fornisseur", "Total TTC","Quantite",  "date de paiement", "Status", "Actions"]}
                    options={{
                      filterType: "checkbox",
                      textLabels: {
                        body: {
                            noMatch:  isLoading ?
                            <CircularProgress />:
                                'Désolé, il n\'y a aucune donnée correspondante à afficher',
                        },
                    },
                    }}
                  />
                </Grid>
              </Grid>
 </div>;

const [types, setTypes] = useState([
  { id: 1, type: "Tableau ",  },
  { id: 2, type: 'Chart',   },
  
])
const [type, setType] = useState('')
    return(
        <div>
           <div style= {{display:'flex', 'justifyContent':'space-between'}}>
   <h1>Gestion des factures   </h1>
   
      </div>
            <br />
            <center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: '#0E0D47', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "rgb(157, 2, 8)", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => { setType(t.type)
                    if(t.id===1) {
                      
                      setShowTable(!showTable) 
                      setShowText(null)
                }
                   else {
                      setShowTable(null) 
                    setShowText(!showText)
                   }
                   }}
                >  {t.type}
                </Button>
              )
            }
    </div>
    </center>
            
           
            <br />
            <br />
         
            {showText ? <Text /> : null}
    {showTable ? <Table /> : null}
          
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
              <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-label="simple table">
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
                </Table>
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
                <Button
                  variant="contained"
                  color="success"
                  aria-label="Proceed"
                >
                  <RightArrowIcon className={classes.iconButton} />
                  Proceed with Payment
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