import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { authenticateLogin, authenticateSignup } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)({
  height: "70vh",
  width: "90vh",
});
const Image = styled(Box)({
  background:
    "#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat",
  height: "83%",
  width: "28%",
  padding: "45px 35px",
  "& > p, & > h5": {
    color: "#fff",
    fontWeight: 600,
  },
});
const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "25px 35px",
  flex: 1,
  "& > div, & > button , & > p": {
    marginTop: 20,
  },
});

const LoginButton = styled(Button)({
  textTransform: "none",
  background: "#fb641b",
  color: "#fff",
  height: 48,
  borderRadius: 2,
});

const RequestOTP = styled(Button)({
  textTransform: "none",
  background: "#fff",
  color: "#2874f0",
  height: 48,
  borderRadius: 2,
  boxShadow: "0 2px 4px 0 rgb(0,0,0, 20%)",
});

const Text = styled(Typography)({
  fontSize: 12,
  color: "#878787",
});

const CreateAccount = styled(Typography)({
  fontSize: 14,
  textAlign: "center",
  color: "#2874f0",
  fontWeight: 600,
  cursor: "pointer",
});

const Error = styled(Typography)({
  color: "#ff6161",
  fontSize: 10,
  lineHeight: 0,
  marginTop: 10,
  fontWeight: 600,
});

const accoutInititalValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subHeading: "Sign up with your mobile numner to get started",
  },
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

export default function LoginDialog({ open, setOpen }) {
  const [account, toggleAccount] = useState(accoutInititalValues.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const { setAccount } = useContext(DataContext);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(false)
    toggleAccount(accoutInititalValues.login);
  };

  const toggleSignup = () => {
    toggleAccount(accoutInititalValues.signup);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (!response) return;
    handleClose();
    setAccount(signup.firstname);
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    if (response.status == 200) {
      handleClose();
      setAccount(response.data.user.firstname);
    } else {
      setError(true);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                name="username"
                label="Enter Username"
                onChange={(e) => onValueChange(e)}
              />
              {error && <Error>Please enter valid username or password</Error>}
              <TextField
                variant="standard"
                name="password"
                label="Enter Password"
                onChange={(e) => onValueChange(e)}
              />
              <Text>
                By continuing, you agree to flipkart's Terms of Use and Privacy
                Policy
              </Text>
              <LoginButton onClick={() => loginUser()}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={() => toggleSignup()}>
                New to flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                label="Enter Firstname"
                name="firstname"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                variant="standard"
                label="Enter Lastname"
                name="lastname"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                variant="standard"
                label="Enter Username"
                name="username"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                variant="standard"
                label="Enter Email"
                name="email"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                variant="standard"
                label="Enter Password"
                name="password"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                variant="standard"
                label="Enter Phone"
                name="phone"
                onChange={(e) => onInputChange(e)}
              />
              <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
}
