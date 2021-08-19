class ResponseDto {
    constructor() {
        this.data = '';
        this.error = '';
    }

    setData(data) {
        this.data = data;
    }

    setError(error) {
        this.error = error;
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