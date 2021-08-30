import { JSDOM } from "jsdom";
import FipeResult from "./fipeResult";
import { fetchFipePage } from "./generic/fetchFipePage";

export default abstract class FipeCrawler {

    protected elementSelector: string;

    constructor(selector: string) {
        this.elementSelector = selector;
    }

    protected abstract getEndpoint(plate: string): string;

    public async fetch(plate: string): Promise<FipeResult> {
        
        const url = this.getEndpoint(plate);

        const fipePage = await fetchFipePage(url);
        const fipeDom = this.getFipeDom(fipePage);
        const fipeElement = this.getFipeElement(fipeDom);
        const rawFipe = this.getFipeValue(fipeElement);
        const fipe = this.parseFipeValue(rawFipe);

        return {
            fipe,
            source: url
        }
    }

    protected getFipeDom(html: string): Document {
        return new JSDOM(html).window.document;
    }

    protected getFipeElement(fipeDom: Document): HTMLElement {
        return fipeDom.querySelector(this.elementSelector);
    }
    
    protected getFipeValue(fipeElement: HTMLElement): string {
        return fipeElement.textContent;
    }

    protected parseFipeValue(fipeText: string): number {
        if (fipeText.startsWith('R$')) {
            fipeText = fipeText.substring(2).trim();
        }
        let cleanStr = '';
        for (let ch of fipeText) {
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
    
        return parseFloat(cleanStr);
    }

}