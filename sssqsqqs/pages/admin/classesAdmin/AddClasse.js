import React, { useState, useEffect } from 'react'
// import Stepper from '@material-ui/core/Stepper'
// import Step from '@material-ui/core/Step'
// import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useHistory } from 'react-router-dom'
// import useStyles from './styles'
// import { toast } from 'react-toastify'
import Axios from 'axios'
// import config from '../../../config'
// import uuid from 'uuid/v4'
// import Notification from "../../../components/Notification";
import { Button, Typography } from '../../../components/Wrappers/Wrappers'
// import Widget from '../../../components/Widget'
// import { actions } from '../../../context/ManagementContext'
// import {
//   useManagementDispatch,
// } from '../../../context/ManagementContext'
export default function AddClasse(props){
    var [Section, setSection] = useState("");
    var [Nom, setNom] = useState("");
    var [Niveau, setNiveau] = useState("");
    var [sous_niveau, setsous_niveau] = useState("");
    var [Capcite, setCapcite] = useState("");
    const [CoursM, seCoursM] = useState([]);
    useEffect(function () {
      const d= sessionStorage.getItem('user_id')
      Axios
        .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
        .then(res => {
          seCoursM(res.data.result)
          // console.log(res.data.result)
        }, 2000)
        .catch(() => {
          console.log("ERROR")
        });
    }, []);
    function Addclass(Section,Nom,Niveau,sous_niveau,Capcite
       
       
      ){

     
      
  
        Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/classes', 
            
            {
                "Section": "Section",
      
                "Nom": Nom,
                "Niveau": Niveau,              
                "sous_niveau":sous_niveau,
                "Capcite":Capcite
            })
            .then( 

                console.log("yessssssssssssssssssss")
            )
             
       




      }





    return(
        <Grid item justify={'center'} container>
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={600}
        >
            <Typography
                variant={'h5'}
                weight={'medium'}
                style={{ marginBottom: 30 }}
            >
                  </Typography>
                  <h1>Ajouter une Classe</h1>
        <>
        <TextField
            id="outlined-basic"
            label="Section"
            // onChange={}
            name="Section"
            value={Section}
            onChange={e => setSection(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText="S'il vous ajouter votre section"
        />
        <TextField
            id="outlined-basic"
            label="Nom"
            // onChange={}
            // value={}
            name="Nom"
            value={Nom}
            onChange={e => setNom(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer le nom "
            type={'textera'}
        />
         <TextField
            id="outlined-basic"
            label="Niveau"
            // onChange={}
            // value={}
            name="Niveau"
            value={Niveau}
            onChange={e => setNiveau(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer le niveau "
            type={'textera'}
        />
             <TextField
            id="outlined-basic"
            label="sous_niveau"
            // onChange={}
            // value={}
            name="sous_niveau"
            value={sous_niveau}
            onChange={e => setsous_niveau(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer le sous_niveau "
            type={'textera'}
        />
          <TextField
            id="outlined-basic"
            label="Capcite"
            // onChange={}
            // value={}
            name="Capcite"
            value={Capcite}
            onChange={e => setCapcite(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer la Capcite "
            type={'textera'}
        />
        <FormControl
            variant="outlined"
            // onChange={}
            style={{ marginBottom: 35 }}
        >
           
            {/* <Select
              
               
                name="Class"
                onChange={e => setclas(e.target.value)}
                label="Class"
            >
            
             {   CoursM.map(
  (m)=>( 
 

<MenuItem value={m.id}
key={m.id}
 
>{m.matieress }</MenuItem>
       )
       )}
            </Select> */}
         
        </FormControl>
        <Button
                  color="primary"
                  variant="contained"
                  onClick={()=>{Addclass(Section,Nom,Niveau,sous_niveau,Capcite)}} 
                >
                  envoyer
                </Button>
    </>
    </Box>
                    </Grid>
     ) }