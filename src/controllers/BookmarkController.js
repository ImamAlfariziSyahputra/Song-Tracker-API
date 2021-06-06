const { Bookmark, Song } = require('../models');
const _ = require('lodash');

module.exports = {
  async all(req, res) {
    try {
      const { userId, songId } = req.query;
      console.log('===>', req.query);
      let where = {
        UserId: userId,
      };
      if(songId) {
        where.SongId = songId
      };
      // Outer Join Song Model
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      });
      // Ambil hanya id Bookmark sama data Song nya
      const b = bookmarks.map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({
          bookmarkId: bookmark.id,
        }, bookmark.Song))
      res.send(b);
    } catch (err) {
      res.status(500).send({
        error: `an error occured trying to fetch the bookmarks, ${err.message}`,
      });
    };
  },
  async store(req, res) {
    try {
      const { songId, userId } = req.body;
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId,
        },
      });
      console.log('Bookmark', bookmark);
      if(bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        });
      }
      console.log('req.body', req.body);
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId,
      });
      res.send(newBookmark);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create the bookmark',
      });
    };
  },
  async delete(req, res) {
    try {
      const { bookmarkId } = req.params;
      const bookmark = await Bookmark.findByPk(bookmarkId);
      await bookmark.destroy();
      res.send(bookmark);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to delete the bookmarks',
      });
    };
  },
}