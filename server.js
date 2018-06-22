const express = require('express');
const path = require('path');
const qiniu = require('./qiniu');
const morgan = require('morgan');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'verify')));
app.use(morgan('combined'));

app.use('/', (req, ctx) => {
  ctx.render('index', {
    bundlePath: `${qiniu.cdnPath}/bundle.js`,
    vendorPath: `${qiniu.cdnPath}/vendor.bundle.js`,
    raven: process.env.NODE_ENV === 'production',
  });
});


app.listen(process.env.PORT_SERVER || 4052);
console.log(`listening on port ${process.env.PORT_SERVER || 4052}`);
