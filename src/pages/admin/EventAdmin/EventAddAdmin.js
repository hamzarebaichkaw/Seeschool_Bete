// import 'date-fns';
// import React, {useState, useEffect} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import TextField from '@material-ui/core/TextField';
// import axios from 'axios';
// import Checkbox from '@material-ui/core/Checkbox';
// import Box from '@material-ui/core/Box'
// import { Redirect } from 'react-router-dom'
// import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
// import Widget from '../../../components/Widget'
// import { toast } from 'react-toastify'
// import Notification from "../../../components/Notification";

// import DateFnsUtils from "@date-io/date-fns"

// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker
// } from "@material-ui/pickers"

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       margin: 'auto',
//       maxWidth: 500,
//     },
//     image: {
//       width: 128,
//       height: 128,
//     },
//     img: {
//       margin: 'auto',
//       display: 'block',
//       maxWidth: '100%',
//       maxHeight: '100%',
//     },
//   }));

// export default function EventAddAdmin() {
//     const classes = useStyles();

    
//      var [idevent, setidevent] = useState("");

//     var [Nom, setNom] = useState("");
//     var [Description, setDescription] = useState("");
//     var [Create_At, setCreate_At] = useState("");
//     var [lieu,setLieu] = useState("")
    
//     const [displaynom,setDisplaynom] = useState("none")
//     const [displaydisc,setDisplaydisc] = useState("none")
//     const [displaylieu,setDisplaylieu] = useState("none")
//     const [displaydate,setDisplaydate] = useState("none")
//     const [displayimg,setDisplayimg] = useState("none")
//     const [selectedDate, setSelectedDate] = React.useState(
//         new Date("2007-12-31")
//     )

//     function verif(nom,lieu,disc,date,img) {
//         var test =true;
//         if (nom==="") {
//             test=false
//             setDisplaynom("block")
//         } else {setDisplaynom("none")}
//         if (disc==="") {
//             test=false
//             setDisplaydisc("block")
//         } else {setDisplaydisc("none")}
//         if (lieu==="") {
//             test=false
//             setDisplaylieu("block")

//         } else {setDisplaylieu("none")}
//         if (date.getTime()===NaN) {
//             test=false
//             setDisplaydate("block")
//         } else {setDisplaydate("none")}
//         if (img==="") {
//             test=false
//             setDisplayimg("block")
//         } else {setDisplayimg("none")}
//         return(test)

//     }


//     function Addevent(Nom,Description,Create_At
 
//         ){
 
//           axios
//               .post('http://www.pointofsaleseedigitalaency.xyz/public/api/events', 
              
//               {
//                   "Nom": Nom,
        
//                   "Description": Description,
//                   "Create_At": Create_At,              
                 
//               })
//               .then( 
  
//                 res => {
//                     console.log(res.data)
                    
                  
//                      setidevent(res.data.id)
                  
//                   }
  
//               )

//         }
//         const [baseImage, setBaseImage] = useState("");
//         const uploadImage = async (e) => {
//             const file = e.target.files[0];
//             const base64 = await convertBase64(file);
//             setBaseImage(base64);
//         };
//         const convertBase64 = (file) => {
//             return new Promise((resolve, reject) => {
//                 const fileReader = new FileReader();
//                 fileReader.readAsDataURL(file);
//                 fileReader.onload = () => {
//                     resolve(fileReader.result);
//                 };
//                 fileReader.onerror = (error) => {
//                     reject(error);
//                 };
//          });
//     };
//     const [redirection, setRedirection] = useState(false)
//     if (redirection) {
//         //Affichage de la redirection
//                 return <Redirect to='/admin/event' />;
//             }
//             function sendNotification() {
//                 const componentProps = {
//                   type: "feedback",
//                   message: "Event ajouté avec succès ",
//                   variant: "contained",
//                   color: "success"
//                 };
//                 const options = {
//                   type: "info",
//                   position: toast.POSITION.TOP_RIGHT,
//                   progressClassName: classes.progress,
//                   className: classes.notification,
//                   timeOut: 1000
//                 };
//                 return toast(
//                   <Notification
//                     {...componentProps}
//                     className={classes.notificationComponent}
//                   />,
//                   options
//                 );
//               }
//               const handleDateChange = (date) => {
//                 setSelectedDate(date);
//             };

// return(




// <Grid container spacing={3}>
//             <Grid item xs={12}>
//                 <Widget>
//                     <h1>Ajouter un événement</h1>
//                 </Widget>
//             </Grid>
//             <Grid item xs={12}>
//                 <Widget>
//                     <Grid item justify={'center'} container>
//                         <Box
//                             display={'flex'}
//                             flexDirection={'column'}
//                             width={600}
//                         >
                         
                            
//                             <div>
//                                 <div>
//                                 <div style={{display:'block',justifyContent:'center'}}>
                                
//                               <TextField
//                                           id="outlined-basic"
//                                           label= {displaynom==="none"?"Nom" :
//                                           <p style={{color:"red",display:displaynom}} >Nom</p>}
//                                           // onChange={}
//                                           // value={}
//                                           name="Nom"
//                                           value={Nom}
//                                           onChange={e => setNom(e.target.value)}
//                                           variant="outlined"
//                                           style={{ marginBottom: 35, width:'600px' }}
                                          
//                                           type={'textera'}
//                                       />
//                                       <br/>
                                
//                                       <TextField
//                                           id="outlined-basic"
//                                           label= {displaylieu==="none"?"Lieu" :
//                                           <p style={{color:"red",display:displaylieu}} >Lieu</p>}
//                                           // onChange={}
//                                           // value={}
//                                           name="Lieu"
//                                           value={lieu}
//                                           onChange={e => setLieu(e.target.value)}
//                                           variant="outlined"
//                                           style={{ marginBottom: 35, width:'600px' }}
                                          
//                                           type={'textera'}
//                                       />
                                      
//                                       <br/>
                                     
//                                       <TextField
//                                           id="outlined-basic"
//                                           label={displaydisc==="none"?"Description" :
//                                           <p style={{color:"red",display:displaydisc}} >Description</p>}
//                                           // onChange={}
//                                           // value={}
//                                           name="Description"
//                                           value={Description}
//                                           onChange={e => setDescription(e.target.value)}
//                                           variant="outlined"
//                                           style={{ marginBottom: 35, width:'600px' }}
                                          
//                                           type={'textera'}
//                                       />
//                                       <br/>
                                      
//                                       {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
//      <Grid container justifyContent="space-around">
//         <KeyboardDatePicker
//         style={{width : 600}}
//            disableToolbar
//            variant="inline"
//            format="dd/MM/yyyy"
//            margin="normal"
//            id="date-picker-inline"
//            label="Date d'event"
//            value={selectedDate}
//            onChange={handleDateChange}
//            KeyboardButtonProps={{
//               "aria-label": "change date"
//            }}
         
//         />
//      </Grid>
//   </MuiPickersUtilsProvider> */}
//                                 <br/>
                                
//                                 <Typography weight={'medium'} style={{ alignItems: 'center', justifyContent: 'center' }}>
//       {baseImage != "" ? <p style={{ marginTop: 15 }}>Photo:</p> : null}
//            <div style={baseImage != "" ? { marginTop: 15 } : null}>
//           {
//               baseImage != "" ?
//               <img src={baseImage} style={{ width: 600, height: 400,  alignSelf: 'center',  }} />
//               :
//               null
//            }
//            </div>
// </Typography>
// <label className={classes.uploadLabel} style={{cursor: 'pointer', marginBottom: 20, marginTop: 20, alignItems: 'center', color: 'royalblue',}}>
//      {displayimg==="none"?"Choisir une image" :
//                                   <p style={{color:"red",display:displayimg}} >Choisir une image</p>}
//      <input style={{ display: 'none' }} type="file" accept={"image/*"} onChange={e => { uploadImage(e) }} />
// </label>
// <br/>
// <div style={{display:'block', justifyContent:'center',marginLeft:175 }}>
// <li style={{listStyleType:"none", wordSpacing:22.5 }} > Parent&nbsp;  <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/> Élevé        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />  </li>        
// <li style={{listStyleType:"none",wordSpacing:20 }} > Professeur  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}/> Admin  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />  </li> 





//                                     </div>
//                                 </div>
//                                     <br/>




                                  
//                                         <Box
//                                             display={'flex'}
//                                             justifyContent={'space-between'}
//                                             height={150}
//                                         >

//                                             <Button
//                                                 style = {{height:35, width:600 }}
//                                                 variant="contained"
//                                                 color="primary"
//                                                 onClick={()=>{

//                                                     {
//                                                     if (verif(Nom,lieu,Description,selectedDate,baseImage)) {
//                                                         Addevent()
//                                                      sendNotification();
//                                                      setRedirection(true)}
//                                                 }} }
                                         
//                                             >
//                                                 Ajouter
//                                             </Button>
//                                         </Box>
                                    
//                                 </div>
//                             </div>
//                         </Box>
//                     </Grid>
//                 </Widget>
//             </Grid>
//         </Grid>
// )
// }

import 'date-fns';
import React, {useState, useEffect, useMemo,useCallback,} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box'
import { Redirect } from 'react-router-dom'
import { Link,Button, Avatar } from "../../../components/Wrappers/Wrappers";
import Widget from '../../../components/Widget'
import { toast } from 'react-toastify'
import Notification from "../../../components/Notification";
import { useDropzone } from 'react-dropzone'
import countryList from 'react-select-country-list'
import * as Icons from "@material-ui/icons"
import DateFnsUtils from "@date-io/date-fns"

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers"

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
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#dfe6e9',
    borderStyle: 'dashed',
    backgroundColor: '#0E0D47',
    color: '#dfe6e9',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
  };
  
  const activeStyle = {
    borderColor: '#0E0D47',
    backgroundColor: '#dfe6e9',
    color: '#0E0D47'
  };
  
  const acceptStyle = {
    borderColor: '#0E0D47'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };




export default function EventAddAdmin() {
    const classes = useStyles();
    function Basic() {
        const onDrop = useCallback(acceptedFiles => {
          const files = acceptedFiles.map(file => (
          
            setfile_name (file)
          
          ));
        }, [])
        const {
          acceptedFiles,
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        } = useDropzone({onDrop});
      
        const files = acceptedFiles.map(file => (
          <li key={file.path} >
            Fichier : {file.path}
          </li>
        ));
      
        const style = useMemo(() => ({
          ...baseStyle,
          ...(isDragActive ? activeStyle : {}),
          ...(isDragAccept ? acceptStyle : {}),
          ...(isDragReject ? rejectStyle : {})
        }), [
          isDragActive,
          isDragReject,
          isDragAccept
        ]);
       
        
      
        return (
          <section className="container">
            <div {...getRootProps({ className: 'dropzone', style })}>
              <input {...getInputProps()  } 
                     />
              <Icons.CloudUpload style={{ width: 100, height: 100 }} />
              <p style={{ alignSelf: 'center', fontSize: 25 }}>Drag/Drop ou cliquer pour ajouter votre Evenements</p>
            </div>
            <div style={{ marginTop: 5 }}>
              <ul style={{ listStyleType: 'none' }}>
                {files}
              </ul>
            </div>
          </section>
        );
      }
  
      const [file_name, setfile_name] = useState('')
      const Addevent  = async () => {
        let today = new Date()
       await    axios
           .post('http://www.pointofsaleseedigitalaency.xyz/public/api/events',
               {
                "Nom": Nom,
                "Description": Description,
               
               "Created_at": today,
              
               })
           .then(
            async   res => {
                setRedirection(true)
               console.log(res.data)
               // dispatch({ type: "CLOSE_GRID" })
               const formData = new FormData();
               formData.append("file", file_name);
               formData.append("id_events", res.data.id);
               await axios
               .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData,
               {
                 "headers":
                 {
                   "Content-Type": "multipart/form-data",
                 }
               }
             )
             .then(res => {
               console.log(res.data)
               //  dispatch({ type: "CLOSE_GRID" })
             })
             .catch(e => {
                 console.log(e)
               })
          })
             
           .catch(e => {
               console.log(e)
             })
   }

    
     var [idevent, setidevent] = useState("");

    var [Nom, setNom] = useState("");
    var [Description, setDescription] = useState("");
    var [Create_At, setCreate_At] = useState("");
    var [lieu,setLieu] = useState("")
    
    const [displaynom,setDisplaynom] = useState("none")
    const [displaydisc,setDisplaydisc] = useState("none")
    const [displaylieu,setDisplaylieu] = useState("none")
    const [displaydate,setDisplaydate] = useState("none")
    const [displayimg,setDisplayimg] = useState("none")
    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2007-12-31")
    )

    function verif(nom,lieu,disc,date,img) {
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
        if (date.getTime()===NaN) {
            test=false
            setDisplaydate("block")
        } else {setDisplaydate("none")}
        if (img==="") {
            test=false
            setDisplayimg("block")
        } else {setDisplayimg("none")}
        return(test)

    }
//  async   function Addimg(
 
//         ){
//             const formData = new FormData();
//        await   axios
//        .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData,
//        {
//          "headers":
//          {
//            "Content-Type": "multipart/form-data",
//          }
//        }
//      )
//               .then( 
  
//                 res => {
//                     console.log(res.data)
//                     formData.append("file", baseImage);
//                     formData.append("id_events", res.data.id);
//                     formData.append("id_user", res.data.id);
//                   }
                
//               )
//               .catch(e => {
//                 console.log(e)
//               })
//         }

//     function Addevent(Nom,Description,Create_At
 
//         ){
 
//           axios
//               .post('http://www.pointofsaleseedigitalaency.xyz/public/api/events', 
              
//               {
//                   "Nom": Nom,
        
//                   "Description": Description,
//                   "Create_At": Create_At,              
                 
//               })
//               .then( 
  
//                 res => {
//                     console.log(res.data)
                    
                  
//                      setidevent(res.data.id)
//                      Addimg()
//                   }
  
//               )

//         }
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
    const [redirection, setRedirection] = useState(false)
    if (redirection) {
        //Affichage de la redirection
                return <Redirect to='/admin/event' />;
            }
            function sendNotification() {
                const componentProps = {
                  type: "feedback",
                  message: "Event ajouté avec succès ",
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
              const handleDateChange = (date) => {
                setSelectedDate(date);
            };

            

return(




<Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget>
                    <h1>Ajouter un événement</h1>
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
                                          label= {displaynom==="none"?"Nom" :
                                          <p style={{color:"red",display:displaynom}} >Nom</p>}
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
                                          label= {displaylieu==="none"?"Lieu" :
                                          <p style={{color:"red",display:displaylieu}} >Lieu</p>}
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
                                          label={displaydisc==="none"?"Description" :
                                          <p style={{color:"red",display:displaydisc}} >Description</p>}
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
                                      
                                      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
     <Grid container justifyContent="space-around">
        <KeyboardDatePicker
        style={{width : 600}}
           disableToolbar
           variant="inline"
           format="dd/MM/yyyy"
           margin="normal"
           id="date-picker-inline"
           label="Date d'event"
           value={selectedDate}
           onChange={handleDateChange}
           KeyboardButtonProps={{
              "aria-label": "change date"
           }}
         
        />
     </Grid>
  </MuiPickersUtilsProvider> */}
                                <br/>
{/*                                 
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
</Typography> */}
{/* <label className={classes.uploadLabel} style={{cursor: 'pointer', marginBottom: 20, marginTop: 20, alignItems: 'center', color: 'royalblue',}}>
     {displayimg==="none"?"Choisir une image" :
                                  <p style={{color:"red",display:displayimg}} >Choisir une image</p>}
     <input style={{ display: 'none' }} type="file" accept={"image/*"} onChange={e => { uploadImage(e) }} />
</label> */}
<br/>
{/* <div style={{display:'block', justifyContent:'center',marginLeft:175 }}>
<li style={{listStyleType:"none", wordSpacing:22.5 }} > Parent&nbsp;  <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/> Élevé        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />  </li>        
<li style={{listStyleType:"none",wordSpacing:20 }} > Professeur  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}/> Admin  <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />  </li> 





                                    </div> */}

<Basic        />

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
                                                onClick={()=>{

                                                    {console.log(file_name);
                                                        Addevent()
                                                    if (verif(Nom,lieu,Description,selectedDate,baseImage)) {
                                                     sendNotification();
                                                     setRedirection(true);
                                                    
                                                    
                                                    }
                                                }} }
                                         
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



