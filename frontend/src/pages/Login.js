import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";
import catImg from '../img/black_cat.png';

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
             <br></br>
             <br></br>
             <br></br>
            <div class= "flex-col center-align">
                <img class="top-item" src={catImg}></img>
                <h1 class="accent-font margin-s">FitCat</h1>
                <p class="accent-font txt-2 margin-s">Hit your fitness goals with your virtual cat!</p>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <form className="flex-col">
                <label htmlFor="userinput">Enter your ID</label>
                <input type="text" id="userinput" value={input}
                    onChange={e => setInput(e.target.value)} />

                <button  type="submit" 
                    onClick={handleSubmit}
                >LOGIN</button>
            </form>
            <p>Or <Link to="/">create a new account</Link> and start raising your cat!</p>


        </div>
        );
  };
  
  export default Login;
  