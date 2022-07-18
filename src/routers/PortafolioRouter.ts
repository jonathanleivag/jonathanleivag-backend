import { Router } from 'express'

import {
  crearPortafolio,
  deletePortafolio,
  getAllPortafolios,
  getLimitPortafolios,
  getPortafolioById,
  updatePortafolio
} from '../controllers'

const router = Router()

router.post('/create', crearPortafolio)
router.get('/all', getAllPortafolios)
router.get('/', getLimitPortafolios)
router.get('/:id', getPortafolioById)
router.delete('/:id', deletePortafolio)
router.put('/:id', updatePortafolio)

module.exports = router
