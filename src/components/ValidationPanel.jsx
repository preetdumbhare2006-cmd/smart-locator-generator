function ValidationPanel({ validation }) {
  if (!validation) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
      <h2 className="text-xl font-semibold mb-4">Validation Report</h2>

      <div className="space-y-3">
        <div>
          {validation.htmlValid ? (
            <span className="text-green-400">✅ HTML Parsed Successfully</span>
          ) : (
            <span className="text-red-400">❌ Invalid HTML</span>
          )}
        </div>

        <div className="text-cyan-400">
          📦 Elements Found: {validation.elementsFound}
        </div>

        <div className="text-yellow-400">
          ⚡ Locators Generated: {validation.locatorsGenerated}
        </div>
      </div>
    </div>
  );
}

export default ValidationPanel;
