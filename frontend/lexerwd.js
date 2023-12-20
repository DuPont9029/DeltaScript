"use strict";
/*
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.TokenType = void 0;
*/
const TokenType = {
	Number: 0,
	Identifier: 1,
	Equals: 2,
	OpenParent: 3,
	ClosedParent: 4,
	Let: 5,
	BinaryOperator: 6,
};

const KEYWORDS = {
	let: TokenType.Let,
};

function token(value = "", type) {
	return { value, type };
}

function isAlpha(char) {
	return /^[a-zA-Z]$/.test(char);
}

function isInt(char) {
	return /^\d$/.test(char);
}

function tokenize(sourceCode) {
	const tokens = [];
	const src = sourceCode.split("");

	while (src.length > 0) {
		const char = src.shift();

		switch (char) {
			case "(":
			case ")":
			case "+":
			case "-":
			case "*":
			case "/":
				tokens.push(token(char, TokenType.BinaryOperator));
				break;
			case "=":
				tokens.push(token(char, TokenType.Equals));
				break;
			default:
				if (isInt(char)) {
					let num = char;
					while (src.length > 0 && isInt(src[0])) {
						num += src.shift();
					}
					tokens.push(token(num, TokenType.Number));
				} else if (isAlpha(char)) {
					let ident = char;
					while (src.length > 0 && isAlpha(src[0])) {
						ident += src.shift();
					}
					const reserved = KEYWORDS[ident];
					tokens.push(
						token(
							ident,
							reserved === undefined
								? TokenType.Identifier
								: reserved
						)
					);
				} else if (/\s/.test(char)) {
					// Skip whitespace characters
				} else {
					console.log(
						"Unrecognized character found in source:",
						char
					);
					return tokens; // Exit with an error
				}
		}
	}

	return tokens;
}

// Use const for constants
const tokenizeFile = (source) => {
	const tokens = tokenize(source);

	for (const token of tokens) {
		console.log(token);
	}
};

// Use arrow function and const for function definition
const selectedFileChanged = function () {
	const files = this.files;

	if (files.length === 0) {
		console.log("No file selected.");
		return;
	}

	const file = files[0];

	reader.onload = function fileReadCompleted() {
		const source = reader.result;

		if (typeof source === "string") {
			// Use the optimized function for tokenization
			tokenizeFile(source);
		}
	};

	reader.readAsText(file);
};

// Use const for constant element reference
const fileInput = document.getElementById("fileInput");

// Use addEventListener for better event handling
fileInput.addEventListener("change", selectedFileChanged);

// Use arrow function for assignment
window.tokenize = tokenize;
