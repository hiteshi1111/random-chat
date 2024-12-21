const Account = require("../schemas/account.schema");
const { passwordEncryption, passwordDecryption } = require("./password.service");
const RoomService = require("./room.service");
const MessageService = require("./message.service");

let service = {};

service.createAccount = createAccount;
service.loginAccount = loginAccount;

// CREATES ACCOUNT
async function createAccount(body) {
    try {
        const usernameExists = await Account.exists({username: body.username});
        if (usernameExists){
            return Promise.reject({
                statusCode: 409,
                message: "Username already exists!"
            })
        }
        const mobileExists = await Account.exists({mobile: body.mobile});
        if (mobileExists){
            return Promise.reject({
                statusCode: 409,
                message: "Mobile already exists!"
            }) 
        }
        body.password = passwordEncryption(body.password);
        body.isActive = true;
        const newUser = await Account.create(body)
        const roomId = await RoomService.checkAndAssignRoom(newUser._id);
        await MessageService.createActivity(newUser._id, roomId);
        return true;
    } catch (error) {
        console.log("create error >", error);
        return Promise.reject({
            statusCode: 500,
            message: "Account creation failed!"
        })
    }
}

// LOGIN ACCOUNT
async function loginAccount(body) {
    try{
        const account = await Account.findOne({username: body.username, isActive: true});
        if (!account){
            return Promise.reject({
                statusCode: 404,
                message: "Account doesn't exists!"
            })
        }
        const existingPassword = passwordDecryption(account.password)
        if (body.password === existingPassword){
            return account._id;
        }else{
            return Promise.reject({
                statusCode: 401,
                message: "Incorrect password!"
            })
        }
    }catch(error){
        console.log("login error >", error);
        return Promise.reject({
            statusCode: 500,
            message: "Login Failed!"
        })
    }
}

module.exports = service