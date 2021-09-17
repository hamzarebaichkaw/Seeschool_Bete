
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
import TextField from '@material-ui/core/TextField';
import MUIDataTable from "mui-datatables"


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
export default function NotesProfs(){
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = React.useState(true);
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

  const profTables = [
    ["1","Meral Elias", "15", "12", "-", "12", "-"],
    ["2","Deep Pau", "1", "14", "-", "12", "-"],
    ["3","Sebastiana Hani", "17", "16", "-", "12", "-"],
    ["4","Marciano Oihana", "9", "12", "-", "12", "-"],
    ["5","Brigid Ankur", "5.5", "3", "-", "12", "-"],
    ["6","Anna Siranush", "14", "6", "-", "12", "-"],
    ["7","Avram Sylva", "10", "11", "-", "12", "-"],
    ["8","Serafima Babatunde", "8", "2", "-", "12", "-"],
    ["9","Gaston Festus", "11", "7", "-", "12", "-"],
    ["10","Prabhakar Linwood", "9", "11", "-", "12", "-"],
    ["11","Kaui Ignace", "11", "15.5", "17", "-", "12", "-"],
    ["12","Esperanza Susanne", "9", "11", "-", "12", "-"],
    ["13","Christian Birgitte", "10", "5", "-"], "12", "-",
    ["14","Joe James", "5", "9", "-", "12", "-"],
    ["15","John Walsh", "14", "11", "-", "12", "-"],
   
  ];

  return(
      <div>
          <h1>Gestion des Notes</h1>
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
         <MUIDataTable
         title="Liste des classes"
         data={profTables}
         columns={[
           { name: "id", label: "ID" },
           { name: "sous_niveau", label: "Nom & Prenom" },
           { name: "Section", label: "Devoir de controle n°1" },
           { name: "Nom", label: "Devoir de controle n°2" },
           { name: "Nom", label: "Note d'oral" },
           { name: "Niveau", label: "Devoir de synthése" },
           { name: "Niveau", label: "Pratique" },
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
                         regs(tableMeta.rowData["0"])
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
       />
      :
      <center>
        <div style={{ marginTop: 50 }}>
          <h3>Ajouter vos notes</h3>
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
        <DialogTitle id="alert-dialog-title">{"Modifier Note: " + updateClass}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            component={"div"}
          >
<div style={{ display:'flex', justifyContent:'center'}}>
  Devoir de controle 1 :   <TextField id="outlined-basic" label="D.C n°1" variant="outlined" /> 
  Devoir de controle 2 :   <TextField id="outlined-basic" label="D.C n°2" variant="outlined" /> 
  Devoir de synthése :   <TextField id="outlined-basic" label="D.S" variant="outlined" /> 
  Note d'oral :   <TextField id="outlined-basic" label="Oral" variant="outlined" /> 
  Note pratique :   <TextField id="outlined-basic" label="Pratique" variant="outlined" /> 
</div>
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