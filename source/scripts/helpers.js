
// helpers.js
// Collection of small JS helper functions.

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
