const Router = require('express');
const { getAllPsychos, createPsycho, getPsychoById, deletePsycho, updatePsycho } = require('../controllers/psychoController');
const router = Router();


router.get('/', getAllPsychos);
router.post('/', createPsycho);
router.get('/:id', getPsychoById);
router.delete('/:id', deletePsycho);
router.put('/:id', updatePsycho);

module.exports = router

