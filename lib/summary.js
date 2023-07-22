import { convert_preferred_amount } from "./convert";

export function calculate_summary(summary, bank_transactions, preferredCurrency, syncBank) {
    if (!syncBank) {
        return summary;
    }
    let moneyIn = parseFloat(summary.moneyIn);
    let moneyOut = parseFloat(summary.moneyOut);
    const n = bank_transactions ? bank_transactions.length : 0;
    for(let i = 0; i < n; i++) {
        const convertedAmount = convert_preferred_amount(true, preferredCurrency, bank_transactions[i].currency, bank_transactions[i].amount);
        if (bank_transactions[i].type == "Money-out") {
            moneyOut += parseFloat(convertedAmount);
        } else {
            moneyIn += parseFloat(convertedAmount);
        }
    }
    const today = new Date();
    const budgetLeft = summary.budgetLeft - moneyOut;
    const daily = budgetLeft / (32 - today.getDate());
    const updatedSummary = {
        budgetLeft:budgetLeft.toFixed(2),
        daily:daily.toFixed(2),
        // moneyIn:moneyIn.toFixed(2),
        moneyIn:moneyIn,
        // moneyOut:moneyOut.toFixed(2),
        moneyOut:moneyOut,
        currency:preferredCurrency,
    }
    return updatedSummary;
}