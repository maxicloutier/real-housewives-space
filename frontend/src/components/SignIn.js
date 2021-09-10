import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Header from "./Header";

const SignIn = () => {
  let history = useHistory();
  const [userInput, setUserInput] = useState(null);

  const handleChange = (ev) => {
    setUserInput(ev.target.value);
  };

  //function that is called when submitting the form
  const handleSubmit = (ev) => {
    ev.preventDefault();

    // fetch that sends the information of the user who is trying to sign in
    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userHandle: userInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // use sessionStorage to allow the user to stay signed in while on the website
          window.sessionStorage.setItem("user", data.data.name);
          window.sessionStorage.setItem("friends", data.data.friends);
          history.push("/");
        } else {
          alert("User doesn't exist");
        }
      });
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="First Name"
            onFocus={(ev) => (ev.target.value = "")}
            onBlur={(ev) => (ev.target.value = "First Name")}
            onChange={handleChange}
          ></Input>
          <Submit type="submit" value="Submit"></Submit>
        </Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-image: url("/images/sign-in-bg.jpg");
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Form = styled.form`
  background-color: rgb(255, 255, 255, 0.25);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
`;

const Input = styled.input`
  width: 500px;
  height: 45px;
  text-align: center;
  border: 1px solid #cccccc;
  border-radius: 2px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Submit = styled.input`
  width: 506px;
  height: 49px;
  text-align: center;
  margin-top: 10px;
  background-color: deeppink;
  border: none;
  font-size: 30px;
  font-family: "Teko", sans-serif;
  font-weight: 700;
  color: white;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    font-size: 31px;
  }
`;

export default SignIn;
