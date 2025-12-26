const Logo = () => {
  return (
    <div className="flex items-center gap-3 p-6 border-b border-gray-800">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center">
        <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
      </div>
      <span className="text-xl font-bold">Trader App</span>
    </div>
  );
};

export default Logo;
