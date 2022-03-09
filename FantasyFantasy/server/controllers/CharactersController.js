import { Auth0Provider } from '@bcwdev/auth0provider'
import { charactersService } from '../services/CharactersService'
import BaseController from '../utils/BaseController'

export class CharactersController extends BaseController {
  constructor() {
    super('/api/characters')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('/:id', this.getById)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const characters = await charactersService.getAll(query)
      return res.send(characters)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const character = await charactersService.getById(req.params.id)
      return res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const character = await charactersService.create(req.body)
      return res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const characterId = req.params.id
      await charactersService.remove(characterId, userId)
      res.send('Your character is dead')
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const character = await charactersService.edit(req.body)
      return res.send(character)
    } catch (error) {
      next(error)
    }
  }
}
