import Heading from "@/components/Heading";
import Range from "@/components/Range";
import CharacterLength from "@/components/CharacterLength";
import CharacterOptions from "@/components/CharacterOptions";
import StrengthDisplay from "@/components/StrengthDisplay";
import SubmitButton from "@/components/SubmitButton";
import PasswordOutput from "@/components/PasswordOutput";

import RightArrow from "@/ui/RightArrow";

import { calculateStrengthValue } from "@/utils/calculateStrengthValue";
import { getStrengthText } from "@/utils/getStrengthText";
import { getStrengthBars } from "@/utils/getStrengthBars";
import { setBarsBackground } from "@/utils/setBarsBackground";
import { randomIndex } from "@/utils/randomIndex";

import { useReducer, useEffect } from "react";

const initialState = {
  isCopied: false,
  characterLength: 0,
  includeUppercase: false,
  includeLowercase: false,
  includeNumbers: false,
  includeSymbols: false,
  password: "",
  errorMessage: "",
  history: JSON.parse(localStorage.getItem("history")) || [],
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

    case "generatePassword": {
      const newEntry = {
        password: action.payload,
        strength: action.strength,
        createdAt: new Date().toISOString(),
        settings: {
          characterLength: state.characterLength,
          includeUppercase: state.includeUppercase,
          includeLowercase: state.includeLowercase,
          includeNumbers: state.includeNumbers,
          includeSymbols: state.includeSymbols,
        },
      };

      const updatedHistory = [newEntry, ...state.history];

      localStorage.setItem("history", JSON.stringify(updatedHistory));

      return { ...state, password: action.payload, history: updatedHistory };
    }

    case "updateHistory":
      return {
        ...state,
        history: action.payload,
      };

    case "deleteAllHistory":
      return {
        ...state,
        history: [],
      };

    case "loadSettingsOnGenerateSimilar":
      return { ...state, ...action.payload };

    case "reset":
      return {
        ...state,
        characterLength: 0,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
        password: "",
        errorMessage: "",
      };

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
    history,
  } = state;

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

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

  function generatePassword(settings = null) {
    const config = settings || {
      characterLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    };

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const symbols = "~`!@#$%^&*()_-+={[}]|\"';:?/>.<,";

    const selectedGroups = [];

    if (config.includeUppercase) selectedGroups.push(uppercase);
    if (config.includeLowercase) selectedGroups.push(lowercase);
    if (config.includeNumbers) selectedGroups.push(numbers);
    if (config.includeSymbols) selectedGroups.push(symbols);

    let passwordArray;

    passwordArray = selectedGroups.map((group) => randomIndex(group));

    let allChars = selectedGroups.join("");

    const remainingLength = config.characterLength - passwordArray.length;

    for (let i = 0; i < remainingLength; i++) {
      passwordArray.push(randomIndex(allChars));
    }

    passwordArray = passwordArray.sort(() => Math.random() - 0.5);

    return passwordArray.join("");
  }

  function generateSimilarPasswordFromHistory(item) {
    const settings = item.settings;
    dispatch({ type: "loadSettingsOnGenerateSimilar", payload: settings });

    const similarPassword = generatePassword(settings);

    const selectedOptionsCount = [
      settings.includeUppercase,
      settings.includeLowercase,
      settings.includeNumbers,
      settings.includeSymbols,
    ].filter(Boolean).length;

    const value = calculateStrengthValue(
      settings.characterLength,
      selectedOptionsCount,
    );

    const similarStrength = getStrengthText(value);

    dispatch({
      type: "generatePassword",
      payload: similarPassword,
      strength: similarStrength,
    });
  }

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

    const randomPassword = generatePassword();
    dispatch({
      type: "generatePassword",
      payload: randomPassword,
      strength: strength,
    });
  }

  function handleDelete(createdAt) {
    const updatedHistory = history.filter(
      (item) => item.createdAt !== createdAt,
    );

    dispatch({
      type: "updateHistory",
      payload: updatedHistory,
    });
  }

  function handleDeleteAllHistory() {
    const confirmed = window.confirm("Delete all password history?");

    if (!confirmed) return;
    dispatch({ type: "deleteAllHistory" });
  }

  const value = calculateStrengthValue(characterLength, selectedOptionsCount);
  const strength = getStrengthText(value);
  const bars = getStrengthBars(value);
  const bg = setBarsBackground(bars);

  return (
    <div className=" w-full max-w-3xl mx-auto">
      <Heading
        history={history}
        onDelete={handleDelete}
        onGenerateSimilar={generateSimilarPasswordFromHistory}
        onDeleteAll={handleDeleteAllHistory}
      />

      <form className="mt-4 ">
        <PasswordOutput
          password={password}
          isCopied={isCopied}
          onCopy={setClipboard}
        />

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
            includeUppercase={includeUppercase}
            includeLowercase={includeLowercase}
            includeNumbers={includeNumbers}
            includeSymbols={includeSymbols}
          />

          <StrengthDisplay strength={strength} bars={bars} bg={bg} />

          <div className="flex gap-2 items-center">
            <SubmitButton
              characterLength={characterLength}
              onGenerate={(e) => handleSubmit(e)}
            >
              Generate <RightArrow />
            </SubmitButton>

            <button
              disabled={!characterLength}
              onClick={() => dispatch({ type: "reset" })}
              className="bg-black text-white flex items-center text-center justify-center gap-2 border border-black not-disabled:hover:text-black not-disabled:hover:bg-white  px-8 py-3 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 w-fit"
            >
              Reset
            </button>
          </div>

          <p className="text-sm text-brand-error mb-4">{errorMessage}</p>
        </div>
      </form>
    </div>
  );
}

export default App;
