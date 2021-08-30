import MultipleValidation from "./multipleValidation";
import VehicleMercosulPlateValidation from "./vehicleMercosulPlateValidation";
import VehicleOldPlateValidation from "./vehicleOldPlateValidation";

const OLD_PLATE_VALIDATOR = new VehicleOldPlateValidation();
const MERCOSUL_PLATE_VALIDATOR = new VehicleMercosulPlateValidation();

/**
 * Both old and mercosul plates
 */
export default class VehiclePlateValidation extends MultipleValidation {

    constructor() {
        super([
            OLD_PLATE_VALIDATOR,
            MERCOSUL_PLATE_VALIDATOR
        ])
    }

}