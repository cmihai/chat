export class Message {

    constructor(obj) {
        this.userName = obj.userName;
        this.userId = obj.userId;
        this.timestamp = obj.timestamp;
        this.text = obj.text;
    }

    get key() {
        return `${this.timestamp}@${this.userId}`;
    }

    get dateString() {
        let date = new Date(this.timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
}