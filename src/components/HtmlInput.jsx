function HtmlInput({ html, setHtml, onGenerate, onClear }) {
  return (
    <div
      className="
bg-slate-900
rounded-2xl
border
border-slate-800
p-6
h-[750px]
"
    >
      <h2 className="text-xl font-semibold mb-4">HTML Input</h2>

      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        placeholder="Paste your HTML here..."
        rows={15}
        className="
  w-full
  h-[580px]
  bg-slate-950
  rounded-xl
  border
  border-slate-700
  p-4
  font-mono
  "
      />

      <div className="flex gap-3 mt-5">
        <button
          onClick={onGenerate}
          className="
      px-6
      py-3
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      transition
      font-semibold
    "
        >
          Generate Locators
        </button>

        <button
          onClick={onClear}
          className="
      px-6
      py-3
      rounded-xl
      bg-red-600
      hover:bg-red-700
      transition
      font-semibold
    "
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default HtmlInput;
