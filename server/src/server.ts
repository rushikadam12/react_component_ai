import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      response_time: `${tokens["response-time"](req, res)} ms`,
      content_length: tokens.res(req, res, "content-length") || 0,
      body: req.body,
    });
  })
);

app.get("/", (_, res: any) => {
  return res.json({ message: "hello from server ✅" });
});

app.listen(port, () => {
  console.log(`Started server at ${process.env.PORT} 🌴`);
});
