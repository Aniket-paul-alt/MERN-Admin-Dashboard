import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import {toast} from "react-toastify"

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const URL = `http://localhost:5000/api/auth/login`

    const navigator = useNavigate()

    const {storeTokenInLS} = useAuth()

    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value

        setUser({
            ...user,
            [name]: value
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(user);

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(user)
            })
            const responseData = await response.json()
            console.log("res from server ",responseData);

            console.log(response);
            if(response.ok){
                // alert("login successfully")

                //store token in LS
                storeTokenInLS(responseData.token)

                setUser({email:"", password:""})
                toast.success("Login Successfully")
                navigator("/")
                // location.reload()
            }else{
                toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message)
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="../images/login.png" alt="login-image" width="500" height="500" />
                            </div>

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">login form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email" id="email" placeholder="enter email" required value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input type="password" name="password" id="password" placeholder="enter password" required value={user.password} onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">login now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}