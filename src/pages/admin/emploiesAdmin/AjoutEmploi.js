import React, { useEffect, useState, useMemo,useCallback, } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import useStyles from './styles'
import { toast } from 'react-toastify'
import Axios from 'axios'
import config from '../../../config'
import uuid from 'uuid/v4'
import Notification from "../../../components/Notification";
import { Button, Typography } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'
import { actions } from '../../../context/ManagementContext'
import { useManagementDispatch } from '../../../context/ManagementContext'
import { useDropzone } from 'react-dropzone'
import countryList from 'react-select-country-list'
import * as Icons from "@material-ui/icons"

function getSteps() {
    return ['Créer un compte', 'Informations personnelles']
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Créer un compte'
        case 1:
            return 'Informations personnelles'
    }
}
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


 


   



const AjoutEmploi = () => {


    const [redirection, setRedirection] = useState(false)
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
              <p style={{ alignSelf: 'center', fontSize: 25 }}>Drag/Drop ou cliquer pour ajouter votre cours</p>
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

    
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set())
    const [newUser, setNewUser] = React.useState({
        avatars: [],
        disabled: null,
        email: '',
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
        emailVerified: true,
        firstName: '',
        fullName: '',
        lastName: '',
        password: '',
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
        phoneNumber: '',
        role: '',
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

        return;
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
            message: "Elève Ajouté avec succée!",
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

    var [fullName, setfullName] = useState("");
    var [username, setusername] = useState("");
    var [email, setemail] = useState("");
    var [password, setpassword] = useState("");
    var [Genre, setGenre] = useState("");
    var [date_naissance, setdate_naissance] = useState("");
    var [Nationalite, setNationalite] = useState("");
    var [idStudent, setidStudent] = useState("");
    const [CoursM, seCoursM] = useState([]);
    const [parents, setParents] = useState([]);
    const [parent, setParent] = useState('');
    const [studentImage, setStudentImage] = useState('');

    useEffect(function () {
        const d = localStorage.getItem('user_id')
        Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
            .then(res => {
                seCoursM(res.data.result)
                // console.log(res.data.result)
                console.log(countryOptions)
            }, 2000)
            .catch(() => {
                console.log("ERROR")
            });

        Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Parents`)
            .then(res => {
                setParents(res.data)
            }, 2000)
            .catch(() => {
                console.log("ERROR")
            });
    }, []);


    const [pays, setPays] = useState('')
    const countryOptions = useMemo(() => countryList().getData(), [])

const ADDemploie  = async () => {
         let today = new Date()
        await    Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/emploies',
                {
                    "Name": fullName,
                    // "classe": `/public/api/classes/${id_classe}`,
                    "classe": `/public/api/classes/` + numero,
                "Created_at": today,
               
                })
            .then(
                
             async   res => {
                 
                console.log(res.data)
                // dispatch({ type: "CLOSE_GRID" })
                const formData = new FormData();
                formData.append("file", file_name);
                formData.append("id_emploie", res.data.id);
                await Axios
                .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData,
                {
                  "headers":
                  {
                    "Content-Type": "multipart/form-data",
                  }
                }
              )
              .then(res => {
                setRedirection(true)
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
    // function addimg(imagestudent,
    //     ){
    //       const formData = new FormData();
    //            formData.append("file", imagestudent[0] );
    //       Axios
    //           .post('http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects', 
    //        formData 
    //           ,
    //             {
    //                 "headers" :
    //                                 { 
    //                                   "Content-Type":"multipart/form-data",
    //                                 }
    //             }
    //           )
    //           .then( 
    //             res => {
    //                 console.log(res.data)
    //               }
    //           )
    //     }


    // function addimg(imagestudent, idStudent) {
    //     const formData = new FormData();
    //     Array.from(imagestudent).forEach(image => {
    //         formData.append('files', image);
    //     });

    //     Axios
    //         .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/media_objects`, formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

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

    
    const [type, setType] = useState('')
    const [types, setTypes] = useState([
        { id: 1, type: 'Primaire' },
        { id: 2, type: 'Collège' },
        { id: 3, type: 'Secondaire' }
    ])

    const [numeros, setNumeros] = useState([])
    const [numero, setNumero] = useState('')

    const [niveau, setNiveau] = useState('')
    const [section, setSection] = useState('0')
    const [niveaux, setNiveaux] = useState([
        { id: 1, niveau: '1ère année', type: 'Primaire' },
        { id: 2, niveau: '2ème année', type: 'Primaire' },
        { id: 3, niveau: '3ème année', type: 'Primaire' },
        { id: 4, niveau: '4ème année', type: 'Primaire' },
        { id: 5, niveau: '5ème année', type: 'Primaire' },
        { id: 6, niveau: '6ème année', type: 'Primaire' },
        { id: 7, niveau: '7ème année', type: 'Collège' },
        { id: 8, niveau: '8ème année', type: 'Collège' },
        { id: 9, niveau: '9ème année', type: 'Collège' },
        { id: 10, niveau: '1ère année', type: 'Secondaire' },
        { id: 11, niveau: '2ème année', type: 'Secondaire' },
        { id: 12, niveau: '3ème année', type: 'Secondaire' },
        { id: 13, niveau: '4ème année', type: 'Secondaire' }
    ])
    const [sections, setSections] = useState([
        { id: 1, section: 'Science Informatique' },
        { id: 2, section: 'Science Exprimentale' },
        { id: 2, section: 'Mathématiques' },
        { id: 3, section: 'Economie et Gestion' },
        { id: 4, section: 'Lettre' },
        { id: 5, section: 'Sport' },
        { id: 6, section: 'Technique' }
    ])

    const [distyp, setDistyp] = useState("none")
    const [disniv, setDisniv] = useState("none")
    const [dissec, setdissec] = useState("none")
    const [disnv, setdisnv] = useState("none")
    
    const getNumerosSection = async (niv, sec) => {
        await Axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
            .then(res => {
                setNumeros(res.data)
            }, 2000)
            .catch((e) => {
                console.log(e)
            })
    }
    function verif3(ty, nive, sect, nume) {
        var test = true;
        if (ty === "") {
            test = false
            setDistyp("block")
        } else {
            setDistyp("none")
        }

        if (nive === "") {
            test = false
            setDisniv("block")
        } else { setDisniv("none") }

        if (ty === "Secondaire" && sect === "0") {
            test = false
            setdissec("block")
        } else { setdissec("none") }

        if (nume === "") {
            test = false
            setdisnv("block")
        } else { setdisnv("none") }
        return test
    }

    const [classID, setClassID] = useState()
    const getClassID = async () => {
        // setLoading(true)
        await Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/IDclass/${type}/${niveau}/${section}/${numero}`)
            .then(async res => {           
                ADDemploie()
            }).catch(e => {
                console.log(e)
            })
    }
    
  if (redirection) {
    //Affichage de la redirection
    return <Redirect to='/admin/emploies' />;
  }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget>
                    {/* <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            if (isStepSkipped(index)) {
                                stepProps.completed = false
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps} classes={{ completed: classes.stepCompleted }}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper> */}
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
                            <h1>Ajouter un Emploi</h1>
                            {activeStep === 0 ? (
                                <>
                                    <TextField
                                        id="outlined-basic"
                                        label="Titre d'emploi"
                                        // onChange={}
                                        name="fullName"
                                        value={fullName}
                                        onChange={e => setfullName(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}
                                    />
                              

                                    <TextField
                                        id="date"
                                        label="Date de naissance"
                                        type="date"
                                        onChange={e => setdate_naissance(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <br />
                                    <br />


                                    <>
                                    <div>
                                        <p style={{ fontSize: 20 }}>Type:</p>
                                        <br />
                                        <p style={{ color: "red", display: distyp }} >Choisir un Type </p>
                                        <br />
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: 250, height: 20, marginBottom: 80 }}
                                            value={type}
                                            onChange={e => {
                                                setType(e.target.value)
                                            }}
                                        >
                                            {
                                                types.map((t) =>
                                                    <MenuItem value={t.type} key={t.id}>
                                                        {t.type}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </div>

                                    {
                                        type === '' ?
                                            null :
                                            (
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <div>
                                                        <p style={{ fontSize: 20 }}>Niveau:</p>
                                                        <br />
                                                        <p style={{ color: "red", display: disniv }} > Choisir niveau </p>
                                                        <br />
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            style={{ width: 100, height: 20, marginBottom: 80 }}
                                                            value={niveau}
                                                            onChange={e => {
                                                                setNiveau(e.target.value)
                                                                getNumerosSection(e.target.value, section)
                                                            }}
                                                        >
                                                            {
                                                                niveaux.map((n) =>
                                                                    n.type === type ?
                                                                        <MenuItem value={n.niveau} key={n.id}>
                                                                            {n.niveau}
                                                                        </MenuItem> : null
                                                                )
                                                            }
                                                        </Select>
                                                    </div>

                                                    {
                                                        type === 'Primaire' || type === 'Collège' ?
                                                            null : (
                                                                <div>
                                                                    <p style={{ fontSize: 20 }}>Section:</p>
                                                                    <br />
                                                                    <p style={{ color: "red", display: dissec }} >Choisir section</p>
                                                                    <br />
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        style={{ width: 150, height: 20, marginBottom: 80 }}
                                                                        value={section}
                                                                        onChange={async e => {
                                                                            setSection(e.target.value)
                                                                            getNumerosSection(niveau, e.target.value)
                                                                        }}
                                                                    >
                                                                        {
                                                                            sections.map((s) =>
                                                                                <MenuItem value={s.section} key={s.id}>
                                                                                    {s.section}
                                                                                </MenuItem>
                                                                            )
                                                                        }
                                                                    </Select>
                                                                </div>
                                                            )
                                                    }
                                                    <div>
                                                        <p style={{ fontSize: 20 }}>Numéro:</p>

                                                        <br />
                                                        <p style={{ color: "red", display: disnv }} >Section is needed</p>
                                                        <br />
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            style={{ width: 100, height: 20, marginBottom: 80 }}
                                                            value={numero}
                                                            onChange={e => setNumero(e.target.value)}
                                                        >
                                                            {
                                                                numeros.map((n) =>
                                                                    <MenuItem value={n["id"]} key={n.id}>
                                                                        {
                                                                            n['Numéro des classes']
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </div>
                                                </div>
                                            )
                                    }
                                                          <Basic 
                                                          
                                                          
                                                          
                                                          />
                                </>
                                    {/* <TextField
                                        id="outlined-basic"
                                        label="Nationalité"
                                        // onChange={}
                                        // value={}
                                        name="nationality"
                                        value={Nationalite}
                                        onChange={e => setNationalite(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}
                                    /> */}
                                </>
                            ) : activeStep === 1 ? (
                                <>
                                    {/* <Typography weight={'medium'} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        {baseImage != "" ? <p style={{ marginTop: 15 }}>Photo:</p> : null}
                                        <div style={baseImage != "" ? { marginTop: 15 } : null}>
                                            {
                                                baseImage != "" ?
                                                    <img src={baseImage} style={{ width: 150, height: 150, borderRadius: 150, alignSelf: 'center', borderWidth: 1, borderColor: "black" }} />
                                                    :
                                                    null
                                            }
                                        </div>
                                    </Typography>
                                    <label
                                        className={classes.uploadLabel}
                                        style={{
                                            cursor: 'pointer',
                                            marginBottom: 20,
                                            marginTop: 20,
                                            alignItems: 'center',
                                            color: 'royalblue',
                                        }}
                                    >
                                        {'Choisir une image'}
                                        <input
                                            style={{ display: 'none' }}
                                            type="file"
                                            accept={"image/*"}
                                            onChange={e => { uploadImage(e) }}
                                        />
                                    </label>

                                    <FormControl
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Parent
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={parent}
                                            name="parent"
                                            onChange={e => setParent(e.target.value)}
                                            label="Parent"
                                        >
                                            {
                                                parents.map((parentE) =>
                                                    <MenuItem value={parentE.id}>
                                                        {parentE.fullName}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        id="outlined-basic"
                                        label="Numéro de contact"
                                        onChange={handleChange}
                                        value={newUser.phoneNumber || ''}
                                        name="phoneNumber"
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    />

                                    <FormControl
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Pays
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={pays}
                                            name="pays"
                                            onChange={e => setPays(e.target.value)}
                                            label="Pays"
                                        >
                                            {
                                                countryOptions.map((country) =>
                                                    <MenuItem value={country.label}>
                                                        {country.label}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        id="outlined-basic"
                                        label="Ville"
                                        variant="outlined"
                                        onChange={handleChange}
                                        style={{ marginBottom: 35 }}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label="Adresse"
                                        variant="outlined"
                                        onChange={handleChange}
                                        style={{ marginBottom: 35 }}
                                    /> */}
                                </>
                            ) : activeStep === 2 ? (
                                <></>
                            ) : (
                                <></>
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
                                                    // handleNext();
                                                    {
                                                        // ADDemploie(fullName, ) 
                                                        getClassID()
                                                        console.log(file_name)
                                                    }
                                                }}
                                            >
                                                Ajouter
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
                                                Retour
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    handleNext();
                                                   
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

export default AjoutEmploi
