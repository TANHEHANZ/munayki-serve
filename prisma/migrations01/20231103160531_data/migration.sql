-- CreateTable
CREATE TABLE `Contacto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `edad` INTEGER NOT NULL,
    `telefono` INTEGER NOT NULL,
    `relacion` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `edad` INTEGER NOT NULL,
    `telefono` INTEGER NOT NULL,
    `carnet` INTEGER NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResultadoCuestionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `puntuacion` INTEGER NOT NULL,
    `respuestas` JSON NOT NULL,
    `usuarioId` INTEGER NULL,
    `usuarioNombre` VARCHAR(191) NOT NULL DEFAULT 'Anónimo',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `ubicacionData` VARCHAR(191) NOT NULL,
    `areVulnerable` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ubicacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `longitud` DOUBLE NOT NULL,
    `latitud` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Multimedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlertasUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NULL,
    `ubicacionId` INTEGER NULL,
    `multimediaId` INTEGER NULL,
    `audio` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contacto` ADD CONSTRAINT `Contacto_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultadoCuestionario` ADD CONSTRAINT `ResultadoCuestionario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organizacion` ADD CONSTRAINT `Organizacion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlertasUsuario` ADD CONSTRAINT `AlertasUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlertasUsuario` ADD CONSTRAINT `AlertasUsuario_ubicacionId_fkey` FOREIGN KEY (`ubicacionId`) REFERENCES `Ubicacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlertasUsuario` ADD CONSTRAINT `AlertasUsuario_multimediaId_fkey` FOREIGN KEY (`multimediaId`) REFERENCES `Multimedia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
