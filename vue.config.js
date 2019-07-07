module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/how-much-per-kilogram/' : '/',

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
}
