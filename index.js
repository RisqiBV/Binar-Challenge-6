const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\LearnJS'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('gambar'), async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const url = req.file.path; 

    const result = await prisma.galeri.create({
      data: {
        judul,
        deskripsi,
        url,
      },
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
