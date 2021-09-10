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
import FolderBlue from '../../profile/Icons/FolderBlue';
import IconButton from '@material-ui/core/IconButton';
import { CircularProgress } from "../../../components/Wrappers";

import FolderRed from '../../profile/Icons/FolderRed';
// const [mat, setmat] =  


 
 
export default function Cours() {
  const classes = useStyles();
  
  
  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontSize: '14px',
      fontWeight: theme.typography.fontWeightMedium,
      marginRight: theme.spacing(0),
      color: theme.palette.text.primary,
      fontFamily: [
        'Roboto',
        'sans-serif'
      ].join(','),
      '&:hover': {
        color: theme.palette.text.primary,
        opacity: 1,
      },
      '&$selected': {
        color: theme.palette.text.primary,
      },
      '&:focus': {
        color: theme.palette.text.primary,
      },
    },
    selected: {},
  }));
  
  const styles = (theme) => ({
    root: {
      flexGrow: 1,
      '& .react-swipeable-view-container': {
        transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
      },
      paddingBottom: 0,
    },
    codeComponent: {
      flexGrow: 1,
      borderRadius: '10px', 
      backgroundColor: 'red',  
      border: '3px solid black',
      // '&::-webkit-scrollbar': {
      //   width: '6px'
      // },
      '&:: -webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 7px rgba(0,0,0,.3)', 
        borderRadius: '10px', 
        backgroundColor: '#F5F5F5'
      },
      '&:: -webkit-scrollbar': {
        width: '5px', 
        backgroundColor: '#F5F5F5', 
        borderRadius: '10px'
      }, 
      '&:: -webkit-scrollbar-thumb': {
        width: '4px', 
        height: '5px',
        borderRadius: '10px', 
        '-webkit-box-shadow': 'inset 0 0 7px rgba(0,0,0,.3)', 
        backgroundColor: 'white'
      } 
    },
    padding: {
      padding: theme.spacing(3),
      paddingBottom: 0,
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    folderWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
    }
  })
  const [isLoading, setIsLoading] = useState(true);
  const [CoursM, seCoursM] = useState([]);
 
  useEffect(function () {
    
    const d= sessionStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/${d}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Matiere/1`)
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
   const d= sessionStorage.getItem('user_id')
   
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/1/${id}`)
      .then(res => {

     setmat(res.data)
      // console.log( res.data)
      }, 2000)
  
      
  } 



  const theme = useTheme();

  const [showTable, setShowTable] = useState(false);

  const [showMatiere, setShowMatiere] = useState(false);


  const [ShowexErcice, setShowexErcice] = useState(false);


  const Matiere = () =>
  <div style={{display:'flex',justifyContent:'center' }}  >
  {    
           

           CoursM.map(
           
             (m)=>( 
           
             
               theme.palette.type === "dark" ,
               <IconButton       onClick={()=>{{reg(m.id)};
               setShowTable(!showTable) 
               }}>    
               
               <FolderBlue  title="Matiere"label="" value=   {m.matieress }   />
               
               </IconButton>  
                 
                    
            
           
                  )
           
                  ) }  
        </div>

const Exercice = () =>
<div style={{display:'flex',justifyContent:'center' }} >
<FolderRed title="Design" label="Exercice" value={'Exercice'} />
<FolderRed title="Design" label="Exercice" value={'Exercice'} />
      </div>

  const Table = () =>
  <div  >
  <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Gestion des cours"
              data={ mat }
              columns={[    "Matiére",
              "Type","Fichier","Date",
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
        </div>
   

  return (
<div>
   <h1>Cours et exercices</h1>
   
 <div style={{backgroundColor:'',}}>
         <br />
         <div  >
           <div style={{display:'flex', justifyContent:'space-around'}} >
           <IconButton       onClick={()=>{
               setShowMatiere(!showMatiere) 
               setShowexErcice(null)
               }}>    
          < FolderBlue  title="Matiere"label="" value=   { 'Cours'}   />
          </IconButton>  

          <IconButton       onClick={()=>{
               setShowexErcice(!ShowexErcice) 
               setShowMatiere(null) 
               }}>    
          <FolderRed title="Design" label="files" value={'Exercice'} />
          </IconButton>  
           </div>
           <br />
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

       ) } */}{showMatiere ? <Matiere /> : null}
       {/* <Tabs  onClick={()=>{reg(m.id)}}   /> */}
       {ShowexErcice ? <Exercice /> : null}
         </div>
         <br />
         <br />
         <br />
         <h2 style={{textAlign:'center',backgroundColor:'#3a86ff',border:'solid', color:'white',borderRadius:20}}  >Check child Lessons</h2>
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
{showTable ? <Table /> : null}
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