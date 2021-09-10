
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

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#dfe6e9',
  borderStyle: 'dashed',
  backgroundColor: '#3a86ff',
  color: '#dfe6e9',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#0E0D47',
  backgroundColor: '#dfe6e9',
  color: '#0E0D47'
};

const acceptStyle = {
  borderColor: '#0E0D47'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Basic() {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style })}>
        <input {...getInputProps()} />
        <Icons.CloudUpload style={{ width: 100, height: 100 }} />
        <p style={{ alignSelf: 'center', fontSize: 30 }}>Drag/Drop ou cliquer pour ajouter votre cours</p>
      </div>
      <br />
      <aside>
        <h4>Files</h4>
        <ul style={{ listStyle: 'none' }}>{files}</ul>
      </aside>
      <br />
      <br />
      <Button
              color="primary"
              variant="contained"
           width="100%"
              style={{backgroundColor: "#3a86ff", width:"100%"}}
            >
              envoyer
            </Button>

    </section>
  );
}




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


export default function CoursProfs(){
    const classes = useStyles();
    const [allProfs, setAllProfs] = useState([])
    const [allClasses, setAllClasses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
  
   function showw(){
    dispatch({ type: "OPEN_GRID" })
   }
    const [CoursM, seCoursM] = useState([]);
   
    useEffect(function () {
      
      const d= sessionStorage.getItem('user_id')
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
     const d= sessionStorage.getItem('user_id')
     
      axios
        // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
        .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Students`)
        .then(res => {
  
       setmat(res.data)
        // console.log( res.data)
        }, 2000)
    
        
    } 
  
  
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
      reg("bac")
      setAction3("3")
      setShow(true)
    };
  


return(
  <div>
  <div >
     <h1>Gestion des Cours </h1>
   
        </div>
   <div style={{backgroundColor:'',}}>
           <br />
           <div>
           <div style={{ marginTop: 50 }}>
          <center>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
              <Grid item md={4} xs={12} lg={4}>
                <p>Année: </p>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                  // value={action}
                  renderValue={() => { return action1 }}
                  onChange={handleChangeS}
                >
                  {year.map((y) =>
                    <MenuItem value={y.id} key={y.id}>
                      {y.year}
                    </MenuItem>
                  )}
                </Select>
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <p>Section: </p>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                  // value={action}
                  renderValue={() => { return action2 }}
                  onChange={handleChangeN}
                >
                  {section.map((s) =>
                    <MenuItem value={s.id} key={s.id}>
                      {s.section}
                    </MenuItem>
                  )}
                </Select>
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <p>Classe: </p>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
                  // value={action}
                  renderValue={() => { return action3 }}
                  onChange={handleChange}
                  // onClick={
                  //   () => {
                   
                  //    showw()
                  //   }}
                >
                  {numero.map((c) =>
                    <MenuItem value={c.id} key={c.id}>
                      {c.numero}
                    </MenuItem>
                  )}
                </Select>
              </Grid>
            </div>
          </center>
        </div>
            <br />
            <br /> 
            <br />
  
  <div>
    {show ?
                <Basic />
      :
      <center>
        <div style={{ marginTop: 50 }}>
          <h3>Ajouter votre cours</h3>
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
           <br /> <br /> <br />
           {/* <div style={{backgroundColor:'grey',height:'250px', display:'flex', justifyContent:'center'}}>
          
           <Button
    style={{backgroundColor: "#3a86ff",borderRadius:'20px', letterSpacing:5,height:'50px',marginTop:'90px'}}
    color="primary"
    variant="contained"
     
  >
  Telecharger
  </Button>
  
  
  
  
           </div> */}
  
  
           <div>
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
              <Basic />
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
           </div>
)

}