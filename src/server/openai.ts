import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAiResponse = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const result =
      response.choices[0].message.content ??
      "I'm sorry, I don't understand that.";

    return result;
  } catch {
    return "I'm sorry, I don't understand that.";
  }
};
