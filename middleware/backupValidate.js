import { User } from "../models/user.js";

// in case they disable js stops website crashing
export async function validate(errors, field, fieldVal, userID) {
    let checkDupe;
    console.log(fieldVal);
    if (field === "email") { 
        checkDupe = await User.find({email: fieldVal}); }
    if (field === "phoneNumber") { 
        checkDupe = await User.find({phoneNumber: fieldVal}); }
    console.log("NOO");
    console.log(checkDupe);
    if (checkDupe.length !== 0) {
        console.log("dupe id ", checkDupe[0]._id);
        console.log(userID);
        if (!checkDupe[0]._id.equals(userID)) {
            console.log("errrrrrrrrrrr");
             errors[field] = `The ${field} you changed was taken`;
             return errors;
        }
    } 
    return errors;
}