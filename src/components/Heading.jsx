function Heading() {
  return (
    <div className="preset-4 md:preset-2 flex items-center justify-between">
      <h1 className="text-grey-600 capitalize">password generator</h1>
      <button className="bg-brand-success border hover:bg-black hover:text-brand-success p-2 cursor-pointer transition-all duration-300">
        View History
      </button>
    </div>
  );
}

export default Heading;
