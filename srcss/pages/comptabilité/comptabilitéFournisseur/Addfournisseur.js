// import React, {useState, useEffect} from 'react'
// import Stepper from '@material-ui/core/Stepper'
// import Step from '@material-ui/core/Step'
// import StepLabel from '@material-ui/core/StepLabel'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
// import TextField from '@material-ui/core/TextField'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import { useHistory } from 'react-router-dom'
// import useStyles from './styles'
// import { toast } from 'react-toastify'
// import Axios from 'axios'
// import config from '../../../config'
// import uuid from 'uuid/v4'

// import Notification from "../../../components/Notification";

// import { Button, Typography } from '../../../components/Wrappers'
// import Widget from '../../../components/Widget'

// import { actions } from '../../../context/ManagementContext'
// import {
//   useManagementDispatch,
// } from '../../../context/ManagementContext'


// function getSteps() {
//     return ['Create Account', ]
// }

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return 'Create New Account'
//         //  case 1:
//         //      return 'Create User Details'
//         // case 2:
//         //     return 'Business Details'
//         // case 3:
//         //     return 'Social'
//         // default:
//         //     return ''
//     }
// }
// //try {
//     //     dispatch({
//     //       type: 'USERS_FORM_CREATE_STARTED',
//     //     });
//     //     axios.post('/api/users', 
     
//     //    {  body: JSON.stringify(  {
//     //         "fullName": "dsqsdd",
//     //     "username": "  sdqsddda" ,
//     //     "email": "dddsqsq@example.com",
//     //     "password": "ddsqsd",
//     //     "roles": [
//     //       "Student"
//     //     ],
//     //     "Genre": "dd",
//     //     "Nationalite": "tessss",
//     //     "phone": "tessss" 
//     //    })
//     //   }
        
//     //     ,
        
//     //  {
    
//     // "headers" :{ 
//     // 'Accept': 'application/json', 
//     // "Content-Type":"application/json"
    
//     // }
    
//     //  }   
        
//     //     ).then(res => {
//     //       dispatch({
//     //         type: 'USERS_FORM_CREATE_SUCCESS',
//     //       });
//     //       history.push('/admin/Inscription');
//     //     })
//     //   } catch (error) {
//     //     toast("Error");
//     //     console.log(error)
//     //     dispatch({
//     //       type: 'USERS_FORM_CREATE_ERROR',
//     //     });
//     //   }
// const AddFournisseur = () => {
//     var [fullName, setfullName] = useState("");
//     var [username, setusername] = useState("");
//     var [email, setemail] = useState("");
//     var [password, setpassword] = useState("");
//     var [Genre, setGenre] = useState("");
//     var [date_naissance, setdate_naissance] = useState("");
//     var [Nationalite, setNationalite] = useState("");
//     var [idStudent, setidStudent] = useState("");
//     const [CoursM, seCoursM] = useState([]);
//     useEffect(function () {
//       const d= sessionStorage.getItem('user_id')
//       Axios
//         .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
//         .then(res => {
//           seCoursM(res.data.result)
//           // console.log(res.data.result)
//         }, 2000)
//         .catch(() => {
//           console.log("ERROR")
//         });
//     }, []);




//     function Addclass(fullName,username,email,password,Genre,date_naissance,Nationalite
       
       
//       ){

     
      
  
//         Axios
//             .post('http://www.pointofsaleseedigitalaency.xyz/public/api/users', 
            
//             {
//                 "fullName": fullName,
      
//                 "username": username,
//                 "email": email,              
//                 "password":password,
//                 "Genre":Genre,
//                 "date_naissance":date_naissance,
//                 "Nationalite":Nationalite
//             })
//             .then( 

//               res => {
//                   console.log(res.data)
                  
                
//                   setidStudent(res.data.id)
                
//                 }

//             )
             
       




//       }





//     return(
//         <Grid item justify={'center'} container>
//         <Box
//             display={'flex'}
//             flexDirection={'column'}
//             width={600}
//         >
//             <Typography
//                 variant={'h5'}
//                 weight={'medium'}
//                 style={{ marginBottom: 30 }}
//             >
//                   </Typography>
//                   <h1>Ajouter un utilisateur</h1>
//         <>
//         <TextField
//             id="outlined-basic"
//             label="fullName"
//             // onChange={}
//             name="fullName"
//             value={fullName}
//             onChange={e => setfullName(e.target.value)}
//             variant="outlined"
//             style={{ marginBottom: 35 }}
//             helperText="S'il vous ajouter votre full name"
//         />
//         <TextField
//             id="outlined-basic"
//             label="username"
//             // onChange={}
//             // value={}
//             name="username"
//             value={username}
//             onChange={e => setusername(e.target.value)}
//             variant="outlined"
//             style={{ marginBottom: 35 }}
//             helperText= "S'il vous plait entrer le nom "
//             type={'textera'}
//         />
//          <TextField
//             id="outlined-basic"
//             label="email"
//             // onChange={}
//             // value={}
//             name="email"
//             value={email}
//             onChange={e => setemail(e.target.value)}
//             variant="outlined"
//             style={{ marginBottom: 35 }}
//             helperText= "S'il vous plait entrer votre email "
//             type={'textera'}
//         />
//              <TextField
//             id="outlined-basic"
//             label="password"
//             // onChange={}
//             // value={}
//             name="password"
//             value={password}
//             onChange={e => setpassword(e.target.value)}
//             variant="outlined"
//             style={{ marginBottom: 35 }}
//             helperText= "S'il vous plait entrer le mdp "
//             type={'textera'}
//         />
//               <TextField
//                                         id="outlined-basic"
//                                         label="roles"
                                       
//                                         name="roles"
//                                         // value={newUser.fullName || ''}
//                                         variant="outlined"
//                                         style={{ marginBottom: 35 }}
//                                         helperText="Please enter your role"
//                                         defaultValue="Student "
//                                     />
//           {/* <FormControl
//             variant="outlined"
//             // onChange={}
//             style={{ marginBottom: 35 }}
//         >
           
//             {/* <Select
              
               
//                 name="Class"
//                 onChange={e => setclas(e.target.value)}
//                 label="Class"
//             >
            
//              {   CoursM.map(
//   (m)=>( 
 

// <MenuItem value={m.id}
// key={m.id}
 
// >{m.matieress }</MenuItem>
//        )
//        )}
//             </Select> */}
//                    {/* <Select
              
      
//                 name="Class"
               
//                 label="Class"
//             >

//             </Select> 
   
//         </FormControl> */} 
//           <TextField
//             id="outlined-basic"
//             label="Genre"
//             // onChange={}
//             // value={}
//             name="Genre"
//             value={Genre}
//             onChange={e => setGenre(e.target.value)}
//             variant="outlined"
//             style={{ marginBottom: 35 }}
//             helperText= "S'il vous plait entrer votre genre "
//             type={'textera'}
//         />
//          <TextField
//     id="date"
//     label="date de naissance"
//     type="date"
//     defaultValue="2017-05-24"
//     onChange={e => setdate_naissance(e.target.value)}
//     InputLabelProps={{
//       shrink: true,
//     }}
//   />
//   <br />
//   <br />
//                  <TextField
//             id="outlined-basic"
//             label="Nationalite"
//             // onChange={}
//             // value={}
//             name="Nationalite"
//             value={Nationalite}
//             onChange={e => setNationalite(e.target.value)}
//             variant="outlined"
//             style={{ marginBottom: 35 }}
//             helperText= "S'il vous plait entrer Votre nationatlité "
//             type={'textera'}
//         />
      
//         <Button
//                   color="primary"
//                   variant="contained"
//                   onClick={()=>{Addclass(fullName,username,email,password,Genre,date_naissance,Nationalite)}} 
//                 >
//                   envoyer
//                 </Button>
//     </>
//     </Box>
//                     </Grid>
//      ) }


// export default AddFournisseur





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
    // const [age, setAge] = React.useState('');

    // const handleChangee = (event) => {
    //   setAge(event.target.value);
    // };
    function handleChange(e) {
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
        
      })
   
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

    var [imagestudent, setimagestudent] = useState("");
    




 
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



    var [Nom_fornisseur, setNom_fornisseur] = useState("");
    var [phone, setphone] = useState("");
    var [email, setemail] = useState("");
    var [Adress, setAdress] = useState("");
    var [idStudent, setidStudent] = useState("");




    function Addfournisseur(Nom_fornisseur,phone,email,Adress,
       
       
      ){

     
      
  
        Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/fournisseurs', 
            
            {


              
                "Nom_fornisseur": Nom_fornisseur,
      
                "phone": phone,
                "email": email,              
                "Adress":Adress,
              
            })
            .then( 

                res => {
                    console.log(res.data)
                    
                  
                    setidStudent(res.data.id)
                  
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




    //   function addimg(imagestudent,idStudent
       
       
    //     ){
  
       
        
    
    //       Axios
    //           .post('http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects', 
              
    //           {
    //               "file": imagestudent,
    //                 "id_media" : idStudent
               
    //           },
    //           {"headers" :{ 
    //             "Content-Type":"application/x-www-form-urlencoded"
    //           }
    //         }
              
    //           )

    //           .then( 
  
    //             res => {
    //                 console.log(imagestudent)
                    
                  
                   
                  
    //               }
  
    //           )
    //           .catch((e) => {
    //             console.log(e)
    //         })
               
              
            
         
  
  
  
  
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
                            <h1>Ajouter un Fournisseur</h1>
                           
                                <>
                                   {/* <InputLabel id="demo-simple-select-label">Type de Produit</InputLabel>
                                    <FormControl
            variant="outlined"
            // onChange={}
            style={{ marginBottom: 35 }}
            
        >
           
            <Select
              
               
                name="Type de Produit"
                value={"Type de Produit"}
                
             
            >
            
            
  
 

<MenuItem value={""}

 
>Cantine</MenuItem>
<MenuItem value={""}

 
>Transport</MenuItem>
<MenuItem value={""}

 
>Sanitaire</MenuItem>
<MenuItem value={""}

 
>Imprimerie</MenuItem>
<MenuItem value={""}

 
>Autre</MenuItem>
            </Select>
         
        </FormControl> */}
                                   <TextField
            id="outlined-basic"
            label="Nom de fornisseur"
            // onChange={}
            name="Nom_fornisseur"
            value={Nom_fornisseur}
            onChange={e => setNom_fornisseur(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText="S'il vous ajouter le nom du fournisseur"
        />
                                 <TextField
            id="outlined-basic"
            label="phone"
            // onChange={}
            // value={}
            name="phone"
            value={phone}
            onChange={e => setphone(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait ajouter le numéro du fournisseur "
            type={'textera'}
        />
                                    <TextField
            id="outlined-basic"
            label="email"
            // onChange={}
            // value={}
            name="email"
            value={email}
            onChange={e => setemail(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer l'email du fournisseur "
            type={'textera'}
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
                                                 {/* <TextField
            id="outlined-basic"
            label="password"
            // onChange={}
            // value={}
            name="password"
            value={password}
            onChange={e => setpassword(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer le mdp "
            type={'textera'}
        />
         <TextField
                                        id="outlined-basic"
                                        label="roles"
                                       
                                        name="roles"
                                        // value={newUser.fullName || ''}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        helperText="Please enter your role"
                                        defaultValue="Student "
                                    /> */}
                                     <TextField
            id="outlined-basic"
            label="Adress"
            // onChange={}
            // value={}
            name="Adress"
            value={Adress}
            onChange={e => setAdress(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer votre genre "
            type={'textera'}
        />
         {/* <TextField
    id="date"
    label="date "
    type="date"
    defaultValue="2017-05-24"
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
            // onChange={}
            // value={}
            name="Nationalite"
            value={Nationalite}
            onChange={e => setNationalite(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 35 }}
            helperText= "S'il vous plait entrer Votre nationatlité "
            type={'textera'}
        /> */}
                                </>
                            
                               {/* <> */}
                                    {/* <Typography weight={'medium'}>
                                        Photo:
                                    </Typography> */}
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
                                    {/* <label
                                      className={classes.uploadLabel}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {'Upload an image'}
                                        <input style={{ display: 'none' }} accept="image/*" type="file" ref={fileInput}   value={imagestudent}
            onChange={e => setimagestudent(e.target.value)} />
                                    </label> */}
                                    {/* <Typography
                                        size={'sm'}
                                        style={{ marginBottom: 35 }}
                                    >
                                       
                                    </Typography> */}
                                   
                                    {/* <TextField
                                        id="outlined-basic"
                                        label="Contact number"
                                        onChange={handleChange}
                                        value={newUser.phoneNumber || ''}
                                        name="phoneNumber"
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        helperText={
                                            'Enter your contact number '
                                        }
                                    /> */}
                                    {/* <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        value={newUser.email || ''}
                                        style={{ marginBottom: 35 }}
                                        helperText={'Enter your email'}
                                        type={'email'}
                                    /> */}
                                    {/* <FormControl
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Country
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
                                            <MenuItem value="user">
                                                User
                                            </MenuItem>
                                            <MenuItem value="admin">
                                                Admin
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText
                                            id={'demo-simple-select-outlined'}
                                        >
                                            Choose your role
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            State
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={''}
                                            label="State"
                                        >
                                            <MenuItem value={10}>User</MenuItem>
                                            <MenuItem value={20}>
                                                Admin
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Super Admin
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText
                                            id={'demo-simple-select-outlined'}
                                        >
                                            Choose your state
                                        </FormHelperText>
                                    </FormControl> */}
                                    {/* <FormControl
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            City
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={''}
                                            label="City"
                                        >
                                            <MenuItem value={10}>User</MenuItem>
                                            <MenuItem value={20}>
                                                Admin
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Super Admin
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText
                                            id={'demo-simple-select-outlined'}
                                        >
                                            Choose your city
                                        </FormHelperText>
                                    </FormControl> */}
                                    {/* <TextField
                                        id="outlined-basic"
                                        label="Address"
                                        variant="outlined"
                                        onChange={handleChange}
                                        style={{ marginBottom: 35 }}
                                        helperText={'Enter your adress'}
                                    /> */}
                              {/* //  </>
                            // ) : activeStep === 2 ? (
                            //     <>
                         
                                 
                                 
                            //     </>
                            // ) : (
                            //     <>
                                
                            //     </>
                            )
                        } */}
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
                                                   
                                                    {Addfournisseur(Nom_fornisseur,phone,email,Adress,)}
                                                }}
                                            >
                                                Finish
                                            </Button>
                                          
        
                                        </Box>
                                  
                                        <Box
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                        >
                                            {/* <Button
                                             style={{backgroundColor:'#ba181b'}}
                                                onClick={handleBack}
                                                variant={'contained'}
                                                color={'primary'}
                                            >
                                                Back
                                            </Button> */}
                                            {/* <Button
                                             style={{backgroundColor:'#ba181b'}}
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
                                            </Button> */}
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




