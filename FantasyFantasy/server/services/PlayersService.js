import { BadRequest, Forbidden } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class PlayersService {
  // async getMyPlayers(query = {}) {
  //   return await dbContext.Players.find(query)
  // }

  async getAll(query = {}) {
    return await dbContext.Players.find(query)
  }

  async getById(id) {
    const player = await dbContext.Players.findById(id).populate('account')
    if (!player) {
      throw new BadRequest('na Bro')
    }
    return player
  }

  async create(body) {
    const player = await dbContext.Players.create(body)
    return player.populate('account')
  }

  async edit(body) {
    const player = await this.getById(body.id)
    if (player.accountId.toString() !== body.accountId) {
      throw new Forbidden('stop that!!')
    }
    const signedPlayer = await dbContext.Players.findOneAndUpdate({ _id: body.id, accountId: body.accountId }, body, { new: true })
    return signedPlayer
  }
}
export const playersService = new PlayersService()
