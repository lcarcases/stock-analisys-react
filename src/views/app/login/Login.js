import React, { Component } from 'react';
import styles from './Login.module.scss';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';


class Login extends Component {

     constructor(props) {
         super(props);
         this.state = {
             // Refers to login view
             isLogin: true,
             // Used for register proccess
             registered: false,
             // Hold user registered o logged
             registeredUser: null,
             // Used for registered users and indicate if is logged
             logged: false,
             username: "",
             password: "",
             email: ""
         }

         this.submitHandler = this.submitHandler.bind(this);
         this.onChangeInput = this.onChangeInput.bind(this);
     }

     onToggleLoginRegisterView() {
         this.setState({isLogin: !this.state.isLogin});
     }

     onLoginWithGoogle() {
        window.location.assign('http://127.0.0.1:3000/api/v1/users/auth/google');
     }

     onLoginWithFacebook() {
        //window.location.assign('http://127.0.0.1:3000/api/v1/users/auth/facebook');
        window.location.assign('https://57407d327847.ngrok.io/api/v1/users/auth/facebook');
     }

     onChangeInput(event) {
        this.setState( {[event.target.name]: event.target.value });
     }

     async submitHandler(event) {
        event.preventDefault();
        if(!this.state.isLogin) {
            const res = await axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:3000/api/v1/users/register/',
                                    data: {
                                      username: this.state.username,
                                      password: this.state.password,
                                      email: this.state.email
                                    }
                                  });

          if(res.data.success) {
             console.log("Registered Succesfully");
             this.setState({registered: true, registeredUser: res.data.user});
          } else {
             this.setState({registered: false});
          }

        } else {
            const res = await axios({
              method: 'post',
              url: 'http://127.0.0.1:3000/api/v1/users/login/',
              data: {
                username: this.state.username,
                password: this.state.password
              }
            });

           if(res.data.success) {
              console.log("Logged Succesfully");
              this.setState({logged: true, registeredUser: res.data.user});
           } else {
              this.setState({logged: false});
           }
        }
     }

     render() {
        if(this.state.registered || this.state.logged) {
            const user = {
                          registered: this.state.registered || this.state.logged,
                          registeredUser: this.state.registeredUser
                        };

            return (<Redirect to={{
                                     pathname: "/stocks",
                                     state: { referrer: user }
                                 }}/>
                     );
        }
        return (
            <div className={styles.container}>
                <form onSubmit={this.submitHandler}>
                  <div className={styles.container_register}>
                      <h2 className={styles.container_register_title} >{this.state.isLogin ? 'Sign in to continue' : 'Create account'}</h2>

                     <input name="username"
                            className={styles.container_register_username}
                            type="text"
                            onChange={this.onChangeInput}
                            placeholder="Username" />

                      {!this.state.isLogin
                        ?    <input name="email"
                                    className={styles.container_register_email}
                                    type="text"
                                    onChange={this.onChangeInput}
                                    placeholder="Email Address" />
                        : null
                      }
                      <input name="password"
                             className={styles.container_register_password}
                             type="text"
                             onChange={this.onChangeInput}
                             placeholder="Password" />
                      <input className={styles.container_register_button}
                             type="submit"
                             value={this.state.isLogin ? 'Login' : 'Create account'}/>
                      {this.state.isLogin
                        ? <h3 className={styles.container_register_create} onClick={this.onToggleLoginRegisterView.bind(this)}>Create an account</h3>
                        : <h3 className={styles.container_register_create} onClick={this.onToggleLoginRegisterView.bind(this)}>Login</h3>
                      }
                      <hr/>

                  </div>
                </form>
                <div className={styles.container_social}>
                <div className={styles.container_social_facebook} onClick={this.onLoginWithFacebook.bind(this)}>
                  <span className = {styles.container_social_facebook_img}></span>
                  <span className  = {styles.container_social_facebook_text}>Continue with Facebook</span>
                </div>
                <div className={styles.container_social_google} onClick={this.onLoginWithGoogle.bind(this)}>
                  <span className={styles.container_social_google_img}></span>
                  <span className={styles.container_social_google_text}>Continue with Google</span>
                </div>
                </div>
            </div>
         );
     }


}

export default Login;