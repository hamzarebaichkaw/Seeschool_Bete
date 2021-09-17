import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box'

import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import Widget from '../../../components/Widget'








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

export default function EventAddAdmin() {
    const classes = useStyles();

    
     var [idevent, setidevent] = useState("");

    var [Nom, setNom] = useState("");
    var [Description, setDescription] = useState("");
    var [Create_At, setCreate_At] = useState("");
    var [lieu,setLieu] = useState("")
    
    




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
        const [baseImage, setBaseImage] = useState("");
        const uploadImage = async (e) => {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            setBaseImage(base64);
        };
        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
         });
    };




return(




<Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget>
                    <h1>Ajouté un Événement</h1>
                </Widget>
            </Grid>
            <Grid item xs={12}>
                <Widget>
                    <Grid item justify={'center'} container>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={600}
                        >
                         
                            
                            <div>
                                <div>
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
                                          style={{ marginBottom: 35, width:'600px' }}
                                          
                                          type={'textera'}
                                      />
                                      <br/>
                                      <TextField
                                          id="outlined-basic"
                                          label="Lieu"
                                          // onChange={}
                                          // value={}
                                          name="Lieu"
                                          value={lieu}
                                          onChange={e => setLieu(e.target.value)}
                                          variant="outlined"
                                          style={{ marginBottom: 35, width:'600px' }}
                                          
                                          type={'textera'}
                                      />
                                      
                                      <br/>
                                      <TextField
                                          id="outlined-basic"
                                          label="Description"
                                          // onChange={}
                                          // value={}
                                          name="Description"
                                          value={Description}
                                          onChange={e => setDescription(e.target.value)}
                                          variant="outlined"
                                          style={{ marginBottom: 35, width:'600px' }}
                                          
                                          type={'textera'}
                                      />
                                      <br/>
                                      
                                      <TextField
                                      style={{  width:600}}
                                  id="date"
                                  label="date de naissance"
                                  type="date"
                                  defaultValue="AAAA-MM-JJ"
                                  onChange={e => setCreate_At(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <br/>
                                <Typography weight={'medium'} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {baseImage != "" ? <p style={{ marginTop: 15 }}>Photo:</p> : null}
           <div style={baseImage != "" ? { marginTop: 15 } : null}>
          {
              baseImage != "" ?
              <img src={baseImage} style={{ width: 600, height: 400,  alignSelf: 'center',  }} />
              :
              null
           }
           </div>
</Typography>
<label className={classes.uploadLabel} style={{cursor: 'pointer', marginBottom: 20, marginTop: 20, alignItems: 'center', color: 'royalblue',}}>
     {'Choisir une image'}
     <input style={{ display: 'none' }} type="file" accept={"image/*"} onChange={e => { uploadImage(e) }} />
</label>
<br/>
<div style={{display:'block', justifyContent:'center',marginLeft:175 }}>
<li style={{listStyleType:"none", wordSpacing:22.5 }} > Parent&nbsp;  <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/> Élevé        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />  </li>        
<li style={{listStyleType:"none",wordSpacing:20 }} > Professeur  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}/> Admin  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />  </li> 





                                    </div>
                                </div>
                                    <br/>




                                  
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                            height={150}
                                        >

                                            <Button
                                                style = {{height:35, width:600 }}
                                                variant="contained"
                                                color="primary"
                                         
                                            >
                                                Ajouter
                                            </Button>
                                        </Box>
                                    
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Widget>
            </Grid>
        </Grid>
)
}


