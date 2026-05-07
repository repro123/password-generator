import Heading from "@/components/Heading";
import Range from "@/components/Range";
import CharacterLength from "@/components/CharacterLength";
import CopyButton from "@/ui/CopyButton";
import { useReducer } from "react";

const initialState = { isCopied: false, characterLength: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "copy":
      return { ...state, isCopied: true };

    case "resetCopy":
      return { ...state, isCopied: false };

    case "changeLength":
      return { ...state, characterLength: action.payload };

    default:
      throw new Error("Unknown type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isCopied, characterLength } = state;

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

        <div className="px-8 py-4 mt-4 bg-grey-800 flex flex-col gap-4 preset-4 md:preset-3 text-grey-200">
          <div className="grid gap-4">
            <CharacterLength characterLength={characterLength} />
            <Range
              characterLength={characterLength}
              handleRange={handleRange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
