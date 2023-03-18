import express from 'express';
import dotenv from "dotenv";
import path from 'path';

dotenv.config();
const app = express();


// Serve static files from the public folder
app.use(express.static('public'));
// Serve built files with Vite
app.use(express.static(path.join(process.cwd(), 'dist')));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ test: "ok" })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`);
});
