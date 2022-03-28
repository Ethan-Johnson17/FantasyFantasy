/* eslint-disable no-console */
import { Auth0Provider } from '@bcwdev/auth0provider'
import { playersService } from '../services/PlayersService'
import BaseController from '../utils/BaseController'

export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
      .post('', this.create)
      .post('/all', this.createAll)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const players = await playersService.getAll(query)
      return res.send(players)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const player = await playersService.getById(req.params.id)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const player = await playersService.edit(req.body)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const player = await playersService.create(req.body)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async createAll(req, res, next) {
    try {
      // req.body.accountId = req.userInfo.id
      const player = req.body
      player.forEach(p => {
        playersService.create(req.body)
        return res.send(player)
      })
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.account.id
      const playerId = req.params.id
      await playersService.remove(playerId, userId)
      res.send('Your player is released')
    } catch (error) {
      next(error)
    }
  }
}
