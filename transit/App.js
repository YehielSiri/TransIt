import { StatusBar } from "expo-status-bar";
import React from "react";
/*
import { LogBox } from "react-native";
import { NavigationContainer } from './node_modules/@react-navigation/native';
// import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// // Redux
// import { Provider } from "react-redux";
// import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

// Screens
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
*/

import { LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

// Navigatiors
import Main from "./Navigators/Main";


// Screens
import Header from './Shared/Header'
import JobContainer from './Screens/Jobs/JobContainer'

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
        <Header />
        <Main />
    </NavigationContainer>
  );
}
