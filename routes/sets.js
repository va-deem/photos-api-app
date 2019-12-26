const express = require('express');

const router = express.Router();
const Flickr = require('flickr-sdk');
require('dotenv').config();

const flickr = new Flickr(process.env.FLICKR_API_KEY);
// const Display = require ('../models/display');

router.route('/')
  .get(async (req, res) => {
    console.log('just get');
    res.render('sets/index');
  })

  .post(async (req, res) => {
    const { tag, city } = req.body;
    const pictures = [];
    flickr.photos.search({
      tags: tag,
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
      res.render('sets/index', { pictures });
    })
      .catch((err) => {
        console.error('error!', err);
      });
  });

router.route('/recent')
  .get(async (req, res) => {
    const pictures = [];
    flickr.photos.getRecent({
    }).then((res) => {
      const elementsCount = 1;
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
  });

router.route('/info')
  .post(async (req, res) => {
    try {
      const { id } = req.body;

      //   flickr.photos.getInfo({
      //     photo_id,
      //   }).then((res) => {
      //     console.log('yay!', res.body);
      //     // res.json({ result: res.body });
      //   }).then(() => {
      //     console.log('rrrr!', res.body);
      //     res.json({ result: res.body });
      //     // res.render('sets/index', { pictures });
      //   })
      //     .catch((err) => {
      //       console.error('error!', err);
      //     });
      // });


      const inforr = await flickr.photos.getInfo({ photo_id: id });
      console.log(inforr);
      res.json({ inforr });
    } catch (error) {
      console.log('ОШИБКА!!!!!!!!!!!!!!!!!!!!');
    }
  });


module.exports = router;
