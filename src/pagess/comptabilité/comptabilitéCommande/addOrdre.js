import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Redirect } from 'react-router-dom'
import useStyles from './styles'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown';

import Notification from "../../../components/Notification";

import { Button, CircularProgress, Typography } from '../../../components/Wrappers'
import Widget from '../../../components/Widget'

const AddFournisseur = () => {
  const classes = useStyles()

  function sendNotification() {
    const componentProps = {
      type: "feedback",
      message: "Order ajouté!",
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
  const onSelect = (da) => {

    setProduits(da)
  }

  const [displayprod, setdisplayprod] = useState("none")
  const [displayfor, setdisplayfor] = useState("none")
  const [displaytype, setdisplaytype] = useState("none")
  const [displayde, setdisplayde] = useState("none")
  var [idStudent, setidStudent] = useState("");
  const [Produits, setProduits] = useState([]);
  const [fornisseurs, setfornisseurs] = useState("");
  const [Produit, setProduit] = useState([]);
  const [fornisseur, setfornisseur] = useState([]);
  const [Quantité, setQuantité] = useState("");
  const [displayguan, setDisplayguan] = useState("none");
  const [loadingProducts, setLoadingProducts] = useState(false)

  const [types, setTypes] = useState([
    { id: 1, type: 'Cantine' },
    { id: 2, type: 'Transport' },
    { id: 3, type: 'Sanitaire' },
    { id: 4, type: 'Imprimerie' },
    { id: 5, type: 'Autre' },
  ])

  const [type, setType] = useState("")

  async function updatelistpord(id) {
    setLoadingProducts(true)
    await Axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/APIUser/ProduitByFornisseur/${id}`)
      .then(res => {
        setProduit(res.data)
      })
    setLoadingProducts(false)
  }

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = async () => {
    const d = localStorage.getItem('user_id')
    await Axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/produits`)
      .then(res => {
        setProduit(res.data.result)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }

  const getFournisseur = async () => {
    const d = localStorage.getItem('user_id')
    await Axios
      .get(`http://www.pointofsaleseedigitalaency.xyz/public/api/fournisseurs`)
      .then(res => {
        setfornisseur(res.data)
      }, 2000)
      .catch(() => {
        console.log("ERROR")
      });
  }

  useEffect(() => {
    getFournisseur()
  }, []);

  let arrayQte = new Array(Produits.length)

  async function AddOrdre(fornisseurs, Produits, type, Quantité) {
    let arr = new Array()

    Produits.map(p => {
      arr.push("/public/api/produits/" + p.id)
    })

    let four = "/public/api/fournisseurs/" + fornisseurs

    await Produits.map(async (p, i) => {
      if ((arrayQte[i] > 0)) {
        await Axios
          .put(`http://www.pointofsaleseedigitalaency.xyz/public/api/produits/${p.id}`,
            {
              "qunatite": arrayQte[i]
            }
          )
          .then(async res => {
            
          })
          .catch(e => {
            console.log(e)
          })
      }
    })

    let now = new Date()
    let today = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate()
    console.log(today)
    await Axios
      .post('http://www.pointofsaleseedigitalaency.xyz/public/api/orders', {
        "Produit": arr,
        "fornisseur": four,
        "Created_at": today,
        "status": "En_Cours"
      })
      .then(
        res => {
          // sendNotification()
          setRedirection(true)
        }
      )
      .catch(e => {
        console.log(e)
      })
  }

  const [redirection, setRedirection] = useState(false)
  if (redirection) {
    //Affichage de la redirection
    return <Redirect to='/comptabilite/commande' />;
  }

  function verif() {
    var test = true
    console.log(Produit)
    console.log(fornisseur)
    if (Produits.length === 0) {
      test = false
      setdisplayprod("block")



    } else { setdisplayprod("none") }

    if (fornisseurs === "") {
      test = false
      setdisplayfor("block")
      console.log("hello")

    } else { setdisplayfor("none") }

    if (Quantité === "") {
      test = false
      setDisplayguan("block")

    } else { setDisplayguan("none") }

    if (type === "") {
      test = false
      setdisplaytype("block")

    } else { setdisplaytype("none") }

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
              <Typography
                variant={'h5'}
                weight={'medium'}
                style={{ marginBottom: 30 }}
              >

              </Typography>
              <h1>Ajouter un Ordre</h1>
              <br />

              <>
                <div>
                  {displayfor === "none" ? <p>Choississez le Fournisseur</p> : <p style={{ color: "red" }}>Choississez le Fournisseur</p>}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ width: 600, height: 20, marginBottom: 40 }}
                    value={fornisseurs}
                    onChange={e => {
                      setfornisseurs(e.target.value)
                      updatelistpord(e.target.value)
                    }}
                  >
                    {
                      fornisseur.map((s) =>
                        <MenuItem value={s.id} key={s.id}>
                          {s.Nom_fornisseur}
                        </MenuItem>
                      )
                    }
                  </Select>
                </div>

                {fornisseurs === "" ? <></> :
                  <div>
                    {
                      displayprod === "none" ? <p style={{ fontSize: 15 }}>Saisissez la quatité de chaque produit</p> :
                        <p style={{ color: "red", fontSize: 15, display: displayprod }} >Saisissez la quatité de chaque produit</p>
                    }

                    {
                      loadingProducts ?
                        <CircularProgress />
                        :
                        Produit.map((p, i) => {
                          return (
                            <div>
                              {/* <h4>{p.Produit}</h4> */}
                              <TextField
                                id="outlined-basic"
                                name="product"
                                label={"Quatité du " + p.Produit}
                                value={arrayQte[i]}
                                onChange={e => arrayQte[i] = e.target.value}
                                variant="outlined"
                                style={{ marginBottom: 35 }}
                                type={'textarea'}
                              />
                            </div>
                          )
                        })
                    }
                  </div>
                }
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
                        AddOrdre(fornisseurs, Produit, type, Quantité)
                      }}
                    >
                      Ajouter
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




