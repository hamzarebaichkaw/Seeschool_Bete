import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { useHistory, Redirect } from 'react-router-dom'
import useStyles from './styles'
import { toast } from 'react-toastify'
import Axios from 'axios'
import config from '../../../config'
import { CircularProgress } from "../../../components/Wrappers/Wrappers";
import Notification from "../../../components/Notification/Notification";

import { Button } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'

import { actions } from '../../../context/ManagementContext'
import {
    useManagementDispatch,
} from '../../../context/ManagementContext'

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


    const isStepSkipped = step => {
        return skipped.has(step)
    }

    var managementDispatch = useManagementDispatch()
    const history = useHistory()
    const doSubmit = (id, data) => {
        actions.doCreate(data, history)(managementDispatch);

    };

    var [idStudent, setidStudent] = useState("");
    const [CoursM, seCoursM] = useState([]);
const [displaynom,setdisplaynom]=useState(true)
const [displayphone,setdisplayphone]=useState(true)
const [displayemail,setdisplayemail]=useState(true)
const [displayadress,setdisplayadress]=useState(true)

function verif () {
    var test =true 
    if (Nom_fornisseur ==="") {
        test = false
        setdisplaynom(false)
    }
    else {setdisplaynom(true)}
    
    if (phone ==="") {
        test = false
        setdisplayphone(false)
    }
    else {setdisplayphone(true)}

    if (email ==="") {
        test = false
        setdisplayemail(false)
    }
    else {setdisplayemail(true)}

    if (Adress ==="") {
        test = false
        setdisplayadress(false)
    }
    else {setdisplayadress(true)}
    return (test)
}

    useEffect(function () {
        const d = localStorage.getItem('user_id')
        Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
            .then(res => {
                seCoursM(res.data.result)
            }, 2000)
            .catch(() => {
                console.log("ERROR")
            });
    }, []);

    var [Nom_fornisseur, setNom_fornisseur] = useState('')
    var [phone, setphone] = useState('')
    var [email, setemail] = useState('')
    var [Adress, setAdress] = useState('')
    const [loading, setLoading] = useState(false)
    const [redirection, setRedirection] = useState(false)

    function sendNotification() {

        const componentProps = {
            type: "feedback",
            message: "Fournisseur ajouté avec succée!",
            variant: "contained",
            color: "success"
        }

        const options = {
            type: "info",
            position: toast.POSITION.TOP_RIGHT,
            progressClassName: classes.progress,
            className: classes.notification,
            timeOut: 1000
        }

        return toast(
            <Notification
                {...componentProps}
                className={classes.notificationComponent}
            />,
            options
        );
    }

    async function Addfournisseur(Nom_fornisseur, phone, email, Adress,) {
        setLoading(true)
        await Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/fournisseurs',
                {
                    "Nom_fornisseur": Nom_fornisseur,
                    "phone": phone,
                    "email": email,
                    "Adress": Adress,
                })
            .then(
                res => {
                    console.log(res.data)
                    setLoading(false)
                    sendNotification()
                    setRedirection(true)
                }
            )
    }

    function addimg(imagestudent, idStudent) {

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

    if (redirection) {
        return <Redirect to='/comptabilite/fournisseur' />
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget>
                    <Grid item justify={'center'} container>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={600}
                        >
                            <h1>Ajouter un Fournisseur</h1>
                            <br />
                            <>
                                <TextField
                                    id="outlined-basic"
                                    label={displaynom? "Nom fornisseur" :
                                    <p style={{color:"red"}} >Nom fornisseur</p>}
                                    name="Nom_fornisseur"
                                    value={Nom_fornisseur}
                                    onChange={e => setNom_fornisseur(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label={displayphone? "Numéro de telephone" :
                                    <p style={{color:"red"}} >Numéro de telephone</p>}
                                    name="phone"
                                    value={phone}
                                    onChange={e => setphone(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                    type={'textera'}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label={displayemail? "E-mail" :
                                    <p style={{color:"red"}} >E-mail</p>}
                                    name="email"
                                    value={email}
                                    onChange={e => setemail(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                    type={'textera'}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label={displayadress? "Adress" :
                                    <p style={{color:"red"}} >Adress</p>}
                                    name="Adress"
                                    value={Adress}
                                    onChange={e => setAdress(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                    type={'textera'}
                                />
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
                                            style={{ backgroundColor: '#ba181b' }}
                                            onClick={() => {
                                                if (verif()) {
                                                    console.log("yo")
                                                Addfournisseur(Nom_fornisseur, phone, email, Adress)
                                            }
                                            }}
                                        >
                                            {loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Enregitsrer'}
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




