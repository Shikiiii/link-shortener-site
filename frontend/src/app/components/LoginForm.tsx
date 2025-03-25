"use client";

const LoginForm = () => {
  return (
    <>
      <div className="w-[80%] md:w-[50%] bg-blue-600 mx-auto rounded-t-md">
        <h1 className="text-center pt-5 pb-5 text-white font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-300 to-thirdly-text">
          Welcome back
        </h1>
      </div>
      <div className="w-[80%] md:w-[50%] bg-white mx-auto rounded-b-md">
        <form className="flex flex-col gap-4 p-5">
          <label htmlFor="email" className="text-gray-700 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></input>

          <label htmlFor="password" className="text-gray-700 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></input>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={async (e) => {
              e.preventDefault();
              const email = (
                document.getElementById("email") as HTMLInputElement
              ).value;
              const password = (
                document.getElementById("password") as HTMLInputElement
              ).value;

              const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });
              const data = await response.json();
              if (response.ok) {
                // Handle successful login
                // On successful login we're going to receive access and refresh. Set those to
                // localStorage then redirect user to /profile/dashboard
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                window.location.href = "/profile/dashboard";

                console.log("Login successful");
              } else {
                // Handle login error
                let errors = document.getElementById("errors");
                if (errors) {
                  errors.innerText = data.error;
                }
              }
            }}
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-700 font-semibold pb-5">
          Don't have an account?{" "}
          <a href="/profile/register" className="text-blue-500">
            Register now.
          </a>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
