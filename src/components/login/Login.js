import React, { Component } from 'react';
import styles from './Login.module.scss';

class Login extends Component {

     constructor(props) {
         super(props);
         this.state = {
             isLogin: true
         }
     }

     onCreateAccount() {
       this.setState({isLogin: !this.state.isLogin});
       //window.location.assign('http://127.0.0.1:3000/api/v1/auth/google');
       window.location.assign(`http://${process.env.REACT_APP_FRONTEND_APP_DOMAIN}:3000/api/v1/auth/google`);
     }

     render() {
         return (
            <div className={styles.container}>
                <div className={styles.container_register}>
                    <h2 className={styles.container_register_title} >{this.state.isLogin ? 'Sign in to continue' : 'Create account'}</h2>
                    {!this.state.isLogin
                      ? <input name="username" className={styles.container_register_name} type="text" placeholder="Username" />
                      : null
                    }
                    <input name="email" className={styles.container_register_mail} type="text" placeholder="Email Address" />
                    <input name="password" className={styles.container_register_password} type="text" placeholder="Password" />
                    <input className={styles.container_register_button}  type="button" onClick={this.onRegister.bind(this)} value={this.state.isLogin ? 'Login' : 'Create account'}/>
                    {this.state.isLogin
                      ? <h3 className={styles.container_register_create} onClick={this.onCreateAccount.bind(this)}>Create an account</h3>
                      : <h3 className={styles.container_register_create} onClick={this.onCreateAccount.bind(this)}>Login</h3>
                    }
                    <hr/>

                </div>
                <div className={styles.container_social}>
                <div className={styles.container_social_facebook}>
                  <span className = {styles.container_social_facebook_img}></span>
                  <span className  = {styles.container_social_facebook_text}>Continue with Facebook</span>
                </div>
                <div className={styles.container_social_google}>
                  <span className={styles.container_social_google_img}></span>
                  <span className={styles.container_social_google_text}>Continue with Google</span>
                </div>
                </div>
            </div>
         );
     }


}

export default Login;