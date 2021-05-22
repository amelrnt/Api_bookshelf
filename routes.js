// eslint-disable-next-line max-len
const {addNewData, viewAllData, databyId, editbyId, deletebyId} = require('./handler');
const Joi = require('joi');

const bookSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required(),
  reading: Joi.boolean().required(),
});

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewData,
    // options: {
    //   validate: {
    //     payload: bookSchema,
    //   },
    // },
  },
  {
    method: 'GET',
    path: '/books',
    handler: viewAllData,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: databyId,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editbyId,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deletebyId,
  },
];

module.exports = routes;
