import React from "react";
import './InvestingBasics.css';
import { Row, Col, Carousel, Checkbox } from 'react-materialize';

const InvestingBasics = () => {
    return (
        <React.Fragment>
            <Carousel
            carouselId="Carousel-2"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="red">
                <h1>
                A beginner's guide to stock market investing.
                </h1>
                <p>
                Discover the <b>5 step checklist</b> that will help you start your investment journey.
                </p>
                <i className="fas fa-level-down-alt"></i>
            </div>
            </Carousel>

            <Row>
            <div className="card-one">
                <div className="card-one-content">
                    <Col push="m1" s={12} m={6}>
                        <div class="card-title-left">
                            <Checkbox
                                id="Checkbox_1"
                                value="Red"
                                />Step 1: Learn</div>
                        <p>A stock is an investment that represents a share of a company. When you buy a stock, you own a piece of the company that issues it. When you own stock in a company, you are called a shareholder because you share in the company's profits. The stock market is where you can buy and sell stocks.</p>
                    </Col>
                    <Col s={12} m={6}><div className="card-img-one">
                    <img src="/brain.png" alt="brain"></img>
                    </div>
                    </Col>
                </div>
            </div>
            </Row>

            <Row>
            <div className="card-one">
                <div className="card-one-content">
                    <Col push="m1" s={12} m={6}><div class="card-title-left">
                        <Checkbox
                            id="Checkbox_2"
                            value="Red"
                            />Step 2: Open an account</div>
                    <p>Opening an account is easy and simple. Just like choosing a bank to open a checking account, you'll want to choose an online broker to open a brokerage account. Opening an account can be done online. Once you have an account, you can begin to buy and sell stocks.</p>
                    </Col>
                    <Col s={12} m={6}><div className="card-img-two">
                    <img src="/iphone.png" alt="iPhone"></img>
                    </div>
                    </Col>
                </div>
            </div>
            </Row>

            <Row>
            <div className="card-one">
                <div className="card-one-content">
                    <Col push="m1" s={12} m={6}><div class="card-title-left">
                        <Checkbox
                            id="Checkbox_3"
                            value="Red"
                            />Step 3: Research stocks</div>
                    <p>It's important to gather information about different types of stocks. Read about companies you are interested in and look at how those companies have performed over time. This will help you get a better understanding of different industries and the current events of those stocks.</p>
                    </Col>
                    <Col s={12} m={6}><div className="card-img-three">
                    <img src="/bar-graph.png" alt="bar graph"></img>
                    </div>
                    </Col>
                </div>
            </div>
            </Row>

            <Row>
            <div className="card-one">
                <div className="card-one-content">
                    <Col push="m1" s={12} m={6}><div class="card-title-left">
                        <Checkbox
                            id="Checkbox_4"
                            value="Red"
                            />Step 4: Fund your account & buy stocks</div>
                    <p>Now you are ready to deposit money to your account. This is usually done via a bank transfer. We recommend you start small in the beginning. Once your account is funded, select the stocks you want to buy, enter how many shares you want to purchase, and click 'Buy'.</p>
                    </Col>
                    <Col s={12} m={6}><div className="card-img-four">
                    <img src="/money.png" alt="money"></img>
                    </div>
                    </Col>
                </div>
            </div>
            </Row>

            <Row>
            <div className="card-one">
                <div className="card-one-content">
                    <Col push="m1" s={12} m={6}><div class="card-title-left">
                        <Checkbox
                            id="Checkbox_5"
                            value="Red"
                            />Step 5: Review your investments regularly</div>
                    <p>After your first purchase is done, it's important to review your portfolio regularly. Keep an eye on how your portfolio is performing and how the economy is doing. As you gain more experience, you can start building or changing your portfolio by buying or selling more stocks.</p>
                    </Col>
                    <Col s={12} m={6}><div className="card-img-five">
                    <img src="/magnifier.png" alt="magnifier"></img>
                    </div>
                    </Col>
                </div>
            </div>
            </Row>

            <Carousel
            carouselId="Carousel-2"
            className="white-text"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div className="red">
                <h1>
                Next up: virtual stock market simulator.
                </h1>
                <p>
                click continue to learn how it works. 
                </p>
                <button className="continue-button"><a href="/how-it-works">continue</a></button>
                <i className="fas fa-level-down-alt"></i>
            </div>
            </Carousel>

        </React.Fragment>
       
    );
};

export default InvestingBasics;
