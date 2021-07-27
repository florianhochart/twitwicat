import Twit from 'twit';
import fs from 'fs';
import fetch from 'node-fetch';

const url = "https://cataas.com/cat/cute"

var T = new Twit({
    consumer_key:         'secret',
    consumer_secret:      'secret',
    access_token:         'secret',
    access_token_secret:  'secret',
  })

async function download() {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`./cat.jpg`, buffer, () => 
    console.log('Une image de chat a ete download!'));
    setTimeout(postCat, 10000)
}

function postCat(){

var b64content = fs.readFileSync('cat.jpg', { encoding: 'base64' })

T.post('media/upload', { media_data: b64content }, function (err, data, response) {

  var mediaIdStr = data.media_id_string
  var meta_params = { media_id: mediaIdStr }

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      var params = { status: 'Dose de chat', media_ids: [mediaIdStr] }

      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})
console.log('Publication dun nouveau chat dans 1 minute. Veuillez patienter...')
setTimeout(download, 86400000) // Nouveau tweet tous les 24H
}

//Here we go
download();

  