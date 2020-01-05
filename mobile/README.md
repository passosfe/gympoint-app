<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="./src/assets/logo@3x.png" width="200px" />
</h1>

<h3 align="center">
  Gympoint
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/passosfe/gympoint-app?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/passosfe/gympoint-app/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/passosfe/gympoint-app?style=social">
  </a>
  </a>
</p>

# About This Project

This is the mobile app of Gympoint. It is meant to be used by the students. In it the student can checkin every day he goes to the gym and see a list of all checkins he did. He can also post questions that can be answered by the system administrator at the frontend. Those questions can also be viewed within this mobile app by the student and he can see the answers posted by the administrator.

This mobile app is built using `React Native` and was built primarily for IOS but was also tested on Android to ensure the behavior was the same on both platforms.

Feel free to clone this project for anything you want.

# About Me

Email: passos.fe@gmail.com

Connect at [LinkedIn](https://www.linkedin.com/in/passosfe/)

# Getting Started

## Prerequisites

First, you need to create a **.env** file in root of application. The structure of this file is similar to the **.env.example** file, just copy and put the correct data for all variables.

**Please note that for the .env file, if you are using the ios simulator you can use localhost inside the url for the API. But if you are using the Android Studio emulator you must use `10.0.2.2:port` and if you are using the genymotion emulator you must use `10.0.3.2:port`**

Also make sure the backend is running. To check out how to setup the backend click [here](https://github.com/passosfe/gympoint-app/tree/master/backend).

- Emulator or USB smartphone plugged.
- React native CLI

## Installing

**Cloning the Repository**

```
$ git clone https://github.com/passosfe/gympoint-app

$ cd gympass-app
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

## Running application

```
  ~ react-native run-ios (or run-android)

  ~ react-native start
```

## ⚠️ Warnings

Sometimes when you try debug application with Reactotron, the app don't connect.

To fix:

```
  ~ adb reverse tcp:9090 tcp:9090
```

If you try to connect via USB, certify that you phone is connected:

```
  ~ adb devices
```

If the mobile app cannot conenct with your api even after you configurate **.env** file with the correct adrres that your api is running. You can try shake your phone, open the `Debug server host & port for device` and put your network addres and the port `8081`.

# 🕶️ Contributing

This is a open project and is able to receive contributing for all people.
If you have any question about the project, just contact me or open a issue.

# Built With

- [ReactJS](https://reactjs.org) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
- [React Native](https://facebook.github.io/react-native/) - Create native apps for Android and iOS using React
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [immer](https://github.com/immerjs/immer) - Create the next immutable state by mutating the current one
- [prop-types](https://github.com/facebook/prop-types) - Runtime type checking for React props and similar objects
- [redux](https://redux.js.org/) - A Predictable State Container for JS Apps
- [redux-persist](https://github.com/rt2zz/redux-persist) - persist and rehydrate a redux store
- [redux-saga](https://github.com/redux-saga/redux-saga) - An alternative side effect model for Redux apps
- [styled-components](https://www.styled-components.com/) - Use the best bits of ES6 and CSS to style your apps without stress
- [eslint](https://eslint.org/) - JS Linter and code style
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [@react-native-community/async-storage](https://github.com/react-native-community/async-storage) - An asynchronous, persistent, key-value storage system for React Native.
- [react-native-dotenv](https://github.com/zetachang/react-native-dotenv) - A Babel preset let you import application configs from .env file (zero runtime dependency)
- [react-native-gesture-handler](https://software-mansion.github.io/react-native-gesture-handler/) - Declarative API exposing platform native touch and gesture system to React Native.
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) - React Native's Animated library reimplemented
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) - A flexible way to handle safe area insets in JS
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - Customizable Icons for React Native
- [react-navigation](https://reactnavigation.org/) - Routing and navigation for your React Native apps
- [react-navigation-stack](https://github.com/react-navigation/stack) - Stack navigator for React Navigation
- [react-navigation-tabs](https://github.com/react-navigation/tabs) - Tab navigators for React Navigation
- [reactotron-react-native](https://github.com/infinitered/reactotron) - A desktop app for inspecting your React JS and React Native projects. macOS, Linux, and Windows.

# License

This project is licensed under the MIT license.
