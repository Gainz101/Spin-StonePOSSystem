// Generate random order Id
export function randomId() { // min and max included 
    return Math.floor(Math.random() * 99999999 + 50000000)
}
