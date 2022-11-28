#! /usr/bin/env node

import inquirer from "inquirer";
import {credit , withdraw , transfer , loan} from "../api.js"

const questions = [
  {
    type: "list",
    name: "name",
    message: "What's your type?",
    choices:[
        {
            // 1 account number and amount
            name: "Credit",
            value: "credit"
        },
        {
            // 1 account number and amount
            name: "Withdraw",
            value: "withdraw"
        },
        {
            // 2 account number and amount
            name: "Transfer", 
            value: "transfer"
        },
        {
            // account no, branch and amount
            name: "Loan",
            value: "loan",
        }
    ]},
];

inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    if(answers.name === "credit") {
        const creditQuestions = [
            {
                type: "input",
                name: "Account_Number",
                message: "Enter Account Number"
            },
            {
              type: "input",
              name: "Amount",
              message: "Enter the amount"
            }
        ]
        
        inquirer.prompt(creditQuestions).then((creditAnswers) => {
            // console.log(creditAnswers, "from bin");
            const getData = credit(creditAnswers).then(res => {
                console.log(res);
            });
        }).catch(err => {
            console.log(err);
        })
    } else if(answers.name === "withdraw") {
        const withdrawQuestions = [
            {
                type: "input",
                name: "Account_Number",
                message: "Enter Account Number"
            },
            {
              type: "input",
              name: "Amount",
              message: "Enter the amount"
            }
        ]
        
        inquirer.prompt(withdrawQuestions).then((withdrawAnswers) => {
            // console.log(withdrawAnswers, "from bin");
            const getData = withdraw(withdrawAnswers).then((res) => {
              console.log(res);
            });
        }).catch(err =>
            console.log(err) 
        )
        
    } else if(answers.name === "transfer") {
        const transferQuestions = [
            {
              type: "input",
              name:"From",
              message:"From account number",
            },
            {
              type: "input",
              name:"To",
              message:"To account number",
            },
            {
              type: "input",
              name:"amount",
              message:"Enter the amount",
            }
        ]

        inquirer.prompt(transferQuestions).then((transferAnswers) => {
            // console.log(transferAnswers, "from bin");
            const getData = transfer(transferAnswers).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        })
    } else {
        const loanQuestions = [
            {
                type: "input",
                name: "Account_Number",
                message: "Enter Account Number"
            },
            {
              type: "input",
              name: "Amount",
              message: "Enter the Amount of loan"
            },
            {
                type: "branch_name",
                name: "Branch_Name",
                message: "Enter Branch Name"
            }
        ]
        
        inquirer.prompt(loanQuestions).then((loanAnswers) => {
            // console.log(loanAnswers, "from bin");
            const getData = loan(loanAnswers).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        })
    }
});
