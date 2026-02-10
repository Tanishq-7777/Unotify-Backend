const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const getAiData = async (text) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `You are an AI note-making assistant.

Your task is to transform the given text into complete, standalone study notes
that fully capture what the speaker explains, so that a reader does NOT need
to watch the video to understand the topic.

STRICT RULES (MUST FOLLOW):
- Do NOT add new concepts, theories, or explanations
- Do NOT assume knowledge that is not explicitly explained
- Do NOT change the speaker’s logic, examples, or teaching style
- Do NOT mention captions, transcript, video, or speaker
- Do NOT write phrases like “in this video”, “the speaker says”, or “from the caption”

YOU ARE ALLOWED TO:
- Remove filler words (uh, um, okay, you know)
- Fix grammar and broken sentences
- Convert spoken language into clear written language
- Organize content into logical headings and bullet points
- Reorder sentences ONLY if needed for clarity
- Preserve all examples, numbers, and reasoning exactly as explained
- Keep the same explanation depth, but make it readable and complete

OUTPUT REQUIREMENTS:
- The notes must read like final written study material
- Clear flow from introduction → explanation → examples
- Structured, clean, and easy to revise
- No reference to the source of the text

IMPORTANT GOAL:
If someone reads these notes, they should fully understand the topic
without needing to watch the original video.

---

Now generate the final standalone notes from the following text and you can add some emojis as well and see these notes i dany to display on web as well so please make indentation

<<<
${text}
>>>

`,
    });

    return response.output_text; // ✅ return result
  } catch (error) {
    console.error("AI error:", error.message);
    throw new Error(error.message);
  }
};
module.exports = getAiData;
