import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";
import catImg from '../img/black_cat.png';

const Login = () => {
    const [input, setInput] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("/create_user", {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user_id: input
            })
        })
        if (response.ok){
            localStorage.setItem('user_id', (await response.json()).user_id);
            window.location.href = '/home';
        } else { // user alr exists
            localStorage.setItem('user_id', (input));
            window.location.href = '/home';
        }
    }

    return (
        <div className="top-item body">
            <div className= "flex-col center-align">
                <img src={catImg} alt=""></img>
                <h1 className="accent-font margin-s">FitCat</h1>
                <p className="accent-font txt-2 margin-s">Hit your fitness goals with your virtual cat!</p>
            </div>

            <form className="flex-col">
                <label className="top-item" htmlFor="userinput">Enter your ID</label>
                <input type="text" id="userinput" value={input}
                    onChange={e => setInput(e.target.value)} />

                <button  type="submit" 
                    onClick={handleSubmit}
                >LOGIN</button>
            </form>
            <p>Or <Link to="/Home">create a new account</Link> and start raising your cat!</p>


        </div>
        );
  };
  
  export default Login;
  