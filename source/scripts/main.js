
// main.js
// Main entry file for JS modules.

import Popup from './Popup';
import { addMailToHref } from './helpers';

Popup.init();
addMailToHref( '.js-mail' );
