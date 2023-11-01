import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg"
import { useContext } from "react";
import { AuthContext } from "../../Components/provider/AuthProvider";
import axios from "axios";

const Login = () => {

    const {signIn} = useContext(AuthContext)
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();

    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)
            .then(result =>{
                const loggedInUser = result.user;
                console.log(loggedInUser)
                

                //::::::: get access token:::::::
                const user = {email};
                axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
                .then(res =>{
                    console.log(res.data)
                    if(res.data.success){
                        navigate(location?.state ? location.state : "/")
                    }
                })

            })
            .catch(error =>{
                console.log(error)
            })


    }      

    
    return (
        <div>
          <div className="hero min-h-screen bg-base-200 my-14">
            <div className="hero-content flex-col lg:flex-row gap-8">
                <div >
                    <img src={img} alt="" />
                
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                         <button className="btn btn-primary">Login</button>
                    </div>

                    <p>Are new to Cars Doctor? Please <Link to="/signup" className="text-orange-600">Sign up</Link></p>
                </form>
                </div>
            </div>
          </div>
            
        </div>
    );
};

export default Login;