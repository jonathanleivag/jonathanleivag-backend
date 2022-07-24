import { Router } from 'express'

import {
  crearCategory,
  getCategoryAll,
  getCategoryById,
  updateCategory
} from '../controllers'

const router = Router()

router.post('/', crearCategory)
router.get('/', getCategoryAll)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategory)

module.exports = router
