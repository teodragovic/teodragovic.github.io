
// main.js
// Main entry file for JS modules.

// Returns array of elements that match passed selector, similar to jQuery $ function.
// @param  {string} selector to match
// @return {array} array of elements that match selector
function queryAll( selector )
{
    const NodeList = document.querySelectorAll( selector );
    // Convert NodeList into Array
    return [].slice.call( NodeList );
}

// Adds href attribute with mailto value to obusfcated mail links.
// @param  {String} - id, class or attribute on mail links
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

addMailToHref();
