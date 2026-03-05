// import jwt from "jsonwebtoken";
// const secretKey="ysdfghsgdfhgasjdbfhasdjfhljshdjajsdnnjdfjvsscbsbna,msdkjhkksskdJBfhaljsdfhbdfhjgfhgsajdgfjsagf"

// class JwtProvider{

//     constructor(secretKey){
//         this.secretKey=secretKey;
//     }
//     createJwt(payload){
//         return jwt.sign(payload,this.secretKey, {expiresIn: "24hr"})
//     }

//     getEmailFromjwt(token){
//         try {
//             const decodedToken=jwt.verify(token, this.secretKey);
//             return decodedToken.email;
//         } catch (error) {
//             throw new Error("Invalid token")
//         }
//     }

//     verifyJwt(token){
//         try {
//             jwt.verify(token, this.secretKey);
//             return true;
//         } catch (error) {
//             throw new Error("Invalid token");
//         }
//     }


// }

// export default new JwtProvider(secretKey)


import jwt from "jsonwebtoken";

const secretKey = "ysdfghsgdfhgasjdbfhasdjfhljshdjajsdnnjdfjvsscbsbna,msdkjhkksskdJBfhaljsdfhbdfhjgfhgsajdgfjsagf";

export const createJwt = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

export const getEmailFromJwt = (token) => {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken.email;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

export const verifyJwt = (token) => {
    try {
        jwt.verify(token, secretKey);
        return true;
    } catch (error) {
        throw new Error("Invalid token");
    }
};