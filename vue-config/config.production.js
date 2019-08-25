const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin'); // eslint-disable-line

const prerenderedRoutesList = ['/login', '/', '/signup'];

module.exports = {
  configureWebpack: {
    plugins: [
      /* See https://github.com/chrisvfritz/prerender-spa-plugin for more details */
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__rootDirname),
        // Required - Routes to prerender.
        routes: prerenderedRoutesList,
      }),
    ],
  },
};
