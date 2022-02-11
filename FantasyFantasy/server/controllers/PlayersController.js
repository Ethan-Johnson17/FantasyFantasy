import { Auth0Provider } from '@bcwdev/auth0provider'
import { playersService } from '../services/PlayersService'
import BaseController from '../utils/BaseController'

export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
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

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const player = await playersService.create(req.body)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }
}
