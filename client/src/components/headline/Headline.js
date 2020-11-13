import React from "react";
import "./Headline.css";

const Headline = () => {
    return (
        <React.Fragment>
            <h3 id="headline">The ultimate beginner's guide to stock market investing.</h3>
            <h5 id="subheadline">We'll guide you through the 5 basic steps of investing & give you the experience of what it's like in a free, virtual stock market simulator.</h5>
            <button class="started-button"><a href="">Get Started!</a></button>
        </React.Fragment>
    );
}

export default Headline;
