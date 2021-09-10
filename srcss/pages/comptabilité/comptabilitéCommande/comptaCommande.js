
import React, { useState, useEffect } from "react"; 
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { withStyles, useTheme } from '@material-ui/core/styles';
 
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
 
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import axios from "axios";
 
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
    const d= sessionStorage.getItem('user_id')
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
  } ;
  const [mat, setmat] =useState([]);
  // async function  reg  ( id ) {
  //  const d= sessionStorage.getItem('user_id')
  //  setIsLoading(true)
  //  await axios
  //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/CommandCompt`)
  //     .then(res => {
  //    setmat(res.data)
  //     }, 2000)
  //     setIsLoading(false)
  // } 
  const [mats, setmats] =useState([]);
  async function  regs  ( id ) {
   const d= sessionStorage.getItem('user_id')
   dispatch({ type: "OPEN_GRID" })
   setIsLoading(true)
   await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
     setmats(res.data)
      }, 2000)
      setIsLoading(false)
  } 
  return (
<div>
  <div style= {{display:'flex', 'justifyContent':'space-between'}}>
   <h1>Bon de commande </h1>
   <Button  variant="contained" color="primary" href="http://localhost:3000/#/comptabilite/addordre" style={{backgroundColor: "#ba181b", borderRadius:10 , letterSpacing:4,height:'60px'}}>
     <AddShoppingCartIcon style={{width:'50px', height:'50px'}} />   Ordre 
      </Button>
      </div>
 <div style={{backgroundColor:'',}}>
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
          <MUIDataTable
            title="Bon de commande 100 total"
          data={ mat}
            columns={[ "REF", "Description", "Quantite" , "Total TTC"
            , "date de paiement","Status",
            {
              name: "Actions",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <Button
                        
                        variant={"contained"}
                        className={classes.marginRight}
                        onClick={
                          () => regs(tableMeta.rowData["0"]) }
                      >
                       < MoreVertIcon/>
                      </Button>
                        
                      )
                  }
              }
          }
          ]}
            options={{
              filterType: "checkbox",
              textLabels: {
                body: {
                    noMatch:  isLoading ?
                    <CircularProgress />:
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
              <DialogTitle id="alert-dialog-title">{"Absence"}</DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  component={"div"}
                >
<MUIDataTable
            title="Gestion des Congés"
            data={ mats }
            columns={[    "nombre absence",
            "date_absence"
          ]}
            options={{
              filterType: "checkbox",
              
              textLabels: {
                body: {
                    noMatch:  isLoading ?
                    <CircularProgress />:
                        'Sorry, there is no matching data to display',
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
  );
}
