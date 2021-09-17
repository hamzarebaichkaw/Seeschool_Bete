import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Fade,
  TextField as Input
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, registerUser, sendPasswordResetEmail } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";

const getGreeting = () => {
  const d = new Date();
  if (d.getHours() >= 4 && d.getHours() <= 12) {
    return "Bonjour!";
  } else if (d.getHours() >= 13 && d.getHours() <= 16) {
    return "Salut";
  } else if (d.getHours() >= 17 && d.getHours() <= 23) {
    return "Bonsoir";
  } else {
    return "Bonne nuit";
  }
};

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get("token");
    if (token) {
      receiveToken(token, userDispatch);
      doInit()(userDispatch);
    }
  }, []); // eslint-disable-line


  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");
  var [forgotEmail, setForgotEmail] = useState("");
  var [isForgot, setIsForgot] = useState(false);

  return (
    <Grid container className={classes.container}>
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
          {isForgot ? (
            <div>
              <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                margin="normal"
                placeholder="Email"
                type="Email"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      forgotEmail.length === 0
                    }
                    onClick={() =>
                      sendPasswordResetEmail(
                        forgotEmail,
                      )(userDispatch)
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Send
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  onClick={() => setIsForgot(!isForgot)}
                  className={classes.forgetButton}
                >
                  Retour
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Tabs
                value={activeTabId}
                onChange={(e, id) => setActiveTabId(id)}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Connexion" classes={{ root: classes.tab }} />
                <Tab label="Créer" classes={{ root: classes.tab }} />
              </Tabs>
              {activeTabId === 0 && (
                <React.Fragment>
                  <Typography variant="h1" className={classes.greeting}>
                    {getGreeting()}
                  </Typography>
                  <Fade
                    in={error}
                    style={
                      !error ? { display: "none" } : { display: "inline-block" }
                    }
                  >
                    <Typography color="secondary" className={classes.errorMessage}>
                      Quelque chose ne va pas avec votre identifiant ou votre mot de passe.
                    </Typography>
                  </Fade>
                  <Input
                    id="email"
                    InputProps={{
                      classes: {
                        underline: classes.InputUnderline,
                        input: classes.Input
                      }
                    }}

                    onChange={e => setLoginValue(e.target.value)}
                    margin="normal"
                    placeholder="Adresse Email"
                    type="email"
                    fullWidth
                  />
                  <Input
                    id="password"
                    InputProps={{
                      classes: {
                        underline: classes.InputUnderline,
                        input: classes.Input
                      }
                    }}
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Mot de passe"
                    type="password"
                    fullWidth
                  />
                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress size={26} className={classes.loginLoader} />
                    ) : (
                      <Button
                        disabled={
                          loginValue.length === 0 || passwordValue.length === 0
                        }
                        onClick={() =>
                          loginUser(
                            userDispatch,
                            loginValue,
                            passwordValue,
                            props.history,
                            setIsLoading,
                            setError
                          )
                        }
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Connexion
                      </Button>
                    )}
                    <Button
                      color="primary"
                      size="large"
                      onClick={() => setIsForgot(!isForgot)}
                      className={classes.forgetButton}
                    >
                      Mot de passe oublié?
                    </Button>
                  </div>
                </React.Fragment>
              )}
              {activeTabId === 1 && (
                <React.Fragment>
                  <Typography variant="h1" className={classes.greeting}>
                    Bienvenu!
                  </Typography>
                  <Typography variant="h2" className={classes.subGreeting}>
                    Créez votre compte
                  </Typography>
                  <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      Quelque chose ne va pas avec votre login ou mot de passe.
                    </Typography>
                  </Fade>
                  <Input
                    id="name"
                    InputProps={{
                      classes: {
                        underline: classes.InputUnderline,
                        input: classes.Input
                      }
                    }}
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    margin="normal"
                    placeholder="Nom et prénom"
                    type="email"
                    fullWidth
                  />
                  <Input
                    id="email"
                    InputProps={{
                      classes: {
                        underline: classes.InputUnderline,
                        input: classes.Input
                      }
                    }}
                    value={loginValue}
                    onChange={e => setLoginValue(e.target.value)}
                    margin="normal"
                    placeholder="Adresse e-mail"
                    type="email"
                    fullWidth
                  />
                  <Input
                    id="password"
                    InputProps={{
                      classes: {
                        underline: classes.InputUnderline,
                        input: classes.Input
                      }
                    }}
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Mot de passe"
                    type="password"
                    fullWidth
                  />
                  <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      <Button
                        onClick={() =>
                          registerUser(
                            userDispatch,
                            loginValue,
                            passwordValue,
                            nameValue,
                            props.history,
                            setIsLoading,
                            setError
                          )()
                        }
                        disabled={
                          loginValue.length === 0 ||
                          passwordValue.length === 0 ||
                          nameValue.length === 0
                        }
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.createAccountButton}
                      >
                        Créez votre compte
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="http://seedigital.agency/" rel="noopener noreferrer" target="_blank">SEE DIGITAL AGENCY</a>,<br /> Tous les droits sont réservés.
        </Typography>
      </div>

      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
      </div>
    </Grid>
  );
}

export default withRouter(Login);
