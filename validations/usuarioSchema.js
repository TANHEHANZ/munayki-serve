const Joi = require("joi");

const usuarioSchema = Joi.object({
  nombre: Joi.string().max(255).required(),
  apellido: Joi.string().max(255).required(),
  edad: Joi.number().integer().positive().required(),
  telefono: Joi.number().integer().positive().required(),
  ubicacion: Joi.string().max(255).required(),
  correo: Joi.string().email().required(),
  password: Joi.string().required(),
  rol: Joi.string().required(),
  genero: Joi.string().required(),
  nombreOrganizacion: Joi.string().allow(null),
  ubicacion: Joi.string().allow(null),
  areVulnerable: Joi.string().allow(null),
});

module.exports = usuarioSchema;
