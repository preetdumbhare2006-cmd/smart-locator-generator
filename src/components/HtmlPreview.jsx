function HtmlPreview({ html }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
      <h2 className="text-xl font-semibold mb-4">HTML Preview</h2>

      <div
        className="
          bg-white
          text-black
          rounded-lg
          p-4
          min-h-[150px]
          overflow-auto
        "
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}

export default HtmlPreview;
