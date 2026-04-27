# Personal Finance Manager  
A full‑stack web application designed to help users manage their personal finances.  
It provides features such as user registration, authentication, transaction tracking, budgeting, and data visualization through interactive charts.

The project is fully containerized using **Docker** and can be launched with a single command.

---

## 🚀 Technologies Used

### **Backend**
- Java 21  
- Spring Boot 3  
- Maven (`maven:3.9.6-eclipse-temurin-21`)  
- JDK (`eclipse-temurin:21-jdk`)  
- PostgreSQL driver  
- JWT authentication  

### **Frontend**
- React (Create‑React‑App)  
- Node.js (`node:24-slim`)  
- Material UI  
- Chart.js  
- Nginx (`nginx:stable-alpine`)  

### **Database**
- PostgreSQL (`postgres:latest`)


---

## ▶️ How to Run the Entire Application

### 1. Clone the repository
```bash
git clone https://github.com/AbrahamQM/personal-finance-manager.git
cd personal-finance-manager
```

### 2. Create the PostgreSQL volume (only required the first time)
```bash
docker volume create personal-finance-manager_pgdata
```

### 3. Start all services (backend, frontend, database)
Run this from the root folder, from root route where docker-compose.yml is located:

```bash
docker compose up --build
```
<b>Docker will automatically:</b>

- Download all required base images

- Build the backend JAR

- Build the frontend React application

- Build the final Docker images

- Start all containers

- No manual builds are required.

### 4. Acces to  client using browser
```bash
http://localhost
```

## Useful Commands
- View backend logs
```bash
docker compose logs backend --follow
```

- View frontend (Nginx) logs
```bash
docker compose logs frontend --follow
```

- Rebuild only the frontend
```bash
docker compose up -d --build frontend
```

- Rebuild only the backend (if you add a build section)
```bash
docker compose up -d --build backend
```

# 📄 License
```bash
Copyright (c) 2024 Abraham Quintana

This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
To view a copy of this license, visit:

https://creativecommons.org/licenses/by-nc-nd/4.0/
```

# 📝 Notes
The frontend is served by Nginx and proxies /api/** to the backend.

The backend exposes its API under /api/....

PostgreSQL data is stored in a persistent Docker volume.

The entire system can be started with a single command:
```bash
docker compose up --build
```