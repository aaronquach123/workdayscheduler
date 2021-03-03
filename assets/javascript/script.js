var currentDay = moment().format("MMM Do YY")
$("#currentDay").text(currentDay);
var currentHour = new Date().getHours();
var workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var displayTimes = ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var localArry = [];
var tempObj = {};


//On load run function
window.onload = function() {
    //Assign local array to print existing tasks
    localArry = JSON.parse(localStorage.getItem("savedinput"));
    
    //Loop through length of hours array and assign divs with ids to all of them
    for (var i = 0; i < workingHours.length; i++) {    
        //Write Div to contain time and other divs
        var containerDiv = $("<div>")
            .addClass("container-div row ")
            .attr("container-id", [i])
            .html("<div class='time-holder col-sm p-0 m-0'> <h2 class='hour-container-title'>" + displayTimes[i] + "</h2> </div>");
        //Write div for form
        var containerFormDiv = $("<div>")
            .addClass("form-div col-11")
            .attr("FormDiv", workingHours[i]);
        //Write text area div for input 
        var containerFormTextAreaDiv = $("<div>")
            .addClass("form-textarea-div col-11")
            .attr("id", workingHours[i]);
        var containerFormTextArea = $("<textarea>")
            .addClass("form-text")
            .attr("placeholder", "Text Here")
            .attr("id", [i]);
        //Append text area into form
        containerFormTextAreaDiv.append(containerFormTextArea);
        containerFormDiv.append(containerFormTextAreaDiv);
        //write div for button
        var containerFormButtonDiv = $("<div>")
            .addClass("button-div col-1")
            .attr("button-div", [i])
        //create button for div
        var containerFormButton = $("<button>")
            .addClass("saveBtn h-100 w-100")
            .attr("button", [i])
            .text("Click to Save!");
        //Append into containerDiv
        containerFormButtonDiv.append(containerFormButton);
        containerFormDiv.append(containerFormButtonDiv);
        containerDiv.append(containerFormDiv);
        //Append into container class
        $(".container").append(containerDiv);
    };
    
    //Runs color coder once first then check for time every 30 minutes
    formcolorcoder();
    var timeInterval = setInterval(function(){
        formcolorcoder();
    }, 1800000);
    
    // Asks for first input on first startup if not first startup retun localstorage and upload
    if (localArry === null) {
        alert("Input your first schedule")
    } else {
        inputLocalStorageUploader();
    }
    
    //Check for click of button
    $(".button-div").on("click", "button", function(){
        //Return parent of parent of button 
        var formParent = $(this).parent().parent();
        
        //assign value and id of text area
        var formTextArea = formParent.find("textarea").val();
        var formTextId = formParent.find("textarea").attr("id")
        //If theres nothing in it dont run function
        if (!formTextArea) {
            return;
        }
        //Assign a temporary array to edit into the localstorage later
        var tempArry = {
        input: formTextArea,
        id: formTextId,
        };
        //If localArry is empty assign it as an array and push temp array into it then set localstorage as it
        if (!localArry) {
            localArry = [];
            localArry.push(tempArry);
            localStorage.setItem("savedinput", JSON.stringify(localArry));
        } else {
            //If localArry has data push tempArry into it and set localstorage again
            localArry.push(tempArry);
            localStorage.setItem("savedinput", JSON.stringify(localArry));
        };
        //Alert user that changes were saved
         alert("Changes have been saved!")
    });
};

// Function that handles uploading of exiting inputs onto the schedule
var inputLocalStorageUploader = function () {
    for (var i = 0; i < localArry.length; i++) { 
        var localArryId = localArry[i].id;
        var localArryInput = localArry[i].input;
        var textareaEditorEl = document.getElementById(localArryId);
        textareaEditorEl.innerHTML = localArryInput;
    };
};


//Function that handles color coding of the divs based on comparison of time
var formcolorcoder = function() {
    for (var i = 0; i < workingHours.length; i++) {
        var currentFormContainer = document.getElementById(workingHours[i])
        if (currentHour < workingHours[i]) {
            currentFormContainer.classList.add("future");
            currentFormContainer.classList.remove("past");
            currentFormContainer.classList.remove("present");
        }   else if (currentHour > workingHours[i]) {
            currentFormContainer.classList.add("past");
            currentFormContainer.classList.remove("future");
            currentFormContainer.classList.remove("present");
        } else if (currentHour === workingHours[i]) {
            currentFormContainer.classList.add("present");
            currentFormContainer.classList.remove("future");
            currentFormContainer.classList.remove("past");
        };
    };
}
