const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const multer = require('multer');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: 'public_jjIbFciR5WS5t8bvyMPB6BkIS8o=',
    privateKey: 'private_MvmrX3OGIOAVeCKyToh/0zZOn4Q=',
    urlEndpoint: 'https://ik.imagekit.io/tlefihxv2',
  });

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

    const uploadedFile = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });

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
