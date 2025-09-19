
# two-api-node

A minimal Node.js project with exactly **two APIs** built on Express.

## APIs
1. **GET** `/api/v1/hello?name=YourName` → Returns `{ "message": "Hello, YourName!" }`  
   - If `name` is omitted, defaults to `"there"`.

2. **POST** `/api/v1/echo` with JSON body → Echoes back the JSON you send.  
   - Example:  
     ```bash
     curl -X POST http://localhost:3000/api/v1/echo \
       -H "Content-Type: application/json" \
       -d '{ "foo": "bar" }'
     ```

Also includes a helper **GET** `/health` for quick health checks.

## Get Started

```bash
# 1) Install dependencies
npm install

# 2) Run in dev (auto-reload with nodemon)
npm run dev

# or run normally
npm start
```

Now open:
- `GET http://localhost:3000/api/v1/hello?name=World`
- `POST http://localhost:3000/api/v1/echo` (send JSON body)

## Push to GitHub

```bash
# 1) Initialize a new git repo
git init
git add .
git commit -m "feat: two-api Node starter"

# 2) Create a new repo on GitHub (via UI). Copy the remote URL, then:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Environment
- Node.js v18+ recommended
- PORT can be set via environment variable (defaults to 3000)
