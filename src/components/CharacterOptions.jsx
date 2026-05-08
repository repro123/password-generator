import { characterOptions } from "@/data/characterOptions";

function CharacterOptions({ dispatch, characterLength }) {
  return (
    <div className="grid gap-4">
      {characterOptions.map((option) => (
        <label
          key={option.label}
          className="flex items-center gap-4 w-fit cursor-pointer has-disabled:cursor-not-allowed has-disabled:opacity-20"
        >
          <input
            type="checkbox"
            disabled={!characterLength}
            className="accent-brand-success cursor-pointer disabled:cursor-not-allowed"
            onChange={() => dispatch({ type: option.actionType })}
          />{" "}
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default CharacterOptions;
