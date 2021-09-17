import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { Redirect } from 'react-router-dom'
import useStyles from './styles'
import Axios from 'axios'
import config from '../../../config'
import uuid from 'uuid/v4'


import { Button, CircularProgress } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'

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

    const [CoursM, seCoursM] = useState([]);

    useEffect(function () {
        const d = localStorage.getItem('user_id')
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

    var [Nom_produit, setNom_produit] = useState("");
    var [Prix, setPrix] = useState("");
    var [Code_produit, setCode_produit] = useState("");
    var [type, settype] = useState("");
    var [description, setdescription] = useState("");
const [displaynom,setdisplaynom]=useState("none")
const [displayprix,setdisplayprix]=useState("none")
const [displaypro,setdisplaypro]=useState("none")
const [displaytyp,setdisplaytyp]=useState("none")
const [displaydesc,setdisplaydesc]=useState("none")

    const [loading, setLoading] = useState(false)
    const [redirection, setRedirection] = useState(false)

    async function Addproduit(Nom_fornisseur, Prix, Code_produit, type, description) {
        setLoading(true)
        await Axios
            .post('http://www.pointofsaleseedigitalaency.xyz/public/api/produits',
                {
                    "Nom_fornisseur": Nom_fornisseur,
                    "Prix": Prix,
                    "Code_produit": Code_produit,
                    "type": type,
                    "description": description,
                })
            .then(
                res => {
                    setLoading(false)
                    setRedirection(true)
                }
            )
    }

    if (redirection) {
        return <Redirect to='/comptabilite/fournisseur' />
    }

    function verif () {
        var test = true
        if (Nom_produit==="" ) {
            test = false
            setdisplaynom("block")
        }
        else {setdisplaynom("none")}

        if (Prix==="" ) {
            test = false
            setdisplayprix("block")
        }
        else {setdisplayprix("none")}

        if (Code_produit==="" ) {
            test = false
            setdisplaypro("block")
        }
        else {setdisplaypro("none")}

        if (type ==="") {
            test = false
            setdisplaytyp("block")
        }
        else {setdisplaytyp("none")}

        if (description==="") {
            test = false
            setdisplaydesc("block")
        }
        else {setdisplaydesc("none")}
        return test
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
                            <h1>Ajouter un Produit</h1>
                            <br /> <br />
                            <>

                                <TextField
                                    id="outlined-basic"
                                    label={displaynom==="none"? "Nom de produit" :
                                    <p style={{color:"red"}} >Nom de produit</p>}
                                    name="Nom_prod"
                                    value={Nom_produit}
                                    onChange={e => setNom_produit(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label={displayprix==="none"? "Prix" :
                                    <p style={{color:"red"}} >Prix</p>}
                                    name="Prix"
                                    value={Prix}
                                    onChange={e => setPrix(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                    type={'textera'}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label={displaypro==="none"? "Code de Produit" :
                                    <p style={{color:"red"}} >Code de Produit</p>}
                                    name="Code_produit"
                                    value={Code_produit}
                                    onChange={e => setCode_produit(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                    type={'textera'}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label={displaytyp==="none"? "Type" :
                                    <p style={{color:"red"}} >Type</p>}
                                    name="type"
                                    value={type}
                                    onChange={e => settype(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 35 }}
                                    type={'textera'}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label={displaydesc==="none"? "Description" :
                                    <p style={{color:"red"}} >Description</p>}
                                    name="description"
                                    value={description}
                                    onChange={e => setdescription(e.target.value)}
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
                                                if (verif())
                                                {   
                                                   
                                                    Addproduit(Nom_produit, Prix, Code_produit, type, description) 
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




