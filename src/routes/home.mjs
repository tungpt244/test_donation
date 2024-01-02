import express from 'express'
import { useDonation } from '../bundle.mjs'
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('cc')
})

router.post('/', async function (req, res, next) {
  const { site, name, message, loop } = req.body
  try {
    const result = await useDonation({ _site: site, _name: name, _message: message, _loop: loop })
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router
