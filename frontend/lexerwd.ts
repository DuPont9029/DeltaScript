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


function token(value = "", type: TokenType): Token {
    return {value, type};
}


function isalpha(src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

function isskippable(str: string) {
    return str == ' ' || str == '\n' || str == '\t';
}

function isint(str: string) {
    const c = str.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

export function tokenize(SourceCode: string): Token[] {

    const tokens = new Array<Token>();
    const src = SourceCode.split("");

    // build each token until end of file
    while(src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParent));
        }
        else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.ClosedParent));
        }
        else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/') {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        }
        else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals));
        }
        else {
            // handle multichar tokens

            // build number token
            if(isint(src[0])) {
                let num = "";
                while(src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            }
            // build alphanumerics token
            else if(isalpha(src[0])) {
                let ident = ""; // like let
                while(src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }
                // check for reserved keywords
                const reserved = KEYWORDS[ident];

                if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier));
                }
                else {
                    tokens.push(token(ident, reserved));
                }

                
            }

            else if(isskippable(src[0])) {
                src.shift(); // skip the current char 
            }

            else {
                console.log("unrecognized character found in source: ", src[0])
                break; //exit with error with Deno.exit(1);
            }



            
        }
        

    }

    return tokens;
}



(document.getElementById('fileInput') as HTMLInputElement).addEventListener('change', function selectedFileChanged() {
    if (this.files.length === 0) {
        console.log('No file selected.');
        return;
    }

    let reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        let source = reader.result;
        if (typeof source === 'string') {
            for (const token of tokenize(source)) {
                console.log(token);
            }
        }
    };
    reader.readAsText(this.files[0]);
});