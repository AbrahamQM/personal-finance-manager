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
docker volume create --name=personal-finance-manager_pgdata
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

- Rebuild and run only the frontend
```bash
cd /PFA-Frontend/personal-finance-manager-client/
npm run build
cd ../../
docker compose up -d --build frontend
```

- Rebuild and run only the backend
```bash
cd /personal-finance-manager/personal-finance-manager/
docker build -t pfm-backend . 
cd ../../
docker compose up -d --build backend
```

- Access to Postgres DB using psql (once DB container is running)
```bash
docker exec -it pfm-postgres psql -U postgres -d pfm
```

- Stop full application
```bash
 docker compose down
```

- ⚠️Clean all⚠️
```bash
# Stop and remove all containers from this project
docker compose down --remove-orphans
# (Stops the running services and removes containers created by this docker-compose file)

# Remove backend image
docker rmi -f pfm-backend:latest 2>/dev/null || true

# Remove frontend image
docker rmi -f pfm-frontend:latest 2>/dev/null || true

# Remove downloaded base images used ONLY by this project (optional but safe)
docker rmi -f postgres:latest 2>/dev/null || true
docker rmi -f nginx:stable-alpine 2>/dev/null || true
docker rmi -f eclipse-temurin:21-jdk 2>/dev/null || true
docker rmi -f maven:3.9.6-eclipse-temurin-21 2>/dev/null || true
docker rmi -f node:24-slim 2>/dev/null || true

# Remove the project's PostgreSQL volume
docker volume rm personal-finance-manager_pgdata 2>/dev/null || true

# Optional: verify everything is gone
docker images | grep pfm || echo "No project images found"
docker volume ls | grep personal-finance-manager || echo "No project volumes found"

# Optional:Delete the entire project folder from your machine
# You must be located in the parent directory where the repository was cloned
sudo rm -rf personal-finance-manager
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