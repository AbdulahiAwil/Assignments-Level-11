import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
async function saveVoice(filename, text, voice = "alloy") {
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: voice, 
      input: text,
    });
  
    const buffer = Buffer.from(await mp3.arrayBuffer());
  
    
    if (!fs.existsSync("audio")) {
      fs.mkdirSync("audio");
    }
  
    fs.writeFileSync(path.resolve("audio", filename), buffer);
    console.log(`✅ Saved: audio/${filename}`);
  }
  
  async function main() {
    await saveVoice("coral.mp3", "Don’t worry, everything will be fine. Just take a deep breath.", "coral"); 
    await saveVoice("ash.mp3", "Yes! This is amazing news! I can’t believe it actually happened!", "ash");
    await saveVoice("echo.mp3", "We must stay focused. There’s still a lot of work ahead.", "echo");
  }
  
  main();