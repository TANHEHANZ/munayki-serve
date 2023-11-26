/*
  Warnings:

  - Made the column `organizacionId` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_organizacionId_fkey`;

-- AlterTable
ALTER TABLE `usuario` MODIFY `organizacionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_organizacionId_fkey` FOREIGN KEY (`organizacionId`) REFERENCES `Organizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
