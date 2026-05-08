import Heading from "@/components/Heading";
import Range from "@/components/Range";
import CharacterLength from "@/components/CharacterLength";
import CharacterOptions from "@/components/CharacterOptions";
import StrengthDisplay from "@/components/StrengthDisplay";
import SubmitButton from "@/components/SubmitButton";

import CopyButton from "@/ui/CopyButton";
import RightArrow from "@/ui/RightArrow";

import { calculateStrengthValue } from "@/utils/calculateStrengthValue";
import { getStrengthText } from "@/utils/getStrengthText";
import { getStrengthBars } from "@/utils/getStrengthBars";
import { setBarsBackground } from "@/utils/setBarsBackground";
import { useReducer } from "react";

const initialState = {
  isCopied: false,
  characterLength: 0,
  includeUppercase: false,
  includeLowercase: false,
  includeNumbers: false,
  includeSymbols: false,
  password: "",
  errorMessage: "",
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

    case "noCharacter":
      return { ...state, errorMessage: "Character length must be above 0" };

    case "notEnoughCharacters":
      return {
        ...state,
        errorMessage:
          "Character length must not be less than the selected password options",
      };

    case "clearError":
      return {
        ...state,
        errorMessage: "",
      };

    case "generatePassword":
      return { ...state, password: action.payload };

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
    password,
    errorMessage,
  } = state;

  const selectedOptionsCount = [
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ].filter(Boolean).length;

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

  function randomIndex(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const symbols = "~`!@#$%^&*()_-+={[}]|\"';:?/>.<,";

    const selectedGroups = [];

    if (includeUppercase) selectedGroups.push(uppercase);
    if (includeLowercase) selectedGroups.push(lowercase);
    if (includeNumbers) selectedGroups.push(numbers);
    if (includeSymbols) selectedGroups.push(symbols);

    let passwordArray;

    passwordArray = selectedGroups.map((group) => randomIndex(group));

    let allChars = selectedGroups.join("");

    const remainingLength = characterLength - passwordArray.length;

    for (let i = 0; i < remainingLength; i++) {
      passwordArray.push(randomIndex(allChars));
    }

    passwordArray = passwordArray.sort(() => Math.random() - 0.5);

    return passwordArray.join("");
  }
  const randomPassword = generatePassword();

  function handleSubmit(e) {
    e.preventDefault();

    if (!characterLength) {
      dispatch({ type: "noCharacter" });
      setTimeout(() => {
        dispatch({ type: "clearError" });
      }, 3000);
      return;
    }

    if (characterLength < selectedOptionsCount) {
      dispatch({ type: "notEnoughCharacters" });
      setTimeout(() => {
        dispatch({ type: "clearError" });
      }, 3000);
      return;
    }

    dispatch({ type: "generatePassword", payload: randomPassword });
  }

  const value = calculateStrengthValue(characterLength, selectedOptionsCount);
  const strength = getStrengthText(value);
  const bars = getStrengthBars(value);
  const bg = setBarsBackground(bars);

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
            value={password}
          />
          <div className="flex gap-2 items-center text-brand-success">
            {isCopied && <span className="preset-4 lg:preset-3">COPIED</span>}
            <CopyButton
              className="text-brand-success cursor-pointer hover:text-white"
              onCopy={() => setClipboard(password)}
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

          <CharacterOptions
            dispatch={dispatch}
            characterLength={characterLength}
          />

          <StrengthDisplay strength={strength} bars={bars} bg={bg} />

          <SubmitButton
            characterLength={characterLength}
            onGenerate={(e) => handleSubmit(e)}
          >
            Generate <RightArrow />
          </SubmitButton>

          <p className="text-sm text-brand-error mb-4">{errorMessage}</p>
        </div>
      </form>
    </div>
  );
}

export default App;
