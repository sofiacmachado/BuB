const { environment } = require('@rails/webpacker')

module.exports = environment

const customConfig = {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
        '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
      }
    }
  }