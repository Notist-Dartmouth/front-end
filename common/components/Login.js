import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import config from '../../server/config';

const styles = StyleSheet.create({
  navBar: {
    position: 'fixed',
    width: '100%',
    height: '8%',
    backgroundColor: '#ea7b30',
    top: '0',
  },
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#44808C',
    top: '0',
  },
  loginForm: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    width: '50%',
    height: '60%',
    textAlign: 'center',
    margin: '10% auto',
  },
  header: {
    fontSize: 60,
    lineHeight: 1,
    postion: 'relative',
    marginTop: '20px',
  },
  button: {
    width: '40%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
    top: '20px',
    textAlign: 'center',
  },
  button1: {
    width: '40%',
    height: 'auto',
    display: 'block',
    margin: '50px auto',
    top: '20px',
    textAlign: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: '40px',
    margin: '10px',
    position: 'relative',
    display: 'inline',
    top: '15%',
  },
  homeNav: {
    color: '#FFFFFF',
    float: 'right',
    margin: '25px',
    fontSize: '20px',
    top: '0',
    position: 'relative',
    display: 'inline',
    textDecoration: 'none',
  },
  loginText: {
    marginTop: '5%',
    fontSize: '30px',
  },
});

const Login = props => (
  <div className={css(styles.root)}>
    <div className={css(styles.navBar)}>
      <p className={css(styles.titleText)}>
        Notist
      </p>
      <a className={css(styles.homeNav)}href={'http://notist.io'}>Home
      </a>
    </div>
    <div className={css(styles.loginForm)}>
      <h1 className={css(styles.header)}>Login</h1>
      <p className={css(styles.loginText)}> Not a member yet? Signup
          <a href={'http://notist.io/signup'}> here </a>
      </p>
      <br />
      <a href={`${config.apiHost}/login/facebook`}
        className={`btn btn-block btn-social btn-lg btn-facebook ${css(styles.button1)}`}
      >
        <i className="fa fa-facebook" /> Sign in with Facebook
      </a>
      <br />
      <a href={`${config.apiHost}/auth/google`}
        className={`btn btn-block btn-social btn-lg btn-google ${css(styles.button)}`}
      >
        <i className="fa fa-google" /> Sign in with Google
      </a>
    </div>
  </div>
);

export default Login;
