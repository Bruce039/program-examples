export function tokenAmountToBaseUnits(amount: string, decimals: number): bigint {
    const normalized = amount.trim();
    if (!/^\d+(?:\.\d+)?$/.test(normalized)) {
        throw new Error('Token amount must be a positive decimal number');
    }

    const [whole, fraction = ''] = normalized.split('.');
    const significantFraction = fraction.replace(/0+$/, '');
    if (significantFraction.length > decimals) {
        throw new Error(`Token supports at most ${decimals} decimal places`);
    }

    const scale = 10n ** BigInt(decimals);
    const fractionBaseUnits = significantFraction ? BigInt(significantFraction.padEnd(decimals, '0')) : 0n;
    const baseUnits = BigInt(whole) * scale + fractionBaseUnits;
    if (baseUnits <= 0n) {
        throw new Error('Token amount must be greater than zero');
    }

    return baseUnits;
}
