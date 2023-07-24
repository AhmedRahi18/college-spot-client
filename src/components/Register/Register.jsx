import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Register = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const saveUser = {name: data.name, email: data.email}
            fetch("http://localhost:5000/users",{
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveUser)
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  reset();
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const googleUser = result.user;
        console.log(googleUser);
        const saveUser = {
          name: googleUser.displayName,
          email: googleUser.email,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
        .then((res) => res.json())
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Created Successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate('/')
          });
        
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <div>
        <div className="absolute inset-0 top-52 w-1/2 mx-auto">
          <div className=" text-white p-4">
            <h2 className="text-6xl font-bold text-center">Register Here</h2>
          </div>
        </div>
      </div>
      <div>
        <div className="hero">
          <div className="hero-content bg-gradient-to-r from-teal-50 to-teal-200 shadow-xl p-20 m-5 rounded flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <img
                className="w-[600px] rounded"
                src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=1024x1024&w=is&k=20&c=f_TqeoSwcJx1TEK9SbzoAI2Xa735RntKSA3LpfQZzao="
                alt=""
              />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl shadow-teal-600 bg-teal-100">
              <div className="card-body">
                <div className="flex items-center">
                  <FaUser size={25}></FaUser>
                  <h2
                    className="text-2xl ms-2 
                 font-serif font-semibold "
                  >
                    Register
                  </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-xl
                 font-serif"
                      >
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      {...register("name", { required: true })}
                      className="input input-bordered bg-slate-200 font-semibold"
                    />
                    {errors.name && (
                      <span className="text-red-600">Name is required</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-xl
                 font-serif"
                      >
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      placeholder="Photo URL"
                      {...register("photo", { required: true })}
                      className="input input-bordered bg-slate-200 font-semibold"
                    />
                    {errors.photo && (
                      <span className="text-red-600">
                        Photo URL is required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-xl
                 font-serif"
                      >
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                      className="input input-bordered bg-slate-200 font-semibold"
                    />
                    {errors.email && (
                      <span className="text-red-600">Email is required</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl font-serif">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
                          message:
                            "Password must contain at least one capital letter and one special character",
                        },
                      })}
                      className="input input-bordered bg-slate-200 font-semibold"
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-500">
                        Password must be at least 6 characters long
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-xl 
                 font-serif"
                      >
                        Confirm Password
                      </span>
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      placeholder="Confirm Password"
                      {...register("confirm", {
                        required: true,
                        validate: (value) =>
                          value === watch("password") ||
                          "Password didn't matched",
                      })}
                      className="input input-bordered bg-slate-200 font-semibold"
                    />
                    {errors.confirm && (
                      <span className="text-red-600">
                        {errors.confirm.message}
                      </span>
                    )}
                    {error && <span className="text-red-500">{error}</span>}
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="btn px-10 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold
           border-none rounded hover:bg-teal-500"
                      type="submit"
                      value="Register"
                    />
                  </div>
                  <p className="text-center mt-3 font-serif">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-500">
                      Login
                    </Link>{" "}
                  </p>
                  <div className="divider">OR</div>
                  <div
                    onClick={handleGoogle}
                    className="flex items-center rounded-xl  bg-white"
                  >
                    <FaGoogle className="text-blue-500 ms-16"></FaGoogle>
                    <p
                      className=" py-2 pe-2
            text-center font-semibold"
                    >
                      Continue with Google
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;