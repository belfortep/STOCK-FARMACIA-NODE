const Router = require('express');
const { getAllLiquids, createLiquid, getLiquidById, deleteLiquid, updateLiquid } = require('../controllers/liquidController');
const router = Router();
const { verifyUser } = require('../util/verifyToken');
router.get('/', getAllLiquids);
router.post('/', verifyUser, createLiquid);
router.get('/:id', getLiquidById);
router.delete('/:id', verifyUser, deleteLiquid);
router.put('/:id', verifyUser, updateLiquid);

module.exports = router

