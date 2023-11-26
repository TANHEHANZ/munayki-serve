/*
  Warnings:

  - You are about to drop the column `organizacionId` on the `usuario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_organizacionId_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `organizacionId`,
    ADD COLUMN `areVulnerable` VARCHAR(191) NULL,
    ADD COLUMN `nombreOrganizacion` VARCHAR(191) NULL,
    ADD COLUMN `ubicacion` VARCHAR(191) NULL;
