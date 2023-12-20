import { tokenize } from '../shared.ts';

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)) {
    console.log(token);
}