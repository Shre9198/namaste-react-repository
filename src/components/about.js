import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import {Component} from"react";
import UserContext from "../utils/UserContext";

class About extends React.Component{
    constructor (props){
        super(props);
       // console.log("parent constructor");
    }

    componentDidMount(){
        // console.log("Parent Component Dis Mount");
    }
    render(){
        //console.log("Parent Render");
        return(
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">About Us</h1>
                    <p className="text-xl text-center text-gray-700 mb-12 leading-relaxed">
                        Welcome to FoodVilla! We are passionate about delivering delicious, fresh food right to your doorstep.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <div className="text-4xl mb-4 text-orange-600">🍽️</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                            <p className="text-gray-600 text-lg">To provide the best food delivery experience with fresh ingredients and lightning-fast service.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <div className="text-4xl mb-4 text-green-600">👨‍🍳</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Chefs</h2>
                            <p className="text-gray-600 text-lg">Expert chefs crafting delicious meals with passion and creativity.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <div className="text-4xl mb-4 text-red-600">🚚</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fast Delivery</h2>
                            <p className="text-gray-600 text-lg">Hot and fresh food delivered to your door in under 30 minutes.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-xl border border-gray-300 mb-12 hover:shadow-2xl transition-shadow duration-500">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200 hover:scale-105">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="text-2xl mr-3">🥬</span>
                                    Fresh Ingredients
                                </h3>
                                <p className="text-gray-600 leading-relaxed">Only the freshest, highest quality ingredients in every meal.</p>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200 hover:scale-105">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="text-2xl mr-3">🌍</span>
                                    Diverse Menu
                                </h3>
                                <p className="text-gray-600 leading-relaxed">Wide variety of cuisines from around the world.</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-200 hover:scale-105">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="text-2xl mr-3">📱</span>
                                    Easy Ordering
                                </h3>
                                <p className="text-gray-600 leading-relaxed">Simple and intuitive app for seamless food ordering.</p>
                            </div>
                            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200 hover:scale-105">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="text-2xl mr-3">😊</span>
                                    Customer Satisfaction
                                </h3>
                                <p className="text-gray-600 leading-relaxed">Your happiness is our priority with 24/7 support.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Context</h2>
                        <UserContext.Consumer>
                            {({user})=><h4 className="font-bold text-lg text-center text-gray-700">User: {user.name} - {user.email}</h4>}
                        </UserContext.Consumer>
                        <div className="mt-6">
                            <UserClass name={"Akshay Saini"} location={"Dehradun"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default About;
