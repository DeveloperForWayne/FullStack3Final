import React, { Component } from 'react';
import "./cars.css";

class cars extends Component {
    render() {
        return (
            <div className="row" id="ads">
                <div className="col-md-4">
                    <div className="card rounded">
                        <div className="card-image">
                            <span className="card-notify-badge">Free cancellation</span>
                            <span className="card-notify-year">2018</span>
                            <img className="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
                        </div>
                        <div className="card-image-overlay m-auto">
                            <span className="card-detail-badge">5 Seats</span>
                            <span className="card-detail-badge">$2,800</span>
                            <span className="card-detail-badge">Automatic</span>
                        </div>
                        <div className="card-body text-center">
                            <div className="ad-title m-auto">
                                <h5>Honda Accord LX</h5>
                            </div>
                            <a className="ad-btn" href="#">Book</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card rounded">
                        <div className="card-image">
                            <span className="card-notify-badge">Unlimited miles</span>
                            <span className="card-notify-year">2017</span>
                            <img className="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=CAC80HOC021B121001.jpg&width=440&height=262" alt="Alternate Text" />
                        </div>
                        <div className="card-image-overlay m-auto">
                            <span className="card-detail-badge">5 Seats</span>
                            <span className="card-detail-badge">$1,800</span>
                            <span className="card-detail-badge">Automatic</span>
                        </div>
                        <div className="card-body text-center">
                            <div className="ad-title m-auto">
                                <h5>Honda CIVIC HATCHBACK LS</h5>
                            </div>
                            <a className="ad-btn" href="#">Book</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card rounded">
                        <div className="card-image">
                            <span className="card-notify-badge">Free cancellation</span>
                            <span className="card-notify-year">2018</span>
                            <img className="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC091A021001.jpg&width=440&height=262" alt="Alternate Text" />
                        </div>
                        <div className="card-image-overlay m-auto">
                            <span className="card-detail-badge">5 Seats</span>
                            <span className="card-detail-badge">$2,200</span>
                            <span className="card-detail-badge">Automatic</span>
                        </div>
                        <div className="card-body text-center">
                            <div className="ad-title m-auto">
                                <h5>Honda Accord Hybrid LT</h5>
                            </div>
                            <a className="ad-btn" href="#">Book</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default cars;