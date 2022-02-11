import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PlayerSchema = new Schema(
  {
    player_name: { type: String, required: true },
    position: { type: String, required: true },
    stats: { type: Object, required: true },
    team: { type: String, required: true },
    fantasy_points: { type: Object, required: true },
    accountId: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

PlayerSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
