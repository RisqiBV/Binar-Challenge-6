-- CreateTable
CREATE TABLE "Galeri" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);
