class ResponseDto {
    constructor() {
        this.data = '';
        this.error = '';
        this.status = 200;
    }

    setData(data) {
        this.data = data;
    }

    setError(error) {
        this.error = error;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getResponse() {
        return {
            data: this.data,
            error: this.error
        }
    }
}

export function getResponseDto(){
    return new ResponseDto();
}