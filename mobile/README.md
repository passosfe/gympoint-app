<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="./src/assets/logo.png" width="200px" />
</h1>

<h3 align="center">
  Bootcamp application
</h3>

<blockquote align="center">“Faça seu melhor, mas sempre com prazo de entrega”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/RaphaelOliveiraMoura/gympoint-bootcamp?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/RaphaelOliveiraMoura/gympoint-bootcamp/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/RaphaelOliveiraMoura/gympoint-bootcamp?style=social">
  </a>
</p>

# 👀 Overview

```
  ~ yarn install
  ~ react-native run:android
  - react-native start
```

<p style="color: #ff4241;">This app was made and tested just in a android smartphone. Because I dont't have support to run and test in a IOS phone. So probabily will be some UI mistakes to IOS Plataform.</p>

# 🚀 Preparing and running application

## Installing project and dependences

```
  ~ git clone https://github.com/RaphaelOliveiraMoura/gostack-gympoint.git
  ~ cd gostack-gympoint/mobile
  ~ yarn install (or npm install)
```

### Prerequisites

- Emulator or USB smartphone plugged.
- React native CLI

You need to change `~/src/services/api.js` file with your pc network address and the port that the api is running.

## Running application

```
  ~ react-native run-android (or run-ios)

  ~ react-native start
```

## ⚠️ Warnings

Sometimes when you try debug application with Reactotron, the app don't connect.

To fix:

```
  ~ adb reverse tcp:9090 tcp:9090
```

If you try connect with USB, certify that you phone is connected:

```
  ~ adb devices
```

If the mobile app cannot conenct with your api even after you configurate `~/src/services/api.js` file with the correct adrres that your api is running. You can try shake your phone, open the `Debug server host & port for device` and put your network addres and the port `8081`.

# 🕶️ Contributing

This is a open repository and is abble to receive contributing for all people.
If you have any question about project, just contact me or open a issue.
