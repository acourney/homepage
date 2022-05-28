import React, { useEffect, useState } from "react";

import "./Quote.css";

function Quote(props) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://api.quotable.io/random";

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAuthor(data.author);
        setQuote(data.content);

        setLoading(false);
      });
  }, []);

  return (
    <div className="quote-container">
      {loading === false ? (
        <>
          <div className="quote-text">"{quote}"</div>
          <div className="quote-author">-{author}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quote;
