import 'date-fns';
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
import { Button, CircularProgress, Typography } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'
import { actions } from '../../../context/ManagementContext'
import { useManagementDispatch } from '../../../context/ManagementContext'
import DateFnsUtils from "@date-io/date-fns"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers"

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
    var [email, setemail] = useState("");
    var [password, setpassword] = useState("azerty123");

    var [passwordParent, setPasswordParent] = useState("azerty123");
    var [emailP, setemailP] = useState("");
    var [fullNameP, setfullNameP] = useState("");


    var [Genre, setGenre] = useState("");
    var [date_naissance, setdate_naissance] = useState("");
    var [Nationalite, setNationalite] = useState("Tunisienne");
    var [idStudent, setidStudent] = useState("");
    var [address, setAddress] = useState("");
    var [tel, setTel] = useState("");
    var [telP, setTelP] = useState("");
    var [telS, setTelS] = useState("");
    var [job, setJob] = useState("");


    const [loading, setLoading] = useState(false)
    const [CoursM, seCoursM] = useState([]);
    const [parents, setParents] = useState([]);
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
        { id: 2, section: 'Mathématiques' },
        { id: 3, section: 'Economie et Gestion' },
        { id: 4, section: 'Lettre' },
        { id: 5, section: 'Sport' },
        { id: 6, section: 'Technique' }
    ])

    const [studentImage, setStudentImage] = useState('');

    useEffect(() => {
        getAllParents()
    }, []);

    const getAllParents = async () => {
        const d = localStorage.getItem('user_id')
        await Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Parents`)
            .then(res => {
                setParents(res.data)
            }, 2000)
            .catch((e) => {
                console.log(e)
            });
    }

    const [classID, setClassID] = useState()

    const getClassID = async () => {
        setLoading(true)
        await Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/IDclass/${type}/${niveau}/${section}/${numero}`)
            .then(async res => {
                let id_classe = res.data[0].id
                addStudent(id_classe)
            }).catch(e => {
                console.log(e)
            })
    }

    const addStudent = async (classe_id) => {
        await Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/ApiP/AddStudents',
                {
                    "fullName": fullName,
                    "username": email,
                    "email": email,
                    "password": "azerty123",
                    "Genre": Genre,
                    "date_naissance": selectedDate,
                    "phone": tel,
                    "adress": address,
                    "Nationalite": Nationalite,
                    "id_class": classe_id
                })
            .then(async resultat => {
                let resultat_eleve = resultat.data
                addParent(classe_id, resultat_eleve)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const addParent = async (classe_id, data) => {
        if (etat == 'Parent non Existant') {
            await Axios
                .post('http://www.pointofsaleseedigitalaency.xyz/public/ApiP/AddParent',
                    {
                        "fullName": fullNameP,
                        "email": emailP,
                        "Urgence": telS,
                        "password": "azerty123",
                        "job": job,
                        "phone": telP,
                        "id_Student": data[0].id
                    })
                .then(async result => {
                    modifyStudentClass1(classe_id, result)
                }
                )
                .catch(e => {
                    console.log(e)
                })
        } else if (etat == 'Parent Existant') {
            await Axios
                .put(`http://www.pointofsaleseedigitalaency.xyz/public/ApiP/EditParent/${parent}`,
                    {
                        "id_student": data[0].id
                    })
                .then(
                    async result => {
                        modifyStudentClass2(classe_id, result)
                    }
                )
                .catch(e => {
                    console.log(e)
                })
        } else
            alert('Veuillez choisir si le parent existe dans le système ou pas')
    }

    const modifyStudentClass1 = async (classe_id, result) => {
        await Axios
            .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/students/${result.data.id_Student}`,
                {
                    "classe": "/public/api/classes/" + classe_id
                })
            .then(
                result => {
                    setLoading(false)
                    sendNotification()
                    setRedirection(true)
                }
            )
            .catch(e => {
                console.log(e)
            })
    }
    const modifyStudentClass2 = async (classe_id, result) => {
        await Axios
            .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/students/${result.data.id_student}`,
                {
                    "classe": "/public/api/classes/" + classe_id
                })
            .then(
                result => {
                    setLoading(false)
                    sendNotification()
                    setRedirection(true)
                }
            )
            .catch(e => {
                console.log(e)
            })
    }

    function addimg(imagestudent, idStudent) {
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

    const [numeros, setNumeros] = useState([])
    const [numero, setNumero] = useState('')

    const [redirection, setRedirection] = useState(false)
    const [displaynom, setDisplaynom] = useState("none")
    const [displayemail, setDisplayemail] = useState("none")
    const [displaygenre, setDisplaygenre] = useState("none")
    const [displaydate, setDisplaydate] = useState("none")

    const [displaynum, setDisplaynum] = useState("none")
    const [displayadr, setDisplayadr] = useState("none")
    const [displaynat, setDisplaynat] = useState("none")
    const [dispetat, setDispetat] = useState("none")
    const [par, setPar] = useState("none")
    const [desnom, setdesnom] = useState("none")
    const [desmail, setmail] = useState("none")
    const [disnum, setdisnum] = useState("none")
    const [disnumsuc, setdisnumsuc] = useState("none")
    const [dismet, setdismet] = useState("none")
    const [distyp, setDistyp] = useState("none")
    const [disniv, setDisniv] = useState("none")
    const [dissec, setdissec] = useState("none")
    const [disnv, setdisnv] = useState("none")
    const [Displaydateerro, setDisplaydateerro] = useState("none")
    const [selectedDate, setSelectedDate] = useState(
        new Date("1995-01-01")
    )

    if (redirection) {
        //Affichage de la redirection
        return <Redirect to='/admin/Inscription' />;
    }

    function verif1(nom, email, genre, date, num, adr, nat) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var words

        var test = true
        console.log(date.getTime())
        if (nom === '') {
            setDisplaynom("block")
            test = false
        } else (setDisplaynom("none"))

        if (email === '') {
            setDisplayemail("block")
            test = false
        }
        else if (!(email.match(mailformat))) {
            setDisplayemail("block")
            test = false
        } else (setDisplayemail("none"))

        if (genre === '') {
            setDisplaygenre("block")
            test = false
        } else (setDisplaygenre("none"))

        if (date.getTime() === NaN) {
            setDisplaydate("inline-block")
            test = false
        } else {


            if (date.getFullYear() > 2006 || date.getFullYear() < 1995) {
                setDisplaydate("inline-block")
                setDisplaydateerro("inline-block")
                console.log(date)

                test = false
            } else {
                setDisplaydate("none")
            }
        }



        if (num === '') {
            setDisplaynum("block")
            test = false
        } else (setDisplaynum("none"))

        if (adr === '') {
            setDisplayadr("block")
            test = false
        } else (setDisplayadr("none"))

        if (nat === '') {
            setDisplaynat("block")
            test = false
        } else (setDisplaynat("none"))


        return test
    }

    function verif2(eta) {
        var test = true
        if (eta === "") {
            test = false
            setDispetat("block")
        } else { setDispetat("none") }


        return test
    }

    function verifexist(par) {
        var test = true
        if (par === "") {
            setPar("block")
            test = false
        } else {
            setPar("none")
        }
        return (test)
    }

    function verifnoexist(fulna, ema, telf, telSs, jobs) {
        var test = true
        if (fulna === "") {
            test = false
            setdesnom("block")
        } else { setdesnom("none") }

        if (ema === "") {
            test = false
            setmail("block")
        } else { setmail("none") }

        if (telf === "") {
            test = false
            setdisnum("block")
        } else { setdisnum("none") }

        if (telSs === "") {
            test = false
            setdisnumsuc("block")
        } else { setdisnumsuc("none") }

        if (jobs === "") {
            test = false
            setdismet("block")
        } else { setdismet("none") }
        return test
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

    const getNumerosSection = async (niv, sec) => {
        await Axios.get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/Numerosclasses/${niv}/${sec}`)
            .then(res => {
                setNumeros(res.data)
            }, 2000)
            .catch((e) => {
                console.log(e)
            })
    }


    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                            {activeStep === 0 ? (
                                <>

                                    <TextField

                                        id="outlined-basic"
                                        label={displaynom === "none" ? "Nom & Prénom" :
                                            <p style={{ color: "red", display: displaynom }} >Nom & Prénom</p>}
                                        name="fullName"
                                        value={fullName}
                                        onChange={e => setfullName(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}

                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label={displayemail === "none" ? "Email" :
                                            <p style={{ color: "red", display: displayemail }} >Email</p>}

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
                                            {displaygenre === "none" ? "Genre" :
                                                <p style={{ color: "red", display: displaygenre }} >Genre</p>}
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



                                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justifyContent="space-around">
                                            <KeyboardDatePicker
                                                style={{ width: 600 }}
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date de naissance"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                                maxDate="2007-12-31"
                                                minDate="1995-01-01"
                                                maxDateMessage="La doit doit être inférieur à 31-12-2007"
                                                maxDateMessage="La doit doit être superieur  à 01-01-1995"
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider> */}



                                    <br /><br />

                                    <TextField
                                        id="outlined-basic"
                                        label={displaynum === "none" ? "Numéro de téléphone" :
                                            <p style={{ color: "red", display: displaynum }} >Numéro de téléphone</p>}

                                        name="tel"
                                        value={tel}
                                        onChange={e => setTel(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'tel'}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label={displayadr === "none" ? "Adresse" :
                                            <p style={{ color: "red", display: displayadr }} >Adresse</p>}

                                        // onChange={}
                                        // value={}
                                        name="address"

                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        variant="outlined"
                                        style={{ marginBottom: 35 }}
                                        type={'text'}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label={displaynat === "none" ? "Nationalité" :
                                            <p style={{ color: "red", display: displaynat }} >Nationalité</p>}
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
                                    <center><p style={{ color: "red", fontSize: 20, display: dispetat, marginBottom: 35 }} >Parent exist</p> </center>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80 }}>

                                        {
                                            etats.map((t) =>
                                                <Button style={etat === t.etat ?
                                                    { color: 'white', borderWidth: 1, backgroundColor: 'rgb(157, 2, 8)', borderColor: "#0E0D47", width: '200px', height: '100px', padding: 30, fontSize: 20 } :
                                                    { height: '100px', fontSize: 20, padding: 30, backgroundColor: "#0E0D47", width: '200px' }}
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        setEtat(t.etat)
                                                        setDispetat("none")
                                                    }}
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
                                                    label={desnom === "none" ? "Nom & Prénom" :
                                                        <p style={{ color: "red", display: desnom }} >Nom & Prénom</p>}
                                                    name="fullName"

                                                    value={fullNameP}
                                                    onChange={e => setfullNameP(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'text'}
                                                />

                                                <TextField
                                                    id="outlined-basic"
                                                    label={desmail === "none" ? "Email" :
                                                        <p style={{ color: "red", display: desmail }} >Email</p>}

                                                    name="email"
                                                    value={emailP}
                                                    onChange={e => setemailP(e.target.value)}
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
                                                    label={disnum === "none" ? "Numéro de téléphone" :
                                                        <p style={{ color: "red", display: disnum }} >Numéro de téléphone</p>}

                                                    name="tel"
                                                    value={telP}
                                                    onChange={e => setTelP(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'tel'}
                                                />

                                                <TextField
                                                    id="outlined-basic"
                                                    label={disnumsuc === "none" ? "Numéro de secours" :
                                                        <p style={{ color: "red", display: disnumsuc }} >Numéro de secours</p>}

                                                    name="telS"
                                                    value={telS}
                                                    onChange={e => setTelS(e.target.value)}
                                                    variant="outlined"
                                                    style={{ marginBottom: 35 }}
                                                    type={'tel'}
                                                />

                                                <TextField
                                                    id="outlined-basic"
                                                    label={dismet === "none" ? "Métier" :
                                                        <p style={{ color: "red", display: dismet }} >Métier</p>}
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

                                                        <br />
                                                        <InputLabel id="demo-simple-select-outlined-label">

                                                            {par === "none" ? "Parent" : <p style={{ color: "red", fontSize: 15, display: par }} >Parent</p>}
                                                        </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={parent}

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

                                                                    disabled
                                                                    name="tel"
                                                                    value={parentObj.phone}
                                                                    variant="outlined"
                                                                    style={{ marginBottom: 35 }}
                                                                    type={'tel'}
                                                                />

                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Numéro de secours"

                                                                    disabled
                                                                    name="telS"
                                                                    value={parentObj.UrgencePhone}
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
                                                                    <MenuItem value={n["Numéro des classes"]} key={n.id}>
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
                                                    if (verif1(fullName, email, Genre, selectedDate, tel, address, Nationalite)) { handleNext(); }
                                                    // { Addclass(fullName, username, email, password, Genre, selectedDate, Nationalite) }
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

                                                    if (activeStep === steps.length - 1) {
                                                        if (verif3(type, niveau, section, numero)) {
                                                            getClassID()
                                                        }
                                                    } else {
                                                        if (verif2(etat)) {
                                                            if (verifexist(parent)) { handleNext(); }
                                                            else if (verifnoexist(fullName, email, tel, telS, job)) { { handleNext(); } }
                                                        }
                                                    }
                                                }}
                                            >
                                                {activeStep === steps.length - 1
                                                    ? loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Ajouter'
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
