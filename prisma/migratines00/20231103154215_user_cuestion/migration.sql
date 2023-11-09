-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "telefono" INTEGER NOT NULL,
    "relacion" TEXT NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "telefono" INTEGER NOT NULL,
    "carnet" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "genero" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadoCuestionario" (
    "id" SERIAL NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "respuestas" JSONB NOT NULL,
    "usuarioId" INTEGER,
    "usuarioNombre" TEXT NOT NULL DEFAULT 'Anónimo',

    CONSTRAINT "ResultadoCuestionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "ubicacionData" TEXT NOT NULL,
    "areVulnerable" TEXT NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "id" SERIAL NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertasUsuario" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "ubicacionId" INTEGER,
    "multimediaId" INTEGER,
    "audio" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AlertasUsuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoCuestionario" ADD CONSTRAINT "ResultadoCuestionario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizacion" ADD CONSTRAINT "Organizacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertasUsuario" ADD CONSTRAINT "AlertasUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertasUsuario" ADD CONSTRAINT "AlertasUsuario_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "Ubicacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertasUsuario" ADD CONSTRAINT "AlertasUsuario_multimediaId_fkey" FOREIGN KEY ("multimediaId") REFERENCES "Multimedia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
