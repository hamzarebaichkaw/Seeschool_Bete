import React, { useEffect, useState, useMemo } from 'react'
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
import { useManagementDispatch } from '../../../context/ManagementContext'

import countryList from 'react-select-country-list'


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
const AddUser = () => {
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
        const d = sessionStorage.getItem('user_id')
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

    function Addclass(fullName, username, email, password, Genre, date_naissance, Nationalite) {
        Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/users',
                {
                    "fullName": fullName,
                    "username": username,
                    "email": email,
                    "password": password,
                    "Genre": Genre,
                    "date_naissance": date_naissance,
                    "Nationalite": Nationalite
                })
            .then(
                res => {
                    console.log(res.data)
                    setidStudent(res.data.id)
                }
            )
    }

    function addimg(imagestudent, idStudent
    ) {
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
                                    <StepLabel {...labelProps} classes={{ completed: classes.stepCompleted }}>
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
                            <h1>Inscrire un élève</h1>
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
                                        type={'text'}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        // onChange={}
                                        // value={}
                                        name="email"
                                        value={email}
                                        onChange={e => setemail(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'email'}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Mot de passe"
                                        // onChange={}
                                        // value={}
                                        name="password"
                                        value={password}
                                        onChange={e => setpassword(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'password'}
                                    />
                                    <FormControl
                                        variant="outlined"
                                        onChange={handleChange}
                                        style={{ marginBottom: 35 }}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Genre
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={Genre}
                                            defaultValue="Garçon"
                                            name="genre"
                                            onChange={e => setGenre(e.target.value)}
                                            label="Genre"
                                        >
                                            <MenuItem value="f">Fille</MenuItem>
                                            <MenuItem value="g">Garçon</MenuItem>
                                        </Select>
                                    </FormControl>

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
                                    <TextField
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
                                    />
                                </>
                            ) : activeStep === 1 ? (
                                <>
                                    <Typography weight={'medium'} style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                                    />
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
                                                    handleNext();
                                                    { Addclass(fullName, username, email, password, Genre, date_naissance, Nationalite) }
                                                }}
                                            >
                                                Suivant
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
                                                    { addimg(imagestudent, idStudent) }
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

export default AddUser
