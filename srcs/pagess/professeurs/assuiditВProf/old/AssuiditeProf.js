import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import React, { useState, useEffect, useMemo  } from "react"; 
import { Grid, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,  Select, MenuItem} from "@material-ui/core";
import axios from "axios";
import useStyles from "./styles";
import { useDropzone } from 'react-dropzone'
import * as Icons from "@material-ui/icons"

import MUIDataTable from "mui-datatables"
import Checkbox from '@material-ui/core/Checkbox';



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





export default function AssuiditeProf(){

  const [checked, setChecked] = React.useState(true);

  const handleChangess = (event) => {
    setChecked(event.target.checked);
  };
  const [isLoading, setIsLoading] = useState(true);
  
  // <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  const [allProfs, setAllProfs] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const classes = useStyles();
  const [selected, setSelected] = useState('')
  const [updateClass, setUpdateClass] = useState('')

  const [mats, setmats] = useState([]);

  const [state, dispatch] = React.useReducer(reducer, {
    toggleModal: false,
    toggleBody: false,
    toggleSmall: false,
    toggleGrid: false,
    toggleLarge: false,
    toggleInputModal: false
  });

 
  const [show, setShow] = useState(false)
  const [hover, setHover] = useState(false)
  const toggleHover = () => {
    setHover(!hover)
  }
  const [action1, setAction1] = useState("Choisissez Année...");
  const [action2, setAction2] = useState("Choisissez Section...");
  const [action3, setAction3] = useState("Choisissez Numéro...");

  const [year, setYear] = useState([
    { id: 1, year: "1ère Année" },
    { id: 2, year: "2ème Année" },
    { id: 3, year: "3ème Année" }
  ]);
  const [section, setSection] = useState([]);
  const [numero, setNumero] = useState([]);


  const handleChangeS = e => {
    setSection([
      { id: 1, section: "Science Informatique" },
      { id: 2, section: "Mathématique" },
      { id: 3, section: "Economie et Gestion" },
      { id: 4, section: "Lettre" },
      { id: 5, section: "Science Exprimentale" },
      { id: 6, section: "Technique" }
    ])
    setAction1("1ère Année")
  };

  const handleChangeN = e => {
    setNumero([
      { id: 1, numero: 1 },
      { id: 2, numero: 2 },
      { id: 3, numero: 3 }
    ])
    setAction2("Science Informatique")
  };
  const handleChange = e => {
   ("bac")
    setAction3("3")
    setShow(true)
  };
  function regs(id) {
    const d = localStorage.getItem('user_id')
    dispatch({ type: "OPEN_GRID" })
    axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/NbrAbsence/${id}`)
      .then(res => {
        setmats(res.data)
      }, 2000)  }
  // const handleChange = e => {
  //   reg("bac")
  //   setAction3("3")
  //   setShow(true)
  // };
  useEffect(function () {

    getClasses()
  }, [])

  const getClasses = async () => {
    const d = localStorage.getItem('user_id')

    setIsLoading(true)

    await axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/classes`)
      .then(res => {
        setAllClasses(res.data)
        console.log(res.data)
        // console.log(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
    setIsLoading(false)
  };


  const studentsList = [
    ["Meral Elias", ],
    ["Deep Pau",],
    ["Sebastiana Hani", ],
    ["Marciano Oihana",],
    ["Brigid Ankur", ],
    ["Anna Siranush",],
    ["Avram Sylva", ],
    ["Serafima Babatunde", "Example Inc.", "Tampa"],
    ["Gaston Festus", "Example Inc.", "Tampa"],
    ["Prabhakar Linwood", ],
    ["Kaui Ignace",, "NY"],
    ["Esperanza Susanne", ],
    ["Christian Birgitte", "Example Inc.", "Tampa"],
    ["Joe James",],
    ["John Walsh", ],
    ["Bob Herm", "Example Inc.", "Tampa"],
    ["James Houston", ],
  ];

  return(
      <div>
          <h1>Gestion des Assuidités</h1>
          <br />
          <div >
          <div style={{backgroundColor:'',}}>
           <br />
           <div>
           <div style={{ marginTop: 50 }}>
           <div style={{  display:'flex', justifyContent:'space-evenly' }}>
<Button onClick={()=>{
        handleChange()      
               }}  style={{color:'white',  backgroundColor:'#3a86ff', width:'190px', height:'100px' }}>
3 Math 2 
</Button>

<Button onClick={()=>{
        handleChange()      
               }}  style={{ color:'white', backgroundColor:'#3a86ff', width:'190px', height:'100px' }}>
2 Math 1
</Button>

<Button onClick={()=>{
        handleChange()      
               }}  style={{ color:'white', backgroundColor:'#3a86ff', width:'190px', height:'100px' }}>
4 Math 1
</Button>

<Button  onClick={()=>{
        handleChange()      
               }}      style={{ color:'white', backgroundColor:'#3a86ff', width:'190px', height:'100px' }}> 
2 Math 2
</Button>

</div>
        </div>
            <br />
            <br /> 
            <br />
  
  <div>
    {show ?
      //    <MUIDataTable
      //    title="Liste des classes"
      //    data={allClasses}
      //    columns={[
      //      { name: "id", label: "ID" },
      //      { name: "sous_niveau", label: "Niveau" },
      //      { name: "Section", label: "Section" },
      //      { name: "Nom", label: "Numéro" },
      //      { name: "Niveau", label: "Type" },
      //      {
      //        name: "Modifier",
      //        options: {
      //          customBodyRender: (value, tableMeta, updateValue) => {
      //            return (
      //              <Button
      //                variant={"contained"}
      //                className={classes.marginRight}
      //                onClick={
      //                  () => {
      //                    console.log(tableMeta.rowData)
      //                    setUpdateClass(tableMeta.rowData["1"] + ' ' + tableMeta.rowData["2"] + ' ' + tableMeta.rowData["3"])
      //                    regs(tableMeta.rowData["0"])
      //                  }
      //                }
      //              >
      //                <Icons.Update style={{ width: 30, height: 30 }} />
      //              </Button>
      //            )
      //          }
      //        }
      //      }]}
      //    options={{
      //      filterType: "checkbox"
      //    }}
      //  />
<span  >
<ul style={{border:'solid',color:'white',  backgroundColor:'#3a86ff'}} >
 <h3><li>Liste des Eleves : -3 Math 2 -</li> </h3> 
  <span style={{display:'flex', justifyContent:'space-evenly' }}>
  <li >eleve 12 :</li> 
  Present
  <Checkbox
  style={{color:'white'}}
  onChange={handleChangess}

        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> Absent
       <Checkbox
     style={{color:'white'}}
       onChange={handleChangess}

        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> </span>
   <span style={{display:'flex', justifyContent:'space-evenly' }}>
  <li >eleve 12 :</li> 
  Present
  <Checkbox
   style={{color:'white'}}
    onChange={handleChangess}
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> Absent
       <Checkbox 
       style={{color:'white'}}
         onChange={handleChangess}
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> </span>
        <span style={{display:'flex', justifyContent:'space-evenly' }}>
  <li >eleve 12 :</li> 
  Present
  <Checkbox
  style={{color:'white'}}
    onChange={handleChangess}
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> Absent
       <Checkbox 
       style={{color:'white'}}
         onChange={handleChangess}
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> </span>
        <span style={{display:'flex', justifyContent:'space-evenly' }}>
  <li >eleve 12 :</li> 
  Present
  <Checkbox
  style={{color:'white'}}
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> Absent
       <Checkbox 
       style={{color:'white'}}
         onChange={handleChangess}
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> </span>
</ul>
<div style={{display:'flex', justifyContent:'flex-end'}}>
  <Button style={{color:'white', backgroundColor:'#3a86ff', width:'120px', height:'50px' }}>
    Enregistrer
  </Button>
</div>
</span>
    
      :
      <center>
        <div style={{ marginTop: 50 }}>
          <h3>Ajouter les absences</h3>
        </div>
      </center>
    }
  </div>
           </div>
           {/* <MUIDataTable
                  title="Liste des classes"
                  data={CoursM}
                  columns={[
                    { name: "id", label: "ID" },
                    { name: "sous_niveau", label: "Niveau" },
                    { name: "Section", label: "Section" },
                    { name: "Nom", label: "Numéro" },
                    { name: "Niveau", label: "Type" },
                    {
                      name: "Modifier",
                      options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                          return (
                            <Button
                              variant={"contained"}
                              className={classes.marginRight}
                              onClick={
                                () => {
                                  console.log(tableMeta.rowData)
                                  setUpdateClass(tableMeta.rowData["1"] + ' ' + tableMeta.rowData["2"] + ' ' + tableMeta.rowData["3"])
                                 showw()
                                }
                              }
                            >
                              <Icons.Update style={{ width: 30, height: 30 }} />
                            </Button>
                          )
                        }
                      }
                    }]}
                  options={{
                    filterType: "checkbox"
                  }}
                /> */}
           {/* <div style={{display:'flex', justifyContent:'space-evenly', }}>
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
           </div> */}
           </div>
  
          </div>
          <br />
          <br />
          <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={state.toggleGrid}
        onClose={() => dispatch({ type: "CLOSE_GRID" })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modifier Emploi: " + updateClass}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
<h1>Ajouter les absences </h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            dispatch({ type: "CLOSE_GRID" })
          }}
            color="primary"
          >
            Enregistrer
          </Button>
          <Button
            onClick={() => dispatch({ type: "CLOSE_GRID" })}
            color="danger"
          >
            Fermer
          </Button>

        </DialogActions>
      </Dialog>
      </div>
  )
  
  }

//   <div style={{display:'flex',justifyContent:'space-around'}}>

//   <Button>

// </Button>
// <Button>
  
//   </Button>
//   <Button>
  
//   </Button>
//   <Button>
  
//   </Button>
//   </div>