import express from "express";
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;
dotenv.config();
const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log(`server listen to ${PORT}`);
});
