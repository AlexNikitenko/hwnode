const axios = require('axios');

axios.get('https://dou.ua/')
  .then(r => {
    const reg = /[h|\/]([^\s]+(?=\.(jpg|gif|png|svg|jpeg))\.\2)/gi;   ///Ищем строки, которые начинаются на h или / (http или ///), имеют пробел перед искомым значением (перед src всегда пробел), и заканчиваются на jpg/gif/png/svg/jpeg
    const out = r.data.match(reg);

    console.log('OUT>>>', out);
  
  })
;
