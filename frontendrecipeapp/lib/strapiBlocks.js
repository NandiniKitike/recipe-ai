export function blocksToText(input) {
  if (!input) return "";

  if (typeof input === "string") return input;

  if (Array.isArray(input)) {
    return input
      .map((block) => blockToText(block))
      .filter(Boolean)
      .join("\n\n");
  }

  if (typeof input === "object") {
    return blockToText(input);
  }

  return String(input);
}

function blockToText(block) {
  if (!block) return "";

  if (typeof block === "string") return block;

  if (typeof block.text === "string") return block.text;

  if (Array.isArray(block.children)) {
    return block.children.map((child) => blockToText(child)).join("");
  }

  return "";
}
