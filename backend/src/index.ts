import express, { Request, Response } from "express";

const app = express();

const port = 3001;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});
