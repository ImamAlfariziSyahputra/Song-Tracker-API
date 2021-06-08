const { Bookmark, Song, History } = require('../models');
const _ = require('lodash');

module.exports = {
  async all(req, res) {
    try {
      const { userId } = req.query;
      // Outer Join Song Model
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      });
      // Ambil hanya id History sama data Song nya
      const h = histories
              .map(history => history.toJSON())
              .map(history => _.extend(
                {},
                history.Song,
                history
              ))
      res.send(_.uniqBy(h, history => history.SongId));
    } catch (err) {
      res.status(500).send({
        error: `an error occured trying to fetch the histories, ${err.message}`,
      });
    };
  },
  async store(req, res) {
    try {
      const { songId, userId } = req.body;
      const history = await History.create({
        SongId: songId,
        UserId: userId,
      });
      res.send(history);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create the history',
      });
    };
  },
}