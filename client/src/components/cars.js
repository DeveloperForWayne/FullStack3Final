import React, { Component } from "react";
import RentContract from "../contracts/Rent.json";
import ReturnContract from "../contracts/Return.json";
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
            rentContract: null,
            returnContract: null
        };

        this.handleRent = this.handleRent.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    componentDidMount = async () => {
        try {
            var data = require('../cars.json');

            this.setState({cars: data});

            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const ContractRent = truffleContract(RentContract);
            const ContractReturn = truffleContract(ReturnContract);

            ContractRent.setProvider(web3.currentProvider);
            ContractReturn.setProvider(web3.currentProvider);
            
            const instanceRent = await ContractRent.deployed();
            const instanceReturn = await ContractReturn.deployed();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, rentContract: instanceRent, returnContract: instanceReturn }, this.markRented);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    };

    markRented = async () => {
        const { cars, rentContract } = this.state;

        // Get the value from the contract to prove it worked.
        const rentals = await rentContract.getRentals();

        for (let i = 0; i < rentals.length; i++) {
            if (rentals[i] !== '0x0000000000000000000000000000000000000000') {
                cars[i].disabled = true;
            }
        }

        this.setState({cars: cars});
    }

    handleRent = async (id, e) => {
        e.preventDefault();

        const { accounts, rentContract } = this.state;

        var carId = parseInt(id);

        await rentContract.rent(carId, { from: accounts[0] })
    }

    handleReturn = async (id, e) => {
        e.preventDefault();

        const { accounts, returnContract } = this.state;

        var carId = parseInt(id);

        await returnContract.returnCar(carId, { from: accounts[0] })
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

                <div className="row" id="carTemplate">
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
                                        <button className="ad-btn" type="button" disabled={car.disabled} onClick={(e) => this.handleRent(car.id, e)}>Book</button>
                                        <button className="ad-btn" type="button" onClick={(e) => this.handleReturn(car.id, e)}>Return</button>
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