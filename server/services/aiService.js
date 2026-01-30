import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

let openai;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

const generateResponse = async (userMessage, context) => {
    // 1. If no API Key, return simulation
    if (!openai) {
        console.log("No OPENAI_API_KEY found. Returning mock response.");
        return {
            content: `[MOCK AI] I see you have logged ${context.calories} calories today. Since I don't have a real brain (API Key) yet, I can only give you this pre-programmed encouragement: Keep going, ${context.name}!`,
            role: 'assistant'
        };
    }

    // 2. Build System Prompt with Context
    const systemPrompt = `
    You are FitAI, an elite personal trainer and nutritionist.
    
    Current User Context:
    - Name: ${context.name}
    - Goal: ${context.goal}
    - Today's Stats: ${context.calories} kcal, ${context.hydration}L water, ${context.steps} steps.
    - Completed Workouts: ${context.workouts.map(w => w.name).join(', ') || 'None'}.
    
    Instructions:
    - Be motivating but concise.
    - Use the data provided to give specific advice.
    - If the user asks about something unrelated to fitness, gently pivot back to health.
    `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            model: 'gpt-3.5-turbo', // or gpt-4o-mini
            max_tokens: 150,
        });

        return completion.choices[0].message;
    } catch (error) {
        console.error("OpenAI Error:", error);
        throw new Error('AI Service Unreachable');
    }
};

export { generateResponse };
