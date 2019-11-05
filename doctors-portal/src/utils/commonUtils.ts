export const isMobileNumberValid = (value: string): boolean => {
    if(value != null && value.match(/\d/g) != null)
    {
        return value.match(/\d/g).length === 10;
    }

    return false;
}

export const isOtpValid = (otp: string): boolean => {
    if(otp != null && otp.match(/\d/g) != null)
    {
        return otp.match(/\d/g).length === 4;
    }

    return false;
}