import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CharacterSchema = new Schema(
  {
    characterName: { type: String },
    race: { type: String, required: true },
    class: { type: String, required: true },
    Strength: { type: Number, required: true },
    Dexterity: { type: Number, required: true },
    Constitution: { type: Number, required: true },
    Wisdom: { type: Number, required: true },
    Intelligence: { type: Number, required: true },
    Charisma: { type: Number, required: true },
    active: { type: Boolean, default: false, required: true },
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
