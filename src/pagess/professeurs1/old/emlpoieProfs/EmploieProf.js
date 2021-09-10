
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import React, { useState, useEffect } from "react"; 
import { Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell, } from "@material-ui/core";
import axios from "axios";
import useStyles from "./styles";

export default function EmploieProf(){

  const classes = useStyles();
 

  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
    
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
      .then(res => {
        seCoursM(res.data.result)
        // console.log(res.data.result)
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
  const [mat, setmat] =useState([]);
  function  reg  ( id ) {
    console.log( id)
   const d = localStorage.getItem('user_id')
   
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Students`)
      .then(res => {

     setmat(res.data)
      // console.log( res.data)
      }, 2000)
  
      
  } 



 




  return (
    <div>
<div >
   <h1>Gestion des emplois </h1>
 
      </div>
 <div style={{backgroundColor:'',}}>
         <br />
         <div style={{display:'flex', justifyContent:'space-evenly', }}>
           {

CoursM.map(

  (m)=>( 

      
  <Button
  style={{backgroundColor: "#3a86ff",borderRadius:'20px', letterSpacing:5,}}
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
         </div>
         <br /> <br /> <br />
         <div style={{backgroundColor:'grey',height:'250px', display:'flex', justifyContent:'center'}}>
        
         <Button
  style={{backgroundColor: "#3a86ff",borderRadius:'20px', letterSpacing:5,height:'50px',marginTop:'90px'}}
  color="primary"
  variant="contained"
   
>
Télécharger
</Button>

         </div>
         </div>
)

}