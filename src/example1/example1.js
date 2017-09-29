// Listen for DOMContentLoaded with fallback support
if (
    document.readyState === "complete" ||
    ( document.readyState !== "loading" && !document.documentElement.doScroll )
) {
    setCardHeights();
} else {
    document.addEventListener( "DOMContentLoaded", setCardHeights );
}

// Flip an element on hover or on click
rh.test.flip = {
    attr: {
        trigger: "data-test-flip-on",
        visible: "data-test-visible"
    },
    action: function( $el ) {}
};

// For all flip-enabled elements, attach an on click or on hover event
$( "[" + rh.test.flip.attr.trigger + "]", context ).each( function( idx, val ) {
    // Add your trigger event here
    var flipButtons = val.querySelectorAll( ".js-flip-button" );

    flipButtons.forEach( function( flipButton ) {
        // Adding event listener to each button in unnecessary and non-performant
        // should utilize event bubbling with one listener
        flipButton.addEventListener( "click", function( evt ) {
            evt.preventDefault();
            flipCard( val );
        } );
    } );
} );

function flipCard( card ) {
    var flipper = card.querySelector( ".flip__flipper" );

    flipper.classList.toggle( "flip__flipper--flipped" );
}

// This function should be adapted to be used on resizing of window
function setCardHeights() {
    var cardContainers = document.querySelectorAll( ".flip__container" );

    cardContainers.forEach( function( cardContainer ) {
        var cards = cardContainer.querySelectorAll( ".flip__side" );
        var card1 = cards.item( 0 );
        var card2 = cards.item( 1 );
        var tallestCardHeight = Math.max( card1.offsetHeight, card2.offsetHeight );

        card1.style.height = tallestCardHeight + "px";
        card2.style.height = tallestCardHeight + "px";
        cardContainer.style.height = tallestCardHeight + "px";
    } );
}
