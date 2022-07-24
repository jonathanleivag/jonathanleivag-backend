import { Router } from 'express'

import { crearCategory, getCategoryAll } from '../controllers'

const router = Router()

router.post('/', crearCategory)
router.get('/', getCategoryAll)

module.exports = router
