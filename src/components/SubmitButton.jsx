function SubmitButton({ children, characterLength, onGenerate }) {
  return (
    <button
      type="submit"
      disabled={!characterLength}
      onClick={onGenerate}
      className="bg-brand-success text-black flex items-center text-center justify-center gap-2 border border-brand-success not-disabled:hover:text-brand-success not-disabled:hover:bg-black cursor-pointer px-4 py-3 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 "
    >
      {children}
    </button>
  );
}

export default SubmitButton;
