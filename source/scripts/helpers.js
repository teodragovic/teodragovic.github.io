
// helpers.js
// Collection of small JS helper functions.

// Returns unitless number representig scrollbar width in px.
// @return {number} scrollbar width
export function getScrollbarWidth()
{
    const scrollDiv = document.createElement( 'div' );
    scrollDiv.style.overflowY = 'scroll';

    // Needed by IE to trigger hasLayout
    // otherwise clientWidth returns 0
    scrollDiv.style.zoom = '1';
    scrollDiv.textContent = 'foo';

    document.body.appendChild( scrollDiv );
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild( scrollDiv );
    return scrollbarWidth;
}

// Returns first element that matches passed selector.
// @param  {string} selector to match
// @param  {Element} parent element to query under, by default it's document
// @return {Element} elements that match selector
export function query( selector, rootElement )
{
    const _rootElement = rootElement || document;
    return _rootElement.querySelector( selector );
}

// Returns array of elements that match passed selector, similar to jQuery $ function.
// @param  {string} selector to match
// @param  {Element} parent element to query under, by default it's document
// @return {array} array of elements that match selector
export function queryAll( selector, rootElement )
{
    const _rootElement = rootElement || document;
    const NodeList = _rootElement.querySelectorAll( selector );
    // convert NodeList into Array
    return [].slice.call( NodeList );
}

// addMailtoHref - adds href attribute with mailto value to obusfcated mail links
// @param  {string} - id, class or attribute on mail links
export function addMailToHref( selector )
{
    if ( typeof selector !== 'string' )
    {
        return;
    }

    const links = document.querySelectorAll( `a${selector}` );
    const linksArray = [].slice.call( links );

    linksArray.forEach( link =>
    {
        link.addEventListener( 'click', event =>
        {
            const element = event.target;

            if ( element.href === '' )
            {
                const mailAddress = element.innerText.split( '' )
                    .reverse() // eslint-disable-line indent
                    .join( '' ); // eslint-disable-line indent
                return element.setAttribute( 'href', `mailto:${mailAddress}` );
            }
        },
        {
            once : true
        } );
    } );
}
