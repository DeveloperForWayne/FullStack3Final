import React, { Component } from "react";
import AdoptionContract from "../contracts/Adoption.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

import "./cars.css";

class cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            web3: null,
            accounts: null,
            contract: null
        };

        this.handleAdopt = this.handleAdopt.bind(this);
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const Contract = truffleContract(AdoptionContract);
            Contract.setProvider(web3.currentProvider);
            const instance = await Contract.deployed();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.markAdopted);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    };

    init() {
        fetch('../cars.json')
            .then(response => response.json())
            .then(data => {
                this.setState({cars: data})
        }).then(() => {
            this.bindEvents();
        })
    }

    bindEvents() {
        //$(document).on('click', '.ad-btn', this.handleAdopt);
    }

    markAdopted = async () => {
        const { accounts, contract } = this.state;

        // Get the value from the contract to prove it worked.
        const adopters = await contract.getAdopters();

        for (let i = 0; i < adopters.length; i++) {
            if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                //$('#carTemplate').eq(i).find('button').text('Success').attr('disabled', true);
            }
        }
    }

    handleAdopt = async (event) => {
        event.preventDefault();

        const { accounts, contract } = this.state;

        var carId = parseInt(event.target.data('id'));

        // Stores a given value, 5 by default.
        await contract.adopt(carId, { from: accounts[0] })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-sm-push-2">
                        <h1 className="text-center">Car Rental</h1>
                        <hr/>
                        <br/>
                    </div>
                </div>

                <div className="row">
                </div>

                <div className="row">
                    {this.state.cars.map(car =>
                        <div className="col-md-4">
                            <form>
                                <div className="card rounded">
                                    <div className="card-image">
                                        <span className="card-notify-badge">{car.campaign}</span>
                                        <span className="card-notify-year">{car.year}</span>
                                        <img className="img-fluid" src={car.picture} alt={car.name}/>
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