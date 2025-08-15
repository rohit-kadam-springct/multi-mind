import { getAIClient, GPT_MODEL } from "@/libs/aiClient";

const client = getAIClient();

interface RouterRequest {
  message: string;
}

interface RouterResponse {
  tag: "hitesh" | "piyush" | "both";
  confidence: number;
}

const ROUTER_SYSTEM_PROMPT = `You are a query router that decides which AI persona should respond to user messages.

PERSONAS:
- Hitesh Choudhary: Frontend, mobile development, React, Next.js, JavaScript, beginner-friendly tutorials, practical coding
- Piyush Garg: Backend, DevOps, system design, databases, scalability, infrastructure, advanced technical concepts

ROUTING RULES:
1. Tag "hitesh" for: Frontend frameworks, UI/UX, mobile apps, beginner programming questions, JavaScript/React/Next.js
2. Tag "piyush" for: Backend architecture, databases, DevOps, system design, server infrastructure, performance optimization
3. Tag "both" for: Full-stack questions, general programming concepts that need both perspectives, architecture decisions affecting both frontend and backend, generic greetings and conversational messages

EXAMPLES:
User: "How to create a React component?"
Response: hitesh

User: "How to design a scalable database schema?"
Response: piyush  

User: "How to build a complete e-commerce app?"
Response: both

User: "What's the best way to handle authentication in a web app?"
Response: both

User: "Hello"
Response: both

User: "Hi there!"
Response: both

Respond with only: hitesh, piyush, or both`;

export async function POST(request: Request) {
  try {
    const { message }: RouterRequest = await request.json();

    const response = await client.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: "system", content: ROUTER_SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    const tag = response.choices[0].message?.content?.trim()?.toLowerCase() as
      | "hitesh"
      | "piyush"
      | "both";

    // Validate response
    if (!["hitesh", "piyush", "both"].includes(tag)) {
      throw new Error("Invalid router response");
    }

    return Response.json({
      tag,
      confidence: 0.9, // future scope
    });
  } catch (error) {
    console.error("Router error:", error);
    return Response.json({
      tag: "hitesh",
      confidence: 0.9, // future scope
    });
  }
}
