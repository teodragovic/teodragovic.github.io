
// main.js
// Main entry file for JS modules.

( function()
{
    // Adds href attribute with mailto value to obusfcated mail links.
    const link = document.querySelector( '.js-mail' );
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
} )();
