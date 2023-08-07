import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "" 
        || street === "" || house === "" || city === "" || zip === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      isCompany: false,
      company: company,
      street: street,
      house: house,
      city: city,
      zip: zip,
      phone: phone,
    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Company"}
          name={"company"}
          id={"company"}
          onChangeText={(text) => setCompany(text)}
        />
        <Input
          placeholder={"Street"}
          name={"street"}
          id={"street"}
          onChangeText={(text) => setStreet(text)}
        />
        <Input
          placeholder={"House"}
          name={"house"}
          id={"house"}
          keyboardType={"numeric"}
          onChangeText={(text) => setHouse(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          id={"city"}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip"}
          name={"zip"}
          id={"zip"}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;