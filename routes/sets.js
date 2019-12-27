const express = require('express');

const router = express.Router();
const Flickr = require('flickr-sdk');
require('dotenv').config();

const flickr = new Flickr(process.env.FLICKR_API_KEY);

router.route('/')
  .get(async (req, res) => {
    console.log('just get');
    res.render('sets/index');
  })

  .post(async (req, res) => {
    const { tag, username } = req.body;
    const pictures = [];
    flickr.photos.search({
      tags: tag,
      user_id: username,
    }).then((res) => {
      const elementsCount = 28;
      for (let i = 0; i < elementsCount; i += 1) {
        const {
          farm, server, id, secret,
        } = res.body.photos.photo[i];
        const photoObj = {};
        photoObj.farm = farm;
        photoObj.server = server;
        photoObj.id = id;
        photoObj.secret = secret;
        photoObj.url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`;

        pictures.push(photoObj);
      }
    }).then(() => {
      // res.json({ pictures });
      res.render('sets/index', {
        pictures,
        pagination: { page: '1', limit: '2', totalRows: '1' }});
    })
      .catch((err) => {
        console.error('error!', err);
      });
  });

router.route('/:info')
  .get(async (req, res) => {
    console.log(req.params.info);
    const pictures = [];
    if (req.params.info === 'recent') {
      flickr.photos.getRecent({}).then((res) => {
        const elementsCount = 28;
        for (let i = 0; i < elementsCount; i += 1) {
          const {
            farm, server, id, secret,
          } = res.body.photos.photo[i];
          const photoObj = {};
          photoObj.farm = farm;
          photoObj.server = server;
          photoObj.id = id;
          photoObj.secret = secret;
          photoObj.url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`;

          pictures.push(photoObj);
        }
      }).then(() => {
        res.render('sets/index', { pictures });
      })
        .catch((err) => {
          console.error('error!', err);
        });
    }
  });

router.route('/info')
  .post(async (req, res) => {
    try {
      const { id } = req.body;
      const picInfo = await flickr.photos.getInfo({ photo_id: id });
      const result = picInfo.body.photo;
      res.json({ result });
    } catch (error) {
      console.log('ОШИБКА!!!!!!!!!!!!!!!!!!!!');
    }
  });


module.exports = router;
