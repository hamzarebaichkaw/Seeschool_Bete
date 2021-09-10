import React, { useState, useEffect } from "react"; 
import { Grid  } from "@material-ui/core";
  import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
 
// components
import Widget from "../../../components/Widget/Widget";
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
 
 
import axios from "axios";
import * as moment from 'moment'
 
import AddCircleIcon from '@material-ui/icons/AddCircle';
 

   
 

 
 
 
export default function Inscription() {
  const classes = useStyles();
 
  const [isLoading, setIsLoading] = useState(true);

  const [CoursM, seCoursM] = useState([]);
  
  useEffect(function () {
    getStats()
  }, [])
  const getStats = async () => {
    const d= sessionStorage.getItem('user_id')
    setIsLoading(true)
    await  axios
    
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        seCoursM(res.data.result)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
      setIsLoading(false)
  } ;
  const [mat, setmat] =useState([]);
  async function  reg  ( id ) {
    console.log( id)
   const d= sessionStorage.getItem('user_id')
   setIsLoading(true)
   await axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Students`)
      .then(res => {

     setmat(res.data)
     
      }, 2000)
      setIsLoading(false)
  
      
  } 



 




  return (
    <div>
<div style={{display:'flex', justifyContent:'space-between'}}>
   <h1>Gestion d'inscription </h1>
   <Button  variant="contained" color="primary" href="http://localhost:3000/#/admin/Register" style={{backgroundColor: "#0E0D47", borderRadius:50 , letterSpacing:4}}>
      Creation d'un compte  <AddCircleIcon />
      </Button>
      </div>
 <div style={{backgroundColor:'',}}>
         <br />
         <div style={{display:'flex', justifyContent:'space-between', }}>
           {

CoursM.map(

  (m)=>( 

      
  <Button
  style={{backgroundColor: "#0E0D47",}}
  color="primary"
  variant="contained"
  className={classes.button}
  onClick={()=>{reg(m.id)}} 
>
{m.matieress }
</Button>
       )

       ) }
         </div>
         <br />
         <br />
         <br />
         <h2 style={{textAlign:'center'}}  > List Etudiants </h2>
         
         <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="List Etudiants"
           
          
            data={ mat }
            columns={[    "ID","Nom et prenom", "Lieu","date de naissance","Class"]}
            options={{
              filterType: "checkbox"
              ,
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

 
 
    
  
          {/* </Widget> */}
          </div>
          </div>
  );
}