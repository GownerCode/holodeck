import type { ModelMessage } from "ai";
import type { Actor } from "./Actor";
import { Message } from "./Message";

export class Conversation {
    messages: Message[] = [];
    guidelines: string = "Be concise. Contribute between 1 and 3 sentences. Do not describe actions."

    constructor({starter, guidelines}: {starter: string, guidelines?: string}) {
        this.messages.push(new Message({
            author: "System",
            content: starter
        }))
        this.guidelines = guidelines || this.guidelines;
    }

    inject(message: Message) {
        this.messages.push(message);
    }

    

    fromPerspective(actor: Actor): ModelMessage[] {
        const messages: ModelMessage[] = [];
        for (const authorMessage of this.messages) {
            if (authorMessage.author === actor.name) {
                messages.push({
                    role: "assistant",
                    content: authorMessage.content
                })
            } else {
                messages.push({
                    role: "user",
                    content: `${authorMessage.author} says: ${authorMessage.content}`
                })
            }
        }
        messages.push({
            role: "system",
            content: `You are part of an ongoing conversation. You are ${actor.name}. Please adopt the following personality:

${actor.personality}

Please write a response in character while adhering to these guidelines:
${this.guidelines}`
        })
        return messages;
    }

    addAuthorMessage(message: Message) {
        this.messages.push(message);
    }
} 