"use client";

interface HomePageButtonProps {
  text: string;
  isPrimary?: boolean;
}

const HomePageButton = ({ text, isPrimary = false }: HomePageButtonProps) => {
  const handleClick = () => {
    if (text === "Back to top") {
      window.scroll({
        top: 1,
        left: 0,
        behavior: "smooth",
      });
    } else if (text === "Contact us") {
      window.location.href = "mailto:example@example.com";
    }
  };

  return (
    <div
      className={`bg-white rounded-full py-2 px-6 shadow-md text-center cursor-pointer ${
        isPrimary ? "font-bold" : ""
      }`}
      onClick={handleClick}
    >
      <p className="text-gray-800">{text}</p>
    </div>
  );
};

export default HomePageButton;
