-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `organizacionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_organizacionId_fkey` FOREIGN KEY (`organizacionId`) REFERENCES `Organizacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
