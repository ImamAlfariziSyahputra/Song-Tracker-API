const { Op } = require('sequelize');
const { Song } = require('../models');

module.exports = {
  async all(req, res) {
    try {
      let songs = null;
      const search = req.query.search;
      if(req.query.search) {
        songs = await Song.findAll({
          where: {
            [Op.or] : [
              'title', 'artist', 'genre', 'album'
            ].map(
              key => ({
                [key]: {
                  [Op.like]: `%${search}%`,
                },
              })
            ),
          },
        });
      } else {
        const songs = await Song.findAll({
          limit: 10,
        });
      }
      res.send(songs);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch the songs',
      });
    };
  },
  async show(req, res) {
    try {
      const song = await Song.findByPk(req.params.songId);
      res.send(song);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to show the song',
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
  async update(req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to update the song',
      });
    };
  },

}