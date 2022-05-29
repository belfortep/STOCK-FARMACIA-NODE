const Router = require('express');
const { getAllLiquids, createLiquid, getLiquidById, deleteLiquid, updateLiquid } = require('../controllers/liquidController');
const router = Router();
const { verifyUser } = require('../util/verifyToken');
router.get('/', getAllLiquids);
router.post('/', createLiquid);
router.get('/:id', getLiquidById);
router.delete('/:id', deleteLiquid);
router.put('/:id', updateLiquid);

module.exports = router

