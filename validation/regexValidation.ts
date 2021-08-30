import InputValidation from "./inputValidation";

const MASK_ANY_CHAR = '*';

export default class RegexValidation extends InputValidation {

    private _validationRule: RegExp;
    private _mask: string;
    private _isMaskUseless: boolean;

    public get mask(): string {
        return this._mask;
    }

    public get validationRule(): RegExp {
        return this._validationRule;
    }

    constructor(unmaskedRule: RegExp, mask: string) {
        super();
        this._validationRule = unmaskedRule;
        this._mask = mask;
        this._isMaskUseless = mask.replace(/\*/g, '') === '';
    }

    public isMasked(input: string): boolean {
        if (input.length != this.mask.length) {
            return false;
        }
        for (let i = 0; i < input.length; i++) {
            const maskCh = this.mask[i];
            const inputCh = input[i];

            if (maskCh === MASK_ANY_CHAR) {
                continue;
            }

            if (maskCh !== inputCh) {
                return false;
            }
        }

        return true;
    }

    public cleanMaskUnsafe(input: string): string {

        if (!this.isMasked(input)) {
            return input;
        }

        const output = [];
        let inputIndex = -1;
        for (let ch of this.mask) {
            inputIndex++;
            if (ch === MASK_ANY_CHAR) {
                const chToAdd = input[inputIndex];
                output.push(chToAdd);
            }
            else {
                continue;
            }
        }

        return output.join('');
    }

    public insertMaskUnsafe(input: string): string {

        if (this.isMasked(input)) {
            return input;
        }
        const output = [];
        let inputIndex = 0;
        for (let ch of this.mask) {
            if (ch === MASK_ANY_CHAR) {
                output.push(input[inputIndex++]);
            }
            else {
                output.push(ch);
            }
        }
        return output.join('');
    }

    /**
     * Validates an unmasked input. If it is valid but masked, false will be returned (except in a * only mask)
     * @param input The input string to validate
     */
    public validateUnmasked(input: string): boolean {
        if (!this._isMaskUseless && this.isMasked(input)) {
            return false;
        }
        return this.validationRule.test(input);
    }

    /**
     * Validates an masked input. If it is valid but unmasked, false will be returned (except in a * only mask)
     * @param input The input string to validate
     */
    public validateMasked(input: string): boolean {
        if (this._isMaskUseless) {
            return this.validationRule.test(input);
        }
        if (!this.isMasked(input)) {
            return false;
        }
        return this.validateUnmasked(this.cleanMaskUnsafe(input));
    }

}