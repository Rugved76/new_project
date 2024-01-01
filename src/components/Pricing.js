import { createTheme, ThemeProvider } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/StarBorder';
import GlobalStyles from '@mui/material/GlobalStyles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import toast, { Toaster } from 'react-hot-toast';
import Container from '@mui/material/Container';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            '10 users included',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

const defaultTheme = createTheme();

export default function Pricing() {

    const [cookies] = useCookies(["access_token"])
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = () => {
            if (cookies.access_token) {
                const decoded_token = jwtDecode(cookies.access_token);
                setEmail(decoded_token.email);
                toast.success(`Welcome, ${decoded_token.email}`, { autoClose: 3000 })
            } else {
                console.log(`Invalid token`)
                navigate("/login")
            }
        }

        verifyUser();
    }, [cookies.access_token, navigate])

    return (
        <div className='main'>
            <Toaster position="top-right" />
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >

                </AppBar>
                {/* Hero unit */}
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Pricing
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        Quickly build an effective pricing table for your potential customers with
                        this layout. It&apos;s built with default MUI components with little
                        customization.
                    </Typography>
                </Container>
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}
                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                                        subheaderTypographyProps={{
                                            align: 'center',
                                        }}
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'light'
                                                    ? theme.palette.grey[200]
                                                    : theme.palette.grey[700],
                                        }}
                                    />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                ${tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                /mo
                                            </Typography>
                                        </Box>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
                                                    key={line}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth variant={tier.buttonVariant}>
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}