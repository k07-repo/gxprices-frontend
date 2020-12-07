import React from 'react'

const FAQ = () => {
    return (
        <div className="w-100 p-3">
            <h1>FAQ</h1>
            <br/>
            <h3>What does this site have?</h3>
            <p>
                This site collates the TCGPlayer market price data for English Pokémon cards to allow for easier visibility of multiple prices at once. It also allows for users to see the general market value of their collection, or of cards that they are looking to buy in the future, and view the short-term changes of price data.
                <br/><br/>
                Market price data is updated regularly, the price/percentage difference since the last update is also shown.
                <br/><br/>
                You must register a free account to use the collection/watchlist features. 
            </p>
            <h3>What does this site not have?</h3>
            <p>
                This site does not contain data for
                <ul>
                    <li>graded cards</li>
                    <li>non-English cards</li>
                    <li>reverse holofoil cards</li>
                    <li>1st edition cards</li>
                    <li>sealed products</li>
                    <li>any non-Pokémon products</li>
                </ul>               
            </p>
            <h3>What are market prices?</h3>
            <p>
                Market prices are calculated by TCGPlayer based on the sales that take place through their platform. They serve as a good indicator as to what the card itself is worth.
                <br/><br/>
                Market prices do not seem to take condition into account. Generally, even more expensive modern cards will be much more available as near-mint copies, so the market price will hover around there. But for older cards, the near-mint copies will be rarer and more people will settle for lightly played or similar, having to pay extra for near mint. So if you only want near-mint cards, market prices are more accurate for modern cards than they are for older cards.
            </p>
        </div>
    )
}

export default FAQ