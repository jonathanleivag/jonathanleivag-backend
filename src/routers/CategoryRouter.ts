import { Router } from 'express'

import { crearCategory, getCategoryAll, getCategoryById } from '../controllers'

const router = Router()

router.post('/', crearCategory)
router.get('/', getCategoryAll)
router.get('/:id', getCategoryById)

module.exports = router
