import { Router } from 'express'

import {
  crearCategory,
  deleteCategory,
  getCategoryAll,
  getCategoryById,
  updateCategory
} from '../controllers'

const router = Router()

router.post('/', crearCategory)
router.get('/', getCategoryAll)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
