import { Color } from "./Color";

export class Message {
    author: string;
    content: string;

    print(nameColor: Color, contentColor: Color) {
        const wrapText = (text: string, maxWidth: number): string[] => {
            const words = text.split(' ');
            const lines: string[] = [];
            let currentLine = '';
    
            for (const word of words) {
                if (currentLine.length === 0) {
                    currentLine = word;
                } else if (currentLine.length + 1 + word.length <= maxWidth) {
                    currentLine += ' ' + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            if (currentLine || lines.length === 0) {
                lines.push(currentLine);
            }
            return lines;
        }

        const terminalWidth = process.stdout.columns || 80;
        const longNameThreshold = 1;

        if (this.author.length > longNameThreshold) {
             // Long name: author on its own line
             console.log(`${nameColor}${this.author}${Color.RESET}:`);

             const indentSize = 4;
             const indent = ' '.repeat(indentSize);
             const maxContentWidth = terminalWidth - indentSize;
 
             if (maxContentWidth < 10) { // Not enough space
                  console.log(`${indent}${contentColor}${this.content}${Color.RESET}\n`);
                  return;
             }
 
             const lines = wrapText(this.content, maxContentWidth);
 
             for (const line of lines) {
                 console.log(`${indent}${contentColor}${line}${Color.RESET}`);
             }
             console.log('');
        } else {
            // Short name: same line
            const prefix = `${nameColor}${this.author}${Color.RESET}: `;
            const prefixLength = this.author.length + 2;

            const maxContentWidth = terminalWidth - prefixLength;

            if (maxContentWidth < 10 || (prefixLength + this.content.length <= terminalWidth)) {
                console.log(`${prefix}${contentColor}${this.content}${Color.RESET}\n`);
                return;
            }

            const lines = wrapText(this.content, maxContentWidth);

            console.log(`${prefix}${contentColor}${lines[0]}${Color.RESET}`);

            const indent = ' '.repeat(prefixLength);
            for (let i = 1; i < lines.length; i++) {
                console.log(`${indent}${contentColor}${lines[i]}${Color.RESET}`);
            }
            console.log('');
        }
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