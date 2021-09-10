import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';

import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";








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

export default function AddEvent() {
    const classes = useStyles();

    
     var [idevent, setidevent] = useState("");

    var [Nom, setNom] = useState("");
    var [Description, setDescription] = useState("");
    var [Create_At, setCreate_At] = useState("");
    
    




    function Addevent(Nom,Description,Create_At
 
        ){
 
          axios
              .post('http://www.pointofsaleseedigitalaency.xyz/public/api/events', 
              
              {
                  "Nom": Nom,
        
                  "Description": Description,
                  "Create_At": Create_At,              
                 
              })
              .then( 
  
                res => {
                    console.log(res.data)
                    
                  
                     setidevent(res.data.id)
                  
                  }
  
              )

        }





return(




<div>
<h1>Ajouter un nouveau Evenement</h1>
<br /> < br />
<div style={{display:'block',justifyContent:'center'}}>
<TextField
            id="outlined-basic"
            label="Nom"
            // onChange={}
            // value={}
            name="Nom"
            value={Nom}
             onChange={e => setNom(e.target.value)}
             variant="outlined"
            style={{ marginBottom: 35, width:'600px', marginLeft:250 }}
            helperText= "S'il vous plait entrer le nom "
            type={'textera'}
        />

        <br />

        <TextField
            id="outlined-basic"
            label="Description"
            // onChange={}
            // value={}
            name="Description"
          value={Description}
             onChange={e => setDescription(e.target.value)}
             variant="outlined"
            style={{ marginBottom: 35, width:'600px', marginLeft:250,  }}
            helperText= "S'il vous plait entrer la description "
            type={'textera'}
        />
        <br />
        <TextField
        style={{ marginLeft:250, width:'50%'}}
    id="date"
    label="date de naissance"
    type="date"
    defaultValue="2017-05-24"
    onChange={e => setCreate_At(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />

<br />
        <br />
<br />
    
                               
                                    <label
                                      className={classes.uploadLabel}
                                      style={{ cursor: 'pointer', marginLeft:250, border:'solid', width:'600px', color:'#0E0D47' }}
                                    >
                                      {'Upload an image'}
                                        <input style={{ display: 'none', justifyContent:'center' }} accept="image/*" type="file" />
                                        <img src="" />
                                    </label>
                                    <br /> <br />
                                    <div style={{display:'block', justifyContent:'center', marginLeft:250}}>
                                  <li> Professeur :  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} /> </li>        

                                  <li> Eleves :  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} /> </li>  

                                  <li> Parents :  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} /> </li>  





                                    </div>

                                    <br /> <br />
                                    <Button
              color="primary"
              variant="contained"
              className={classes.button}
              style={{backgroundColor: "#0E0D47", width:'100%'}}
              onClick={() => {
              
                {Addevent(Nom,Description,Create_At,)}
            }}
            >
              Ajouter votre Evenement
            </Button>

</div>
</div>
)
}



