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