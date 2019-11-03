import * as React from 'react';
import { IProps } from '../scripts/common/base';
import userDataManagement from '../utils/userDataManagement';
import { app } from '../utils/constants';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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

export default function Login() {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [mobileNumberSubmitted, setmobileNumberSubmitted] = React.useState(false);

    const handleMobileNumberSubmit = event => {
        setmobileNumberSubmitted(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                <form className={classes.form} noValidate>
                    {!mobileNumberSubmitted &&
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="mobile-number"
                                label="Mobile number"
                                name="mobile-number"
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
                    }
                    {mobileNumberSubmitted &&
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="otp"
                                label="OTP"
                                type="password"
                                id="otp"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </div>
                    }
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Retry sending OTP
                                </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Link href="" />
            </Box>
        </Container>
    );
}