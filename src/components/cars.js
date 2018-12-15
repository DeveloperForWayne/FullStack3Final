import React, {Component} from 'react';
import "./cars.css";
import {Web3, web3} from "../web3.min"
import {TruffleContract} from "../truffle-contract"

class cars extends Component {
    constructor(props) {
        super(props);
        this.web3Provider = null;
        this.contracts = {};
        this.state = {
            cars: []
        };

        this.handleAdopt = this.handleAdopt.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        fetch('../cars.json')
            .then(response => response.json())
            .then(data => {
                this.setState({cars: data})
            }).then(() => {
            this.initWeb3();
        }).then(() => {
            this.bindEvents();
        })
    }

    initWeb3() {
        // Modern dapp browsers...
        if (window.ethereum) {
            this.web3Provider = window.ethereum;
            try {
                // Request account access
                window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            this.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(this.web3Provider);
    }

    initContract() {
        fetch('Adoption.json')
            .then(response => response.json())
            .then(data => {
                // Get the necessary contract artifact file and instantiate it with truffle-contract
                var AdoptionArtifact = data;
                this.contracts.Adoption = TruffleContract(AdoptionArtifact);

                // Set the provider for our contract
                this.contracts.Adoption.setProvider(this.web3Provider);

                // Use our contract to retrieve and mark the adopted pets
                this.markAdopted();
            }).then(() => {
            this.bindEvents();
        })
    }

    bindEvents() {
        //$(document).on('click', '.ad-btn', this.handleAdopt);
    }

    markAdopted(adopters, account) {
        var adoptionInstance;

        this.contracts.Adoption.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.getAdopters.call();
        }).then(function (adopters) {
            for (let i = 0; i < adopters.length; i++) {
                if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                    //$('#carTemplate').eq(i).find('button').text('Success').attr('disabled', true);
                }
            }
        }).catch(function (err) {
            console.log(err.message);
        });
    }

    handleAdopt(event) {
        event.preventDefault();

        var carId = parseInt(event.target.data('id'));

        var adoptionInstance;

        this.web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            this.contracts.Adoption.deployed().then(function (instance) {
                adoptionInstance = instance;

                // Execute adopt as a transaction by sending account
                return adoptionInstance.adopt(carId, {from: account});
            }).then(function (result) {
                return this.markAdopted();
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-push-2">
                        <h1 class="text-center">Car Rental</h1>
                        <hr/>
                        <br/>
                    </div>
                </div>

                <div class="row">
                </div>

                <div className="row">
                    {this.state.cars.map(car =>
                        <div className="col-md-4">
                            <form>
                                <div className="card rounded">
                                    <div className="card-image">
                                        <span className="card-notify-badge">{car.campaign}</span>
                                        <span className="card-notify-year">{car.year}</span>
                                        <img className="img-fluid" src={car.picture}/>
                                    </div>
                                    <div className="card-image-overlay m-auto">
                                        <span className="card-detail-badge">{car.seats}</span>
                                        <span className="card-detail-badge">{car.price}</span>
                                        <span className="card-detail-badge">{car.transmission}</span>
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="ad-title m-auto">
                                            <h5>{car.name}</h5>
                                        </div>
                                        <button className="ad-btn" type="button" data-id={car.id} onClick={this.handleAdopt}>Book</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default cars;