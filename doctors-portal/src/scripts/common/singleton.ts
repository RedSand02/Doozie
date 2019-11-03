export interface INewable<T, TU> {
    new(args: TU): T;
    getKey?: () => string;
    initialize?: (instanceId?: string) => void;
}

/**
 * @brief Implements Single design pattern
 */
export abstract class Singleton {

    public constructor() {
        if (!Singleton.allowPrivateInstantiation) {
            throw new Error("Error: Instantiating an object of Singleton class is not allowed. Please use the instance method");
        }
    }

    protected static getInstance<T extends Singleton>(className: INewable<T, {}>): T {
        if (!this.instanceObject) {
            Singleton.allowPrivateInstantiation = true;
            // ReSharper disable once InconsistentNaming
            this.instanceObject = new className({});
            Singleton.allowPrivateInstantiation = false;
        }
        return <T>this.instanceObject;
    }

    private static allowPrivateInstantiation: boolean = false;
    private static instanceObject: Singleton;
}