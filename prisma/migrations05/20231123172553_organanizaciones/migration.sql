/*
  Warnings:

  - You are about to drop the `AlertasUsuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rol` to the `Organizacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlertasUsuario" DROP CONSTRAINT "AlertasUsuario_multimediaId_fkey";

-- DropForeignKey
ALTER TABLE "AlertasUsuario" DROP CONSTRAINT "AlertasUsuario_ubicacionId_fkey";

-- DropForeignKey
ALTER TABLE "AlertasUsuario" DROP CONSTRAINT "AlertasUsuario_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Organizacion" ADD COLUMN     "rol" TEXT NOT NULL;

-- DropTable
DROP TABLE "AlertasUsuario";

-- CreateTable
CREATE TABLE "Modificacion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizacionId" INTEGER,
    "multimediaId" INTEGER,

    CONSTRAINT "Modificacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Modificacion" ADD CONSTRAINT "Modificacion_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modificacion" ADD CONSTRAINT "Modificacion_multimediaId_fkey" FOREIGN KEY ("multimediaId") REFERENCES "Multimedia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
