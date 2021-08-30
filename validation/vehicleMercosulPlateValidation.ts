import InputValidation from "./inputValidation";
import RegexValidation from "./regexValidation";

export default class VehicleMercosulPlateValidation extends RegexValidation {

    constructor() {
        super(/^[A-z]{3}[0-9][A-z][0-9]{2}$/, '*******');
    }

    // public isMasked(input: string): boolean {
    //     return false;
    // }

    // public cleanMaskUnsafe(input: string): string {
    //     return input;
    // }

    // public insertMaskUnsafe(input: string): string {
    //     return input;
    // }

    // public validateUnmasked(input: string): boolean {
    //     return this.plateRegex.test(input);
    // }

    // public validateMasked(input: string): boolean {
    //     return this.validateUnmasked(input);
    // }


}