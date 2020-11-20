import React from "react";
import "./Tutorial.css";
import { Carousel } from 'react-materialize';

const Tutorial = () => {
  return (
    <React.Fragment>
        <Carousel
            carouselId="Carousel-1"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="container-main">
                <h1 id="title">
                Here's how it works: 
                </h1>
            </div>
        </Carousel>

       <Carousel
            carouselId="Carousel-3"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="container-left">
                <h1>
                Start with $10,000 in virtual cash.
                </h1>
                <div className="arrow-right"><i class="fas fa-arrow-down"></i></div>
            </div>
            </Carousel>

            <Carousel
            carouselId="Carousel-4"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="container-right">
                <h1>
                Search for a stock.
                </h1>
                <div className="arrow-left"><i class="fas fa-arrow-down"></i></div>
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
                indicators: true
            }}
            >
            <div className="container-left">
                <h1>
                Get real time data.
                </h1>
                <div className="arrow-right"><i class="fas fa-arrow-down"></i></div>
            </div>
            </Carousel>

            <Carousel
            carouselId="Carousel-6"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="container-right">
                <h1>
                Choose to buy or sell. 
                </h1>
                <div className="arrow-left"><i class="fas fa-arrow-down"></i></div>
            </div>
            </Carousel>

            <Carousel
            carouselId="Carousel-7"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="container-left">
                <h1>
                Input number of shares. 
                </h1>
                <div className="arrow-right"><i class="fas fa-arrow-down"></i></div>
            </div>
            </Carousel>

            <Carousel
            carouselId="Carousel-8"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="container-right">
                <h1>
                Watch your portfolio grow.
                </h1>
                <div className="arrow-left"><i class="fas fa-arrow-down"></i></div>
            </div>
            </Carousel>

    </React.Fragment>
  );
};

export default Tutorial;
