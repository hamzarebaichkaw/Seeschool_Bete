import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
// components
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
// data
 
 
import mock from "../../dashboard/mock";
import axios from "axios";
export default function Emploi() {
  const classes = useStyles();
  const [emploie, setemploie] = useState([]);

  useEffect(function () {
    const d= sessionStorage.getItem('user_id')
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/EmploisByStudent/${d}`)
      .then(res => {
        setemploie(res.data )
        console.log(res.data )
      }, 2000)
  
      .catch(() => {
        console.log("ERROR")
      });
  }, []);
 
   
  return (
  <div>
    <h1>Emploie</h1>
    <div>
      {/* <p style={{textAlign:'center', fontSize: '150%'}}>Emploie du teamps
      <br />
        Semaine n°2 (20mars-27mars 2021)
      </p> */}
      <div> 
    {     

                emploie.map((m)=>(  

                  <div> 
                     <button   onClick={()=> window.open(m.photo , "_blank")} style={{ display:"flex",  color:'black',backgroundColor:'yellow', borderRadius:10,marginLeft:'75%',marginBottom:'-2.5%' }} >Telecharger</button>
                  <p style={{textAlign:'center', fontSize: '150%'}}> {m.emploie_name}   {m.date_create}  
                
                
                  </p>



                  {/* <ReactPDF
  file={{
    url:   m.photo 
  }}
/> */}
{/*     
    <ReactPDF
  file={{
    url:   m.photo 
  }}
/>   */}
 
  
                  </div> 


                



                )
                  
                )




   }



</div>

</div>
    </div>
  
  );
}