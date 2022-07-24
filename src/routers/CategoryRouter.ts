import { Router } from 'express'

import { crearCategory } from '../controllers'

const router = Router()

router.post('/', crearCategory)

module.exports = router
