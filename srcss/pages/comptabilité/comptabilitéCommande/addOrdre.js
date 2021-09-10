import React, {useEffect, useState} from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import { toast } from 'react-toastify'
import Axios from 'axios'
import config from '../../../config'
import uuid from 'uuid/v4'

import Notification from "../../../components/Notification";

import { Button, Typography } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'

import { actions } from '../../../context/ManagementContext'
import {
  useManagementDispatch,
} from '../../../context/ManagementContext'


function getSteps() {
    return [' ',  ]
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Create New Commande'
 
    }
}
 
     
 
const AddFournisseur = () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set())
    const [newUser, setNewUser] = React.useState({
      avatars: [],
      disabled: null,
      email: 'sssssqqsd',
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
      emailVerified: true,
      firstName: '',
      fullName: '',
      lastName: '',
      password: 'sss@sss',
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
      phoneNumber: '',
      role: 'user',
    });
  
    function handleChange(e) {
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
        
      })
   
    }
    const handleChangeProduit = e => {
        setProduit(e.target.value);
        console.log(Produit)
      };
    const fileInput = React.useRef(null);
    const steps = getSteps()
    const classes = useStyles()

    function extractExtensionFrom(filename) {
      if (!filename) {
        return null;
      }
    
      const regex = /(?:\.([^.]+))?$/;
      return regex.exec(filename)[1];
    }



    // upload File  API Consommation
    const uploadToServer = async (file, path, filename) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      const uri = `${config.baseURLApi}/file/upload/${path}`;
      await Axios.post(uri, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
  
      const privateUrl = `${path}/${filename}`;
  
      return `${config.baseURLApi}/file/download?privateUrl=${privateUrl}`;
    }

    const handleFile = async (event) => {
      const file = event.target.files[0];
  
      const extension = extractExtensionFrom(file.name);
      const id = uuid();
      const filename = `${id}.${extension}`;
      const privateUrl = `users/avatar/${filename}`;
  
      const publicUrl = await uploadToServer(
        file,
        'users/avatar',
        filename,
      );
      let avatarObj = {
        id: id,
        name: file.name,
        sizeInBytes: file.size,
        privateUrl,
        publicUrl,
        new: true      
      }

      setNewUser({
          ...newUser,
          avatars: [...newUser.avatars, avatarObj]
      })

      return ;
    }
    const isStepSkipped = step => {
        return skipped.has(step)
    }

    var managementDispatch = useManagementDispatch()
    const history = useHistory()
    const doSubmit = (id, data) => {
        actions.doCreate(data, history)(managementDispatch);
      
    };

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(newSkipped)

        if (activeStep === 3) {
          doSubmit(null, newUser, history)
          sendNotification()
        }
    }
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const deleteOneImage = (id) => {
      setNewUser({
        ...newUser,
        avatars: newUser.avatars.filter(avatar => avatar.id !== id)
      })
    }

    function sendNotification() {
      const componentProps = {
        type: "feedback",
        message: "User added!",
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

    var [imagestudent, setimagestudent] = useState("");
    




 
    var [idStudent, setidStudent] = useState("");
    const [Produit, setProduit] = useState("");
    const [fornisseur, setfornisseur] = useState([]);
    const [fornisseurss, setfornisseurss] = useState([]);
    const [Produitss, setProduitss] = useState("");
    useEffect(function () {
      const d= sessionStorage.getItem('user_id')
      Axios
        .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/produits`, {
            "headers" :
                            { 

                              "Accept":"application/json",
                            }
        })
        .then(res => {
            setProduitss(res.data)

        console.log(res.data)
        }, 2000)
        .catch(() => {
          console.log("ERROR")
        });
    }, []);

    useEffect(function () {
        const d= sessionStorage.getItem('user_id')
        Axios
          .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/fournisseurs`)
          .then(res => {
            setfornisseurss(res.data.result)
            // console.log(res.data.result)
          }, 2000)
          .catch(() => {
            console.log("ERROR")
          });
      }, []);

   
    var [idStudent, setidStudent] = useState("");




    function AddOrdre( Produit ){

     
     
   const   p="/public/api/produits/"+Produit
   console.log(p) 
        Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/orders', 
            
            {


              
                "Produit":  [ p ],
      
                "fornisseur": "/public/api/fournisseurs/1" ,
                "Quantite":"15"
               
            })
            .then( 

                res => {
                    console.log(res.data)
                    
                  
              
                  
                  }
  
              )
             
       




      }
      function addimg(imagestudent,idStudent
       
       
        ){

    //   e.preventDefault();
      const formData = new FormData();
      Array.from(imagestudent).forEach(image => {
        formData.append('files', image);
      });
      Axios
        .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });



 
              
            
         
  
  
  
  
        }

       

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            if (isStepSkipped(index)) {
                                stepProps.completed = false
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps} classes={{completed: classes.stepCompleted}}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
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
                            <Typography
                                variant={'h5'}
                                weight={'medium'}
                                style={{ marginBottom: 30 }}
                            >
                                {getStepContent(activeStep)}
                            </Typography>
                            
                           
                                <>
      

<FormControl
            variant="outlined"
            // onChange={}
            style={{ marginBottom: 35 }}
        >
           
         
                        <Select
                        labelId="demo-simple-select-label"
                        fullWidth
                        id="demo-simple-select"
                        style={{ alignSelf: 'flex-end'}}
                        value={{Produit} }
                        onChange={handleChangeProduit}
                        defaultValue={1}
                      >
                         {/* {
             Produitss.map( m => {
 
  
                                console.log(m.id)
 

}

)


                          }   */}
                         <MenuItem  value={1} key={1}>
                             test
                            </MenuItem>
                   
                            <MenuItem value={2} key={2}>
                             test 2
                            </MenuItem>
                      </Select>
                       
                         

           
          
        </FormControl>
<br /> 
        <TextField
    id="date"
    label="createdAt"
    type="date"
    defaultValue="2017-05-24"
    // onChange={e => setdate_naissance(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}/>
    <br /> <br />
    <TextField
    id="date"
    label="updateAt"
    type="date"
    defaultValue="2017-05-24"
    // onChange={e => setdate_naissance(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}/> <br /><br />
        
            
       
                                </>
                            
                            
                            
                               
                 
                            <div>
                                <div>
                                   
                                        <Box
                                            display={'flex'}
                                            justifyContent={'flex-end'}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{backgroundColor:'#ba181b'}}
                                                onClick={() => {
                                                  
                                                    {AddOrdre(Produit)}
                                                } }
                                            >
                                                Finish
                                            </Button>
                                          
        
                                        </Box>
                                  
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                        >
                                        
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

export default AddFournisseur




