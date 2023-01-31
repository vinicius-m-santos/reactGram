const express = require('express');
const router = express.Router();

// Controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto} = require('../controllers/PhotoController');

// Middlewares
const {photoInsertValidation, photoUpdateValidation} = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const {imageUpload} = require('../middlewares/imageUpload');

// Routes
router.post('/', authGuard, imageUpload.single('image'), photoInsertValidation(), validate, insertPhoto);

router.delete('/:id', authGuard, deletePhoto);
router.get('/', authGuard, getAllPhotos);
router.get('/user/:id', authGuard, getUserPhotos);
// A linha abaixo deve ser mantida em baixo para evitar que ao realizar um get,
// a api execute a requisição /user/:id como se fosse parte de um id, inserido no /:id
router.get('/:id', authGuard, getPhotoById);
router.put('/:id', authGuard, photoUpdateValidation(), validate, updatePhoto);

module.exports = router;