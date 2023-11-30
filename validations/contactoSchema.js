const Joi = require("joi");

const contactoSchema = Joi.object({
  nombre: Joi.string().max(255).required(),
  apellido: Joi.string().max(255).required(),
  edad: Joi.number().integer().positive().required(),
  telefono: Joi.number().integer().positive().required(),
  relacion: Joi.string().required(),
  usuarioId: Joi.number().integer().positive().allow(null),
});

module.exports = contactoSchema;
