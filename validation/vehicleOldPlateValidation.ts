import InputValidation from "./inputValidation";
import RegexValidation from "./regexValidation";

/**
 * Validates old brazilian vehicle plates (AAA-0000)
 */
export default class VehicleOldPlateValidation extends RegexValidation {

    constructor() {
        super(/^[A-z]{3}[0-9]{4}$/, '***-****');
    }

}