const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploads: path.join(rootPath, 'public', 'uploads'),
    baseUrl: 'mongodb://localhost/forum',
    baseConfig: {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}
};