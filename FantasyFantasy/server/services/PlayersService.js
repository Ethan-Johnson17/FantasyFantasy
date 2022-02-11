import { dbContext } from '../db/DbContext'

class PlayersService {
  async getAll(query) {
    return await dbContext.Players.find(query)
  }

  async create(body) {
    const player = await dbContext.Players.create(body)
    return player.populate('account')
  }
}
export const playersService = new PlayersService()
