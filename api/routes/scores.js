const express = require('express');
const Score = require('../models/scores');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

// Read best scores from the leaderboard
router.get('/', async (req, res) => {
  const orderByScore = req?.query?.order?.includes('score') ? req.query.order : undefined;
  let orderedLeaderboard;

  const bestScores = await Score.readBestScores();

  if (orderByScore) {
    orderedLeaderboard = [...bestScores].sort((a, b) => a.bestScore - b.bestScore);
  }

  if (orderByScore === '-score') {
    orderedLeaderboard = orderedLeaderboard.reverse();
  }

  return res.json(orderedLeaderboard ?? bestScores);
});

// Create a score to be added to the leaderboard
router.post('/', authorize, async (req, res) => {
  const { username, wave, score } = req.body;

  if (typeof username !== 'string' || typeof wave !== 'number' || typeof score !== 'number') {
    return res.status(400).send('Bad Request: Invalid data types');
  }

  if (wave < 0 || score < 0) {
    return res.status(400).send('Bad Request: Waves and scores must be non-negative');
  }

  const createdScore = await Score.createOneScore(username, wave, score);
  return res.json(createdScore);
});

// Delete a score from the leaderboard based on its id
router.delete('/:id', authorize, isAdmin, async (req, res) => {
  const { id } = req.params;

  const deletedScore = await Score.deleteOneScore(id);

  if (!deletedScore) {
    return res.status(404).send('Score not found');
  }

  return res.json(deletedScore);
});

module.exports = router;
