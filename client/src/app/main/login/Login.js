import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import Earth from './Earth';
import StarsBackground from './StarsBackground';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark
      } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText
  }
}));

function Login() {
  const classes = useStyles();
  const [selectedTab] = useState(1);

  // function handleTabChange(event, value) {
  //   setSelectedTab(value);
  // }

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-1 flex-shrink-0 md:flex-row')}>
      <div className="relative flex flex-1">
        <div className="absolute inset-0">
          <StarsBackground />
        </div>
        {/* <div className="absolute inset-0">
          <Earth />
        </div> */}
        <div className="flex w-full flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-center md:flex-shrink-0 md:flex-1 md:text-left self-center" style={{ zIndex: 1 }}>
          <FuseAnimate animation="transition.expandIn">
            <img
              className="w-384"
              src="assets/images/logos/fuse.svg"
              alt="logo"
            />
          </FuseAnimate>

          {/* <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Typography variant="h3" color="inherit" className="font-light">
              Welcome to COOPER CROWN!
            </Typography>
          </FuseAnimate> */}

          {/* <FuseAnimate delay={400}>
            <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis.
            </Typography>
          </FuseAnimate> */}
        </div>
      </div>



      <FuseAnimate animation={{ translateX: [0, '100%'] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="text-center md:w-full mb-48">
              LOGIN TO YOUR ACCOUNT
            </Typography>

            {selectedTab === 1 && <FirebaseLoginTab />}

            <div className="flex flex-col items-center justify-center pt-32">
              <Link className="font-medium mt-8" to="/">
                Back to Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>

    </div>

  );
}

export default Login;
