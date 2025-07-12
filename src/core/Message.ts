import { Color } from "./Color";

export class Message {
    author: string;
    content: string;

    print(nameColor: Color, contentColor: Color) {
        console.log(`${nameColor}${this.author}${Color.RESET}: ${contentColor}${this.content}${Color.RESET}\n`);
    }

    constructor({
        author,
        content
    }: {
        author: string,
        content: string,
    }) {
        this.author = author;
        this.content = content;
    }
} 