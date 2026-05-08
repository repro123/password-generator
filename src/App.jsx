import Heading from "@/components/Heading";
import Range from "@/components/Range";
import CharacterLength from "@/components/CharacterLength";
import CopyButton from "@/ui/CopyButton";
import RightArrow from "@/ui/RightArrow";
import { useReducer } from "react";

const characterOptions = [
  {
    label: "Include Uppercase Letters",
    actionType: "includeUppercase",
  },
  { label: "Include Lowercase Letters", actionType: "includeLowercase" },
  { label: "Include Numbers", actionType: "includeNumbers" },
  { label: "Include Symbols", actionType: "includeSymbols" },
];

const initialState = {
  isCopied: false,
  characterLength: 0,
  includeUppercase: false,
  includeLowercase: false,
  includeNumbers: false,
  includeSymbols: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "copy":
      return { ...state, isCopied: true };

    case "resetCopy":
      return { ...state, isCopied: false };

    case "changeLength":
      return { ...state, characterLength: action.payload };

    case "includeUppercase":
      return { ...state, includeUppercase: !state.includeUppercase };

    case "includeLowercase":
      return { ...state, includeLowercase: !state.includeLowercase };

    case "includeNumbers":
      return { ...state, includeNumbers: !state.includeNumbers };

    case "includeSymbols":
      return { ...state, includeSymbols: !state.includeSymbols };

    default:
      throw new Error("Unknown type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isCopied,
    characterLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  } = state;

  async function setClipboard(text) {
    dispatch({ type: "copy" });
    setTimeout(() => {
      dispatch({ type: "resetCopy" });
    }, 2000);
    await navigator.clipboard.writeText(text);
  }

  function handleRange(e) {
    const percent = Number(e.target.value);
    const actualValue = Math.round((percent / 100) * 50);
    e.target.style.setProperty("--progress", `${percent}%`);
    dispatch({ type: "changeLength", payload: actualValue });
  }

  function calculateStrengthValue() {
    let calculatedStrength = 0;

    if (characterLength > 0) {
      if (characterLength < 4) {
        calculatedStrength += 1;
      } else if (characterLength < 8) {
        calculatedStrength += 2;
      } else {
        calculatedStrength += 3;
      }
    }

    const selectedOptionsCount = [
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    ].filter(Boolean).length;

    const effectiveOptions = Math.min(selectedOptionsCount, characterLength);

    calculatedStrength += effectiveOptions;

    return calculatedStrength;
  }

  function getStrengthText() {
    const value = calculateStrengthValue();

    if (!value) return;

    let text;

    if (value < 2) {
      text = "very weak";
    } else if (value < 4) {
      text = "weak";
    } else if (value < 6) {
      text = "medium";
    } else {
      text = "strong";
    }

    return text;
  }

  const strength = getStrengthText();

  return (
    <div className=" w-full max-w-3xl mx-auto">
      <Heading />

      <form className="mt-4 ">
        <div className="px-8 py-4 bg-grey-800 flex items-center justify-between gap-4">
          <input
            className="preset-2 md:preset-1 placeholder:text-grey-700 text-grey-200"
            type="text"
            readOnly
            placeholder="P4$5W0rD!"
            value=""
          />
          <div className="flex gap-2 items-center text-brand-success">
            {isCopied && <span className="preset-4 lg:preset-3">COPIED</span>}
            <CopyButton
              className="text-brand-success cursor-pointer hover:text-white"
              onCopy={() => setClipboard("Empty")}
            />
          </div>
        </div>

        <div className="px-8 py-4 mt-4 bg-grey-800 flex flex-col gap-8 preset-4 md:preset-3 text-grey-200">
          <div className="grid gap-4">
            <CharacterLength characterLength={characterLength} />
            <Range
              characterLength={characterLength}
              handleRange={handleRange}
            />
          </div>

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

          <div className="bg-grey-850 px-8 py-4 flex items-center justify-between gap-4">
            <p className="uppercase preset-4 md:preset-3 text-grey-600">
              strength
            </p>

            <div>
              {strength && (
                <span className="preset-3 md:preset-2 text-grey-200 uppercase">
                  {strength}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!characterLength}
            className="bg-brand-success text-black flex items-center text-center justify-center gap-2 border border-brand-success not-disabled:hover:text-brand-success not-disabled:hover:bg-black cursor-pointer px-4 py-3 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 "
          >
            Generate <RightArrow />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
