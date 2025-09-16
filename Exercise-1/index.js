import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const postText = async (prompt,text, length = 'short' )=>{
    const lenghtInstructions ={
        short: 'in 1-2 sentences'
    };

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{
            role: 'user',
            content: `Please write a ${prompt} ${lenghtInstructions[length]}:\n\n${text}`
        }],
        max_completion_tokens: 500,
        stream: true

    })
    
    let fullResponse = '';
    for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            process.stdout.write(content);
            fullResponse += content;
        }
    }
    console.log('\n----stream ended---');
    return fullResponse;
}

const articlePost = `
Artificial Intelligence (AI) is transforming the way we live and work. From self-driving cars to virtual assistants, AI technologies are becoming increasingly integrated into our daily lives. As AI continues to evolve, it holds the promise of revolutionizing various industries, enhancing productivity, and improving overall quality of life. However, it also raises important ethical and societal questions that need to be addressed.
[Your short summary here]`

const summary = await postText('short summary', articlePost, 'short');
console.log('Summary:', summary);