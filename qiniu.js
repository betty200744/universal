const qiniu = require('@util/qiniu');

module.exports = qiniu('universal', process.env.NODE_ENV);
