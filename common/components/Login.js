import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Card } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import config from '../../server/config';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    // top: '20%',
    width: '100%',
    height: '100%',
    backgroundColor: '#44808C',
  },
  topNav: {
    height: '100px',
    backgroundColor: '#ec8523',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.22)',
  },
  loginForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 70,
    lineHeight: 1,
    color: '#ffffff',
    paddingLeft: 20,
    paddingTop: 10,
  },
  loginHeader: {
    paddingTop: 20,
    color: '#1d5661',
    fontSize: 60,
    paddingBottom: 20,
  },
  button: {
    margin: 13,
    width: 270,
  },
  chromeButton: {
    width: 320,
  },
  chromeButtonDiv: {
    margin: 13,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardContainer: {
    paddingTop: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  bottomText: {
    paddingTop: 15,
  },
  cardStyle: {
    width: '50%',
    height: 450,
    minWidth: 450,
  },
});

const Login = props => (
  <div className={css(styles.root)}>
    <div className={css(styles.topNav)}>
      <h1 className={css(styles.header)}>Notist</h1>
    </div>
    <MuiThemeProvider>
      <div className={css(styles.cardContainer)}>
        <Card className={css(styles.cardStyle)}>
          <div className={css(styles.loginForm)}>
            <div className={css(styles.loginHeader)}>Login</div>
            <div>
              <a href={`${config.apiHost}/login/facebook`}
                className={`btn btn-block btn-social btn-lg btn-facebook ${css(styles.button)}`}
              >
                <i className="fa fa-facebook" /> Sign in with Facebook
              </a>
            </div>
            <div>
              <a href={`${config.apiHost}/auth/google`}
                className={`btn btn-block btn-social btn-lg btn-google ${css(styles.button)}`}
              >
                <i className="fa fa-google" /> Sign in with Google
              </a>
            </div>
            <div className={css(styles.chromeButtonDiv)}>
              {/* You can also download our Chrome extension if you havent yet: */}
              <div>
                <a href="https://chrome.google.com/webstore/detail/notist/acpmllpdmdhomcokgcacekihcfihapcf" target="_blank" rel="noopener noreferrer"
                  className={`btn btn-block btn-social btn-lg btn-openid ${css(styles.chromeButton)}`}
                >
                  <i className="fa fa-chrome" /> Get Notist chrome extension
                </a>
              </div>
            </div>
            <div className={css(styles.bottomText)}>Want to learn more? Check out our <a href="http://about.notist.io" target="_blank" rel="noopener noreferrer">about page</a></div>
          </div>
        </Card>
      </div>
    </MuiThemeProvider>
  </div>
);

/* eslint-disable no-lone-blocks */
{ /* <RaisedButton className={css(styles.button)}
  primary
  href={`${config.apiHost}/login/facebook`}
  label="Sign in with Facebook"
  icon={<i className="fa fa-facebook" />}
/>
<RaisedButton className={css(styles.button)}
  secondary
  href={`${config.apiHost}/auth/google`}
  label="Sign in with Google"
  icon={<i className="fa fa-google" />}
/> */ }

export default Login;
