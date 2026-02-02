import { useState, useEffect } from "react";
const User = ({name}) => {
    const [count,setCount] = useState(0);
    const [count2] = useState(1);
    useEffect(() =>{
        //API CALLS
     },[]);



    return (
        <div className = "user-card">
            <h1>Count= {count}</h1>
            <h1>Count2= {count2}</h1>
            <h1>Name: {name}</h1>
            <h2>Location : Kanpur </h2>
            <h4>Contact :@shreyash111</h4>
        </div>
    );
};
export default User;
