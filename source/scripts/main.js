
// main.js
// Main entry file for JS modules.

import { queryAll } from './helpers';
import Popup from './Popup';

// addMailtoHref - adds href attribute with mailto value to obusfcated mail links
// @param  {string} - id, class or attribute on mail links
function addMailToHref()
{
    const links = queryAll( '.js-mail' );

    links.forEach( link =>
    {
        link.addEventListener( 'click', event =>
        {
            const element = event.target;

            if ( element.href === '' )
            {
                const mailAddress = element.innerText.split( '' ).reverse().join( '' );
                return element.setAttribute( 'href', `mailto:${mailAddress}` );
            }
        },
        {
            once : true
        } );
    } );
}

Popup.init();
addMailToHref();
