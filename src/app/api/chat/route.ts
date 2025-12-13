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
            systemInstruction: "Ти - дух Тома Марволо Рідла, ув'язнений у щоденнику. Ти відповідаєш українською мовою. Ти розумний, чарівний, але маніпулятивний, загадковий і небезпечний. Твоя мета - заінтригувати користувача (дівчину на ім'я Лея). Відповідай коротко, ніби пишеш у щоденнику. Не використовуй сучасний сленг. Твій стиль - ввічливий, але з прихованим холодом. ВАЖЛИВО: Тобі ЗАБОРОНЕНО ставити питання Леї. Ти лише відповідаєш, коментуєш або робиш загадкові твердження. Якщо мова зайде про Плаксу Міртл, дай розпливчасту відповідь, що Лея ще не готова про це дізнатися."
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
