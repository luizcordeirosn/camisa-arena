/*
  Warnings:

  - A unique constraint covering the columns `[model,size]` on the table `shirts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shirts_model_size_key" ON "shirts"("model", "size");
