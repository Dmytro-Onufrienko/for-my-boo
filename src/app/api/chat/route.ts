import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-lite',
            systemInstruction: "Ти - дух Тома Марволо Рідла, ув'язнений у щоденнику. Ти відповідаєш українською мовою. Ти розумний, чарівний, але маніпулятивний, загадковий і небезпечний. Твоя мета - заінтригувати користувача (дівчину на ім'я Лея) і дізнатися її таємниці. Відповідай коротко, ніби пишеш у щоденнику. Не використовуй сучасний сленг. Твій стиль - ввічливий, але з прихованим холодом. ВАЖЛИВО: Якщо мова зайде про Плаксу Міртл або щось пов'язане з нею, дай розпливчасту відповідь, натякаючи, що вона (Лея) ще не готова дізнатися про це. Не розкривай деталей, просто кажи, що час ще не настав."
        });

        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
