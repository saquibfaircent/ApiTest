
/**
 * Minimal two-API Node.js server using Express.
 * APIs:
 *  1) GET /api/v1/hello?name=YourName   -> { message: "Hello, YourName!" }
 *  2) POST /api/v1/echo (JSON body)     -> echoes back the JSON you send
 */
const express = require("express");
const morgan = require("morgan");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Health check (optional but handy for deployments)
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

/**
 * 1) Hello API — query param 'name' is optional.
 *    Example: GET http://localhost:3000/api/v1/hello?name=Vaibhav
 */
app.get("/api/v1/hello", (req, res) => {
  const name = (req.query.name || "there").toString();
  res.json({ message: `Hello, ${name}!` });
});

/**
 * 2) Echo API — send any JSON and it will be echoed back.
 *    Example:
 *      curl -X POST http://localhost:3000/api/v1/echo \

 *           -H "Content-Type: application/json" \

 *           -d '{ "foo": "bar" }'
 */
app.post("/api/v1/echo", (req, res) => {
  res.status(200).json({
    received: req.body,
    info: "POST /api/v1/echo echoes your JSON body"
  });
});

/**
 * ⚠️ Insecure: hardcoded secret (for CodeQL testing only)
 */
const DB_PASSWORD = "SuperSecret123";

const config = {
  username: "admin",
  password: "password123", // hardcoded password
};


/**
 * ⚠️ Intentionally Insecure API for CodeQL test
 * Do NOT use in production!
 *
 * Example: GET /api/v1/run?code=2+%2B+2
 */
app.get("/api/v1/run", (req, res) => {
  const code = req.query.code;
  try {
    // ❌ Bad practice: direct eval of user input
    const result = eval(code); 
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * ⚠️ Intentionally insecure for CodeQL demo — DO NOT USE IN PROD
 * Example: GET /api/v1/ping?host=example.com
 * Attack:  /api/v1/ping?host=8.8.8.8;cat+/etc/passwd
 */
app.get("/api/v1/ping", (req, res) => {
  const host = String(req.query.host || "");
  // ❌ Command injection: concatenating untrusted input into a shell command
  exec("ping -c 1 " + host, (err, stdout, stderr) => {
    if (err) return res.status(400).json({ error: String(err) });
    res.type("text/plain").send(stdout || stderr);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
