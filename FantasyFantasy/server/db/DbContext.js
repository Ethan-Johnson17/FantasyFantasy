import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PlayerSchema } from '../models/Player'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Players = mongoose.model('Player', PlayerSchema)
}

export const dbContext = new DbContext()
