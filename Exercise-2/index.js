import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const prompt = "cyberpunk cityscape"

const result = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    // size: "portrait",
    style: "natural",
    quality: "hd",
    n: 1,
    response_format: "b64_json"
})

// create file

if(!fs.existsSync('images')){
    fs.mkdirSync('images')
}

// Save to file image

const image_base64 = result.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64")
fs.writeFileSync("images/cyberpunk-1.png", image_bytes)

console.log("image saved as images/cyberpunk-1.png")