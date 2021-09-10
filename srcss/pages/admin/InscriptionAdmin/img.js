

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
    return ['Create Account', 'User Details', ]
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Create New Account'
        case 1:
            return 'Create User Details'
        // case 2:
        //     return 'Business Details'
        // case 3:
        //     return 'Social'
        // default:
        //     return ''
    }
}
//try {
    //     dispatch({
    //       type: 'USERS_FORM_CREATE_STARTED',
    //     });
    //     axios.post('/api/users', 
     
    //    {  body: JSON.stringify(  {
    //         "fullName": "dsqsdd",
    //     "username": "  sdqsddda" ,
    //     "email": "dddsqsq@example.com",
    //     "password": "ddsqsd",
    //     "roles": [
    //       "Student"
    //     ],
    //     "Genre": "dd",
    //     "Nationalite": "tessss",
    //     "phone": "tessss" 
    //    })
    //   }
        
    //     ,
        
    //  {
    
    // "headers" :{ 
    // 'Accept': 'application/json', 
    // "Content-Type":"application/json"
    
    // }
    
    //  }   
        
    //     ).then(res => {
    //       dispatch({
    //         type: 'USERS_FORM_CREATE_SUCCESS',
    //       });
    //       history.push('/admin/Inscription');
    //     })
    //   } catch (error) {
    //     toast("Error");
    //     console.log(error)
    //     dispatch({
    //       type: 'USERS_FORM_CREATE_ERROR',
    //     });
    //   }
const Imggg = () => {
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
      });
    }
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

   
    



    var [fullName, setfullName] = useState("");
    var [username, setusername] = useState("");
    var [email, setemail] = useState("");
    var [password, setpassword] = useState("");
    var [Genre, setGenre] = useState("");
    var [date_naissance, setdate_naissance] = useState("");
    var [Nationalite, setNationalite] = useState("");
    var [idStudent, setidStudent] = useState("");
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



    var [imagestudent, setimagestudent] = useState("");

      function addimg(imagestudent,
       
       
        ){
  
          const formData = new FormData();
               formData.append("file", imagestudent[0] );
          
            
          Axios
              .post('http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects', 
              
           formData 
              ,
                {
                    "headers" :
                                    { 

                                      "Content-Type":"multipart/form-data",
                                    }
                }
              
              )

              .then( 
  
                res => {
                    console.log(res.data)
                    
                  
                   
                  
                  }
  
              )
               
         
  
  
  
  
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
                            <h1>Ajouter un utilisateur</h1>
                            {activeStep === 0 ? (
                                <>
                                    <Typography weight={'medium'}>
                                        Photo:
                                    </Typography>
                                    <div class={classes.galleryWrap}>
                                    {newUser && newUser.avatars && newUser.avatars.length !== 0 ? (
                                      newUser.avatars.map((avatar, idx) => (
                                        <div className={classes.imgWrap}>
                                          <span className={classes.deleteImageX} onClick={() => deleteOneImage(avatar.id)}>×</span>
                                          <img
                                              src={avatar.publicUrl}
                                              alt="avatar"
                                              height={'100%'}
                                          />                                          
                                        </div>
                                      ))
                                    ): null}
                                    </div>
                                    <label
                                      className={classes.uploadLabel}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {'Upload an image'}
                                        <input style={{ display: 'none' }} accept="image/*" type="file" ref={fileInput}   
            onChange={e => setimagestudent(e.target.files)} />
                                    </label>
                                    <Typography
                                        size={'sm'}
                                        style={{ marginBottom: 35 }}
                                    >
                                       
                                    </Typography>
                                </>
                            ) : activeStep === 1 ? (
                                <>
                                  
                                  
                                </>
                            ) : activeStep === 2 ? (
                                <>
                         
                                 
                                 
                                </>
                            ) : (
                                <>
                                
                                </>
                            )}
                            <div>
                                <div>
                                    {activeStep === 0 ? (
                                        <Box
                                            display={'flex'}
                                            justifyContent={'flex-end'}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    handleNext();
                                                    {addimg(imagestudent)}
                                                }}
                                            >
                                                Next
                                            </Button>
                                          
        
                                        </Box>
                                    ) : (
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                        >
                                            <Button
                                                onClick={handleBack}
                                                variant={'outlined'}
                                                color={'primary'}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    handleNext();
                                                    {addimg(imagestudent,idStudent)}
                                                }}
                                            >
                                                {activeStep === steps.length - 1
                                                    ? 'Finish'
                                                    : 'Next'}
                                            </Button>
                                        </Box>
                                    )}
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Widget>
            </Grid>
        </Grid>
    )
}

export default Imggg
