import InputValidation from "./inputValidation";

export default class MultipleValidation extends InputValidation {

    protected validations: Array<InputValidation>;

    constructor(validations: Array<InputValidation>) {
        super();
        if (!Array.isArray(validations) || validations.length == 0) {
            throw new Error('At least one validation expected!');
        }
        this.validations = validations;
    }

    public isMasked(input: string): boolean {
        for (const validation of this.validations) {
            if (validation.isMasked(input)) {
                return true;
            }
        }
        return false;
    }

    public cleanMaskUnsafe(input: string): string {

        let valueToReturn = input;
        for (const validation of this.validations) {
            if (validation.isMasked(input)) {
                const clean = validation.cleanMaskUnsafe(input);
                // As the mask is being REMOVED, we expect
                // that the string will get smaller
                if (clean.length < valueToReturn.length && validation.validateUnmasked(clean)) {
                    valueToReturn = clean;
                }
            }
        }
        return valueToReturn;
    }

    public insertMaskUnsafe(input: string): string {

        let valueToReturn = input;
        for (const validation of this.validations) {
            if (!validation.isMasked(input)) {
                const masked = validation.insertMaskUnsafe(input);
                // We can expected that, as long as the mask is being applied,
                // it will get bigger
                if ((masked.length > valueToReturn.length) && validation.validateMasked(masked)) {
                    valueToReturn = masked;
                }
            }
        }
        return valueToReturn;
    }

    public validateMasked(input: string): boolean {
        for (const validation of this.validations) {
            if (validation.validateMasked(input)) {
                return true;
            }
        }
        return false;
    }


    public validateUnmasked(input: string): boolean {
        for (const validation of this.validations) {
            if (validation.validateUnmasked(input)) {
                return true;
            }
        }
        return false;
    }

    public override validate(input: string): boolean {
        return this.getWhichValidates(input) != null;
    }

    public getWhichValidates(input: string): InputValidation {
        for (const validation of this.validations) {
            if (validation.validate(input)) {
                return validation;
            }
        }
        return null;
    }

}