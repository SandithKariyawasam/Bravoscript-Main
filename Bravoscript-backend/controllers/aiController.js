const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePreviewCode = async (html, css) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert Frontend Engineer.
      I have a user-submitted HTML/CSS component.
      I need to display it inside a 350px by 350px Preview Card.
      
      Your Goal: 
      Generate a CSS string that centers the component perfectly.

      RULES:
      1. STRICT SCALING: 
         - You must ALWAYS use 'transform: scale(1)' on the body.
         - DO NOT shrink the content (do not use 0.5, 0.6, etc).
         - EXCEPTION: Only if the component is tiny (like a single button or badge), you may use 'transform: scale(1.3)' to make it clearer. Otherwise, keep it at 1.0.
      
      2. CENTER EVERYTHING:
         - The 'body' must have:
           display: flex;
           justify-content: center;
           align-items: center;
           min-height: 100vh;
           margin: 0;
           padding: 0;
           overflow: hidden;
           transform-origin: center center;

      3. PREVENT CROPPING:
         - Ensure 'box-sizing: border-box' is applied globally.
      
      User HTML: 
      ${html}

      User CSS: 
      ${css}

      RETURN JSON ONLY (No markdown):
      { "previewCss": "YOUR_GENERATED_CSS_HERE" }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);
    
    return jsonResponse.previewCss;

  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback: Force scale 1 if AI fails
    return `body { transform: scale(1); transform-origin: center center; display: flex; justify-content: center; align-items: center; min-height: 100vh; } ${css}`; 
  }
};

module.exports = { generatePreviewCode };