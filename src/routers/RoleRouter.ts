import { Router } from 'express'

import {
  createRole,
  deleteRole,
  getOneRole,
  getRoles,
  updateRole
} from '../controllers'

const router = Router()

router.post('/create', createRole)
router.get('/', getRoles)
router.get('/:id', getOneRole)
router.put('/:id', updateRole)
router.delete('/:id', deleteRole)

module.exports = router
