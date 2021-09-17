import React, { useState, useEffect } from "react";
import { Button } from "../../../components/Wrappers/Wrappers";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid, Select, MenuItem, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import * as Icons from "@material-ui/icons";
import UpdateIcon from '@material-ui/icons/Update';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import useStyles from "./styles";


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
// const [mat, setmat] =  
export default function MatiereAdmin() {
  
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
  const [mat, setmat] = useState([]);
  function reg(id) {

    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/MatiereByClass/${id}`)
      .then(res => {
        setmat(res.data)
        console.log( res.data)
      }, 2000)
  }

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

  const [showText, setShowText] = useState(false);
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)


  const [action1, setAction1] = useState("Choisissez Année...");
  const [action2, setAction2] = useState("Choisissez Section...");
  const [action3, setAction3] = useState("Choisissez Numéro...");

  const [year, setYear] = useState([
    { id: 1, year: "1ère Année" },
    { id: 2, year: "2ème Année" },
    { id: 3, year: "3ème Année" }
  ]);

  

  const [numero, setNumero] = useState([]);

  function reg(nv) {
    const d = localStorage.getItem('user_id')
    axios
      // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesMAdmin/${nv}`)
      .then(res => {
        setmat(res.data)
      }, 2000)
  }

  // const onClick = () => setShowText(true);
  const [section, setSection] = useState([]);
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

  const toggleHover = () => {
    setHover(!hover)
  }
  
  const [types, setTypes] = useState([
    { id: 1, type: 'Primaire' },
    { id: 2, type: 'Collège' },
    { id: 3, type: 'Secondaire' }
  ])
  const [typess, setTypess] = useState([
    { id: 1, type: 'Classe' },
    { id: 2, type: 'Matiere' },
 
  ])
  const [niveau, setNiveau] = useState('')

  const [niveaux, setNiveaux] = useState([
    { id: 1, niveau: '1ère année', type: 'Primaire' },
    { id: 2, niveau: '2ème année', type: 'Primaire' },
    { id: 3, niveau: '3ème année', type: 'Primaire' },
    { id: 4, niveau: '4ème année', type: 'Primaire' },
    { id: 5, niveau: '5ème année', type: 'Primaire' },
    { id: 6, niveau: '6ème année', type: 'Primaire' },
    { id: 7, niveau: '7ème année', type: 'Collège' },
    { id: 8, niveau: '8ème année', type: 'Collège' },
    { id: 9, niveau: '9ème année', type: 'Collège' },
    { id: 10, niveau: '1ère année', type: 'Secondaire' },
    { id: 11, niveau: '2ème année', type: 'Secondaire' },
    { id: 12, niveau: '3ème année', type: 'Secondaire' },
    { id: 13, niveau: '4ème année', type: 'Secondaire' }
  ])
  const [numeros, setNumeros] = useState([])

  const getNumerosNiveau = async (niv) => {
    await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
      .then(res => {
        setNumeros(res.data)
      }, 2000)
      .catch((e) => {

      })
  }
  const profTables = [
    ["1","4°année  ", "1", "Math", "25", "14", ],
    ["2","4°année", "2", "Math", "25", "12", ],
    ["3","4°année", "1", "Eco", "25", "18", ],
    ["4","4°année ", "1", "Eco", "25", "18", ],
    ["5","4°année ", "2", "Eco", "25", "15", ],
    ["6","4°année", "1", "SVT", "25", "14", ],
    ["7","4°année", "2", "SVT", "25", "13", ],
    ["8","4°année", "1", "Info", "25", "20", ],
    ["9","4°année", "2", "Info", "25", "21", ],
    ["10","4°année", "1", "Lettre", "25", "15" ],
  ];


  const elevedata = [
    ["1","Ahmed Ben Ahmed", ],
    ["2","Khalil Ben Youssef",  ],
    ["3","Youssef Snoussi", ],
    ["4","Firas Ouertani", ],
    ["5","Hamza Nafti", "2", ],
    ["6","Yasmine Mabrouk",  ],
    ["7","Sarra Hannechi",  ],
    ["8","Leith El Bahri",  ],
    ["9","Mourad El Kefi",  ],
    ["10","Fatma Ben Abdallah",  ],
    ["11","Nermine Ben Aziza",  ],
    ["12","Mouna Hamrouni",  ],
    ["13","Louay Miled",  ],
    ["14","Souha Errais",  ],
  ];

  const [Numeroo, setNumeroo] = useState('')

  const [Numeroox, setNumeroox] = useState([
    { id: 1, numero: ' 1' },
    { id: 2, numero: ' 3' },
    { id: 3, numero: ' 4' },
  
  ])
  const [Classe, setClasse] = useState('')

  const [Classex, setClassex] = useState([
    { id: 1, classe: '4 Math ' },
    { id: 2, classe: '4 Math ' },
    { id: 3, classe: '4 Math ' },
  
  ])
  const [Sectionn, setSectionn] = useState('')

  const [Sectionx, setSectionx] = useState([
    { id: 1, section: 'Math' },
    { id: 2, section: 'Eco' },
    { id: 3, section: 'Info' },
    { id: 4, section: 'SVT' },
    { id: 5, section: 'Lettre' },
 
  
  ])

  const Table = () =>
  <div style={{display:'flex', justifyContent:'space-around'}} >
    {
            type === '' ?
              null :
              (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ fontSize: 20 }}>Niveau:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={niveau}
                      onChange={e => {
                        setNiveau(e.target.value)
                        if (type === "Primaire" || type === "Secondaire")
                          getNumerosNiveau(e.target.value)
                          handleChange()
                          setShowwwTable(!showwwTable)
                          setShowwText(null) 
                          setShowwTextclass(!showwTextclass)
                      }}
                    >  
                      {
                        niveaux.map((n) =>
                          n.type === type ?
                            <MenuItem value={n.id} key={n.id}>
                              {n.niveau}
                            </MenuItem> : null
                        )
                      }
                    </Select>
                  </div>

              
           
                </div>
              )
          }
            {
                    type === 'Primaire' || type === 'Collège' ?
                      null : (
                        <div>
                          <p style={{ fontSize: 20 }}>Section:</p>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: 250, height: 20, marginBottom: 80 }}
                            value={section}
                            onChange={e => {
                              setSection(e.target.value)
                              handleChangeS()
                            }}
                          >
                            {
                              section.map((s) =>
                                <MenuItem value={s.id} key={s.id}>
                                  {s.section}
                                </MenuItem>
                              )
                            }
                          </Select>
                        </div>
                      )
                  }

   </div>;

const Tableclass = () =>
<div  >
{/* <div  style={{display:'flex', justifyContent:'flex-start'}}>
  <Button  style={{ backgroundColor:'#0E0D47', color:'white'}}
   onClick={
                        () => {
                         
                       
                          setShowwwTable(!showwwTable)
                          setShowwText(null) 

                        }
                      } 
                     
                      > Retour</Button></div> <br /> */}
<MUIDataTable
          
          title="4 Math 2"
          data={elevedata}
          columns={[
            { name: "id", label: "ID" },
            { name: "Nom et Prenom", label: " Nom & Prenom" },
            {
              name: "Modifier Classe",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Button
                      variant={"contained"}
   
                      onClick={
                        () => {
                          console.log(tableMeta.rowData)
                       
                       popup()
                        }
                      }
                    >
                      <UpdateIcon style={{ width: 30, height: 30 }} />
                    </Button>
                  )
                }
              }
            }

          ]}
          options={{
            filterType: "checkbox"
          }}
        
        />

 </div>;


  const Text = () =>
  <div  >
      {/* <div  style={{display:'flex', justifyContent:'flex-start'}}>
  <Button  style={{ backgroundColor:'#0E0D47', color:'white'}}
   onClick={
                        () => {
                         
                       
                          setShowwwTable(!showwwTable)
                          setShowwText(null) 

                        }
                      } 
                     
                      > Retour</Button></div> <br /> */}

<div style={{textAlign:'center'}}>
<h3>Voulez-vous Filtrez par : </h3>
<br /><br /><br />
<div style={{display:'flex', justifyContent:'space-around',}}>



                <Button style={typees === type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => { 
                    setShowwwTable(!showwwTable)
                   
                  }}
                > Classe
                </Button>

                <Button style={typees === ("ok") ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => { 
                    }}
                > Matiére
                </Button>
       
          
</div>



</div>
   </div>;






const [showwTextclass, setShowwTextclass] = useState(false);
  const [showwText, setShowwText] = useState(false);
  const [showwwTable, setShowwwTable] = useState(false);
  const [type, setType] = useState('')
  const [typees, setTypees] = useState('')
  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des matiéres </h1>
      </div>
      <div style={{ backgroundColor: '', }}>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
          {
            CoursM.map(
              (m) => (
                <Button style={{ backgroundColor: "#0E0D47", }}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => { reg(m.id) }}
                >
                  {m.matieress}
                </Button>
              )
            )}
        </div>
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" href="http://localhost:3000/#/admin/Addmatiere" style={{ backgroundColor: '#9D0208', borderRadius: 50, letterSpacing: 4, }}>
            Ajouter une matiére <AddCircleIcon />
          </Button>
        </div>
        <br />
        <br />
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Listes des matières"
              data={mat}
              columns={[{name: "matiere", label: "Matière"}, {name: "N° Seances", label: "N° Séances"}, "Professeur", "Coefficient",]}
              options={{
                filterType: "checkbox"
              }}
            />
          </Grid>
        </Grid>
        {/* </Widget> 
      </div> */}

<div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Matiéres</h1>
        <Button  variant="contained" href="http://localhost:3000/#/admin/Addmatiere"
          style={hover ? {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#F6F7FF",
    
            alignSelf: 'center'
          } : {
            fontSize: 20,
            width: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 50,
            letterSpacing: 4,
            backgroundColor: "#0E0D47",
            color:'white',
            alignSelf: 'center'
          }}
          onMouseEnter={toggleHover} onMouseLeave={toggleHover}
        >
          Ajouter une Matiére
          <AddCircleIcon />
        </Button>
      </div>
      <div style={{ marginTop: 50 }}>
        {/* <center>
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
              >
                {numero.map((c) =>
                  <MenuItem value={c.id} key={c.id}>
                    {c.numero}
                  </MenuItem>
                )}
              </Select>
            </Grid>
          </div>
        </center> */}
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
            {
              types.map((t) =>
                <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
                  color="primary"
                  variant="contained"
                  onClick={() => { setType(t.type) 
                    setShowwText(!showwText)
                    }}
                    
                > {t.type}
                </Button>
              )
            }

          </div>
          {/* {
            type === '' ?
              null :
              (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ fontSize: 20 }}>Niveau:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={niveau}
                      onChange={e => {
                        setNiveau(e.target.value)
                        if (type === "Primaire" || type === "Secondaire")
                          getNumerosNiveau(e.target.value)
                          handleChange()
                          setShowwwTable(!showwwTable)
                          setShowwText(null) 
                      }}
                    >  
                      {
                        niveaux.map((n) =>
                          n.type === type ?
                            <MenuItem value={n.id} key={n.id}>
                              {n.niveau}
                            </MenuItem> : null
                        )
                      }
                    </Select>
                  </div>

              
           
                </div>
              )
          } */}

{showwText ? <Text /> : null}
<br /> <br />
{showwwTable ? <Table /> : null}
<br /> <br />

{showwTextclass ? <Tableclass /> : null}
      </div>

     

      <div>
      {/* {showwwTable ? <Table /> : null}
          {showwText ? <Text /> : null} */}
         
      </div>
      <div>
                 <Dialog
              fullWidth={true}
              maxWidth={"lg"}
              open={state.toggleGrid}
              onClose={() => dispatch({ type: "CLOSE_GRID" })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Modifier Classe 4 Math 2"}</DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  component={"div"}
                >
<div>
  <center>
    <h4>Effectuer à :</h4>
    <br /> <br />
    <div style={{display:'flex', justifyContent:'space-around'}}>

    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={Sectionn}
                      onChange={e => {
                        setSectionn(e.target.value)
                     
                       
                      }}
                    >  
                      {
                        Sectionx.map((n) =>
                        
                            <MenuItem value={n.id} key={n.id}>
                              {n.section}
                            </MenuItem> 
                        )
                      }
                      
                    </Select>
<Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={Classe}
                      onChange={e => {
                        setClasse(e.target.value)
                     
                       
                      }}
                    >  
                      {
                        Classex.map((n) =>
                          
                            <MenuItem value={n.id} key={n.id}>
                              {n.classe}
                            </MenuItem> 
                        )
                      }
                      
                    </Select>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: 250, height: 20, marginBottom: 80 }}
                      value={Numeroo}
                      onChange={e => {
                        setNumeroo(e.target.value)
                     
                       
                      }}
                    >  
                      {
                        Numeroox.map((n) =>
                          
                            <MenuItem value={n.id} key={n.id}>
                              {n.numero}
                            </MenuItem> 
                        )
                      }
                      
                    </Select>
                    </div>
                    </center>
</div>

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{backgroundColor:"#0E0D47", color :'white'}}
                  onClick={() => dispatch({ type: "CLOSE_GRID" })}
                  color="primary"
                >
                 Fermer
                </Button>
                <Button style={{backgroundColor:"#0E0D47", color:'white'}}
                  onClick={() => dispatch({ type: "CLOSE_GRID" })}
                  color="primary"
                >
                 Enregistrer
                </Button>
           
              </DialogActions>
            </Dialog>
                 </div>
    </div>








    </div>
  );
}



// import React, { useState } from "react";
// import { Button } from "../../../components/Wrappers/Wrappers";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { Grid, Select, MenuItem, Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle, } from "@material-ui/core";
// import axios from "axios";
// import MUIDataTable from "mui-datatables";
// import * as Icons from "@material-ui/icons";
// import UpdateIcon from '@material-ui/icons/Update';
// import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

// import useStyles from "./styles";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "OPEN_GRID":
//       return {
//         ...state,
//         toggleGrid: true
//       };
//     case "CLOSE_GRID":
//       return {
//         ...state,
//         toggleGrid: false
//       };
//     }
//   };


// export default function MatiereAdmin() {

// const classes = useStyles();

//   const [state, dispatch] = React.useReducer(reducer, {
//     toggleModal: false,
//     toggleBody: false,
//     toggleSmall: false,
//     toggleGrid: false,
//     toggleLarge: false,
//     toggleInputModal: false
//   });

//   async function  popup  ( id  ) {
//     dispatch({ type: "OPEN_GRID" })
  
//   }


//   const [showText, setShowText] = useState(false);
//   const [hover, setHover] = useState(false)
//   const [show, setShow] = useState(false)

//   const [mat, setmat] = useState([]);
//   const [action1, setAction1] = useState("Choisissez Année...");
//   const [action2, setAction2] = useState("Choisissez Section...");
//   const [action3, setAction3] = useState("Choisissez Numéro...");

//   const [year, setYear] = useState([
//     { id: 1, year: "1ère Année" },
//     { id: 2, year: "2ème Année" },
//     { id: 3, year: "3ème Année" }
//   ]);

//   const [section, setSection] = useState([]);

//   const [numero, setNumero] = useState([]);

//   function reg(nv) {
//     const d = localStorage.getItem('user_id')
//     axios
//       // .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProfileCoursByStudent/${d}/${id}`)
//       .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesMAdmin/${nv}`)
//       .then(res => {
//         setmat(res.data)
//       }, 2000)
//   }

//   // const onClick = () => setShowText(true);

//   const handleChangeS = e => {
//     setSection([
//       { id: 1, section: "Science Informatique" },
//       { id: 2, section: "Mathématique" },
//       { id: 3, section: "Economie et Gestion" },
//       { id: 4, section: "Lettre" },
//       { id: 5, section: "Science Exprimentale" },
//       { id: 6, section: "Technique" }
//     ])
//     setAction1("1ère Année")
//   };

//   const handleChangeN = e => {
//     setNumero([
//       { id: 1, numero: 1 },
//       { id: 2, numero: 2 },
//       { id: 3, numero: 3 }
//     ])
//     setAction2("Science Informatique")
//   };

//   const handleChange = e => {
//     reg("bac")
//     setAction3("3")
//     setShow(true)
//   };

//   const toggleHover = () => {
//     setHover(!hover)
//   }
  
//   const [types, setTypes] = useState([
//     { id: 1, type: 'Primaire' },
//     { id: 2, type: 'Collège' },
//     { id: 3, type: 'Secondaire' }
//   ])
//   const [niveau, setNiveau] = useState('')

//   const [niveaux, setNiveaux] = useState([
//     { id: 1, niveau: '1ère année', type: 'Primaire' },
//     { id: 2, niveau: '2ème année', type: 'Primaire' },
//     { id: 3, niveau: '3ème année', type: 'Primaire' },
//     { id: 4, niveau: '4ème année', type: 'Primaire' },
//     { id: 5, niveau: '5ème année', type: 'Primaire' },
//     { id: 6, niveau: '6ème année', type: 'Primaire' },
//     { id: 7, niveau: '7ème année', type: 'Collège' },
//     { id: 8, niveau: '8ème année', type: 'Collège' },
//     { id: 9, niveau: '9ème année', type: 'Collège' },
//     { id: 10, niveau: '1ère année', type: 'Secondaire' },
//     { id: 11, niveau: '2ème année', type: 'Secondaire' },
//     { id: 12, niveau: '3ème année', type: 'Secondaire' },
//     { id: 13, niveau: '4ème année', type: 'Secondaire' }
//   ])
//   const [numeros, setNumeros] = useState([])

//   const getNumerosNiveau = async (niv) => {
//     await axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/0`)
//       .then(res => {
//         setNumeros(res.data)
//       }, 2000)
//       .catch((e) => {

//       })
//   }
//   const profTables = [
//     ["1","4°année  ", "1", "Math", "25", "14", ],
//     ["2","4°année", "2", "Math", "25", "12", ],
//     ["3","4°année", "1", "Eco", "25", "18", ],
//     ["4","4°année ", "1", "Eco", "25", "18", ],
//     ["5","4°année ", "2", "Eco", "25", "15", ],
//     ["6","4°année", "1", "SVT", "25", "14", ],
//     ["7","4°année", "2", "SVT", "25", "13", ],
//     ["8","4°année", "1", "Info", "25", "20", ],
//     ["9","4°année", "2", "Info", "25", "21", ],
//     ["10","4°année", "1", "Lettre", "25", "15" ],
//   ];


//   const elevedata = [
//     ["1","Ahmed Ben Ahmed", ],
//     ["2","Khalil Ben Youssef",  ],
//     ["3","Youssef Snoussi", ],
//     ["4","Firas Ouertani", ],
//     ["5","Hamza Nafti", "2", ],
//     ["6","Yasmine Mabrouk",  ],
//     ["7","Sarra Hannechi",  ],
//     ["8","Leith El Bahri",  ],
//     ["9","Mourad El Kefi",  ],
//     ["10","Fatma Ben Abdallah",  ],
//     ["11","Nermine Ben Aziza",  ],
//     ["12","Mouna Hamrouni",  ],
//     ["13","Louay Miled",  ],
//     ["14","Souha Errais",  ],
//   ];

//   const [Numeroo, setNumeroo] = useState('')

//   const [Numeroox, setNumeroox] = useState([
//     { id: 1, numero: ' 1' },
//     { id: 2, numero: ' 3' },
//     { id: 3, numero: ' 4' },
  
//   ])
//   const [Classe, setClasse] = useState('')

//   const [Classex, setClassex] = useState([
//     { id: 1, classe: '4 Math ' },
//     { id: 2, classe: '4 Math ' },
//     { id: 3, classe: '4 Math 4' },
  
//   ])
//   const [Sectionn, setSectionn] = useState('')

//   const [Sectionx, setSectionx] = useState([
//     { id: 1, section: 'Math' },
//     { id: 2, section: 'Eco' },
//     { id: 3, section: 'Info' },
//     { id: 4, section: 'SVT' },
//     { id: 5, section: 'Lettre' },
 
  
//   ])

//   const Table = () =>
//   <div  >
//     {show ?
//           // <Grid container spacing={4}>
//           //   <Grid item xs={12}>
//           //     <MUIDataTable
//           //       title="Listes des Classes"
//           //       data={mat}
//           //       columns={["id", "Nom de class", "Capacité", "Nombre des éléves",]}
//           //       options={{
//           //         filterType: "checkbox"
//           //       }}
//           //     />
//           //   </Grid>
//           // </Grid>
//           <MUIDataTable
          
//           title="Liste des classes"
//           data={profTables}
//           columns={[
//             { name: "id", label: "ID" },
//             { name: "sous_niveau", label: " Classes" },
//             { name: "sous_niveau", label: "Numéro" },
//             { name: "Section", label: "Section" },
//             { name: "Nom", label: "Capacité" },
//             { name: "Nom", label: "Nombre des eléves" },

//             {
//               name: "Liste des Eléves",
//               options: {
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                   return (
//                     <Button
//                       variant={"contained"}
   
//                       onClick={
//                         () => {
//                           console.log(tableMeta.rowData)
                       
//                           setShowwText(!showwText)
//                           setShowwwTable(null) 
//                         }
//                       }
//                     >
//                       <SupervisedUserCircleIcon style={{ width: 30, height: 30 }} />
//                     </Button>
//                   )
//                 }
//               }
//             }]}
//           options={{
//             filterType: "checkbox"
//           }}
        
//         />
    
//           :
//           <center>
//             <div style={{ marginTop: 50 }}>
//               <h3>Choisissez une classe</h3>
//             </div>
//           </center>
//         }
//    </div>;




//   const Text = () =>
//   <div  >
//       <div  style={{display:'flex', justifyContent:'flex-start'}}>
//   <Button  style={{ backgroundColor:'#0E0D47', color:'white'}}
//    onClick={
//                         () => {
                         
                       
//                           setShowwwTable(!showwwTable)
//                           setShowwText(null) 

//                         }
//                       } 
                     
//                       > Retour</Button></div> <br />
//       <MUIDataTable
          
//           title="4 Math 2"
//           data={elevedata}
//           columns={[
//             { name: "id", label: "ID" },
//             { name: "Nom et Prenom", label: " Nom & Prenom" },
//             {
//               name: "Modifier Classe",
//               options: {
//                 customBodyRender: (value, tableMeta, updateValue) => {
//                   return (
//                     <Button
//                       variant={"contained"}
   
//                       onClick={
//                         () => {
//                           console.log(tableMeta.rowData)
                       
//                        popup()
//                         }
//                       }
//                     >
//                       <UpdateIcon style={{ width: 30, height: 30 }} />
//                     </Button>
//                   )
//                 }
//               }
//             }

//           ]}
//           options={{
//             filterType: "checkbox"
//           }}
        
//         />
      
//    </div>;







//   const [showwText, setShowwText] = useState(false);
//   const [showwwTable, setShowwwTable] = useState(false);
//   const [type, setType] = useState('')
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <h1>Gestion des Matiéres</h1>
//         <Button  variant="contained" href="http://localhost:3000/#/admin/addmatiere"
//           style={hover ? {
//             fontSize: 20,
//             width: 400,
//             alignItems: 'center',
//             justifyContent: 'space-evenly',
//             borderRadius: 50,
//             letterSpacing: 4,
//             backgroundColor: "#F6F7FF",
       
//             alignSelf: 'center'
//           } : {
//             fontSize: 20,
//             width: 400,
//             alignItems: 'center',
//             justifyContent: 'space-evenly',
//             borderRadius: 50,
//             letterSpacing: 4,
//             backgroundColor: "#0E0D47",
            
//             alignSelf: 'center'
//           }}
//           onMouseEnter={toggleHover} onMouseLeave={toggleHover}
//         >
//           Ajouter une Matiére
//           <AddCircleIcon />
//         </Button>
//       </div>
//       <div style={{ marginTop: 50 }}>
//         {/* <center>
//           <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
//             <Grid item md={4} xs={12} lg={4}>
//               <p>Année: </p>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
//                 // value={action}
//                 renderValue={() => { return action1 }}
//                 onChange={handleChangeS}
//               >
//                 {year.map((y) =>
//                   <MenuItem value={y.id} key={y.id}>
//                     {y.year}
//                   </MenuItem>
//                 )}
//               </Select>
//             </Grid>
//             <Grid item md={4} xs={12} lg={4}>
//               <p>Section: </p>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
//                 // value={action}
//                 renderValue={() => { return action2 }}
//                 onChange={handleChangeN}
//               >
//                 {section.map((s) =>
//                   <MenuItem value={s.id} key={s.id}>
//                     {s.section}
//                   </MenuItem>
//                 )}
//               </Select>
//             </Grid>
//             <Grid item md={4} xs={12} lg={4}>
//               <p>Classe: </p>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 style={{ alignSelf: 'flex-end', width: 200, height: 20 }}
//                 // value={action}
//                 renderValue={() => { return action3 }}
//                 onChange={handleChange}
//               >
//                 {numero.map((c) =>
//                   <MenuItem value={c.id} key={c.id}>
//                     {c.numero}
//                   </MenuItem>
//                 )}
//               </Select>
//             </Grid>
//           </div>
//         </center> */}
//     <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 100 }}>
//             {
//               types.map((t) =>
//                 <Button style={type === t.type ? { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '300px', padding: 50, fontSize: 30 } : { fontSize: 30, padding: 50, backgroundColor: "#0E0D47", width: '300px' }}
//                   color="primary"
//                   variant="contained"
//                   onClick={() => { setType(t.type) }}
//                 > {t.type}
//                 </Button>
//               )
//             }

//           </div>
//           {
//             type === '' ?
//               null :
//               (
//                 <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
//                   <div>
//                     <p style={{ fontSize: 20 }}>Niveau:</p>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       style={{ width: 250, height: 20, marginBottom: 80 }}
//                       value={niveau}
//                       onChange={e => {
//                         setNiveau(e.target.value)
//                         if (type === "Primaire" || type === "Secondaire")
//                           getNumerosNiveau(e.target.value)
//                           handleChange()
//                           setShowwwTable(!showwwTable)
//                           setShowwText(null) 
//                       }}
//                     >  
//                       {
//                         niveaux.map((n) =>
//                           n.type === type ?
//                             <MenuItem value={n.id} key={n.id}>
//                               {n.niveau}
//                             </MenuItem> : null
//                         )
//                       }
//                     </Select>
//                   </div>

              
           
//                 </div>
//               )
//           }
//       </div>

     

//       <div>
//       {showwwTable ? <Table /> : null}
//           {showwText ? <Text /> : null}
         
//       </div>
//       <div>
//                  <Dialog
//               fullWidth={true}
//               maxWidth={"lg"}
//               open={state.toggleGrid}
//               onClose={() => dispatch({ type: "CLOSE_GRID" })}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">{"Modifier Classe 4 Math 2"}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText
//                   id="alert-dialog-description"
//                   component={"div"}
//                 >
// <div>
//   <center>
//     <h4>Effectuer à :</h4>
//     <br /> <br />
//     <div style={{display:'flex', justifyContent:'space-around'}}>

//     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       style={{ width: 250, height: 20, marginBottom: 80 }}
//                       value={Sectionn}
//                       onChange={e => {
//                         setSectionn(e.target.value)
                     
                       
//                       }}
//                     >  
//                       {
//                         Sectionx.map((n) =>
                        
//                             <MenuItem value={n.id} key={n.id}>
//                               {n.section}
//                             </MenuItem> 
//                         )
//                       }
                      
//                     </Select>
// <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       style={{ width: 250, height: 20, marginBottom: 80 }}
//                       value={Classe}
//                       onChange={e => {
//                         setClasse(e.target.value)
                     
                       
//                       }}
//                     >  
//                       {
//                         Classex.map((n) =>
                          
//                             <MenuItem value={n.id} key={n.id}>
//                               {n.classe}
//                             </MenuItem> 
//                         )
//                       }
                      
//                     </Select>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       style={{ width: 250, height: 20, marginBottom: 80 }}
//                       value={Numeroo}
//                       onChange={e => {
//                         setNumeroo(e.target.value)
                     
                       
//                       }}
//                     >  
//                       {
//                         Numeroox.map((n) =>
                          
//                             <MenuItem value={n.id} key={n.id}>
//                               {n.numero}
//                             </MenuItem> 
//                         )
//                       }
                      
//                     </Select>
//                     </div>
//                     </center>
// </div>

//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button style={{backgroundColor:"#0E0D47", color :'white'}}
//                   onClick={() => dispatch({ type: "CLOSE_GRID" })}
//                   color="primary"
//                 >
//                  Fermer
//                 </Button>
//                 <Button style={{backgroundColor:"#0E0D47", color:'white'}}
//                   onClick={() => dispatch({ type: "CLOSE_GRID" })}
//                   color="primary"
//                 >
//                  Enregistrer
//                 </Button>
           
//               </DialogActions>
//             </Dialog>
//                  </div>
//     </div>
//   );
// }













