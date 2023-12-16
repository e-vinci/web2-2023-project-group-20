const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  wave: { type: Number, required: true },
  score: { type: Number, required: true },
});

const Score = mongoose.model('Score', scoreSchema);

mongoose.connect('mongodb+srv://WebProjectVinci2023:WebProjectVinci2023@ShadowFortressGame.trlvgrx.mongodb.net/ShadowFortressGame?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

async function readBestScores() {
  return Score.aggregate([
    {
      $group: {
        _id: '$username',
        bestResult: {
          $max: {
            score: '$score',
            wave: '$wave',
          },
        },
      },
    },
    {
      $project: {
        username: '$_id',
        score: '$bestResult.score',
        wave: '$bestResult.wave',
        _id: 0,
      },
    },
    {
      $sort: {
        score: -1,
      },
    },
  ]);
}

async function createOneScore(username, wave, score) {
  return Score.create({ username, wave, score });
}

async function deleteOneScore(id) {
  return Score.findByIdAndRemove(id);
}

module.exports = {
  readBestScores,
  createOneScore,
  deleteOneScore,
};
