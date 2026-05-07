import Heading from "@/components/Heading";

function App() {
  return (
    <div className="border border-white w-full max-w-3xl mx-auto">
      <Heading />

      <div className="mt-4 p-8 bg-grey-800 flex items-center gap-4">
        <input className="w-full" />
        <button></button>
      </div>
    </div>
  );
}

export default App;
