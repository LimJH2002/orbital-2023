const SGDMYR = 3.4372;
const MYRSGD = 0.2906;
const USDMYR = 4.5425;
const MYRUSD = 0.2201;
const USDSGD = 1.3216;
const SGDUSD = 0.7567;

export function sgd_myr(value) {
    return (value * SGDMYR).toFixed(2);
}

export function myr_sgd(value) {
    return (value * MYRSGD).toFixed(2);
}

export function usd_myr(value) {
    return (value * USDMYR).toFixed(2);
}

export function myr_usd(value) {
    return (value * MYRUSD).toFixed(2);
}

export function usd_sgd(value) {
    return (value * USDSGD).toFixed(2);
}

export function sgd_usd(value) {
    return (value * SGDUSD).toFixed(2);
}

export function convert_preferred(isPreferred, preferredCurrency, currency, amount) {
    if (currency == undefined) {
        currency = "SGD"
        // return "SGD " + amount;
    }
    if (isPreferred) {
        if (currency == preferredCurrency) {
            return currency + " " + amount;
        } else {
            if (preferredCurrency == "SGD") {
                if (currency == "USD") {
                    return "SGD " + usd_sgd(amount);
                } else if (currency == "MYR") {
                    return "SGD " + myr_sgd(amount);
                }
            } else if (preferredCurrency == "MYR") {
                if (currency == "USD") {
                    return "MYR " + usd_myr(amount);
                } else if (currency == "SGD") {
                    return "MYR " + sgd_myr(amount);
                }
            } else if (preferredCurrency == "USD") {
                if (currency == "SGD") {
                    return "USD " + sgd_usd(amount);
                } else if (currency == "MYR") {
                    return "USD " + myr_usd(amount);
                }
            }
        }
    }
    if (preferredCurrency == undefined) {
        return "SGD " + amount;
    }
    
    return currency + " " +  amount;
}

export function convert_preferred_amount(isPreferred, preferredCurrency, currency, amount) {
    if (currency == undefined) {
        currency = "SGD"
        // return "SGD " + amount;
    }
    if (isPreferred) {
        if (currency == preferredCurrency) {
            return amount;
        } else {
            if (preferredCurrency == "SGD") {
                if (currency == "USD") {
                    return usd_sgd(amount);
                } else if (currency == "MYR") {
                    return myr_sgd(amount);
                }
            } else if (preferredCurrency == "MYR") {
                if (currency == "USD") {
                    return usd_myr(amount);
                } else if (currency == "SGD") {
                    return sgd_myr(amount);
                }
            } else if (preferredCurrency == "USD") {
                if (currency == "SGD") {
                    return sgd_usd(amount);
                } else if (currency == "MYR") {
                    return myr_usd(amount);
                }
            }
        }
    }
    return amount;
}