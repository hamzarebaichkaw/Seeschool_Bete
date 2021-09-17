//AddProfs
import makeAnimated from 'react-select/animated';
import React, {useState,useEffect} from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select1 from 'react-select';
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Redirect, useHistory } from 'react-router-dom'
import useStyles from './styles'
import { toast } from 'react-toastify'
import Axios from 'axios'
import config from '../../../config'
import uuid from 'uuid/v4'
import {Select} from "@material-ui/core";
import {Multiselect} from 'multiselect-react-dropdown';

import Notification from "../../../components/Notification";

import { Button, Typography } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'

import { actions } from '../../../context/ManagementContext'
import {
  useManagementDispatch,
} from '../../../context/ManagementContext'
import { SelectAll } from '@material-ui/icons';



function getSteps() {
    return ['Information de Professeur', 'Niveau', ]
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Créer un nouveau compte '
        case 1:
            return 'Ajouter des détails de l\'utilisateur'
       
      
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
    const animatedComponents = makeAnimated();
    
const AddProfs = () => {
    const [selected, setSelected] = useState([]);
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
    const [sections, setSections] = useState([
        { id: 1, section: 'Science Informatique' },
        { id: 2, section: 'Science Exprimentale' },
        { id: 3, section: 'Economie et Gestion' },
        { id: 4, section: 'Lettre' },
        { id: 5, section: 'Sport' },
        { id: 6, section: 'Technique' }
      ])
      const test = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ]
      const data=[
        { id: 1, niveau: '1ère année', type: 'Primaire' },
        { id: 2, niveau: '2ème année', type: 'Primaire' },
        { id: 3, niveau: '3ème année', type: 'Primaire' },
        { id: 4, niveau: '4ème année', type: 'Primaire' },
        { id: 5, niveau: '5ème année', type: 'Primaire' },
        { id: 6, niveau: '6ème année', type: 'Primaire' },
        { id: 7, niveau: '7ème année', type: 'Collège' },
        { id: 8, niveau: '8ème année', type: 'Collège' },
        { id: 9, niveau: '9ème année', type: 'Collège' },
        { id: 10, niveau: '1ère année secondaire ', type: 'Secondaire' },
        { id: 11, niveau: '2ème année secondaire', type: 'Secondaire' },
        { id: 12, niveau: '3ème année secondaire', type: 'Secondaire' },
        { id: 13, niveau: '4ème année secondaire', type: 'Secondaire' }
      ]
      const [otpdata]=useState([
          {type: 'Primaire'},
          {type: 'Collège' },
          {type: 'Secondaire' }

      ])
    
        const [options] = useState(data)
        const data2=[
            { id: 1, niveau: 'Math', },
            { id: 2, niveau: 'Info', },
            { id: 3, niveau: 'Physique', },
            { id: 4, niveau: 'anglais', },
            { id: 5, niveau: 'arabe', },
          
          ]
            const [options2] = useState(data2)
      const [section, setSection] = useState('0')
      const [type,setType] = useState()

    
    
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
        message: "Professeur ajouter avec succès ",
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
    var [idProf, setidProf] = useState("");

    var [phone, setphone] = useState("");
    var [niveau, setniveau] = useState("");
    var [sous_niveau, setsous_niveau] = useState("");
    var [description, setdescription] = useState("");
    const [nvi,setNiv] = useState([])
    const  onSelect= (da) => {
        var t = []
        data.map(d=>{
            
            da.map(e=>{
                
                if ( d.type === e.type)
                {t.push(d)
                    console.log("added")
                }
            }
               
                )
            setNiv(t)
        })
        
    }
   




    function ADDPROF(fullName,username,email,Genre,date_naissance,Nationalite
 
        ){
 
          Axios
              .post('http://www.pointofsaleseedigitalaency.xyz/public/api/users', 
              
              {
                  "fullName": fullName,
        
                  "username": username,
                  "email": email,              
                  "password":"API_PASS_HERE",
                  "Genre":Genre,
                  "date_naissance":date_naissance,
                  "Nationalite":Nationalite
              })
              .then( 
  
                res => {
                    console.log(res.data)
                    
                  
                    setidProf(res.data.id)
                  
                  }
  
              )

        }




        

    function AddProf(phone,niveau,sous_niveau,description
       
       
        ){
  
       
        
    
          Axios
              .post('http://www.pointofsaleseedigitalaency.xyz/public/api/enseignants', 
              
              {
                 
        
                  "phone": phone,
                  "niveau": niveau,              
                  "sous_niveau":sous_niveau,
                  "description":description,
                
              })
              .then( 
  
                res => {
                    console.log(res.data)
                    
                  
                    setidProf(res.data.id)
                  
                  }
  
              )
               
         
  
  
  
  
        }
    const [genlist,setgenlist] = useState([{sex :"Homme"},{sex : "Femme"}])
    const [redirection, setRedirection] = useState(false)
if (redirection) {
//Affichage de la redirection
        return <Redirect to='/admin/matieres' />;
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
                            {activeStep === 0 ? (
                                <>
                                      <TextField
            id="outlined-basic"
            label="Nom & Prénom"
            // onChange={}
            name="fullName"
            value={fullName}
            onChange={e => setfullName(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText=""
        />
                                 <TextField
            id="outlined-basic"
            label="Nom d'utilisateur"
            // onChange={}
            // value={}
            name="username"
            value={username}
            onChange={e => setusername(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= ""
            type={'textera'}
        />
                                    <TextField
            id="outlined-basic"
            label="E-mail"
            // onChange={}
            // value={}
            name="email"
            value={email}
            onChange={e => setemail(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= ""
            type={'textera'}
        />
                <TextField
                    id="outlined-basic"
                    label=" Numéro de Telephone"
                    // onChange={handleChange}
                    name="phone"
                    value={phone}
                    onChange={e => setphone(e.target.value)}
                    variant="outlined"
                    style={{ marginBottom: 35 }}
                    helperText=""
                        />                                    
                                    {/* <FormControl
                                        variant="outlined"
                                        onChange={handleChange}
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Role
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={newUser.role || "user"}
                                            defaultValue="User"
                                            name="role"
                                            onChange={handleChange}
                                            label="Role"
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            id={'demo-simple-select-outlined'}
                                        >
                                            Please choose the role
                                        </FormHelperText>
                                    </FormControl> */}

         <TextField
                                        id="outlined-basic"
                                        label="Role"
                                       
                                        name="roles"
                                        // value={newUser.fullName || ''}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        helperText=""
                                        defaultValue="Professeur "
                                    />
            
        <div>
        <p style={{ fontSize: 15 }}>Genre</p>
        <Select
        style={{ width: 600, height: 20, marginBottom: 40 }}
        
          className="basic-single"
          classNamePrefix="select"
          defaultValue="Genre"
          is
          onChange={e => {
            setGenre(e.target.value) }}
          
          name="color"
          value={Genre}>
          {
                        genlist.map((n) =>
                          
                            <MenuItem value={n.sex} key={n.sex}>
                              {n.sex}
                            </MenuItem> 
                        )}
       </Select>
       </div>
         <TextField
         
    id="date"
    label="Date de naissance"
    type="date"
    defaultValue="AAAA-MM-JJ"
    onChange={e => setdate_naissance(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
  <br />
  <br />
                 <TextField
            id="outlined-basic"
            label="Nationalite"

            name="Nationalite"
         //   value={Nationalite}
            defaultValue="tunisienne"
            onChange={e => setNationalite(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            
            type={'textera'}
        />
                                </>
                            ) : activeStep === 1 ? (
                                <>
                                  
                                    {/* <div class={classes.galleryWrap}>
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
                                    </div> */}
                            <div>
                            
                        
                             <p style={{ fontSize: 15 }}>Type</p>
                                <Multiselect
                                style={{ width: 600, height: 20, marginBottom: 80 }}
                                 onSelect={onSelect}
                                 onRemove={onSelect}
                                 
                                 options={otpdata}
                                  displayValue="type"/>
                              
                            </div>
                            <div>
                            
                        
                             <p style={{ fontSize: 15 }}>Niveau</p>
                                <Multiselect
                                style={{ width: 600, height: 20, marginBottom: 80 }}
                               //  onSelect={onSelect}
                                 
                                 options={nvi}
                                  displayValue="niveau"/>
                              
                            </div>  
                            <br/>
                            <br/>
                          
                                <div>
                                <p style={{ fontSize: 15 }}>Liste des matière</p>
                                <Multiselect
                                style={{ width: 600, height: 20, marginBottom: 80 }}
                                 options={options2}
                                  displayValue="niveau"/>
                            </div>
                            <br/>
                            <br/>
                 
                                    
                                    <div>
                                        
                          <p style={{ fontSize: 15 }}>Section:</p>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: 600, height: 20, marginBottom: 40 }}
                            value={section}
                            onChange={e => {
                                setSection(e.target.value)
                            }}
                          >
                            {
                              sections.map((s) =>
                                <MenuItem value={s.id} key={s.id}>
                                  {s.section}
                                </MenuItem>
                              )
                            }
                          </Select>
                        </div>
                                    
                                    <TextField
                                        id="outlined-basic"
                                        label="Description"
                                        variant="outlined"
                                        value={description}
                                        onChange={e => setdescription(e.target.value)}
                                       // value={newUser.email || ''}
                                        style={{ marginBottom: 35 }}
                                        helperText={''}
                                       
                                    />
                                   
                                <br/>
                                <br/>
                              
                             
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
                                                    {ADDPROF(fullName,username,email,password,Genre,date_naissance,Nationalite)}
                                                }}
                                            >
                                                Suivant
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                            height={150}
                                        >
                                            <Button
                                                style = {{height:35}}
                                                onClick={handleBack}
                                                variant={'outlined'}
                                                color={'primary'}
                                            >
                                                Retourner
                                            </Button>
                                            <Button
                                                style = {{height:35}}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    handleNext();
                                                    {AddProf(phone,niveau,sous_niveau,description)}
                                                    if (activeStep === steps.length - 1)
                                                     {console.log("h");
                                                     sendNotification();
                                                     setRedirection(true)
                                                     
                                                    }
                                                }}
                                            >
                                                {activeStep === steps.length - 1
                                                    ? 'Ajouter'
                                                    : 'Suivant'}
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

export default AddProfs
