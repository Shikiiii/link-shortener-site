interface RedirectPillProps {
  text: string;
}

const RedirectPill = ({ text }: RedirectPillProps) => (
  <div className="bg-white rounded-full py-3 px-6 shadow-md max-w-xs text-center">
    <p className="text-gray-800 text-xl">{text}</p>
  </div>
);

export default RedirectPill;
