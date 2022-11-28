import db from "../conn.js"

export const credit = async (req , res) => {
    try {
        let creditDetails;
        // console.log(req.body);
        const sql = `Select * from acc where account_no="${req.body.Account_Number}"`;
        db.query(sql, (error , result) => {
            if(error)
                return res.status(422).json(error);
            creditDetails = {account_no: result[0].account_no, branch_name: result[0].branch_name, balance: result[0].balance};
            console.log(creditDetails);
            
            const balance = Number (creditDetails.balance) + Number (req.body.Amount);
            // console.log(balance);
            const q1 = `Update acc set balance=${balance} where account_no="${req.body.Account_Number}"`
            db.query(q1, (error , result1) => {
                if(error) {
                    console.log("error");
                    return res.status(422).json(error);
                }
                // console.log("asd");
                console.log(result1);
                return res.status(200).json({message: `Successfully credited ₹${req.body.Amount} to your account`});
            })
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const withdraw = async (req , res) => {
    try {
        let withdrawDetails;
        console.log(req.body);
        const sql = `Select * from acc where account_no="${req.body.Account_Number}"`;
        db.query(sql, (error, result) => {
            if (error) return res.status(422).json(error);
            // console.log(result);
            withdrawDetails = {
                account_no: result[0].account_no,
                branch_name: result[0].branch_name,
                balance: result[0].balance,
            };
            console.log(withdrawDetails);
            
            // Task3, Ques6, Part1
            if(Number (req.body.Amount) > Number (withdrawDetails.balance))
                return res.status(200).json({message: "Hey! The recent transaction has exceeded his overdraft amount"})

            const balance = Number(withdrawDetails.balance) - Number(req.body.Amount);
            const q1 = `Update acc set balance=${balance} where account_no="${req.body.Account_Number}"`;
            db.query(q1, (error, result1) => {
                if (error) {
                    console.log("error");
                    return res.status(422).json({message: error});
                }
                console.log(result1);
                return res.status(200).json({ message: `Successfully debited ₹${req.body.Amount} from your account`});
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const transfer = async (req , res) => {
    try {
        console.log(req.body);
        let details1;
        let details2;
        const sql = `Select * from acc where account_no="${req.body.From}";Select * from acc where account_no="${req.body.To}"`;
        db.query(sql,[2,1], (error , result,fields) => {
            
            if(error)
                return res.status(422).json({message: error});
            
            console.log(result[0][0])
            console.log(result[1][0])
            
            details1 = {
              account_no: result[0][0].account_no,
              branch_name: result[0][0].branch_name,
              balance: result[0][0].balance,
            };
            details2 = {
              account_no: result[1][0].account_no,
              branch_name: result[1][0].branch_name,
              balance: result[1][0].balance,
            };
            console.log(details1);
            console.log(details2);
            
            const b1 = details1.balance - Number (req.body.amount);
            const b2 = details2.balance + Number (req.body.amount);
            
            const q1 = `Update acc set balance=${b1} where account_no="${details1.account_no}";Update acc set balance=${b2} where account_no="${details2.account_no}"`;
            db.query(q1, [2 , 1] , (error, result1, fields) => {
                if (error) 
                    return res.status(422).json({ message: error });
                
                console.log(result1);
                return res.status(200).json({message: `Successfully transfered ₹${req.body.amount} from ${req.body.From} to ${req.body.To}`})
            })
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const loan = async (req , res) => {
    try {
        let loanDetails;
        console.log(req.body);
        const sql = `Select * from loan where account_no="${req.body.Account_Number}"`;
        db.query(sql, (error, result) => {
            if (error) return res.status(422).json(error);
            console.log(result);
            if(result.length > 0)
                return res.status(200).json({message: "loan already taken!"})

            loanDetails = {
                account_no: req.body.Account_Number,
                branch_name: req.body.Branch_Name,
                balance: req.body.Amount,
            };
            console.log(loanDetails);

            const balance = Number(loanDetails.balance) + Number(req.body.Amount);
            const q1 = `Update acc set balance=${balance} where account_no="${req.body.Account_Number}";Insert into loan (amount, branch_name, account_no) values (${loanDetails.balance}, "${loanDetails.branch_name}", ${loanDetails.account_no})`;
            db.query(q1, [2,1], (error, result1,fields) => {
                if (error) {
                    console.log("error");
                    return res.status(422).json(error);
                }
                console.log(result1);
                return res.status(200).json({message: `Successfully Loaned ₹${req.body.Amount} to your account`});
            });
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}