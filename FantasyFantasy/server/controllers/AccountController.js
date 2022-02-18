import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { playersService } from '../services/PlayersService'
import { charactersService } from '../services/CharactersService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/myplayers', this.getMyPlayers)
      .get('/mycharacters', this.getMyCharacters)
  }

  async getMyPlayers(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const myPlayers = await playersService.getAll({ accountId: accountId })
      return res.send(myPlayers)
    } catch (error) {
      next(error)
    }
  }

  async getMyCharacters(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const myCharacters = await charactersService.getAll({ accountId: accountId })
      return res.send(myCharacters)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
