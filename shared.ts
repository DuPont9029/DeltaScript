export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParent, ClosedParent,
    Let,
    BinaryOperator,
}

const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let,
}

export interface Token {
    value: string,
    type: TokenType,
}

export function token(value = "", type: TokenType): Token {
    return {value, type};
}

export function isAlpha(src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

export function isSkippable(str: string) {
    return str.trim().length === 0;
}

export function isInt(str: string) {
    const c = str.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

const SKIPPABLE_CHARS = new Set([' ', '\n', '\t']);
const BINARY_OPERATORS = new Set(['+', '-', '*', '/']);

export function tokenize(SourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = SourceCode.split("");

    while(src.length > 0) {
        const char = src[0];

        if (char == '(') {
            tokens.push(token(char, TokenType.OpenParent));
        }
        else if (char == ')') {
            tokens.push(token(char, TokenType.ClosedParent));
        }
        else if (BINARY_OPERATORS.has(char)) {
            tokens.push(token(char, TokenType.BinaryOperator));
        }
        else if (char == '=') {
            tokens.push(token(char, TokenType.Equals));
        }
        else {
            if(isInt(char)) {
                let num = "";
                while(src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            }
            else if(isAlpha(char)) {
                let ident = "";
                while(src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }
                const reserved = KEYWORDS[ident];
                tokens.push(token(ident, reserved ?? TokenType.Identifier));
            }
            else if(SKIPPABLE_CHARS.has(char)) {
                // Do nothing
            }
            else {
                throw new Error(`Unexpected character: ${char}`);
            }
        }
    }

    return tokens;
}