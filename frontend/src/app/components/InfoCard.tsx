interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="w-80 flex flex-col">
      <div className="bg-blue-600 text-white p-6 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-center">{title}</h2>
      </div>
      <div className="bg-gray-200 p-6 h-64 flex items-center">
        <p className="text-gray-800 text-center text-lg">{description}</p>
      </div>
    </div>
  );
};

const InfoCards = () => {
  const features = [
    {
      title: "Security",
      description:
        "With a lot of scam and phishing websites appearing, trusting a short link has become harder. We make sure your users can trust and open your links using a few different methods.",
    },
    {
      title: "Quick action",
      description:
        "Our system is very optimized and blazing fast. Shortening your links takes less than a second.",
    },
    {
      title: "Dashboard",
      description:
        "If you opt in to make an account, your links will be saved to your account allowing you to manage them, view statistics and generate your own custom short codes.",
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-12 pt-20">Why us?</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <InfoCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoCards;
