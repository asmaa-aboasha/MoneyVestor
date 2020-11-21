import React from "react";
import "./Tutorial.css";
import { Carousel } from "react-materialize";

const Tutorial = () => {
  return (
    <React.Fragment>
      <Carousel
        carouselId="Carousel-1"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-main">
          <h1 id="title">Here's how it works:</h1>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-3"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-left">
          <h1>Start with $10,000 in virtual cash.</h1>
          <div className="arrow-right">
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div className="image">
          <img src="/funds.png" alt="Funds"></img>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-4"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-right">
          <h1>Search for a stock.</h1>
          <div className="arrow-left">
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div className="image">
          <img src="/search-bar.png" alt="Search Bar"></img>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-5"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-left">
          <h1>Get real time data.</h1>
          <div className="arrow-right">
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div className="image">
          <img src="/stock-data.png" alt="Stock Data"></img>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-6"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-right">
          <h1>Choose to buy or sell.</h1>
          <div className="arrow-left">
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div className="image">
          <img src="/buy-sell.png" alt="Buy or Sell"></img>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-7"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-left">
          <h1>Input number of shares.</h1>
          <div className="arrow-right">
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div className="image">
          <img src="/shares.png" alt="Shares"></img>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-8"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-right">
          <h1>Watch your portfolio grow.</h1>
          <div className="arrow-left">
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
        <div className="image">
          <img src="/portfolio.png" alt="Portfolio"></img>
        </div>
      </Carousel>

      <Carousel
        carouselId="Carousel-9"
        className="white-text"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div className="container-left">
          <h1 id="signup-title">
            Sign up now for the free Virtual Stock Market Simulator!
          </h1>
          <p id="signup-message">
            Get $10,000 in virtual cash and start investing in a risk free
            environment.
          </p>
          <button className="signup-button">
            <a href="/signup">Sign Up Now</a>
          </button>
        </div>
      </Carousel>
    </React.Fragment>
  );
};

export default Tutorial;
