import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PlayerSchema } from '../models/Player'
import { CharacterSchema } from '../models/Character'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Players = mongoose.model('Player', PlayerSchema)
  Characters = mongoose.model('Character', CharacterSchema)
}

export const dbContext = new DbContext()
