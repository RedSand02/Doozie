export const isMobileNumberValid = (value: string): boolean => {
    if(value != null && value.match(/\d/g) != null)
    {
        return value.match(/\d/g).length === 10;
    }

    return false;
}