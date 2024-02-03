export const txtSlicer = (txt: string, maxLength: number = 50) => {
    if (txt.length > maxLength) return txt.slice(0, maxLength).concat("...")
    return txt
}