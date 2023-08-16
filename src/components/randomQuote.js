import React, { useEffect, useRef, useState } from "react"
import { BsQuote, BsTwitter } from "react-icons/bs"
const RandomQuote = () => {
    const url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const quoteTextRef = useRef(null)
    const quoteAuthorRef = useRef(null)
    const newQuoteButtonRef = useRef(null)
    const tweetQuoteButtonRef = useRef(null)

    useEffect(() => {
        fetchQuote()
    }, [])

    const fetchQuote = async () => {
        const res = await fetch(url)
        const quote = await res.json()
        let dataQuote = quote.quotes
        let randomQuote = dataQuote[Math.floor(Math.random() * dataQuote.length)]

        setQuote(randomQuote.quote)
        setAuthor(randomQuote.author)

        setRandomColor()

        quoteTextRef.current.classList.remove("active")
        quoteAuthorRef.current.classList.remove("active")
        setTimeout(() => {
            quoteTextRef.current.classList.add("active")
            quoteAuthorRef.current.classList.add("active")
        }, 10)
    }

    const handleClick = () => {
        fetchQuote()
    }

    const setRandomColor = () => {
        let colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#FB6964",
            "#342224",
            "#472E32",
            "#BDBB99",
            "#77B1A9",
            "#73A857",
        ]

        let randomColorIndex = Math.floor(Math.random() * colors.length)
        // Set background color for body
        document.body.style.backgroundColor = colors[randomColorIndex]

        // Set color for text and button elements using useRef
        quoteTextRef.current.style.color = colors[randomColorIndex]
        quoteAuthorRef.current.style.color = colors[randomColorIndex]
        newQuoteButtonRef.current.style.backgroundColor = colors[randomColorIndex]
        tweetQuoteButtonRef.current.style.backgroundColor = colors[randomColorIndex]
    }

    return (
        <div className="container">
            <div id="quote-box">
                <div className="quote-text" ref={quoteTextRef}>
                    <BsQuote className="quote" />
                    <span id="text">{quote}</span>
                </div>
                <div className="quote-author" ref={quoteAuthorRef}>
                    - <span id="author">{author}</span>
                </div>
                <div className="buttons">
                    <a
                        class="button"
                        id="tweet-quote"
                        title="Tweet this quote!"
                        target="_top"
                        ref={tweetQuoteButtonRef}
                        href='twitter.com/intent/tweet'>
                        <BsTwitter />
                    </a>
                    <button
                        class="button"
                        id="new-quote"
                        ref={newQuoteButtonRef}
                        onClick={handleClick}>
                        New quote
                    </button>
                </div>
            </div>
            <div class="footer">
                by <a href="https://codepen.io/njt123456/pen/vYvBmoR">me</a>
            </div>
        </div>
    )
}

export default RandomQuote
