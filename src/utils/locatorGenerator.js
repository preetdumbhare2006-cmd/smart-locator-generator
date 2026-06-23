function getPurpose(element) {
  const text = element.textContent?.trim().toLowerCase() || "";

  const id = element.id?.toLowerCase() || "";

  const cls =
    typeof element.className === "string"
      ? element.className.toLowerCase()
      : "";

  const name = element.name?.toLowerCase() || "";

  const combined = `${text} ${id} ${cls} ${name}`;

  // Authentication
  if (combined.includes("login")) return "Login Component";

  if (combined.includes("signup")) return "Signup Component";

  if (combined.includes("register")) return "Registration Component";

  if (combined.includes("password")) return "Password Field";

  if (combined.includes("username")) return "Username Field";

  if (combined.includes("email")) return "Email Field";

  // Navigation
  if (combined.includes("nav") || combined.includes("navbar"))
    return "Navigation Section";

  if (combined.includes("menu") || combined.includes("sidebar"))
    return "Menu / Sidebar";

  // Search
  if (combined.includes("search")) return "Search Component";

  // E-commerce
  if (combined.includes("product")) return "Product Section";

  if (combined.includes("cart")) return "Shopping Cart";

  if (combined.includes("checkout")) return "Checkout Section";

  // Layout
  if (combined.includes("header")) return "Header Section";

  if (combined.includes("footer")) return "Footer Section";

  if (combined.includes("content")) return "Content Area";

  if (combined.includes("card")) return "Card Component";

  if (combined.includes("modal")) return "Modal Popup";

  // Tables
  if (combined.includes("table")) return "Data Table";

  // Tag-based fallback
  switch (element.tagName.toUpperCase()) {
    case "BUTTON":
      return "Action Button";

    case "INPUT":
      return "Input Field";

    case "TEXTAREA":
      return "Text Input";

    case "SELECT":
      return "Dropdown";

    case "FORM":
      return "Form";

    case "A":
      return "Navigation Link";

    case "IMG":
      return "Image";

    case "TABLE":
      return "Table";

    case "DIV":
      return "Container";

    case "SPAN":
      return "Text Element";

    case "P":
      return "Paragraph";

    case "H1":
    case "H2":
    case "H3":
      return "Heading";

    default:
      return "Generic Element";
  }
}
function getElementLabel(element) {
  const text = element.textContent?.trim();

  if (text) {
    return text;
  }

  if (element.placeholder) {
    return element.placeholder;
  }

  if (element.alt) {
    return element.alt;
  }

  if (element.name) {
    return element.name;
  }

  if (element.id) {
    return element.id;
  }

  return "-";
}
export function generateLocators(htmlString) {
  const hasTag = /<([a-z][a-z0-9]*)\b[^>]*>/i.test(htmlString);

  if (!hasTag) {
    throw new Error(
      "Please enter valid HTML containing at least one HTML tag.",
    );
  }

  // Closing tag validation

  const parser = new DOMParser();

  const doc = parser.parseFromString(htmlString, "text/html");

  const elements = doc.body.querySelectorAll("*");

  const output = [];

  elements.forEach((element) => {
    const tag = element.tagName;

    if (element.id) {
      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "ID",
        value: element.id,
      });

      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "CSS",
        value: `#${element.id}`,
      });

      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "XPath",
        value: `//*[@id='${element.id}']`,
      });
    }

    if (element.name) {
      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "Name",
        value: element.name,
      });
      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "XPath",
        value: `//${tag.toLowerCase()}[@name='${element.name}']`,
      });
    }

    if (typeof element.className === "string" && element.className.trim()) {
      const classes = element.className.trim();

      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "Class",
        value: classes,
      });

      output.push({
        tag,
        label: getElementLabel(element),
        purpose: getPurpose(element),
        type: "CSS",
        value: "." + classes.split(" ").join("."),
      });
    }

    output.push({
      tag,
      label: getElementLabel(element),
      purpose: getPurpose(element),
      type: "Tag",
      value: tag.toLowerCase(),
    });
  });

  return output;
}
