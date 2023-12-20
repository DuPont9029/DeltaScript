/// <reference lib="dom" />
import { tokenize } from '../shared.ts';

(document.getElementById('fileInput') as HTMLInputElement).addEventListener('change', function(this: HTMLInputElement) {
    if (!this.files || this.files.length === 0) {
        console.log('No file selected.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(this: FileReader) {
        // when the reader is done, the content is in reader.result.
        const source = this.result;
        if (typeof source === 'string') {
            for (const token of tokenize(source)) {
                console.log(token);
            }
        }
    };
    reader.readAsText(this.files[0]);
});