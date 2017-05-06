import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import config from '../../server/config';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: '20%',
    width: '100%',
  },
  loginForm: {
    position: 'relative',
    width: '50%',
    textAlign: 'center',
    margin: '0 auto',
  },
  header: {
    fontSize: 80,
    lineHeight: 1,
  },
  button: {
    width: '25%',
    display: 'block',
    margin: '0 auto',
    top: '20px',
  },
});

const Login = props => (
  <div className={css(styles.root)}>
    <div className={css(styles.loginForm)}>
      <h1 className={css(styles.header)}>Notist</h1>
      <br />
      <a href={`${config.apiHost}/login/facebook`}
        className={`btn btn-block btn-social btn-lg btn-facebook ${css(styles.button)}`}
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
