class InvalidRequestError extends Error {
    constructor(msg){
        super(msg);
        this.name = "InvalidRequest"
        this.msg = msg;
    }

    getMessage(){
        return this.msg;
    }

    getType(){
        return this.name;
    }
}

module.exports = InvalidRequestError;