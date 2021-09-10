import React, { useState, useEffect } from "react"; 
import { Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell, } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles";
import { withStyles, useTheme } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
// components
import Widget from "../../../components/Widget";
// import Table from "../../dashboard/components/Table/Table";
// data
import mock from "../../dashboard/mock";
import { Link,Button, Avatar } from "../../../components/Wrappers";
import Tabs from '../../profile/Components/Tabs';
import axios from "axios";


import { CircularProgress } from "../../../components/Wrappers";

   
// const [mat, setmat] =  


 
 
export default function Cours() {
  const classes = useStyles();
 
  const [isLoading, setIsLoading] = useState(true);
  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
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
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/1/${id}`)
      .then(res => {

     setmat(res.data)
      // console.log( res.data)
      }, 2000)
  
      
  } 



 




  return (
<div>
   <h1>Cours et exercices</h1>
   
 <div style={{backgroundColor:'',}}>
         <br />
         <div  >
           {/* {

CoursM.map(

  (m)=>( 

       <button
         onClick={()=>{reg(m.id)}}  
        >
          
            <FolderIcon  style={{width:'100px', height:'100px'}}  />
         {m.matieress }
         
         </button> 

       )

       ) } */}
       <Tabs />
         </div>
         <br />
         <br />
         <br />
         <h2 style={{textAlign:'center'}}  > Lessons</h2>
         {/* <Widget
            title="LESSONS"
            noBodyPadding
            bodyClass={classes.tableWrapper}
          > */}
         


 


{/* {
mat.map((item) => (
 <div>   
  <p>
    {item.Matiere}
  </p>
   <p>
   {item.Fichier}
   </p>
   </div>
)) 

} */}
<br />
<br />

<Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Gestion des cours"
            data={ CoursM }
            columns={[    "Matiére",
            "Type","Fichier","Date",
          ]}
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
 
       {/* <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell > Matiere</TableCell>

        <TableCell > Type</TableCell>
       
        <TableCell > Fichier</TableCell>
        <TableCell > date</TableCell>
        <TableCell >  </TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {
        // mat ? (
        //   <TableRow  > <TableCell><CircularProgress /></TableCell> </TableRow>
        //   ) : (
         
        mat.map(
            ({ Matiere, type, TypeF, date_fin, Fichier  }) => (
              <TableRow  >
                 
                <TableCell>{Matiere}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{TypeF}</TableCell>
                
               <TableCell>
        {date_fin}  </TableCell> 
                <TableCell>
                
               
                <Button
                  
                    size="small"
                    className="px-2"
                    variant="contained"
                    onClick={()=> window.open(Fichier, "_blank")}
                  >
                  Télecharger 
                  </Button>
                
                 
                </TableCell>
        
              </TableRow>
            )
        )
             
          // )
        
        } 
      </TableBody>
    </Table> */}
  
          {/* </Widget> */}
          </div>
          </div>
  );
}