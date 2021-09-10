import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Axios from 'axios'
import { Button, Typography, CircularProgress } from '../../../components/Wrappers/Wrappers'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { Redirect } from 'react-router-dom'
import Notification from "../../../components/Notification";
import { toast } from "react-toastify";
import useStyles from './styles'


export default function AddClasse() {

    const classes = useStyles()

    const [type, setType] = useState('')
    const [niveau, setNiveau] = useState('')
    const [section, setSection] = useState('0')
    const [capacity, setCapacity] = useState('')

    const [types, setTypes] = useState([
        { id: 1, type: 'Primaire' },
        { id: 2, type: 'Collège' },
        { id: 3, type: 'Secondaire' }
    ])

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
    const [numero, setNumero] = useState('')
    const [redirection, setRedirection] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        const d = localStorage.getItem('user_id')
        Axios
            .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ClassesAdmin`)
            .then(res => {
                // seCoursM(res.data.result)
            }, 2000)
            .catch(() => {
                console.log("ERROR")
            });
    }, []);

    const [showwText, setShowwText] = useState(false);

    async function Addclass() {
        setLoading(true)
        await Axios
            .post(`http://www.pointofsaleseedigitalaency.xyz/public/api/classes`,
                {
                    "Section": section,
                    "Nom": numero,
                    "sousNiveau": niveau,
                    "Capcite": capacity,
                    "Niveau": type
                })
            .then((res) => {
                sendNotification(niveau, section, numero);
                setRedirection(true)
            })
            .catch((error) => { console.log(error) })
        setLoading(false)
    }

    function sendNotification(niveau, section, numero) {
        const componentProps = {
            type: "feedback",
            message: "Classe ajoutée avec succée",
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

    if (redirection) {
        return <Redirect to='/admin/classes' />;
    }

    return (
        <Grid item justify={'center'} container>
            <Box
                display={'flex'}
                flexDirection={'column'}
                width={1000}
            >
                <Typography
                    variant={'h5'}
                    weight={'medium'}
                    style={{ marginBottom: 30 }}
                >
                </Typography>
                <h1>Ajouter une Classe</h1>
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 80, marginTop: 50 }}>
                        {
                            types.map((t) =>
                                <Button style={
                                    type === t.type ?
                                        {
                                            color: '#0E0D47',
                                            backgroundColor: 'rgb(157, 2, 8)',
                                            borderWidth: 1,
                                            borderColor: "#0E0D47",
                                            width: '300px',
                                            height: 100,
                                            fontSize: 30
                                        } :
                                        { backgroundColor: "#0E0D47", width: '300px', height: 100, fontSize: 30 }
                                }
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        setType(t.type)
                                        setShowwText(true)
                                    }}
                                > {t.type}
                                </Button>
                            )
                        }
                    </div>
                    {
                        showwText ?
                            <div style={{ textAlign: 'center' }} >
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div>
                                        <p>Niveau:</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: 200, height: 20, marginBottom: 80 }}
                                            value={niveau}
                                            onChange={e => {
                                                setNiveau(e.target.value)
                                            }}
                                        >
                                            {
                                                niveaux.map((n) =>
                                                    n.type === type ?
                                                        <MenuItem value={n.niveau} key={n.id}>
                                                            {
                                                                n.niveau
                                                            }
                                                        </MenuItem> : null
                                                )
                                            }
                                        </Select>
                                    </div>

                                    {
                                        type === 'Primaire' || type === 'Collège' ?
                                            null : (
                                                <div>
                                                    <p>Section:</p>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        style={{ width: 200, height: 20, marginBottom: 80 }}
                                                        value={section}
                                                        onChange={e => setSection(e.target.value)}
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
                                </div>
                                <TextField
                                    id="outlined-basic"
                                    label="Numéro"
                                    name="numero"
                                    value={numero}
                                    onChange={e => { setNumero(e.target.value) }}
                                    variant="outlined"
                                    style={{ marginBottom: 80 }}
                                    type={'text'}
                                />
                                <br />
                                <br />
                                <TextField
                                    id="outlined-basic"
                                    label="Capacité"
                                    name="capacity"
                                    value={capacity}
                                    onChange={e => { setCapacity(e.target.value) }}
                                    variant="outlined"
                                    style={{ marginBottom: 80 }}
                                    type={'number'}
                                />
                                <br /><br />
                                <Button style={{ backgroundColor: "#0E0D47", width: 500 }}
                                    color="primary"
                                    variant="contained"
                                    onClick={() => { Addclass() }}
                                >
                                    {loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Ajouter une Classe'}
                                </Button>
                            </div>
                            : null
                    }
                </>
            </Box>

        </Grid>
    )
}