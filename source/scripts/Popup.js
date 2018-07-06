
// popup.js
// Make all popup elements and triggers in DOM interactive.

import { queryAll, query } from './helpers';

const TAB_KEY = 9;
const ESCAPE_KEY = 27;

let ROOT_ELEMENT;

const CLICK = 'click';
const KEY_DOWN = 'keydown';

const POPUP_SELECTOR = '.js-popup';
const POPUP_CLOSE_SELECTOR = '.js-popupClose';
const POPUP_FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex^="-"])';

const VISIBLE_CLASS = 'is-visible';

const Popup = {};

Popup.popupOpenedWith = null;

Popup.open = function( event, element )
{
    event.preventDefault();
    // Save element that opened popup
    // so we can return focus when popup closes.
    Popup.popupOpenedWith = event.currentTarget;
    element.classList.add( VISIBLE_CLASS );
    element.setAttribute( 'aria-hidden', false );
    // Put focus on close button.
    query( `a${POPUP_CLOSE_SELECTOR}`, element ).focus();
};

function closePopup( event, element )
{
    event.preventDefault();
    element.classList.remove( VISIBLE_CLASS );
    element.setAttribute( 'aria-hidden', true );
    if ( Popup.popupOpenedWith )
    {
        Popup.popupOpenedWith.focus();
    }
}

function handleKeyEvents( event, links, element )
{
    if ( event.ctrlKey || event.metaKey || event.altKey )
    {
        return;
    }

    switch ( event.which )
    {
        case ESCAPE_KEY:
            closePopup( event, element );
            event.preventDefault();
            break;
        case TAB_KEY:
            if ( event.shiftKey )
            {
                if ( event.target === links[ 0 ] )
                {
                    links[ links.length - 1 ].focus();
                    event.preventDefault();
                }
            }
            else
            {
                if ( event.target === links[ links.length - 1 ] )
                {
                    links[ 0 ].focus();
                    event.preventDefault();
                }
            }
            break;
    }
}

Popup.init = function( selector )
{
    ROOT_ELEMENT = document.body;
    const popupSelector = POPUP_SELECTOR;
    const allPopups = queryAll( popupSelector );

    allPopups.forEach( element =>
    {
        // Popup can be opened by using either link with href pointing to popups id
        // or with element that has data-popup attribute with value of popup ID.
        const popupOpeners = queryAll( `[href="#${element.id}"], [data-popup="#${element.id}"]` );

        // Find all elememts that close popup
        const popupClosers = queryAll( POPUP_CLOSE_SELECTOR, element );

        // Find all elements inside popup that can be focused and interacted with
        const popupLinks = queryAll( POPUP_FOCUSABLE, element );

        // Remove popup from wherever is placed in DOM and move to
        // bottom of the body so z-index wins.
        if ( element.parentNode !== ROOT_ELEMENT )
        {
            element.remove();
            ROOT_ELEMENT.appendChild( element );
        }

        const eventHandler = event => handleKeyEvents( event, popupLinks, element );

        popupOpeners.forEach( opener =>
            opener.addEventListener( CLICK, e =>
            {
                Popup.open( e, element );
                element.addEventListener( KEY_DOWN, eventHandler );
            } )
        );

        popupClosers.forEach( closer =>
            closer.addEventListener( CLICK, e =>
            {
                closePopup( e, element );
                element.removeEventListener( KEY_DOWN, eventHandler );
            } )
        );

    } );

};

export default Popup;
