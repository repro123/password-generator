function StrengthDisplay({ strength, bars, bg }) {
  return (
    <div className="bg-grey-850 px-8 py-4 flex items-center justify-between gap-4">
      <p className="uppercase preset-4 md:preset-3 text-grey-600">strength</p>

      <div className="flex items-center gap-2">
        {strength && (
          <span className="preset-3 md:preset-2 text-grey-200 uppercase">
            {strength}
          </span>
        )}
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-6 border  ${index < bars ? `${bg} border-transparent animate-pulse` : "border-white"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StrengthDisplay;
