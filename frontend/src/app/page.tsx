import LinkShortenerForm from "./components/LinkShortenForm";
import InfoCards from "./components/InfoCard";
import Divider from "./components/Divider";
import HomePageButton from "./components/HomePageButton";
import TrustSection from "./components/TrustSection";
import StatsCounter from "./components/StatsCounter";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Link Shortener | Shorten links the right way",
  description: "Shorten your links the right way",
};

export default function Page() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main className="flex flex-col md:flex-row items-start justify-between pb-20 pt-10">
          <div className="md:w-1/2 mb-10 md:mb-0 pl-[0px] md:pl-[30px]">
            <div className="relative mb-6 text-center md:text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-thirdly opacity-30 transform -skew-y-3 -rotate-3"></div>
              <h1 className="relative text-5xl font-bold text-primary-text">
                Shorten links the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                  right
                </span>{" "}
                way.
              </h1>
            </div>
            <p className="text-xl text-primary-text text-center md:text-left">
              <svg
                className="inline-block h-6 w-6 mr-2 text-primary-text"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                viewBox="0 0 490 490"
                xmlSpace="preserve"
              >
                <path d="M245,0C109.69,0,0,109.69,0,245s109.69,245,245,245s245-109.69,245-245S380.31,0,245,0z M31.401,260.313h52.542  c1.169,25.423,5.011,48.683,10.978,69.572H48.232C38.883,308.299,33.148,284.858,31.401,260.313z M320.58,229.688  c-1.152-24.613-4.07-47.927-8.02-69.572h50.192c6.681,20.544,11.267,43.71,12.65,69.572H320.58z M206.38,329.885  c-4.322-23.863-6.443-47.156-6.836-69.572h90.913c-0.392,22.416-2.514,45.709-6.837,69.572H206.38z M276.948,360.51  c-7.18,27.563-17.573,55.66-31.951,83.818c-14.376-28.158-24.767-56.255-31.946-83.818H276.948z M199.961,229.688  c1.213-24.754,4.343-48.08,8.499-69.572h73.08c4.157,21.492,7.286,44.818,8.5,69.572H199.961z M215.342,129.492  c9.57-37.359,21.394-66.835,29.656-84.983c8.263,18.148,20.088,47.624,29.66,84.983H215.342z M306.07,129.492  c-9.77-40.487-22.315-73.01-31.627-94.03c11.573,8.235,50.022,38.673,76.25,94.03H306.07z M215.553,35.46  c-9.312,21.02-21.855,53.544-31.624,94.032h-44.628C165.532,74.13,203.984,43.692,215.553,35.46z M177.44,160.117  c-3.95,21.645-6.867,44.959-8.019,69.572h-54.828c1.383-25.861,5.968-49.028,12.65-69.572H177.44z M83.976,229.688H31.401  c1.747-24.545,7.481-47.984,16.83-69.572h46.902C89.122,181.002,85.204,204.246,83.976,229.688z M114.577,260.313h54.424  c0.348,22.454,2.237,45.716,6.241,69.572h-47.983C120.521,309.288,115.92,286.115,114.577,260.313z M181.584,360.51  c7.512,31.183,18.67,63.054,34.744,95.053c-10.847-7.766-50.278-38.782-77.013-95.053H181.584z M273.635,455.632  c16.094-32.022,27.262-63.916,34.781-95.122h42.575C324.336,417.068,284.736,447.827,273.635,455.632z M314.759,329.885  c4.005-23.856,5.894-47.118,6.241-69.572h54.434c-1.317,25.849-5.844,49.016-12.483,69.572H314.759z M406.051,260.313h52.548  c-1.748,24.545-7.482,47.985-16.831,69.572h-46.694C401.041,308.996,404.882,285.736,406.051,260.313z M406.019,229.688  c-1.228-25.443-5.146-48.686-11.157-69.572h46.908c9.35,21.587,15.083,45.026,16.83,69.572H406.019z M425.309,129.492h-41.242  c-13.689-32.974-31.535-59.058-48.329-78.436C372.475,68.316,403.518,95.596,425.309,129.492z M154.252,51.06  c-16.792,19.378-34.636,45.461-48.324,78.432H64.691C86.48,95.598,117.52,68.321,154.252,51.06z M64.692,360.51h40.987  c13.482,32.637,31.076,58.634,47.752,78.034C117.059,421.262,86.318,394.148,64.692,360.51z M336.576,438.54  c16.672-19.398,34.263-45.395,47.742-78.03h40.99C403.684,394.146,372.945,421.258,336.576,438.54z" />
              </svg>
              Show users exactly where they're going.
              <br />
              <svg
                className="inline-block h-6 w-6 mr-2 text-primary-text"
                xmlns="http://www.w3.org/1999/xlink"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                height="800px"
                width="800px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 460.775 460.775"
                xmlSpace="preserve"
              >
                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
              </svg>
              Allow users enough time to cancel the redirect.
              <br />
              <svg
                className="inline-block h-6 w-6 mr-2 text-primary-text"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                version="1.1"
                id="Capa_1"
                width="800px"
                height="800px"
                viewBox="0 0 305.002 305.002"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5    S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5    c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z" />
                    <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678    l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385    c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z" />
                  </g>
                </g>
              </svg>
              Usage-friendly for all types of people.
              <br />
              <svg
                className="inline-block h-6 w-6 mr-2 text-primary-text"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 511.997 511.997"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M505.899,211.567L368.7,74.369c-7.876-7.902-21.649-7.902-29.525,0l-62.925,62.899c-8.064,8.124-8.064,21.35,0.034,29.525    l17.05,16.853c-11.042-0.879-26.547,4.838-27.989,4.745l-39.083-12.109l9.455-9.455c3.951-3.951,6.135-9.199,6.135-14.771    c0-5.598-2.185-10.846-6.127-14.771L172.834,74.36c-7.91-7.876-21.615-7.876-29.525,0.026L6.135,211.542    C2.185,215.493,0,220.749,0,226.347c0,5.572,2.185,10.829,6.127,14.754l62.874,62.899c3.934,3.951,9.19,6.127,14.763,6.127    s10.812-2.176,14.771-6.127l4.318-4.318c11.136,23.322,48.546,70.741,74.633,96.845l34.304,34.304    c10.513,10.496,20.471,12.723,26.991,12.723c8.303,0,16.102-3.422,22.554-9.873c6.315-6.323,8.098-12.476,8.499-16.922    c7.561,1.775,18.91,0.947,25.796-5.948c6.315-6.298,8.098-12.476,8.499-16.922c7.561,1.775,18.91,0.973,25.796-5.922    c6.315-6.323,8.098-12.476,8.491-16.922c7.612,1.672,18.927,0.922,25.796-5.948c5.837-5.845,12.194-16.29,7.578-30.839    c9.813-9.156,26.377-19.831,42.735-29.559c3.823,3.388,8.567,5.419,13.713,5.419c5.598,0,10.846-2.176,14.763-6.127l62.891-62.874    C514.031,232.943,514.031,219.717,505.899,211.567z M83.772,282.573l-56.209-56.226L158.071,95.796l56.209,56.226L83.772,282.573z     M347.034,346.539c-0.913,0-2.662-0.427-4.215-0.802c-2.628-0.623-5.598-1.348-8.909-1.348c-6.673,0-11.025,2.953-13.508,5.427    c-5.803,5.803-6.426,12.023-6.801,15.753c-0.265,2.628-0.29,2.773-0.836,3.849c-0.913,0-2.662-0.427-4.215-0.802    c-2.628-0.648-5.598-1.348-8.926-1.348c-6.699,0-11.059,2.953-13.525,5.427c-5.803,5.803-6.426,12.023-6.801,15.727    c-0.265,2.628-0.29,2.773-0.853,3.849c-0.913,0-2.671-0.427-4.224-0.802c-2.611-0.623-5.572-1.323-8.9-1.323    c-6.699,0-11.059,2.953-13.5,5.402c-5.828,5.803-6.451,12.023-6.827,15.753c-0.265,2.628-0.29,2.773-1.775,4.275    c-2.364,2.372-3.934,2.372-4.446,2.372c-2.338,0-5.572-1.903-8.892-5.222l-34.304-34.304    c-29.261-29.278-62.515-75.947-75.349-96.128l85.709-85.709l18.91,5.333c-15.812,12.075-28.365,29.372-38.502,41.933    c-3.362,4.173-6.025,7.526-7.902,9.404c-8.004,8.004-10.453,16.375-7.279,24.926c2.338,6.349,7.441,11.452,13.901,17.903    c5.751,5.751,12.996,8.798,20.966,8.798c16.316,0,31.94-12.373,47.053-24.354c3.311-2.62,13.261-9.353,19.507-13.542    c24.55,22.349,48.23,44.245,64.93,60.937C351.352,341.718,347.674,345.396,347.034,346.539z M357.914,312.44    c-0.828-0.905-1.374-1.715-2.278-2.62c-21.896-21.897-50.466-45.338-68.036-62.174c-5.393-5.171-15.121-3.618-22.69-1.289    c-8.841,1.502-17.118,5.7-27.708,14.089c-10.027,7.953-23.748,18.825-31.164,18.825c-0.998,0-6.801-4.122-7.902-5.222    c-2.125-2.125,4.113-9.122,8.141-14.123c14.046-17.399,32.725-37.001,57.19-46.404c20.804-8.004,35.26-4.557,54.4-4.267    l77.781,76.902C381.628,294.665,368.145,303.693,357.914,312.44z M428.245,282.514l-130.534-130.5l56.226-56.201l130.526,130.5    L428.245,282.514z" />
                  </g>
                </g>
              </svg>
              Build <u>trust</u> between you and the people interacting with
              your links.
            </p>
          </div>

          <div className="md:w-2/5">
            <LinkShortenerForm />
          </div>
        </main>

        <div className="w-full h-full bg-primary">
          {/* Header with Why Us? */}
          <div className="text-center py-12 pt-[6rem]" id="why-us">
            {/* Feature Cards */}
            <div className="flex justify-center">
              <InfoCards />
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-4" id="about">
            <div>
              <Divider />

              <div className="flex flex-col md:flex-row justify-center">
                <StatsCounter label="registered users" />
                <StatsCounter label="short links" />
                <StatsCounter label="total link clicks" />
              </div>

              <Divider />
            </div>
          </div>

          {/* Trust Features Section */}
          <div className="bg-primary px-4">
            <div>
              <TrustSection />
              <Divider />
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-primary px-4 text-center pt-10">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                What are you waiting for?
              </h2>
              <p className="text-xl md:text-2xl mb-6">Start shortening now.</p>

              <div className="flex justify-center pb-10">
                <HomePageButton text="Back to top" isPrimary={true} />
              </div>

              <Divider />
            </div>
          </div>

          {/* Footer Section */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
