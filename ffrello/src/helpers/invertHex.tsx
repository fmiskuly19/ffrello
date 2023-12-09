export const invertHex = (hex: string) => {

    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }

    return '#' + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}