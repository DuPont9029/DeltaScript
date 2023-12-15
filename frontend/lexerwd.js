"use strict";
/*
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.TokenType = void 0;
*/
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Number"] = 0] = "Number";
    TokenType[TokenType["Identifier"] = 1] = "Identifier";
    TokenType[TokenType["Equals"] = 2] = "Equals";
    TokenType[TokenType["OpenParent"] = 3] = "OpenParent";
    TokenType[TokenType["ClosedParent"] = 4] = "ClosedParent";
    TokenType[TokenType["Let"] = 5] = "Let";
    TokenType[TokenType["BinaryOperator"] = 6] = "BinaryOperator";
})(TokenType || (TokenType = {}));
var KEYWORDS = {
    "let": TokenType.Let,
};
function token(value, type) {
    if (value === void 0) { value = ""; }
    return { value: value, type: type };
}
function isalpha(src) {
    return src.toUpperCase() != src.toLowerCase();
}
function isskippable(str) {
    return str == ' ' || str == '\n' || str == '\t';
}
function isint(str) {
    var c = str.charCodeAt(0);
    var bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}
function tokenize(SourceCode) {
    var tokens = new Array();
    var src = SourceCode.split("");
    // build each token until end of file
    while (src.length > 0) {
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
            if (isint(src[0])) {
                var num = "";
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            }
            // build alphanumerics token
            else if (isalpha(src[0])) {
                var ident = ""; // like let
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }
                // check for reserved keywords
                var reserved = KEYWORDS[ident];
                if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier));
                }
                else {
                    tokens.push(token(ident, reserved));
                }
            }
            else if (isskippable(src[0])) {
                src.shift(); // skip the current char 
            }
            else {
                console.log("unrecognized character found in source: ", src[0]);
                break; //exit with error with Deno.exit(1);
            }
        }
    }
    return tokens;
}
window.tokenize = tokenize;
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
    if (this.files.length === 0) {
        console.log('No file selected.');
        return;
    }
    var reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        var source = reader.result;
        if (typeof source === 'string') {
            for (var _i = 0, _a = tokenize(source); _i < _a.length; _i++) {
                var token_1 = _a[_i];
                console.log(token_1);
            }
        }
    };
    reader.readAsText(this.files[0]);
});
