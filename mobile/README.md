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

**Please note that if you are useng the ios simulator you can use localhost inside the url for the api. But if you are using the Android Studio emulator you must use `10.0.2.2:port` and if you are using the genymotion emulator you must use `10.0.3.2:port`**

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
- [@rocketseat/unform](https://github.com/Rocketseat/unform) - ReactJS form library to create uncontrolled form structures with nested fields, validations and much more!
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [history](https://github.com/ReactTraining/history) - https://github.com/ReactTraining/history
- [immer](https://github.com/immerjs/immer) - Create the next immutable state by mutating the current one
- [polished](https://polished.js.org/) - A lightweight toolset for writing styles in JavaScript
- [prop-types](https://github.com/facebook/prop-types) - Runtime type checking for React props and similar objects
- [react-confirm-alert](https://github.com/GA-MO/react-confirm-alert) - react component confirm dialog.
- [react-datepicker](https://reactdatepicker.com/) - A simple and reusable datepicker component for React.
- [react-icons](https://react-icons.netlify.com/#/) - Popular icons in your React projects easly
- [react-number-format](hhttps://github.com/s-yadav/react-number-format) - React component to format numbers in an input or as a text.
- [react-select](https://react-select.com/home) - A flexible and beautiful Select Input control for ReactJS
- [react-toastify](https://github.com/fkhadra/react-toastify) - React notification made easy 🚀 !
- [reactotron-react-js](https://github.com/infinitered/reactotron) - A desktop app for inspecting your React JS and React Native projects. macOS, Linux, and Windows.
- [redux](https://redux.js.org/) - A Predictable State Container for JS Apps
- [redux-persist](https://github.com/rt2zz/redux-persist) - persist and rehydrate a redux store
- [redux-saga](https://github.com/redux-saga/redux-saga) - An alternative side effect model for Redux apps
- [styled-components](https://www.styled-components.com/) - Use the best bits of ES6 and CSS to style your apps without stress
- [yup](https://github.com/jquense/yup) - Dead simple Object schema validation
- [eslint](https://eslint.org/) - JS Linter and code style
- [prettier](https://github.com/prettier/prettier) - Code formatter

# License

This project is licensed under the MIT license.
