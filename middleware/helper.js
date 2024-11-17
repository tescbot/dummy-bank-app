import { User } from "../models/user.js";
import { Account } from "../models/account.js";
import { Transaction } from "../models/transaction.js";

export async function getPayedBefore(user){
    let userId = user._id;
    let accounts = await Account.find({userId: userId});
    let transactions = await Transaction.find({ $or: accounts.map(acc => ({ senderAccountId: acc._id })) });

    let payedBeforeStringified = []
    for (const transaction of transactions){
        let account = await Account.findById(transaction.recipientAccountId)
        let user = await User.findById(account.userId);
        payedBeforeStringified.push(JSON.stringify({
            name: user.fullName,
            accountNumber: transaction.recipientAccountId,
            sortCode: account.sortCode
        }));
    }

    let payedBeforeStringifiedSet = new Set(payedBeforeStringified);

    let payedBeforeReturn = [];
    for(let item of payedBeforeStringifiedSet){
        payedBeforeReturn.push(JSON.parse(item));
    }
    return payedBeforeReturn;
}