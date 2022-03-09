import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CharacterSchema = new Schema(
  {
    characterName: { type: String },
    race: { type: String, required: true },
    class: { type: String, required: true },
    weapon: { type: String },
    accountId: { type: String },
    playerId: { type: String }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

CharacterSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
CharacterSchema.virtual('player', {
  localField: 'playerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Player'
})
