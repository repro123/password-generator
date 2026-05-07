function CharacterLength({ characterLength }) {
  return (
    <div className="flex items-center justify-between">
      <p>Character length</p>
      <span className="text-brand-success preset-2 lg:preset-1">
        {characterLength}
      </span>
    </div>
  );
}

export default CharacterLength;
