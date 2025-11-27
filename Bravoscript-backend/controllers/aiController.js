const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePreviewCode = async (html, css) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert Frontend Engineer.
      I have a user-submitted HTML/CSS component.
      
      Your Goals:
      1. Generate CSS to center the component in a 350x350px box.
      2. ANALYZE the component and classify its size.

      ---
      RULE 1: CLASSIFY THE SIZE
      Determine if the component is "Small", "Medium", or "Large".
      - "Small": Buttons, Toggles, Badges, Icons, Inputs, Loaders.
      - "Medium": Cards, Login Forms, Profile Widgets, Alerts, pricing tables.
      - "Large": Navbars, Hero Sections, Footers, Full Page Layouts, Dashboards.

      RULE 2: STRICT SCALING
      - Always use 'transform: scale(1)' on the body.
      - Exception: If size is "Small", you may use 'transform: scale(1.5)' to make it more visible.

      RULE 3: CENTER EVERYTHING
      - The 'body' must have: display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 0; overflow: hidden; transform-origin: center center;

      User HTML: ${html}
      User CSS: ${css}

      ---
      RETURN JSON ONLY (No markdown):
      { 
        "previewCss": "YOUR_GENERATED_CSS_HERE",
        "componentSize": "Small" 
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean markdown
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);
    
    // Return the WHOLE object (CSS + Size)
    return {
        previewCss: jsonResponse.previewCss,
        componentSize: jsonResponse.componentSize || "Medium" // Default to Medium if AI forgets
    };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback: Return basic CSS and 'Medium' size
    return {
        previewCss: `body { transform: scale(1); display: flex; justify-content: center; align-items: center; min-height: 100vh; } ${css}`,
        componentSize: "Medium"
    };
  }
};

module.exports = { generatePreviewCode };