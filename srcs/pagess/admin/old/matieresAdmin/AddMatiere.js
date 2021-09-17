import React, { useState, useEffect } from 'react'
// import Stepper from '@material-ui/core/Stepper'
// import Step from '@material-ui/core/Step'
// import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import Notification from "../../../components/Notification";
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
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  const classes = useStyles();
    var [NomValue, setNomValue] = useState("");
    var [Descrption, setDescrption] = useState("");
    var [coefficient, setcoefficient] = useState("");
    var [clas, setclas] = useState("");
    const [CoursM, seCoursM] = useState([]);
    const [redirection, setRedirection] = useState(false)
    
    useEffect(function () {
      const d = localStorage.getItem('user_id')
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
      const [displaynom,setDisplaynom] = useState("none")
      const [displaydisc,setDisplaydisc] = useState("none")
      const [displaylieu,setDisplaylieu] = useState("none")
      const [displaydate,setDisplaydate] = useState("none")
      function verif(nom,lieu,disc,date) {
        var test =true;
        if (nom==="") {
            test=false
            setDisplaynom("block")
        } else {setDisplaynom("none")}
        if (disc==="") {
            test=false
            setDisplaydisc("block")
        } else {setDisplaydisc("none")}
        if (lieu==="") {
            test=false
            setDisplaylieu("block")

        } else {setDisplaylieu("none")}
        if (date==="") {
            test=false
            setDisplaydate("block")
        } else {setDisplaydate("none")}
   
        return(test)
      }
      if (redirection) {
        //Affichage de la redirection
                return <Redirect to='/admin/matieres' />;
            }
            function sendNotification() {
                const componentProps = {
                  type: "feedback",
                  message: "Matiéres Ajouter avec success",
                  variant: "contained",
                  color: "success"
                };
                const options = {
                  type: "info",
                  position: toast.POSITION.TOP_RIGHT,
                  progressClassName: classes.progress,
                  className: classes.notification,
                  timeOut: 1000
                };
                return toast(
                  <Notification
                    {...componentProps}
                    className={classes.notificationComponent}
                  />,
                  options
                );
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
        <p style={{color:"red",fontSize:12,display:displaynom}} >NAME IS NEEDED</p>
        <TextField
            id="outlined-basic"
            label="Nom De Matiere"
            // onChange={}
            name="Nom"
            value={NomValue}
            onChange={e => setNomValue(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText="S'il vous plaît entrer le nom matière"
        />
         <p style={{color:"red",fontSize:12,display:displaydisc}} >NAME IS NEEDED</p>
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
            helperText= "S'il vous plaît entrer le Description matière"
            type={'textera'}
        />
         <p style={{color:"red",fontSize:12,display:displaylieu}} >NAME IS NEEDED</p>
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
            helperText= "S'il vous plaît entrer le Description matière"
            type={'textera'}
        />
         <p style={{color:"red",fontSize:12,display:displaydate}} >NAME IS NEEDED</p>
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
                  onClick={()=>{
                    if(verif(NomValue,coefficient,Descrption,clas))
                    {
                      sendNotification();
                      setRedirection(true)
                      console.log("hello")
                    AddMat(NomValue,coefficient,Descrption,clas)
                  }
                  }} 
                >
                  envoyer
                </Button>
    </>
    </Box>
                    </Grid>
     ) }