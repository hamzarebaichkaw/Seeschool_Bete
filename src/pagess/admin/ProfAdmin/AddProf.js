//AddProfs
import makeAnimated from 'react-select/animated';
import React, { useState, useEffect } from 'react'
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
import { Select } from "@material-ui/core";
import { Multiselect } from 'multiselect-react-dropdown';

import Notification from "../../../components/Notification";

import { Button, Typography } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'

import { actions } from '../../../context/ManagementContext'
import {
  useManagementDispatch,
} from '../../../context/ManagementContext'
import { Refresh, SelectAll } from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"



function getSteps() {
  return ['Information de Professeur', 'Niveau',]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Créer un nouveau compte '
    case 1:
      return 'Ajouter des détails de l\'utilisateur'


  }
}
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
    { id: 7, section: 'Mathématiques' },
    { id: 3, section: 'Economie et Gestion' },
    { id: 4, section: 'Lettre' },
    { id: 5, section: 'Sport' },
    { id: 6, section: 'Technique' }
  ])

  const data = [
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

  const [otpdata] = useState([
    { type: 'Primaire' },
    { type: 'Collège' },
    { type: 'Secondaire' }

  ])

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2007-12-31")
  )

  const [options] = useState(data)

  const data2 = [
    { id: 1, niveau: 'Math', },
    { id: 2, niveau: 'Info', },
    { id: 3, niveau: 'Physique', },
    { id: 4, niveau: 'anglais', },
    { id: 5, niveau: 'arabe', },

  ]
  const [options2] = useState(data2)
  const [section, setSection] = useState('0')
  const [type, setType] = useState()

  const [displaynom, setDiscplaynom] = useState("none")
  const [displayuser, setdisplayuser] = useState("none")
  const [displayemail, setdisplayemail] = useState("none")
  const [displayphone, setdisplayphone] = useState("none")
  const [displaydate, setdisplaydate] = useState("none")
  const [displaygenre, setdisplaygenre] = useState("none")
  const [displaynat, setdisplaynat] = useState("none")
  const [displaytype, setdisplaytype] = useState("none")
  const [displaymat, setdisplaymat] = useState("none")
  const [displayniv, setdisplayniv] = useState("none")
  const [displaysec, setdisdisplaysec] = useState("none")
  const [displaydesc, setdisplaydesc] = useState("none")

  function verif2(ty, ni, mat, sec, des) {
    var test = true
    if (ty.length === 0) {
      test = false
      setdisplaytype("block")
    } else { setdisplaytype("none") }

    if (ni.length === 0) {
      test = false
      setdisplayniv("block")
    } else { setdisplayniv("none") }

    if (mat.length === 0) {
      test = false
      setdisplaymat("block")
    } else { setdisplaymat("none") }

    if (nivsecon()) {
      if (sec === '0') {
        test = false
        setdisdisplaysec("block")
      } else { setdisdisplaysec("none") }
    }

    if (des === '') {
      test = false
      setdisplaydesc("block")
    } else { setdisplaydesc("none") }

    console.log(test)
    return (test)
  }

  function verif1(Name, usern, email, ph, Ge, dat, Nat) {
    var test = true
    if (Name === "") {
      test = false
      setDiscplaynom("block")
    } else { setDiscplaynom("none") }

    if (email === "") {
      test = false
      setdisplayemail("block")
    } else { setdisplayemail("none") }
    if (ph === "") {
      test = false
      setdisplayphone("block")
    } else { setdisplayphone("none") }

    if (Ge === "") {
      test = false
      setdisplaygenre("block")
    } else { setdisplaygenre("none") }
    if (dat.getTime() === NaN) {
      test = false
      setdisplaydate("block")
    } else { setdisplaydate("none") }
    if (Nat === "") {
      test = false
      setdisplaynat("block")
    } else { setdisplaynat("none") }

    return (test)

  }

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
  var [Nationalite, setNationalite] = useState("Tunisienne");
  var [idProf, setidProf] = useState("");

  var [phone, setphone] = useState("");
  var [niveau, setniveau] = useState("");
  var [sous_niveau, setsous_niveau] = useState("");
  var [description, setdescription] = useState("");
  const [nvi, setNiv] = useState([])
  const [types, setTypes] = useState([])
  const [selniv, setselniv] = useState([])
  const [mats, setmats] = useState([])
  const onSelectS2 = (da) => {

    setmats(da)
  }

  const onSelect = (da) => {
    var t = []
    setTypes(da)
    data.map(d => {

      da.map(e => {

        if (d.type === e.type) {
          t.push(d)
          console.log("added")
        }
      }

      )
      setNiv(t)
      console.log(nvi)

    })

  }
  function nivsecon() {
    var test = false
    nvi.map(d => {
      if (d.type === "Secondaire") {
        test = true
      }
    })
    return (test)
  }

  const onSelectS = (da) => {
    var t = []
    setselniv(da)
  }

  async function ADDPROF(fullName, username, email, Genre, selectedDate, Nationalite) {
    await Axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/api/users',
        {
          "fullName": fullName,
          "username": username,
          "email": email,
          "password": "API_PASS_HERE",
          "Genre": Genre,
          "date_naissance": date_naissance,
          "Nationalite": Nationalite
        })
      .then(
        res => {
          console.log(res.data)
          setidProf(res.data.id)
        }
      )

  }

  function AddProf(phone, niveau, sous_niveau, description) {
    Axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/api/enseignants',
        {
          "phone": phone,
          "niveau": niveau,
          "sous_niveau": sous_niveau,
          "description": description,
        })
      .then(
        res => {
          console.log(res.data)
          setidProf(res.data.id)
        }
      )
  }

  const [genlist, setgenlist] = useState([{ sex: "Homme" }, { sex: "Femme" }])
  const [redirection, setRedirection] = useState(false)
  if (redirection) {
    //Affichage de la redirection
    return <Redirect to='/Professeur/dashboard' />;
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
                    label={displaynom === "none" ? "Nom & Prénom" : <p style={{ color: "red", display: displaynom }} >Nom & Prénom</p>}
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
                    label={displayemail === "none" ? "E-mail" :
                      <p style={{ color: "red", display: displayemail }} >E-mail</p>}
                    // onChange={}
                    // value={}
                    name="email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                    variant="outlined"
                    style={{ marginBottom: 35 }}
                    helperText=""
                    type={'textera'}
                  />

                  <TextField
                    id="outlined-basic"
                    label={displayphone === "none" ? "Numéro de Telephone" :
                      <p style={{ color: "red", display: displayphone }} >Numéro de Telephone</p>}
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
                    style={{ marginBottom: 35, display: "none" }}
                    helperText=""
                    defaultValue="Professeur "
                  />

                  <div>
                    {displaygenre === "none" ? <p style={{ fontSize: 15 }}>Genre</p> :
                      <p style={{ color: "red", display: displaygenre }} >Genre</p>}
                    <Select
                      style={{ width: 600, height: 20, marginBottom: 40 }}

                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue="Genre"
                      is
                      onChange={e => {
                        setGenre(e.target.value)
                      }}

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

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <br />
                  <br />

                  <TextField
                    id="outlined-basic"
                    label={displaynat === "none" ? "Nationalite" :
                      <p style={{ color: "red", display: displaynat }} >Nationalite</p>}

                    name="tunisienne"
                    value={Nationalite}
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

                    {displaytype === "none" ? <p style={{ fontSize: 15 }}>Type</p> :
                      <p style={{ color: "red", fontSize: 15, display: displaytype }} >Type</p>}
                    <Multiselect
                      style={{ width: 600, height: 20, marginBottom: 80 }}
                      onSelect={onSelect}
                      onRemove={onSelect}

                      options={otpdata}
                      displayValue="type" />

                  </div>
                  {nvi.length === 0 ? <></> :
                    <div>

                      {displayniv === "none" ? <p style={{ fontSize: 15 }}>Niveau</p> :
                        <p style={{ color: "red", fontSize: 15, display: displayniv }} >Niveau</p>}

                      <Multiselect
                        style={{ width: 600, height: 20, marginBottom: 80 }}
                        onSelect={onSelectS}
                        onRemove={onSelectS}

                        options={nvi}
                        displayValue="niveau" />

                    </div>
                  }
                  <br />
                  <br />

                  <div>
                    {displaymat === "none" ? <p style={{ fontSize: 15 }}>Liste des matière</p> :
                      <p style={{ color: "red", fontSize: 15, display: displaymat }} >Liste des matière</p>}
                    <Multiselect
                      style={{ width: 600, height: 20, marginBottom: 80 }}
                      options={options2}
                      onSelect={onSelectS2}
                      onRemove={onSelectS2}
                      displayValue="niveau" />
                  </div>
                  <br />
                  <br />

                  {nivsecon() ?
                    <div>
                      {displaysec === "none" ? <p style={{ fontSize: 15 }}>Section:</p> :
                        <p style={{ color: "red", fontSize: 15, display: displaysec }} >Section:</p>}

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
                    : <></>}

                  <TextField
                    id="outlined-basic"
                    label={displaydesc === "none" ? "Description" :
                      <p style={{ color: "red", display: displaydesc }} >Description</p>}
                    variant="outlined"
                    value={description}
                    onChange={e => setdescription(e.target.value)}
                    // value={newUser.email || ''}
                    style={{ marginBottom: 35 }}
                    helperText={''}

                  />

                  <br />
                  <br />


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
                          if (verif1(fullName, username, email, phone, Genre, selectedDate, Nationalite)) {
                            handleNext();
                            ADDPROF(fullName, username, email, password, Genre, selectedDate, Nationalite)
                          }
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
                        style={{ height: 35 }}
                        onClick={handleBack}
                        variant={'outlined'}
                        color={'primary'}
                      >
                        Retourner
                      </Button>
                      <Button
                        style={{ height: 35 }}
                        variant="contained"
                        color="primary"
                        onClick={() => {

                          console.log(activeStep)
                          if (activeStep === steps.length - 1) {
                            if (verif2(types, selniv, mats, section, description)) {
                              console.log("h");
                              //   AddProf(phone,niveau,sous_niveau,description)
                              sendNotification();
                              setRedirection(true)

                            }

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
