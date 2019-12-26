const Flickr = require('flickr-sdk');
require('dotenv').config();

class Display {

  showByTag(elementsCount, response) {
    const pictures = [];
    for (let i = 0; i < elementsCount; i += 1) {
      const { farm, server, id, secret } = response.body.photos.photo[i];
      pictures.push(`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_s.jpg`);
    }
    return pictures;
  }
}

module.exports = Display;
