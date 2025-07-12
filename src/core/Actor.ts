import { generateText, type LanguageModel } from "ai";
import { Color } from "./Color";
import { Conversation } from "./Conversation";
import { Message } from "./Message";

export type InferenceOptions = {
    model: LanguageModel,
}

export class Actor {
    name: string;
    personality: string;
    colorSet: {
        name: Color,
        content: Color
    };

    constructor({personality, name, colorSet}: { name: string, personality: string, colorSet: { name: Color, content: Color } }) {
        this.name = name;
        this.personality = personality;
        this.colorSet = colorSet
    }

    async turn({
        inferenceOptions,
        conversation
    }: {
        inferenceOptions: InferenceOptions,
        conversation: Conversation
    }): Promise<Conversation> {
        const result = await generateText({
            model: inferenceOptions.model,
            messages: conversation.fromPerspective(this),
        })

        const newMessage = new Message({
            author: this.name,
            content: result.text
        })

        newMessage.print(this.colorSet.name, this.colorSet.content);

        conversation.addAuthorMessage(newMessage)

        return conversation;
    }
}