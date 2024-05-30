-- CreateTable
CREATE TABLE "shirts" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "shirts_pkey" PRIMARY KEY ("id")
);
