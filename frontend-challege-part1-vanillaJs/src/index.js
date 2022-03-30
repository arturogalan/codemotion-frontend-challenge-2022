/**
 * File for setting up the environment. Please do not modify.
 */

import './css/style.css'

if (module.hot) {
  module.hot.accept();
}

try {
  require("./js/script");
} catch (e) {
  console.error(e)
}

console.log('DOM Loaded');
