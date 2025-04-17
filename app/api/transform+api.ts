import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { base64Image, prompt } = await request.json();

    if (!base64Image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: prompt || "Transfor this image into a college graduation photo"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ] as any // Type assertion to handle vision API types
        }
      ],
      max_tokens: 300
    });

    return Response.json({ result: response.choices[0].message.content });
  } catch (error: any) {
    console.error('API Error:', error);
    return Response.json({ 
      error: error.message || 'Failed to process image',
      details: error.toString()
    }, { status: 500 });
  }
}