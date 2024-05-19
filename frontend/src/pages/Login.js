import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [input, setInput] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const username = input ;
        const response = await fetch("/login_user", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: username})
        })
        
        if (response.ok){
            alert("user input worked!")
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <Link to="/home">Home</Link>

            <form>
                <label htmlFor="userinput">Username:</label>
                <input type="text" id="userinput" value={input}
                    onChange={e => setInput(e.target.value)} />

                <button type="submit" 
                    onClick={handleSubmit}
                >Login</button>
            </form>
        </div>
        );
  };
  
  export default Login;
  