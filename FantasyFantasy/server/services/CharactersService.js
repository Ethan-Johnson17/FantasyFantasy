import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CharactersService {
  async getAll(query = {}) {
    const characters = await dbContext.Characters.find(query)
    return characters
  }

  async getById(id) {
    const character = await dbContext.Characters.findById(id).populate('account player')
    if (!character) {
      throw new BadRequest('Cannot find that character')
    }
    return character
  }

  async create(body) {
    const character = await dbContext.Characters.create(body)
    return character.populate('account')
  }

  async remove(playerId, userId) {
    const character = await this.getById(playerId)
    if (character.accountId.toString() !== userId) {
      throw new Forbidden('Access denied!!')
    }
    await dbContext.Characters.findByIdAndDelete(playerId)
    await dbContext.Players.findByIdAndDelete({ playerId: playerId, accountId: userId })
  }

  async edit(body) {
    const character = await this.getById(body.id)
    if (character.accountId.toString() !== body.accountId) {
      throw new Forbidden('stop that!!')
    }
    const myCharacter = await dbContext.Characters.findOneAndUpdate({ _id: body.id, accountId: body.accountId }, body, { new: true })
    return myCharacter
  }
}
export const charactersService = new CharactersService()
