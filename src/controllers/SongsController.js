const { Song } = require('../models');

module.exports = {
  async all(req, res) {
    try {
      const song = await Song.findAll({
        limit: 10,
      });
      res.send(song);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch the songs',
      });
    };
  },
  async store(req, res) {
    try {
      const song = await Song.create(req.body);
      res.send(song);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create the song',
      });
    };
  },

}