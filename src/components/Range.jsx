function Range({ characterLength, handleRange }) {
  return (
    <input
      type="range"
      name=""
      id=""
      min="0"
      max="100"
      value={(characterLength / 50) * 100}
      onChange={(e) => handleRange(e)}
    />
  );
}

export default Range;
