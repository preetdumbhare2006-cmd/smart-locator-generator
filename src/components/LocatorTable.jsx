import { useState } from "react";


function LocatorTable({ results, onCopyAll }) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = results.filter((item) => {
    const matchesSearch = item.value
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.type === filter;

    return matchesSearch && matchesFilter;
  });
  const getStrength = (type) => {
    switch (type) {
      case "ID":
        return {
          label: "Strong",
          color: "bg-green-600",
        };

      case "Name":
        return {
          label: "Good",
          color: "bg-cyan-600",
        };

      case "CSS":
        return {
          label: "Good",
          color: "bg-cyan-600",
        };

      case "XPath":
        return {
          label: "Weak",
          color: "bg-yellow-600",
        };

      case "Class":
        return {
          label: "Weak",
          color: "bg-yellow-600",
        };

      case "Tag":
        return {
          label: "Avoid",
          color: "bg-red-600",
        };

      default:
        return {
          label: "-",
          color: "bg-slate-600",
        };
    }
  };
  const getElementInfo = (tag) => {
    switch (tag.toUpperCase()) {
      case "BUTTON":
        return "Clickable";

      case "A":
        return "Clickable";

      case "INPUT":
        return "Input";

      case "TEXTAREA":
        return "Input";

      case "SELECT":
        return "Dropdown";

      case "IMG":
        return "Media";

      case "VIDEO":
        return "Media";

      case "FORM":
        return "Form";

      case "TABLE":
        return "Table";

      case "DIV":
        return "Container";

      case "SPAN":
        return "Text";

      case "P":
        return "Text";

      case "H1":
      case "H2":
      case "H3":
        return "Heading";

      default:
        return "Generic";
    }
  };
  const copyLocator = (value) => {
    navigator.clipboard.writeText(value);

    setCopied("Locator copied successfully!");

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

 if (!results.length) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-10 flex items-center justify-center min-h-[250px]">
      <div className="text-center">
        <div className="text-5xl mb-4">⚡</div>

        <h2 className="text-2xl font-semibold text-white">
          Ready to Generate Locators
        </h2>

        <p className="text-slate-400 mt-3">
          Paste your HTML code and click Generate Locators
        </p>
      </div>
    </div>
  );
}

 return (
   <>
     {copied && (
       <div
         className="
          fixed
          top-5
          right-5
          bg-gradient-to-r
          from-green-500
          to-emerald-600
          text-white
          px-5
          py-3
          rounded-xl
          shadow-xl
          z-[9999]
        "
       >
         ✅ {copied}
       </div>
     )}

     <div
       className="
      bg-slate-900
      rounded-2xl
      border
      border-slate-800
      h-[750px]
      flex
      flex-col
      "
     >
       {/* Header */}

       <div className="p-5 border-b border-slate-800">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-semibold text-white">
             Generated Locators
           </h2>

           <button
             onClick={onCopyAll}
             className="
      bg-cyan-600
      hover:bg-cyan-700
      px-4
      py-2
      rounded-lg
      text-sm
      font-medium
      transition
    "
           >
             Copy All
           </button>
         </div>

         <input
           type="text"
           placeholder="Search locator..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            text-white
            outline-none
            focus:border-blue-500
          "
         />
         <div className="flex gap-2 flex-wrap mt-4">
           {["All", "ID", "CSS", "XPath", "Class", "Name", "Tag"].map(
             (type) => (
               <button
                 key={type}
                 onClick={() => setFilter(type)}
                 className={`
          px-3 py-1 rounded-lg text-sm transition
          ${
            filter === type
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }
        `}
               >
                 {type}
               </button>
             ),
           )}
         </div>
       </div>

       {/* Scrollable Table */}

       <div className="flex-1 overflow-y-auto">
         <table className="w-full">
           <thead className="bg-slate-800 sticky top-0">
             <tr>
               <th className="p-4 text-left">Tag</th>
               <th className="p-4 text-left w-[250px]">Label</th>
               <th className="p-4 text-left">Purpose</th>
               <th className="p-4 text-left">Element Type</th>
               <th className="p-4 text-left">Type</th>
               <th className="p-4 text-left w-[250px]">Value</th>
               <th className="p-4 text-left">Strength</th>
               <th className="p-4 text-left">Action</th>
             </tr>
           </thead>

           <tbody>
             {filtered.map((item, index) => (
               <tr
                 key={index}
                 className="
                  border-b
                  border-slate-800
                  hover:bg-slate-800/40
                  transition
                "
               >
                 <td className="p-4 text-white">{item.tag}</td>
                 <td className="p-4 max-w-[250px]">
                   <div
                     title={item.label}
                     className="
      text-cyan-400
      truncate
      overflow-hidden
      whitespace-nowrap
      cursor-help
    "
                   >
                     {item.label}
                   </div>
                 </td>
                 <td className="p-4 text-cyan-400">{item.purpose}</td>
                 <td className="p-4">
                   <span className="text-cyan-400">
                     {getElementInfo(item.tag)}
                   </span>
                 </td>

                 <td className="p-4">
                   <span
                     className="
    bg-blue-600
    px-3
    py-1
    rounded-full
    text-sm
    text-white
    "
                   >
                     {item.type}
                   </span>
                 </td>

                 <td className="p-4 max-w-[250px]">
                   <div
                     title={item.value}
                     className="
      text-green-400
      font-mono
      truncate
      overflow-hidden
      whitespace-nowrap
      cursor-help
    "
                   >
                     {item.value}
                   </div>
                 </td>

                 <td className="p-4">
                   <span
                     className={`
      ${getStrength(item.type).color}
      px-3
      py-1
      rounded-full
      text-white
      text-sm
      whitespace-nowrap
    `}
                   >
                     {getStrength(item.type).label}
                   </span>
                 </td>

                 <td className="p-4">
                   <button
                     onClick={() => copyLocator(item.value)}
                     className="
                      bg-emerald-600
                      hover:bg-emerald-700
                      px-4
                      py-2
                      rounded-lg
                      transition
                      text-white
                    "
                   >
                     Copy
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </>
 );
}

export default LocatorTable;
