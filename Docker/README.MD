
# Personal Financial Manager – Database Setup

This project uses **PostgreSQL running in Docker** with a persistent volume to store all database data.  
Follow the steps below to prepare your environment and run the database server.

---

## 1. Create the `pfmBD` directory

Before running Docker Compose, you must manually create a folder named **`pfmBD`** in the same directory where the `docker-compose.yml` file is located.

This folder will be used by Docker to store the PostgreSQL data volume.

Example structure:

```
personal-finance-manager-APP/
│
├── docker-compose.yml
└── pfmBD/
```

Create the folder manually or run:

```bash
mkdir pfmBD
```

---

## 2. Install Docker

Make sure Docker Desktop is installed and running on your system.

Download: `https://www.docker.com/products/docker-desktop/` [(docker.com in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fwww.docker.com%2Fproducts%2Fdocker-desktop%2F")

---

## 3. Start PostgreSQL using Docker Compose

From the directory containing the `docker-compose.yml` file, run:

```bash
docker compose up -d
```

Docker will:

- pull the PostgreSQL image (if not already available)
- create the `pfmBD` volume (mapped to `/var/lib/postgresql`)
- start the PostgreSQL container

---

## 4. Connecting to the Database

### Option A — Using psql inside the container

If you do not have psql installed locally, you can use the one inside the container:

```bash
docker exec -it postgres_for_personal_finantial_manager psql -U postgres -d pfm
```

### Option B — Using an external client

Use the following connection details:

- **Host:** localhost  
- **Port:** 5432  
- **User:** postgres  
- **Password:** PFMAdmin  
- **Database:** pfm  

---

## 5. Stopping and Restarting the Database

To stop the database:

```bash
docker compose down
```

To start it again:

```bash
docker compose up -d
```

All data will persist because it is stored inside the `pfmBD` volume.

---

## 6. Removing Everything (Optional)

If you want to delete the container **and** the stored data:

```bash
docker compose down -v
```

This will remove the volume and all database contents.

---

## 7. Notes

- The `pfmBD` folder must exist before running Docker Compose.
- Do **not** commit database files to Git; the folder is already ignored.
- PostgreSQL version 18 requires mounting the volume at `/var/lib/postgresql`.


