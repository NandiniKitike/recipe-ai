import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 4,
  },
});

function getDescriptionText(description) {
  if (!description) return "";
  if (typeof description === "string") return description;
  if (Array.isArray(description)) {
    return description
      .map((block) => {
        if (typeof block === "string") return block;
        if (!block || typeof block !== "object") return "";
        if (Array.isArray(block.children)) {
          return block.children
            .map((child) => (child?.text ? String(child.text) : ""))
            .filter(Boolean)
            .join("");
        }
        return block.text ? String(block.text) : "";
      })
      .filter(Boolean)
      .join("\n\n");
  }
  if (typeof description === "object") {
    if (Array.isArray(description.children)) {
      return description.children
        .map((child) => (child?.text ? String(child.text) : ""))
        .filter(Boolean)
        .join("");
    }
    if (description.text) return String(description.text);
  }
  return String(description);
}

export function RecipePDF({ recipe }) {
  const descriptionText = getDescriptionText(recipe.description);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.text}>{descriptionText}</Text>

        {/* Meta */}
        <View style={styles.section}>
          <Text>
            Cuisine: {recipe.cuisine} | Category: {recipe.category}
          </Text>
          <Text>
            Time: {parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins
          </Text>
          <Text>Servings: {recipe.servings}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.heading}>Ingredients</Text>
          {recipe.ingredients.map((ing, i) => (
            <Text key={i} style={styles.text}>
              • {ing.item} – {ing.amount}
            </Text>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.heading}>Instructions</Text>
          {recipe.instructions.map((step) => (
            <View key={step.step} style={{ marginBottom: 6 }}>
              <Text>
                {step.step}. {step.title}
              </Text>
              <Text>{step.instruction}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        {recipe.tips?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Chef’s Tips</Text>
            {recipe.tips.map((tip, i) => (
              <Text key={i}>• {tip}</Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
