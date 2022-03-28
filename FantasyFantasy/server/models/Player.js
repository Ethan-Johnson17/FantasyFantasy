import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PlayerSchema = new Schema(
  {
    player_name: { type: String, required: true },
    position: { type: String, required: true },
    stats: { type: Object },
    team: { type: String },
    fantasy_points: { type: Object },
    active: { type: Boolean, default: false, required: true },
    accountId: { type: String },
    characterId: { type: String }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

PlayerSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
PlayerSchema.virtual('character', {
  localField: 'characterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Character'
})
