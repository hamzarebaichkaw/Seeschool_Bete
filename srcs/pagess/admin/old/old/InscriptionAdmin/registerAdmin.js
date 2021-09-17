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
import { useHistory, Redirect } from 'react-router-dom'
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
    return ['Informations personnelles', 'Parent', 'Classe']
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Informations personnelles'
        case 1:
            return 'Parent'
        case 2:
            return 'Classe'
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
        address: '',
        type: '',
        niveau: '',
        section: '',
        numero: ''
    });

    const [newParent, setNewParent] = React.useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        urgencyNumber: '',
        job: '',
        address: ''
    })

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
    var [password, setpassword] = useState("azerty123");
    var [passwordParent, setPasswordParent] = useState("azerty123");

    var [Genre, setGenre] = useState("");
    var [date_naissance, setdate_naissance] = useState("");
    var [Nationalite, setNationalite] = useState("Tunisienne");
    var [idStudent, setidStudent] = useState("");
    var [address, setAddress] = useState("");
    var [tel, setTel] = useState("");
    var [telS, setTelS] = useState("");
    var [job, setJob] = useState("");



    const [CoursM, seCoursM] = useState([]);
    const [parents, setParents] = useState([
        { id: 1, fullName: 'Lotfi Mahjoub', email: 'lotfi.mahjoub@gmail.com', numTel: '25612225', numUrg: '71335226' },
        { id: 2, fullName: 'Mohamed Karboul', email: 'mkarboul@gmail.com', numTel: '95568756', numUrg: '95568757' },
        { id: 3, fullName: 'Ahlem Doghri', email: 'doghriahlem87@gmail.com', numTel: '58756842', numUrg: '58756842' },
        { id: 4, fullName: 'Mariem Chaouachi', email: 'ch.mariem@gmail.com', numTel: '22887555', numUrg: '79417000' },
        { id: 5, fullName: 'Asma Maatoug', email: 'maatooga@gmail.com', numTel: '55005504', numUrg: '79542223' },
        { id: 6, fullName: 'Malek Baccouche', email: 'malek.baccouche@outlook.com', numTel: '95075059', numUrg: '95075059' },
        { id: 7, fullName: 'Olfa Dridi', email: 'dridiolfa@yahoo.fr', numTel: '23717167', numUrg: '71441734' }
    ]);
    const [parent, setParent] = useState('');

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
        { id: 3, section: 'Economie et Gestion' },
        { id: 4, section: 'Lettre' },
        { id: 5, section: 'Sport' },
        { id: 6, section: 'Technique' }
    ])

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

        // Axios
        //     .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Parents`)
        //     .then(res => {
        //         setParents(res.data)
        //     }, 2000)
        //     .catch(() => {
        //         console.log("ERROR")
        //     });
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
    const [parentObj, setParentObj] = useState({})
    const [etat, setEtat] = useState('')
    const [show, setShow] = useState(false)
    const [etats, setEtats] = useState([
        { id: 1, etat: 'Parent Existant' },
        { id: 2, etat: 'Parent non Existant' }
    ])

    const [type, setType] = useState('')
    const [types, setTypes] = useState([
        { id: 1, type: 'Primaire' },
        { id: 2, type: 'Collège' },
        { id: 3, type: 'Secondaire' }
    ])

    const [numeros, setNumeros] = useState([
        { id: 1, num: '1' },
        { id: 2, num: '2' },
        { id: 3, num: '3' }
    ])
    const [numero, setNumero] = useState('')

    const [redirection, setRedirection] = useState(false)

    if (redirection) {
        //Affichage de la redirection
        return <Redirect to='/admin/Inscription' />;
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
                            {activeStep === 0 ? (
                                <>
                                    <TextField
                                        id="outlined-basic"
                                        label="Nom & Prénom"
                                        name="fullName"
                                        required
                                        value={fullName}
                                        onChange={e => setfullName(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        required
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
                                        // onChange={e => setpassword(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35, display: 'none' }}
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
                                            required
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
                                        format="dd-MM-yyyy"
                                        required
                                        onChange={e => setdate_naissance(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <br /><br />
                                    <TextField
                                        id="outlined-basic"
                                        label="Numéro de téléphone"
                                        required
                                        name="tel"
                                        value={tel}
                                        onChange={e => setTel(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'tel'}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Adresse"
                                        // onChange={}
                                        // value={}
                                        name="address"
                                        required
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Nationalité"
                                        // onChange={}
                                        // value={}
                                        name="nationality"
                                        required
                                        value={Nationalite}
                                        onChange={e => setNationalite(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}
                                    />
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
                                    </label> */}


                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80 }}>
                                        {
                                            etats.map((t) =>
                                                <Button style={etat === t.etat ?
                                                    { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '200px', height: '100px', padding: 30, fontSize: 20 } :
                                                    { height: '100px', fontSize: 20, padding: 30, backgroundColor: "#0E0D47", width: '200px' }}
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => { setEtat(t.etat) }}
                                                > {t.etat}
                                                </Button>
                                            )
                                        }
                                    </div>

                                    {
                                        etat === 'Parent non Existant' ?
                                            <>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Nom & Prénom"
                                                    name="fullName"
                                                    required
                                                    value={fullName}
                                                    onChange={e => setfullName(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'text'}
                                                />
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Email"
                                                    required
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
                                                    value={passwordParent}
                                                    // onChange={e => setPasswordParent(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35, display: 'none' }}
                                                    type={'password'}
                                                />
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numéro de téléphone"
                                                    required
                                                    name="tel"
                                                    value={tel}
                                                    onChange={e => setTel(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'tel'}
                                                />

                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numéro de secours"
                                                    required
                                                    name="telS"
                                                    value={telS}
                                                    onChange={e => setTelS(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'tel'}
                                                />
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Métier"
                                                    name="job"
                                                    value={job}
                                                    onChange={e => setJob(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'text'}
                                                />
                                            </> : etat === 'Parent Existant' ?
                                                <>
                                                    <FormControl
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        style={{ marginBottom: 35 }}
                                                    >
                                                        <InputLabel id="demo-simple-select-outlined-label">
                                                            Parent
                                                        </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={parent}
                                                            required
                                                            name="parent"
                                                            onChange={e => {
                                                                setParent(e.target.value)
                                                                parents.map((p) => {
                                                                    if (p.id == e.target.value)
                                                                        setParentObj(p)
                                                                })
                                                                setShow(true)
                                                            }}
                                                            label="Parent"
                                                        >
                                                            {
                                                                parents.map((p) => {
                                                                    return (
                                                                        <MenuItem value={p.id}>{p.fullName}</MenuItem>
                                                                    )
                                                                }
                                                                )
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    {
                                                        show == true ?
                                                            <>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Email"
                                                                    required
                                                                    disabled
                                                                    name="email"
                                                                    value={parentObj.email}
                                                                    variant="outlined"
                                                                    style={{ marginBottom: 35 }}
                                                                    type={'email'}
                                                                />
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Numéro de téléphone"
                                                                    required
                                                                    disabled
                                                                    name="tel"
                                                                    value={parentObj.numTel}
                                                                    variant="outlined"
                                                                    style={{ marginBottom: 35 }}
                                                                    type={'tel'}
                                                                />

                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Numéro de secours"
                                                                    required
                                                                    disabled
                                                                    name="telS"
                                                                    value={parentObj.numUrg}
                                                                    variant="outlined"
                                                                    style={{ marginBottom: 35 }}
                                                                    type={'tel'}
                                                                />
                                                            </>
                                                            : null
                                                    }
                                                </> : null
                                    }

                                    {/* <FormControl
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
                            ) : (
                                <>
                                    <div>
                                        <p style={{ fontSize: 20 }}>Type:</p>
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
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            style={{ width: 100, height: 20, marginBottom: 80 }}
                                                            value={niveau}
                                                            onChange={e => {
                                                                setNiveau(e.target.value)
                                                            }}
                                                        >
                                                            {
                                                                niveaux.map((n) =>
                                                                    n.type === type ?
                                                                        <MenuItem value={n.id} key={n.id}>
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
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        style={{ width: 150, height: 20, marginBottom: 80 }}
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
                                                            )
                                                    }
                                                    <div>
                                                        <p style={{ fontSize: 20 }}>Numéro:</p>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            style={{ width: 100, height: 20, marginBottom: 80 }}
                                                            value={numero}
                                                            onChange={e => setNumero(e.target.value)}
                                                        >
                                                            {
                                                                numeros.map((n) =>
                                                                    <MenuItem value={n.num} key={n.id}>
                                                                        {
                                                                            n['num']
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </div>
                                                </div>
                                            )
                                    }

                                    {/* <div>
                                        <p style={{ fontSize: 20 }}>Niveau:</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: 250, height: 20, marginBottom: 80 }}
                                            value={niveau}
                                            onChange={e => {
                                                setNiveau(e.target.value)
                                                if (type === "Primaire" || type === "Secondaire")
                                                    getNumerosNiveau(e.target.value)
                                            }}
                                        >
                                            {
                                                niveaux.map((n) =>
                                                    n.type === type ?
                                                        <MenuItem value={n.id} key={n.id}>
                                                            {n.niveau}
                                                        </MenuItem> : null
                                                )
                                            }
                                        </Select>
                                    </div> */}
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
                                                    // { Addclass(fullName, username, email, password, Genre, date_naissance, Nationalite) }
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
                                                    if (activeStep === steps.length - 1) {
                                                        sendNotification()
                                                        setRedirection(true)
                                                    }

                                                    // { addimg(imagestudent, idStudent) }

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
        </Grid >
    )
}

export default AddUser
