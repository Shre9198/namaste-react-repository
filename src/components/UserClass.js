import React, { Component } from "react";

class UserClass extends React.Component {
    constructor(props){
       super(props);
       console.log("Child constructor");

       this.state = {
        userInfo : {
          name : "Dummy Data",
          loaction : "Default",
        },
        };   

    }

    async componentDidMount(){
       //console.log(this.props.name+ "Child Component Did Mount ");
    //API call
    const data = await fetch ("https://api.github.com/users/Shre9198")
    const json = await data.json();
     this.setState({
      userInfo : json,
     });
    console.log(json);
    }
  render() {
    console.log("Child render");
    // const{name,location} =  this.props;/
    const{name,location,avatar_url} = this.state.userInfo;
    return (
      <div className="user-card">
        <img src= {avatar_url}/>
        <h1>Name: {name}</h1>
        <h2>Location : {location} </h2>
        <h4>Contact :@shreyash111</h4>
      </div>
    );
  }
}
/*
-parent constructor
-Parent Render
*/

export default UserClass;