/*
  Warnings:

  - You are about to drop the column `organizacionId` on the `modificacion` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `organizacion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `modificacion` DROP FOREIGN KEY `Modificacion_organizacionId_fkey`;

-- DropForeignKey
ALTER TABLE `organizacion` DROP FOREIGN KEY `Organizacion_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `modificacion` DROP COLUMN `organizacionId`,
    ADD COLUMN `usuarioId` INTEGER NULL;

-- AlterTable
ALTER TABLE `organizacion` DROP COLUMN `usuarioId`;

-- AddForeignKey
ALTER TABLE `Modificacion` ADD CONSTRAINT `Modificacion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
