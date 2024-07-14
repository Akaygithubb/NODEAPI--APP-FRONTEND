import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated, setisAuthenticated,loading,setloading } = useContext(context);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setisAuthenticated(true);
      setloading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(false);
      setloading(false)
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <button disabled={loading} type="submit">SignUp</button>
          <h4>Or</h4>
          <Link to={"/login"}>LogIn</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;