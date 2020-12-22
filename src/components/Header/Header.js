import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';
import { ResultContext } from '../../App';
import { Avatar } from '@material-ui/core';

// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#cccccc" 
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({title}) => {
  const [examResult, setExamResult, questions, setQuestions, loggedInUser, setLoggedInUser] = useContext(ResultContext);
    const history = useHistory();
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            {
              loggedInUser.email == "mdnimurhasan99@gmail.com" && <button onClick={() => history.push('/admin')} className="btn btn-danger">Admin</button>
            }{
              loggedInUser.email && loggedInUser.email != "mdnimurhasan99@gmail.com" && <button className="btn btn-secondary btn-sm">Student</button>
            }
            {
              loggedInUser.email ?
              <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
         
          <div className="d-flex">
              <h5 className="username mr-2 text-warning">{loggedInUser.name}</h5>
              <Avatar variant="rounded" className={classes.rounded} src={loggedInUser.image} className="shadow-sm" {...bindTrigger(popupState)}>
            </Avatar>
            </div>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
           
             <button className="btn">LogOut  <i class="fa fa-power-off" aria-hidden="true"></i></button>
         
          </Popover>
        </div>
      )}
    </PopupState>
               :
            <Button onClick={()=>{history.push("/login")}} color="inherit">Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }


export default Header;