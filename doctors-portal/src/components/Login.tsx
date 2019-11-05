import * as React from 'react';
import { IProps } from '../scripts/common/base';
import userDataManagement from '../utils/userDataManagement';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';
import { PhoneIphoneOutlined } from '@material-ui/icons';
import { isMobileNumberValid, isOtpValid } from '../utils/commonUtils';
import AuthService from '../services/authenticationService';
import { Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Button, Grid, Link, Box, Checkbox } from '@material-ui/core';

export interface LoginProps extends IProps {
    compiler: string;
    framework: string;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props: LoginProps) {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [mobileNumber, setMobileNumber] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [isMobileNumberSubmitted, setIsMobileNumberSubmitted] = React.useState(false);
    const [isNumberValid, setIsNumberValid] = React.useState(true);
    const [isOtpSubmittedInvalid, setIsOtpSubmittedInvalid] = React.useState(false);
    const [otpRequestResponse, setOtpRequestResponse] = React.useState({
        otp_id: "",
        expiry: 0
    });

    const updateMobileNumber = event => {
        const mobileNumber = event.target.value;
        if (!isNumberValid && isMobileNumberValid(mobileNumber)) {
            setIsNumberValid(true);
        }
        setMobileNumber(event.target.value);
    }

    const updateOtp = async (event) => {
        const otp = event.target.value;
        if (isOtpSubmittedInvalid && isOtpValid(otp)) {
            setIsOtpSubmittedInvalid(false);
            //setOtp(event.target.value);
            //const submitOtpResponse = await submitOtp(event);
        }
        setOtp(event.target.value);
    }

    const handleMobileNumberSubmit = async (event) => {
        if (isMobileNumberValid(mobileNumber)) {
            setIsMobileNumberSubmitted(true);
            const otpInfo = await AuthService.requestOtp(mobileNumber);
            setOtpRequestResponse({
                otp_id: otpInfo.otp_id,
                expiry: otpInfo.expiry
            });
        }
        else {
            setIsNumberValid(false);
        }
        event.preventDefault();
    };

    const submitOtp = async (event) => {
        if (isOtpValid(otp)) {
            const submitOtpResponse = await AuthService.submitOtp(otp, mobileNumber, otpRequestResponse.otp_id);
            if(submitOtpResponse === null) {
                setIsOtpSubmittedInvalid(true);
            }
            else {
                userDataManagement.storeUserInfo(submitOtpResponse);
                console.log("Login successful");
            }
        }
        else {
            setIsOtpSubmittedInvalid(true);
        }
        
        event.preventDefault();
    };

    const changeMobileNumber = event => {
        console.log("otp_id" + otpRequestResponse.otp_id);
        setOtpRequestResponse({
            otp_id: "",
            expiry: 0
        });
        setIsMobileNumberSubmitted(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PhoneIphoneOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>

                {!isMobileNumberSubmitted &&
                    <form className={classes.form} onSubmit={handleMobileNumberSubmit} noValidate>
                        <div>
                            <TextField
                                error={!isNumberValid}
                                helperText={isNumberValid ? "" : "Incorrect mobile number"}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={mobileNumber}
                                onChange={updateMobileNumber}
                                id="mobile-number"
                                label="Mobile number"
                                autoComplete="tel"
                                autoFocus
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleMobileNumberSubmit}
                            >
                                Request OTP
                            </Button>
                        </div>
                    </form>
                }
                {isMobileNumberSubmitted &&
                    <form className={classes.form} onSubmit={submitOtp} noValidate>
                        <div>
                            <TextField
                                error={isOtpSubmittedInvalid}
                                helperText={isOtpSubmittedInvalid ? "Invalid OTP" : ""}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="OTP"
                                type="password"
                                id="otp"
                                onChange={updateOtp}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={submitOtp}
                            >
                                {"Sign In"}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link variant="body2">
                                        {"Retry sending OTP"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={changeMobileNumber} variant="body2">
                                        {"Change mobile number"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                }
            </div>
            <Box mt={8}>
                <Link href="" />
            </Box>
        </Container>
    );
}