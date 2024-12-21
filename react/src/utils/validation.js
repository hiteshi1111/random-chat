export function checkEmptyFields(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null)) {
            return true;
        }
    }
    return false;
}

export function validateMobile(mobile){
    const validRegex = /^[6-9]\d{9}$/;
    if (mobile.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export function validateUsername(username){
    const validRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (username.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export function validatePassword(password){
    const validRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/;
    if (password.length < 8) {
        return false;
    } else if (password.match(validRegex)){
        return true;
    }else{
        return false;
    }
}