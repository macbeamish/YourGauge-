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
                monthFiguresObj.monthlyInt=Math.round((calcMonthlyInt(loanValue,rateValue))*100)/100;     
            }
            else{
                 //calls function to calculate the monthly interest payment stores value in return object
                monthFiguresObj.monthlyInt = Math.round((calcMonthlyInt(arrayMonths[i-1].remainBal,rateValue))*100)/100;
            }
           
            //calls function to calculate monthly principal
            monthFiguresObj.monthlyPri = Math.round((calcMonthlyPri(monthFiguresObj.tMonthlyPay,monthFiguresObj.monthlyInt))*100)/100;

            //stores the index as the month, may not be neccessary but adding for redundancy
            monthFiguresObj.month=i;
            
            let runningIntTotal = 0;
            //calculates interest paid to date
            for (let i = 0; i < arrayMonths.length; i++) {
               
                 runningIntTotal += arrayMonths[i].monthlyInt;
            }
          
            monthFiguresObj.intPaidToDate = Math.round((runningIntTotal)*100)/100;

            let runningPriTotal = 0;

            //calculates interest paid to date
            for (let i = 0; i < arrayMonths.length; i++) {
            
                runningPriTotal += arrayMonths[i].monthlyPri;
            }
            
            monthFiguresObj.priPaidToDate = Math.round((runningPriTotal)*100)/100;

             //all following months
             monthFiguresObj.remainBal= Math.round((calcRemainingBal(loanValue,monthFiguresObj.priPaidToDate))*100)/100;


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
function calcRemainingBal(loan,priPaidToDate){
 let remainBal = loan - priPaidToDate;
if(remainBal>0)
return remainBal;
else{
    remainBal=0
    return remainBal;
}
}
//calculates interest paid to date
function calcIntPaid(arrayMonths){
let intPaid = 0;
for (let i = 0; i < array.length; index++) {
    const element = array[index];
    
}
}

//calculates interest paid to date
function calcPriPaid(arrayMonths){
let PriPaid =  0;  

}

// display or view functions
function displayResults(arrayMonths){
   
    let templateRows = "`<tr><th>Month</th><th>Total Monthly Payment</th><th>Principal Payment</th><th>Interest Payment</th><th>Interest Paid to Date</th><th>Remaining Loan Balance</th></tr>`";
    
    document.getElementById("results").innerHTML = templateRows
    for (let i = 0; i <= arrayMonths.length; i++) {
        
        
        templateRows +=`<tr><td>${arrayMonths[i].month}</td><td>$${arrayMonths[i].tMonthlyPay}</td><td>$${arrayMonths[i].monthlyPri}</td><td>$${arrayMonths[i].monthlyInt}</td><td>$${arrayMonths[i].intPaidToDate}</td><td>$${arrayMonths[i].remainBal}</td></tr>`;
        document.getElementById("results").innerHTML = templateRows;

    }



}