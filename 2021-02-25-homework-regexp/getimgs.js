const axios = require('axios');

axios.get('https://dou.ua/')
  .then(r => {
    const reg = /[h|\/]([^\s]+(?=\.(jpg|gif|png|svg|jpeg))\.\2)/gi;
    const out = r.data.match(reg);

    console.log('OUT>>>', out);
  
  })
;
