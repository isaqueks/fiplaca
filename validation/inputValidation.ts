
/**
 * The base class for Validations
 */
export default abstract class InputValidation {

    /**
     * Determines if an input string is masked or not
     * @param input The input string to analyze
     * @returns true or false depending if the input is masked.
     */
    public abstract isMasked(input: string): boolean;

    /**
     * Removes the mask from an input. It will not do any validation, 
     * so for avoiding bugs, use cleanMaskAndValidate instead or only use
     * this method if you are sure the input is valid
     * @param input The input string to clean the mask
     * @returns The cleaned input
     */
    public abstract cleanMaskUnsafe(input: string): string;

    /**
     * Adds the mask to an input. It will not do any validation, 
     * so for avoiding bugs, use insertMaskAndValidate instead or only use
     * this method if you are sure the input is valid
     * @param input The input string to clean the mask
     * @returns The cleaned input
     */
    public abstract insertMaskUnsafe(input: string): string;


    /**
     * Removed the mask from an input. If the input isn't valid,
     * an error will be thrown
     * @param input The input string to clean
     * @returns The cleaned input
     */
    public cleanMaskAndValidate(input: string): string {
        const clean = this.cleanMaskUnsafe(input);
        if (!this.validateUnmasked(clean)) {
            throw new Error(`Tried to remove mask from invalid input ("${input}").`);
        }
        return clean;
    }

    /**
     * Adds the mask to an input string. If the input isn't valid,
     * an error will be thrown
     * @param input The input string to mask
     * @returns The masked input
     */
    public insertMaskAndValidate(input: string): string {
        const masked = this.insertMaskUnsafe(input);
        if (!this.validateMasked(masked)) {
            throw new Error(`Tried mask an invalid input ("${input}").`);
        }
        return masked;
    }
 
    /**
     * Validates an unmasked input. If it is valid but masked, false will be returned
     * @param input The input string to validate
     */
    public abstract validateUnmasked(input: string): boolean;

    /**
     * Validates an masked input. If it is valid but unmasked, false will be returned
     * @param input The input string to validate
     */
    public abstract validateMasked(input: string): boolean;


    /**
     * Validates the input string, masked or unmasked.
     * @param input The input to validate
     * @returns True or false if the input is valid or not. Being masked/unmasked makes no difference.
     */
    public validate(input: string): boolean {
        return this.isMasked(input) ? this.validateMasked(input) : this.validateUnmasked(input);
    }

}