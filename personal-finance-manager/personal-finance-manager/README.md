
## 1. Requirements

Before running the backend, make sure you have the following installed:

- **Java 21+**
- **Maven** (if not using the Maven wrapper)
- **Docker Desktop** (required for the PostgreSQL container)
- **Postman** or any REST client (optional, for testing)

---

## 2. Database Setup (PostgreSQL in Docker)

The backend requires a PostgreSQL database.  
Follow the instructions in the main project README to:

1. Create the `pfmBD` directory  
2. Install Docker  
3. Start the database using:

```bash
docker compose up -d
```

Once the container is running, PostgreSQL will be available at:

- **Host:** localhost  
- **Port:** 5432  
- **Database:** pfm  
- **User:** postgres  
- **Password:** PFMAdmin  

---

## 3. Spring Boot Configuration

The backend uses `application.properties` to connect to the database.  
Make sure the file contains the following configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pfm
spring.datasource.username=postgres
spring.datasource.password=PFMAdmin
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

This configuration ensures:

- Automatic schema creation/update during development  
- SQL logs visible in the console  
- PostgreSQL dialect enabled for Hibernate  

---

## 4. Running the Backend

You can start the backend using Maven:

```bash
mvn spring-boot:run
```

Or by running the generated JAR file:

```bash
java -jar target/pfm-backend.jar
```

Once running, the backend will be available at:

```
http://localhost:8080
```

---

## 5. Testing the API

You can test the API using:

- **Postman**
- **curl**
- Any HTTP client

Example request to create a user:

```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "1234"
}
```

---

## 6. Stopping and Restarting the Database

To stop the PostgreSQL container:

```bash
docker compose down
```

To start it again:

```bash
docker compose up -d
```

All data will persist thanks to the `pfmBD` volume.

---

## 7. Cleaning Everything (Optional)

If you want to remove the database container **and** delete all stored data:

```bash
docker compose down -v
```

Use this only if you want to reset the database completely.

---

## 8. Project Structure 

```
personal-finance-manager/
│
├── .mvn/                      # Maven wrapper files
├── mvnw                       # Maven wrapper (Linux/Mac)
├── mvnw.cmd                   # Maven wrapper (Windows)
├── pom.xml                    # Maven dependencies and project config
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── abrahamquintana/
│   │   │           └── personalfinancemanager/
│   │   │               ├── config/          # Security, CORS, beans, global config
│   │   │               ├── controller/      # REST controllers (API endpoints)
│   │   │               ├── dto/             # Data Transfer Objects
│   │   │               ├── exceptions/      # Custom exceptions + handlers
│   │   │               ├── mapper/          # Entity <-> DTO mappers
│   │   │               ├── model/           # JPA entities (User, Transaction, etc.)
│   │   │               ├── repository/      # Spring Data JPA repositories
│   │   │               ├── security/        # JWT, filters, authentication logic
│   │   │               ├── service/         # Business logic services
│   │   │               └── PersonalFinanceManagerApplication.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties       # Spring Boot configuration
│   │       ├── static/                      # Static files (if needed)
│   │       └── templates/                   # Thymeleaf templates (if used)
│   │
│   └── test/
│       └── java/
│           └── ...                          # Unit and integration tests
│
└── README.md

```

---

## 9. Notes

- The backend will not start unless the PostgreSQL container is running.
- The database credentials must match those defined in `docker-compose.yml`.
- For production, replace `ddl-auto=update` with a safer option (e.g., `validate`).

---
