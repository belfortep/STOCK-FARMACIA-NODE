const Router = require('express')
const router = Router();
const { getAllSolids, createSolid, getSolidById, deleteSolid, updateSolid } = require('../controllers/solidController');

router.get('/', getAllSolids);
router.post('/', createSolid);
router.get('/:id', getSolidById);
router.delete('/:id', deleteSolid);
router.put('/:id', updateSolid);

module.exports = router

