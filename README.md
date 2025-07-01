# Mobile Banking App

This repository contains the full-stack source code for the mobile banking application, built with a containerized development environment for consistency and ease of setup.

---

## Tech Stack

* **Frontend:** React Native (TypeScript, Bare Workflow)
* **Backend:** ASP.NET C#
* **Authentication:** Ory Kratos
* **Database:** MariaDB
* **Containerization:** Docker & Docker Compose

---

## 📂 Project Structure

This project uses a monorepo structure, with each part of the application stack clearly separated. The frontend itself is built using a scalable, feature-based architecture.

```text
/
├── infrastructure/     \# Docker Compose and configurations for all services
├── backend/            \# ASP.NET Backend API project
├── frontend/           \# Contains the React Native project
│   └── MobileBankingApp/
│       └── src/
│           ├── api/
│           ├── assets/
│           ├── components/     \# Shared, generic components (Button, Card, etc.)
│           ├── config/
│           ├── features/       \# Feature-specific code (screens, components, hooks)
│           ├── hooks/
│           ├── navigation/
│           ├── state/
│           ├── styles/
│           └── utils/
└── docs/               \# Project documentation

```

---

## 🚀 Getting Started

Follow these instructions to get the entire application stack running on your local machine for development.

### Prerequisites

Ensure you have the following tools installed on your system:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
* [Node.js](https://nodejs.org/en) (using `nvm` is recommended)
* **For iOS:** Xcode and CocoaPods
* **For Android:** Android Studio (for the SDK and Virtual Devices)

### Running the Application

The development workflow requires **two** running terminal windows.

#### Terminal 1: Start All Backend Services

This command will start the .NET backend, the React Native Metro server, Ory Kratos, and the databases—all within Docker containers.

1. Navigate to the infrastructure directory:

    ```bash
    cd infrastructure
    ```

2. Build and start the containers:

    ```bash
    docker compose up --build
    ```

    Leave this terminal running. You will see logs from all services here.

#### Terminal 2: Run the Mobile App

This terminal is used to build the native app and install it on your simulator.

1. Navigate to the React Native project directory:

    ```bash
    cd frontend/MobileBankingApp
    ```

2. Install Node.js dependencies (only needs to be done once):

    ```bash
    npm install
    ```

3. Run on the desired platform:

    * **To run on iOS:**

        ```bash
        npm run ios
        ```

    * **To run on Android:**
        * First, ensure you have an Android emulator running (you can launch one from Android Studio's Device Manager).
        * Then, run the command:

        ```bash
        npm run android
        ```

The app will launch in the simulator and automatically connect to the Metro server running inside Docker. Live Reload / Fast Refresh will work out of the box.

---

## ⚙️ Available Scripts

Inside the `frontend/MobileBankingApp` directory, you can use the following npm scripts:

* `npm run ios`: Builds the app and runs it on the iOS Simulator.
* `npm run android`: Builds the app and runs it on the Android emulator.
* `npm run lint`: Lints the source code to check for errors.
* `npm run test`: Runs the Jest test suite.
