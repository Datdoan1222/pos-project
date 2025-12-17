## 🧱 Kiến trúc thư mục

```txt
pos-project/
├── pos-backend/              # .NET 8 Web API
│   ├── Controllers
│   ├── Data
│   ├── DTOs
│   ├── Hubs
│   ├── Models
│   ├── obj
│   ├── Properties
│   ├── pos-backend.csproj
│   └── Dockerfile
│   └── Program.cs
│
├── pos-frontend/             # React + Vite + TypeScript
│   ├── src   |   
│   │   ├── app   
│   │   ├── assets   
│   │   ├── core   
│   │   │   ├── entities   
│   │   │   ├── repositories   
│   │   │   └── usecases   
│   │   ├── infrastructure   
│   │   │   ├── api   
│   │   │   └── websocket   
│   │   ├── presentation   
│   │   │   ├── components   
│   │   │   ├── hooks   
│   │   │   └── page   
│   │   ├── shared  
│   │   │   ├── constants   
│   │   │   └── utils    
│   │   ├── index.css   
│   │   └── main.tsx   
│   ├── public
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── docker-compose.yml    # (optional) chạy fullstack
├── .gitignore
└── README.md
```

---

## ⚙️ Công nghệ sử dụng

### Backend

* .NET 8 Web API
* Entity Framework Core
* SignalR (Realtime)
* Swagger / OpenAPI

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS (nếu có)

### DevOps

* Docker
* Docker Compose

---

## ▶️ Chạy project ở local (KHÔNG dùng Docker)

### 1️⃣ Backend

```bash
cd backend
dotnet restore
dotnet run
```

Mặc định backend chạy tại:

```
http://localhost:5139
```

Swagger:

```
http://localhost:5139/swagger
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại:

```
http://localhost:5173
```

---

## 🐳 Chạy project bằng Docker

### 1️⃣ Build & run Backend

```bash
cd backend
docker build -t pos-backend .
docker run -p 8080:8080 pos-backend
```

Backend (Docker):

```
http://localhost:8080/swagger
```

---

### 2️⃣ Build & run Frontend

```bash
cd frontend
docker build -t pos-frontend .
docker run -p 5173:5173 pos-frontend
```

Frontend:

```
http://localhost:5173
```

---

## 🐳 Chạy fullstack bằng Docker Compose

```bash
docker compose up --build
```

| Service  | URL                                                            |
| -------- | -------------------------------------------------------------- |
| Frontend | [http://localhost:5173](http://localhost:5173)                 |
| Backend  | [http://localhost:8080/swagger](http://localhost:8080/swagger) |

---

## 🔌 Kết nối Frontend → Backend

Frontend gọi API backend qua:

```ts
const API_URL = "http://localhost:8080";
```
