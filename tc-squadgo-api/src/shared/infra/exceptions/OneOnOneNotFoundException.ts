export default class OneOnOneNotFoundException extends Error {
    constructor() {
        super('One-on-one not found')
        this.name = 'OneOnOneNotFoundException'
    }
} 