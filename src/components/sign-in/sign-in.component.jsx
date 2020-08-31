import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.util";

// import "./sign-in.styles.scss";
import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // this.setState({ email: "", password: "" });
    
    try {
      await auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      setCredentials({email: "", password: ""});
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    // this.setState({ [name]: value });
    setCredentials(prevState => {
      return {
        ...prevState,
        [name] : value
      }
    })
  };

  return (
    <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={credentials.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={credentials.password}
            handleChange={handleChange}
            label='password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton
              type='button'
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    // <div className="sign-in">
    //   <h2>I already have an account</h2>
    //   <span>Sign in with your email and password</span>

    //   <form onSubmit={handleSubmit}>
    //     <FormInput
    //       name="email"
    //       type="email"
    //       handleChange={handleChange}
    //       value={credentials.email}
    //       label="email"
    //       required
    //     />
    //     <FormInput
    //       name="password"
    //       type="password"
    //       value={credentials.password}
    //       handleChange={handleChange}
    //       label="password"
    //       required
    //     />
    //     <CustomButton type="submit"> Sign in </CustomButton>
    //     <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
    //       {" "}
    //       Sign in with Google{" "}
    //     </CustomButton>
    //   </form>
    // </div>
  );
};

export default SignIn;
