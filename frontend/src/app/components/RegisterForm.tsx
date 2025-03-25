"use client";

const RegisterForm = () => {
  return (
    <>
      <div className="w-[80%] md:w-[50%] bg-blue-600 mx-auto rounded-t-md">
        <h1 className="text-center pt-5 pb-5 text-white font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-300 to-thirdly-text">
          Create your account
        </h1>
      </div>
      <div className="w-[80%] md:w-[50%] bg-white mx-auto rounded-b-md">
        <div className="text-center pt-5 font-semibold">
          Fields marked with <span className="text-red-500">*</span> are
          required.
        </div>
        <div className="text-center pt-5 font-semibold">
          <span className="text-red-400" id="errors"></span>
        </div>
        <form className="flex flex-col gap-4 p-5">
          <label htmlFor="name" className="text-gray-700 font-semibold">
            <span>
              First name <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="What should we call you? 😊"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></input>

          <label htmlFor="email" className="text-gray-700 font-semibold">
            <span>
              Email <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></input>

          <label htmlFor="password" className="text-gray-700 font-semibold">
            <span>
              Password <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></input>

          <label
            htmlFor="password-confirmation"
            className="text-gray-700 font-semibold"
          >
            <span>
              Confirm password <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            id="password-confirmation"
            type="password"
            placeholder="Confirm your password..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></input>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={async (e) => {
              e.preventDefault();
              const name = (document.getElementById("name") as HTMLInputElement)
                .value;
              const email = (
                document.getElementById("email") as HTMLInputElement
              ).value;
              const password = (
                document.getElementById("password") as HTMLInputElement
              ).value;
              const passwordConfirmation = (
                document.getElementById(
                  "password-confirmation"
                ) as HTMLInputElement
              ).value;

              const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                  passwordConfirmation,
                }),
              });
              const data = await response.json();
              if (response.ok) {
                // Handle successful registration
                // On successful registration we're going to receive access and refresh. Set those to
                // localStorage then redirect user to /profile/dashboard
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                window.location.href = "/profile/dashboard";

                console.log("Registration successful");
              } else {
                // Handle registration error
                let errors = document.getElementById("errors");
                if (errors) {
                  errors.innerText = data.error;
                }
              }
            }}
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-700 font-semibold pb-5">
          Already have an account?{" "}
          <a href="/profile/login" className="text-blue-500">
            Jump to login.
          </a>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
