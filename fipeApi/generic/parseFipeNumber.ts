export default function parseFipeValue(fipe: string): number {
    if (fipe.startsWith('R$')) {
        fipe = fipe.substring(2).trim();
    }
    let cleanStr = '';
    for (let ch of fipe) {
        if (ch == '.') {
            continue;
        }
        if (ch == ',') {
            ch = '.';
        }
        else if (!'0123456789'.includes(ch)) {
            continue;
        }

        cleanStr += ch;
    }

    return parseInt(cleanStr);
}