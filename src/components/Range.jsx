function Range({ characterLength, handleRange }) {
  const percent = (characterLength / 50) * 100;

  return (
    <input
      style={{
        "--progress": `${percent}%`,
      }}
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
