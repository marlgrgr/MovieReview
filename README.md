
# Movie Review & Rating API - React Project

A simple yet functional frontend to interact with the [Playground-mvc](https://github.com/marlgrgr/PlaygroundMVC) backend project.

This project is built using **React + JavaScript** and **Vite**, designed to provide an easy interface for users and administrators to manage movies, reviews, and users.

## 📌 Project Overview

This application serves as a companion frontend for the `Playground-mvc` backend, offering:

- JWT-based authentication and session management
- Movie catalog with pagination and real-time updates via WebSockets
- Review system with score submission
- Role-based user management (admin console)
- Docker support and CI/CD integration via Jenkins

---

## 🚀 Features

### 🔐 Authentication
- Login form with JWT token-based authentication.
- Automatic session expiration handling and redirection to login.
- Logged-in user menu for password changes and logout.

### 🎥 Movie Catalog
- List of movies with image, title, and summary.
- Pagination support for large catalogs.
- Async movie creation; real-time update of catalog via WebSocket events.

### ⭐ Movie Details & Reviews
- View all reviews for a selected movie.
- Add new reviews with score (0 to 5).

### 🛡️ Admin Console
(Visible only to users with `ADMIN` role)
- Create new users
- Delete existing users
- Add or remove user roles

---

## ⚙️ Tech Stack

- **React** + **JavaScript**
- **Vite** for fast development/build tooling
- **useRef-based WebSocket integration** for real-time updates
- **Axios** for API communication
- **JWT** for authentication

---

## 🐳 Docker Support

This project includes a `Dockerfile` for easy containerization.

To build and run the container:

```bash
docker build -t movie-review .
docker run -p 3000:80 movie-review-app
```

Make sure to configure the .env.production file contains the required environmental variables.

---

## 🔁 CI/CD with Jenkins

A Jenkins pipeline is included to automate the build and deployment of this frontend.

Typical pipeline stages include:
1. Checkout code
2. Install dependencies
3. Build project
4. Prepare configuration with configuration file hosted on jenkins
5. Build Docker image
6. Deploy container on local system.

Ensure your Jenkins environment has:
- Node.js
- Docker CLI
- Git

---

## 🛠️ Development Setup

```bash
# Clone the repo
git clone https://github.com/marlgrgr/MovieReview.git
cd MovieReview

# Install dependencies
npm install

# Run locally
npm run dev
```

The app will be served at [http://localhost:5173](http://localhost:5173) by default.

Make sure to add the frontend’s exposed port (e.g., http://localhost:5173) to the list of allowed CORS origins in the backend configuration.

---

## 🔧 Environment Configuration

For the build command you need to create an .env.production file with the following properties on the root folder

```env
VITE_API_BASE_URL=http://<<your-backend-host>>:<<your-backend-port>>/api/v1
VITE_API_BASE_URL_WS=ws://<<your-backend-host>>:<<your-backend-port>>/ws
```

---

## 🛠️ Build your project

To create the dist folder that will have your page resources you will need to run the following command

```bash
npm run build
```

---

## 🚀 Deploy your project

If the dist is already generated you can copy that source to your web server or you can generate a preview with

```bash
npm run preview
```

---

## 📎 Related Projects

- Backend: [Playground-mvc](https://github.com/marlgrgr/PlaygroundMVC)

---