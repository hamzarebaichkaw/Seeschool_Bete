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
import { Button, Typography } from '../../../components/Wrappers'
// import Widget from '../../../components/Widget'
// import { actions } from '../../../context/ManagementContext'
// import {
//   useManagementDispatch,
// } from '../../../context/ManagementContext'
export default function AddMatiere(props){
    var [NomValue, setNomValue] = useState("");
    var [Descrption, setDescrption] = useState("");
    var [coefficient, setcoefficient] = useState("");
    var [clas, setclas] = useState("");
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
    function AddMat(NomValue,coefficient,Descrption,clas
       
       
      ){

      
      
  
        Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/matieres', {
                "classe": "/public/api/classes/".clas,
      
                "nom": NomValue,
                "description": Descrption,
                
                "coefficient":coefficient
            })
            .then( 

                console.log("yessssssssssssssssssss".clas)
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
                  <h1>Ajouter une matiére</h1>
        <>
        <TextField
            id="outlined-basic"
            label="Nom De Matiere"
            // onChange={}
            name="Nom"
            value={NomValue}
            onChange={e => setNomValue(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText="S'il vous plait entrer le nom matière"
        />
        <TextField
            id="outlined-basic"
            label="Description"
            // onChange={}
            // value={}
            name="Description"
            value={Descrption}
            onChange={e => setDescrption(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer le Description matière"
            type={'textera'}
        />
         <TextField
            id="outlined-basic"
            label="coefficient"
            // onChange={}
            // value={}
            name="coefficient"
            value={coefficient}
            onChange={e => setcoefficient(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer le Description matière"
            type={'textera'}
        />
        <FormControl
            variant="outlined"
            // onChange={}
            style={{ marginBottom: 35 }}
        >
           
            <Select
              
               
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
            </Select>
         
        </FormControl>
        <Button
                  color="primary"
                  variant="contained"
                  onClick={()=>{AddMat(NomValue,coefficient,Descrption,clas)}} 
                >
                  envoyer
                </Button>
    </>
    </Box>
                    </Grid>
     ) }