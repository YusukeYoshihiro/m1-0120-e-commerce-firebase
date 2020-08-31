import React, { useState, useEffect } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// import "./sign-up.styles.scss";
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import { auth, createUserProfileDocument } from "../../firebase/firebase.util";

const SignUp = () => {
  const [userState, setUserState] = useState({
    displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
  });

  useEffect(()=>{
    console.log(userState.displayName)
  },[userState]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = userState;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      //to create a new user in firebase auth
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      //to save to firestore
      await createUserProfileDocument(user, { displayName: displayName });

      //to reset the inputs
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setUserState({ [name]: value });
    setUserState(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  };

    return (
      <SignUpContainer>
        <SignUpTitle>I do not have a account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={userState.displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={userState.email}
            onChange={handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={userState.password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={userState.confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
      // <div className="sign-up">
      //   <h2>I do not have an account</h2>
      //   <span>Sign up with your email and password</span>
      //   <form className="sign-up-form" onSubmit={handleSubmit}>
      //     <FormInput
      //       type="text"
      //       name="displayName"
      //       value={userState.displayName}
      //       onChange={handleChange}
      //       label="Display Name"
      //       required
      //     />
      //     <FormInput
      //       type="email"
      //       name="email"
      //       value={userState.email}
      //       onChange={handleChange}
      //       label="Email"
      //       required
      //     />
      //     <FormInput
      //       type="password"
      //       name="password"
      //       value={userState.password}
      //       onChange={handleChange}
      //       label="Password"
      //       required
      //     />
      //     <FormInput
      //       type="password"
      //       name="confirmPassword"
      //       value={userState.confirmPassword}
      //       onChange={handleChange}
      //       label="Confirm Password"
      //       required
      //     />
      //     <CustomButton type="submit">SIGN UP</CustomButton>
      //   </form>
      // </div>
    );
}

export default SignUp;

// class SignUp extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       displayName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     // console.log(this.state);

//     const { displayName, email, password, confirmPassword } = this.state;

//     if (password !== confirmPassword) {
//       alert("Passwords don't match");
//       return;
//     }

//     try {
//       //to create a new user in firebase auth
//       const { user } = await auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );

//       //to save to firestore
//       await createUserProfileDocument(user, { displayName: displayName });

//       //to reset the inputs
//       this.setState({
//         displayName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <div className="sign-up">
//         <h2>I do not have a account</h2>
//         <span>Sign up with your email and password</span>
//         <form className="sign-up-form" onSubmit={this.handleSubmit}>
//           <FormInput
//             type="text"
//             name="displayName"
//             value={this.state.displayName}
//             onChange={this.handleChange}
//             label="Display Name"
//             required
//           />
//           <FormInput
//             type="email"
//             name="email"
//             value={this.state.email}
//             onChange={this.handleChange}
//             label="Email"
//             required
//           />
//           <FormInput
//             type="password"
//             name="password"
//             value={this.state.password}
//             onChange={this.handleChange}
//             label="Password"
//             required
//           />
//           <FormInput
//             type="password"
//             name="confirmPassword"
//             value={this.state.confirmPassword}
//             onChange={this.handleChange}
//             label="Confirm Password"
//             required
//           />
//           <CustomButton type="submit">SIGN UP</CustomButton>
//         </form>
//       </div>
//     );
//   }
// }

