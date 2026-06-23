import { useState } from "react";
import HtmlInput from "./components/HtmlInput";
import LocatorTable from "./components/LocatorTable";
import { generateLocators } from "./utils/locatorGenerator";
import LocatorChart from "./components/LocatorChart";
import HtmlPreview from "./components/HtmlPreview";
import ValidationPanel from "./components/ValidationPanel";

function App() {
  const [html, setHtml] = useState("");
  const [results, setResults] = useState([]);

  const [error, setError] = useState("");
  const [validation, setValidation] = useState(null);

 const handleGenerate = () => {
   setError("");

   if (!html.trim()) {
     setError("Please enter HTML code.");

     setTimeout(() => {
       setError("");
     }, 3000);

     return;
   }

   try {
    const data = generateLocators(html);

    setResults(data);

    setValidation({
      htmlValid: true,
      elementsFound: new Set(data.map((r) => r.tag)).size,
      locatorsGenerated: data.length,
    });

    setError("");
   } catch (err) {
     setResults([]);

     setError(err.message || "Something went wrong");

     setValidation({
       htmlValid: false,
       elementsFound: 0,
       locatorsGenerated: 0,
     });

     setTimeout(() => {
       setError("");
     }, 3000);
   }
 };
  const exportCSV = () => {
    if (!results.length) return;

    const headers = ["Tag", "Type", "Value"];

    const rows = results.map((item) => [item.tag, item.type, item.value]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "locators.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  const stats = {
    elements: new Set(results.map((r) => r.tag)).size,
    total: results.length,
    xpath: results.filter((r) => r.type === "XPath").length,
    css: results.filter((r) => r.type === "CSS").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center">
          Smart Locator Generator
        </h1>

        <p className="text-center text-slate-400 mt-3 mb-10">
          Generate Selenium Ready Locators with HTML Validation
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Elements" value={stats.elements} />

          <StatCard title="Locators" value={stats.total} />

          <StatCard title="XPath" value={stats.xpath} />

          <StatCard title="CSS" value={stats.css} />
        </div>
        <ValidationPanel validation={validation} />
        <LocatorChart results={results} />
        <div className="flex justify-end mb-4">
          <button
            onClick={exportCSV}
            className="
      bg-purple-600
      hover:bg-purple-700
      px-5
      py-3
      rounded-xl
      text-white
      font-semibold
      transition
    "
          >
            Export CSV
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <HtmlInput
            html={html}
            setHtml={setHtml}
            onGenerate={handleGenerate}
            onClear={() => {
              setHtml("");
              setResults([]);
              setError("");
            }}
          />
          {error && (
            <div
              className="
      fixed
      top-5
      right-5
      bg-red-600
      text-white
      px-5
      py-3
      rounded-xl
      shadow-lg
      z-50
    "
            >
              ❌ {error}
            </div>
          )}

          <LocatorTable
            results={results}
            onCopyAll={() => {
              const allLocators = results
                .map((item) => `${item.type}: ${item.value}`)
                .join("\n");

              navigator.clipboard.writeText(allLocators);

              alert("All locators copied!");
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
      <h3 className="text-slate-400">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default App;
