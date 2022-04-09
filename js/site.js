// get values from interface - form
function getValues(){
    // get values from the page
    let loanValue = getLoanValue();
    let mTermValue = getMTermValue();
    let rateValue = getRateValue();
   
    //create array to store month figure objects
    let arrayMonths = [];
    //check that all values are valid integers
    if(Number.isInteger(loanValue) && Number.isInteger(rateValue) && Number.isInteger(mTermValue)){
        for (let i = 0; i <= mTermValue; i++) {

             //create object to store monthly values in
            let monthFiguresObj ={};
            // calls function calculate monthly total payment and stores as tMonthlyPay in return object
            monthFiguresObj.tMonthlyPay = Math.round((calcMonthlyPay(loanValue,mTermValue,rateValue))*100)/100;

            //calculates the remaining balance
            if (i==0) {
                //if first month
                monthFiguresObj.remainBal=loanValue;          
            }
            else{
                //all following months
                monthFiguresObj.remainBal= Math.round((calcRemainingBal(loanValue,i,(arrayMonths[(i-1)].monthlyPri)))*100)/100;
            }
            //calls function to calculate the monthly interest payment stores value in return object
            monthFiguresObj.monthlyInt = Math.round((calcMonthlyInt(monthFiguresObj.remainBal,rateValue))*100)/100;

            //calls function to calculate monthly principal
            monthFiguresObj.monthlyPri = Math.round((calcMonthlyPri(monthFiguresObj.tMonthlyPay,monthFiguresObj.monthlyInt))*100)/100;

            monthFiguresObj.intPaidToDate = Math.round((monthFiguresObj.monthlyInt*i)*100)/100;
           
            //pushes object to array
            arrayMonths.push(monthFiguresObj);
            
        }
    } else{
        alert("You Must Use Integers Only");
    }
    
    displayResults(arrayMonths);
       
}
//retrieve loan amount from form
function getLoanValue(){
    let loanValue = document.getElementById("loanValue").value;
    loanValue = parseInt(loanValue);
    return loanValue;
}
//retrieve loan term from form
function getMTermValue(){
    let termValue = document.getElementById("termValue").value;
    termValue = parseInt(termValue);
    let mTermValue = (termValue*12);
    return mTermValue;

}
//retrieve interest rate value from form
function getRateValue(){
    let rateValue = document.getElementById("rateValue").value;
    rateValue = parseInt(rateValue);
    return rateValue;
}
//get monthly payment
function calcMonthlyPay(loan, term, rate){
     let monthlyPay = (loan)*(rate/1200)/(1-Math.pow((1+rate/1200),(-term)));
     return monthlyPay;
}

//get monthly principal
function calcMonthlyPri(tMonthlyPay,intPay){
    let monthlyPri = tMonthlyPay-intPay;
    return monthlyPri
}
//get monthly interest payment
 function calcMonthlyInt(remainingBal,rate){
     let monthlyInt = remainingBal*(rate/1200)
     return monthlyInt;
 }

//get remaining balance
function calcRemainingBal(loan,month,monthlyPrin){
let remaingBal = loan - (month*monthlyPrin);
return remaingBal;
}



// display or view functions
function displayResults(arrayMonths){
   
    let templateRows = "`<tr><th>Month</th><th>Total Monthly Payment</th><th>Principal Payment</th><th>Interest Payment</th><th>Interest Paid to Date</th><th>Remaining Loan Balance</th></tr>`";
    
    document.getElementById("results").innerHTML = templateRows
    for (let i = 1; i <= arrayMonths.length; i++) {
        
        
        templateRows +=`<tr><td>${i}</td><td>$${arrayMonths[i].tMonthlyPay}</td><td>$${arrayMonths[i].monthlyPri}</td><td>$${arrayMonths[i].monthlyInt}</td><td>$${arrayMonths[i].intPaidToDate}</td><td>$${arrayMonths[i].remainBal}</td></tr>`;
        document.getElementById("results").innerHTML = templateRows;

    }



}