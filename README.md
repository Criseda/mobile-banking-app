# Mobile Banking App

This repository contains the full-stack source code for the mobile banking application, built with a containerized development environment for consistency and ease of setup.

---

## Tech Stack

* **Frontend:** React Native (TypeScript, Bare Workflow)
* **Backend:** ASP.NET C# with Entity Framework Core
* **Authentication:** Ory Kratos
* **Database:** MariaDB
* **Containerization:** Docker & Docker Compose

---

## 📂 Project Structure

This project uses a monorepo structure, with each part of the application stack clearly separated. The frontend itself is built using a scalable, feature-based architecture.

```text
/
├── infrastructure/     # Docker Compose and configurations for all services
├── backend/            # ASP.NET Backend API project
│   ├── Models/         # Database entity models
│   ├── Data/           # Entity Framework DbContext
│   └── Migrations/     # Database migration files
├── frontend/           # Contains the React Native project
│   └── MobileBankingApp/
│       └── src/
│           ├── api/
│           ├── assets/
│           ├── components/     # Shared, generic components (Button, Card, etc.)
│           ├── config/
│           ├── features/       # Feature-specific code (screens, components, hooks)
│           ├── hooks/
│           ├── navigation/
│           ├── state/
│           ├── styles/
│           └── utils/
└── docs/               # Project documentation

```

---

## 🚀 Getting Started

Follow these instructions to get the entire application stack running on your local machine for development.

### Prerequisites

Ensure you have the following tools installed on your system:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
* [Entity Framework Core tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet) (install globally):
  
  ```bash
  dotnet tool install --global dotnet-ef
  ```

* [Node.js](https://nodejs.org/en) (using `nvm` is recommended)
* **For iOS:** Xcode and CocoaPods
* **For Android:** Android Studio (for the SDK and Virtual Devices)

### First-Time Setup

**Important:** If this is your first time setting up the project, or if you've pulled new database changes:

1. **Restore .NET dependencies:**

   ```bash
   cd backend
   dotnet restore
   ```

2. **Verify Entity Framework is working:**

   ```bash
   dotnet ef --version
   ```

### Running the Application

The development workflow requires **two** running terminal windows.

#### Terminal 1: Start All Backend Services

This command will start the .NET backend, the React Native Metro server, Ory Kratos, and the databases—all within Docker containers. The backend will automatically apply database migrations on startup.

1. Navigate to the infrastructure directory:

    ```bash
    cd infrastructure
    ```

2. Build and start the containers:

    ```bash
    docker compose up --build
    ```

    Leave this terminal running. You will see logs from all services here.

    **Note:** The first startup may take a few minutes as the database initializes and migrations are applied.

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

## 🌐 Service Endpoints

When all services are running, the following endpoints are available:

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **Backend API** | 8080 | `http://localhost:8080` | ASP.NET Core REST API |
| **Database Test** | 8080 | `http://localhost:8080/db-test` | Database connection verification |
| **API Documentation** | 8080 | `http://localhost:8080/swagger` | Swagger UI (Development only) |
| **Frontend Metro** | 8081 | `http://localhost:8081` | React Native Metro bundler |
| **Database (MariaDB)** | 3307 | `localhost:3307` | Direct database access |
| **Kratos Public API** | 4433 | `http://localhost:4433` | Authentication flows (login/register) |
| **Kratos Admin API** | 4434 | `http://localhost:4434` | Identity management |

### Health Check Endpoints

* **Backend Health**: `http://localhost:8080/health`
* **Kratos Public Health**: `http://localhost:4433/health/ready`
* **Kratos Admin Health**: `http://localhost:4434/admin/health/ready`

---

## 🔧 Development Commands

### Backend Development

* **Create a new migration** (after changing models):

  ```bash
  cd backend
  dotnet ef migrations add MigrationName
  ```

* **Test database connection:**
  Visit `http://localhost:8080/db-test` after starting the containers

* **View API documentation:**
  Visit `http://localhost:8080/swagger` (Development mode only)

### Available Scripts

Inside the `frontend/MobileBankingApp` directory, you can use the following npm scripts:

* `npm run ios`: Builds the app and runs it on the iOS Simulator.
* `npm run android`: Builds the app and runs it on the Android emulator.
* `npm run lint`: Lints the source code to check for errors.
* `npm run test`: Runs the Jest test suite.

---

## 🔍 Troubleshooting

* **Database connection issues:** Ensure Docker Desktop is running and wait for the health checks to pass
* **Migration errors:** Try `docker-compose down -v` to reset the database volumes, then `docker-compose up --build`
* **Port conflicts:** Make sure ports 8080, 8081, 3307, 4433, and 4434 are not in use by other applications
