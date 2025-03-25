import HomePageButton from "./HomePageButton";

const Footer = () => {
  return (
    <div className="bg-primary px-4 text-center pt-10">
      <div>
        <p className="font-medium mb-4">Link shortener app</p>

        <div className="flex justify-center mb-6">
          <HomePageButton text="Contact us" />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6">
          <a href="/tos" className="text-sm text-blue-500">
            Terms of Service
          </a>
          <p className="text-sm">© 2025 Link shortener app</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
