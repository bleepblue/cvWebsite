const code = '$2#include <stdio.h>$£$2#include <string.h>$£$2#include "cvReader.h"$£$2int main()$£$2{$£~$2FILE *cv = fopen("cv.txt", "r");$£~$2while(1)$£~$2{$£~~$2char* input;$£~~$2scanf("%s", input);$££~~$1// click the function calls below$£~~$2if(!strcmp(input, "title")){$£~~~$5title(cv);$££~~$2} else$$3$$4"statement"$$5personalStatement(cv);$$3$$4"education"$$5education(cv);$$3$$4"work"$$5work(cv);$$3$$4"contact"$$5contact(cv);$$3$$4"download"$$5download(cv);$$6£~~$2}$£~$2}$£~$2return 0;$£$2}$£ ¬ ';
const compile = ["gcc cv.c -o cv && ./cv","title"];
let addSpan = false;
let spanId = null;
let codeDiv = document.getElementById("code");
let codeText = code.split("");
let currentCharacter = 0;
let currentOutput = null;
let lastPrint = 0;
let lastCharacter = 0;
let sectionHeight;
let animationID;
let firstTime = true;
let userInputString = "";
let linkIteration = 0;
let fizzNum = 1;
let cursorInternal = false;
// add document.getElementbyID for all elements i use multiple times

// mobile screens have spaces instead of tabs

// +- 2 px
// stop cursor blinking


window.addEventListener('animationend', outputCode, {once:true});

const linkData = [

    {
        function: "titleLink",
        text: "<span class='link' id='titleLink'></span>"
    },

    {
        parameter: "statementParam",
        function: "statementLink",
        text: ' <span class="codeText">if(!strcmp(input, <span id="statementParam"></span>)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="link" id="statementLink"></span>'
    },
    {
        parameter: "educationParam",
        function: "educationLink",
        text: '<span class="codeText"><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else if(!strcmp(input, <span id="educationParam"></span>)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="link" id="educationLink"></span>'
    },
    {
        parameter: "workParam",
        function: "workLink",
        text: '<span class="codeText"><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else if(!strcmp(input, <span id="workParam"></span>)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="link" id="workLink"></span>'

    },
    {
        parameter: "contactParam",
        function: "contactLink",
        text: '<span class="codeText"><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else if(!strcmp(input, <span id="contactParam"></span>)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="link" id="contactLink"></span>'
    },
    {
        parameter: "downloadParam",
        function: "downloadLink",
        text: '<span class="codeText"><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else if(!strcmp(input, <span id="downloadParam"></span>)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><a class="link" id="downloadLink" href="lawrence_charlesworth_cv.docx" download></a>'

    },
]

function outputCode (time)
{
    if(!lastCharacter) 
        {
            lastCharacter = time;
        }
    if(time - lastCharacter < 30) 
        {
            animationID = window.requestAnimationFrame(outputCode);
            return
        }
    lastCharacter = time; 
    if(currentCharacter === codeText.length)
        {
            if(codeText.length === 4)
                {
                    window.cancelAnimationFrame(animationID);
                    codeDiv.remove();
                    document.getElementById("cursor").remove();
                    document.getElementById("prompt").remove();
                    let div = document.createElement("div");
                    div.id = "inputContainer";
                    let spanCursor = document.createElement("span");
                    spanCursor.id = "cursor";
                    spanCursor.style.animation = "blink 0s step-end 1";
                    let spanUserEntry = document.createElement("span");
                    spanUserEntry.id = "userEntry";
                    let spanEntryContainer = document.createElement("span");
                    let spanPrompt = document.createElement("span");
                    spanPrompt.textContent = "> ";
                    spanEntryContainer.append(spanPrompt, spanUserEntry);
                    div.append(spanEntryContainer, spanCursor);
                    document.getElementById("background").append(div);
                    selectCvSection("title");
                    return
                }
            if(codeText.length === 5)
                {
                    lastCharacter += 800;
                    codeText.pop();
                    currentCharacter -= 1;
                    animationID = window.requestAnimationFrame(outputCode);
                    return
                }
            if(codeText.length === 22)
                {
                    lastCharacter += 300;
                    codeText.pop();
                    currentCharacter -= 1;
                    animationID = window.requestAnimationFrame(outputCode);
                    return
                }
            if(codeText.length === 21)
                {
                    if(codeDiv.innerHTML === "")
                        {
                            currentCharacter = 0;
                            codeText = compile[1].split("");
                            lastCharacter += 300;
                            animationID = window.requestAnimationFrame(outputCode);
                            return
                        }
                    else
                        {
                            codeDiv.innerHTML = "";
                            lastCharacter += 300;
                            animationID = window.requestAnimationFrame(outputCode);
                            return
                        }
                }
            else
                {
                    lastCharacter += 1000;
                    currentCharacter = 0;
                    const span = document.createElement("span");
                    span.id = "compile";
                    codeDiv.appendChild(span);
                    codeText = compile[0].split("");
                    codeDiv = document.getElementById("compile");
                    spanId = "compile";
                    addSpan = true;
                    animationID = window.requestAnimationFrame(outputCode);
                    return
                }
        } 
    animationID = window.requestAnimationFrame(outputCode);
    if(addSpan)
        {
            if (codeText[currentCharacter] === "$")
                {
                    cursorInternal = false;
                    addSpan = false;
                    currentCharacter++;
                }
            else
                {
                    if(cursorInternal)
                        {
                            document.getElementById("cursor").insertAdjacentHTML('beforebegin', codeText[currentCharacter]);
                        }
                    else
                        {
                            document.getElementById(spanId).insertAdjacentHTML('beforeend',codeText[currentCharacter]);
                        }
                    currentCharacter++;
                }
        }
    else if(codeText[currentCharacter] === "$")
        {
            addSpan = true;
            currentCharacter++;
            if(codeText[currentCharacter] == 1)
                {
                    codeDiv.insertAdjacentHTML('beforeend', "<span id='comment'></span>");
                    spanId = "comment";
                    currentCharacter++;
                }
            else if(codeText[currentCharacter] == 2)
                {
                    codeDiv.insertAdjacentHTML('beforeend', `<span class='codeText' id='codeText${currentCharacter}'></span>`);
                    spanId = "codeText" + currentCharacter;
                    currentCharacter++;
                }
            else if(codeText[currentCharacter] == 3)
                {
                    document.getElementById("cursor").remove();
                    document.getElementById("code-container").insertAdjacentHTML('beforeend', '<span id="cursor"></span>');
                    codeDiv.insertAdjacentHTML('beforeend', linkData[linkIteration].text);
                    lastCharacter += 120;
                    currentCharacter++;
                    
                }
            else if(codeText[currentCharacter] == 4)
                {
                    cursorInternal = true;
                    document.getElementById("cursor").remove();
                    document.getElementById(linkData[linkIteration].parameter).innerHTML = '<span id="cursor"></span>';
                    currentCharacter++;
                }
            else if(codeText[currentCharacter] == 5)
                {
                    if(linkIteration)
                        {
                            cursorInternal = true;
                            document.getElementById("cursor").remove();
                            document.getElementById(linkData[linkIteration].function).innerHTML = '<span id="cursor"></span>';        
                        }
                    else
                        {
                            codeDiv.insertAdjacentHTML('beforeend', linkData[linkIteration].text);
                        }
                    spanId = linkData[linkIteration].function;
                    currentCharacter++;
                    linkIteration++;
                }
            else if(codeText[currentCharacter] == 6)
                {
                    document.getElementById("cursor").remove();
                    document.getElementById("code-container").insertAdjacentHTML('beforeend', '<span id="cursor"></span>');
                    currentCharacter++;
                    addSpan = false;
                    linkIteration = -1;
                }
        }
    else if(codeText[currentCharacter] === "£")
        {
            currentCharacter++;
            let string = "<br>";
            while(codeText[currentCharacter] === "~" || codeText[currentCharacter] === "£")
                {
                    if (codeText[currentCharacter] === "~")
                        {
                            string += "&nbsp;&nbsp;&nbsp;&nbsp;";
                            currentCharacter++;
                        }
                    else if (codeText[currentCharacter] === "£")
                        {
                            string += "<br>";
                            currentCharacter++;
                        }
                   
                }
            if(codeText[currentCharacter] === "$")
                {
                    codeDiv.insertAdjacentHTML('beforeend', string);
                }
            else
                {
                    string += codeText[currentCharacter];
                    codeDiv.insertAdjacentHTML('beforeend', string);
                    currentCharacter++;
                }
            
        }
    else if(codeText[currentCharacter] === "¬")
        {
            codeDiv.insertAdjacentHTML('beforeend', "<span id='prompt'>></span>");
            currentCharacter++;
        }
    else
        {
            currentCharacter++;
        }

    if(document.getElementById("background").scrollHeight > document.getElementById("background").clientHeight)
        {
            document.getElementById("background").scrollTop = document.getElementById("background").scrollHeight - document.getElementById("background").clientHeight;
        }
    if(codeText[currentCharacter + 1] === "£")
        {
            lastCharacter += 10;
        }
    if(currentCharacter === 87 || currentCharacter === 143 || currentCharacter === 467 || currentCharacter === 482 || currentCharacter === 485 || currentCharacter === 486)
        {
            lastCharacter += 100;
            console.log(currentCharacter);
            console.log(codeText[currentCharacter]);
        }
    
}


function selectCvSection (cvSection)
{
    if(document.getElementById("fizzbuzz")) document.getElementById("fizzbuzz").remove();
    document.getElementById("output").style.height = "0";
    window.clearTimeout(animationID);
    document.getElementById("cursor").style.animation = "blink 0s step-end 1";
    if(currentOutput)
        {
            if(currentOutput === "main")
                {
                    document.querySelectorAll("#output > div").forEach(element => {
                        element.style.display = "none";
                        element.style.marginBottom = "";
                    });
                }
            else 
                {
                    currentOutput.style.display = "none";
                }
        }
    if(cvSection === "main")
        {
            currentOutput = "main";
            document.querySelectorAll("#output > div").forEach(element => {
                element.style.display = "block";
                element.style.marginBottom = "25px";
            });
        }
    else
        {
            currentOutput = document.getElementById(cvSection);
            currentOutput.style.display = "block";
        }
    sectionHeight = document.getElementById("output").scrollHeight;
    animationID = window.requestAnimationFrame(outputCv);
}

function outputCv (time)
{
    animationID = window.requestAnimationFrame(outputCv);
    if(time - lastPrint < 350)
        {
            return
        }
    if(firstTime)
        {
            if(time - lastPrint < 500)
                {
                    return
                }
        }
    lastPrint = time;
    if(document.getElementById("output").clientHeight >= sectionHeight - 2)
        {
            window.cancelAnimationFrame(animationID);
            document.getElementById("cursor").style.animation = "blink 1.2s step-end infinite";
            if(firstTime) 
                {
                    window.addEventListener('keydown', userInput);
                    firstTime = false;
                    setTimeout(tutorial, 800);
                }
            return
        }
    document.getElementById("output").style.height = parseFloat(document.getElementById("output").style.height) + 1.2 + "em";
    if(document.getElementById("background").scrollHeight > document.getElementById("background").clientHeight)
        {
            document.getElementById("background").scrollTop = document.getElementById("background").scrollHeight - document.getElementById("background").clientHeight;
        }

}

function userInput (event)
{
    if(event.key === "Enter")
        {
            const string = userInputString.toLowerCase().replaceAll(" ", "");
            userInputString = "";
            document.getElementById("userEntry").textContent = "";
            console.log(string);
            switch(string)
                {
                    case "main":
                    case "cv":
                        selectCvSection("main");
                        break;

                    case "title":
                    case "lawrencecharlesworth":
                    case "lawrencecharlesworthcv":
                        selectCvSection("title");
                        break;

                    case "personalstatement":
                    case "statement":
                        selectCvSection("statement");
                        break;
                    
                    case "qualifications":
                    case "school":
                    case "education":
                        selectCvSection("education");
                        break;
                    
                    case "workexperience":
                    case "workhistory":
                    case "work":
                        selectCvSection("work");
                        break;
                    
                    case "contact":
                    case "contactdetails":
                        selectCvSection("contact");
                        break;
                    
                    case "download":
                    case "downloadcv":
                        document.getElementById("downloadLink").click();
                        break;

                    case "tetris":
                        document.getElementById("tetris").click();
                        break;

                    case "clear":
                        if(document.getElementById("fizzbuzz")) document.getElementById("fizzbuzz").remove();
                        document.getElementById("output").style.height = "0";
                        if(currentOutput === "main")
                            {
                                document.querySelectorAll("#output > div").forEach(element => element.style.display = "none")
                            }
                        else
                            {
                                currentOutput.style.display = "none";
                            }
                        break;

                    case "fizzbuzz":
                        if(document.getElementById("fizzbuzz")) document.getElementById("fizzbuzz").remove();
                        const div = document.createElement("div");
                        div.id = "fizzbuzz";
                        document.getElementById("inputContainer").insertAdjacentElement('beforebegin', div);
                        fizzBuzz();
                        break;

                    case "sudorm-rf/":
                    case "sudorm-rf/*":
                    case "sudorm-rf/--no-preserve-root":
                        rootRemove();
                        break;
                }
            return
        }
    if(event.key === "Backspace")
        {
            if(document.getElementById("userEntry").lastChild) 
                {
                    document.getElementById("userEntry").lastChild.remove();
                    userInputString = userInputString.slice(0, -1);
                }
            document.getElementById("cursor").style.animation = "blink 0s step-end 1";
            window.clearTimeout(animationID);
            animationID = setTimeout(() => {document.getElementById("cursor").style.animation = "blink 1.2s step-end infinite";}, 300);
            return
            // problem with blinking cursor is here
        }
    if(event.key.length > 1) return;
    document.getElementById("cursor").style.animation = "blink 0s step-end 1";
    window.clearTimeout(animationID);
    animationID = setTimeout(() => {document.getElementById("cursor").style.animation = "blink 1.2s step-end infinite";}, 500);
    document.getElementById("userEntry").insertAdjacentHTML('beforeend', event.key);
    userInputString += event.key;
    if(document.getElementById("background").scrollHeight > document.getElementById("background").clientHeight)
        {
            document.getElementById("background").scrollTop = document.getElementById("background").scrollHeight - document.getElementById("background").clientHeight;
        }
}

function tutorial ()
{
    if(linkIteration === -1)
        {
            document.querySelectorAll("#output, #inputContainer, .codeText, .link, #comment").forEach(element => {
                element.classList.add("dim");
            });
            if(document.getElementById("background").scrollTop > 335)
                {
                    document.getElementById("background").style.scrollBehavior = "smooth";
                    document.getElementById("background").scrollTo({top:325,behaviour:"smooth"});
                    document.getElementById("background").style.scrollBehavior = "";
                }
            window.setTimeout(() => {
                document.getElementById("comment").classList.remove("dim");
                document.getElementById("comment").classList.add("glow");
                linkIteration++;
                window.setTimeout(tutorial, 2300);
            }, 300);
            return
        }
    else if(!linkIteration)
        {
            document.getElementById("comment").classList.remove("glow");
            document.getElementById("comment").classList.add("dim");
            document.getElementById(linkData[linkIteration].function).classList.remove("dim");
            document.getElementById(linkData[linkIteration].function).classList.add("glow");
            document.getElementById(linkData[linkIteration].function).addEventListener("click", clickLink);
            linkIteration++;
            window.setTimeout(tutorial, 700);
            return
        }
    else
        {
            if(linkIteration > 5) 
                {
                    document.querySelectorAll(".dim").forEach(element => {
                        element.classList.remove("dim");
                        element.classList.add("glow");
                    });
                    return;
                }
            document.getElementById(linkData[linkIteration - 1].function).classList.remove("glow");
            document.getElementById(linkData[linkIteration - 1].function).classList.add("dim");
            document.getElementById(linkData[linkIteration].function).classList.remove("dim");
            document.getElementById(linkData[linkIteration].function).classList.add("glow");
            if(linkIteration != 5) document.getElementById(linkData[linkIteration].function).addEventListener("click", clickLink);
            linkIteration++;
            window.setTimeout(tutorial, 700);
        }
    

}

function clickLink (event)
{
    selectCvSection(event.target.id.slice(0,-4))
}  

function fizzBuzz ()
{
    animationID = window.requestAnimationFrame(fizzBuzz);
    if(fizzNum === 100)
        {
            fizzNum = 0;
            window.cancelAnimationFrame(animationID);
            return
        }
    if(fizzNum % 3 === 0 && fizzNum % 5 === 0)
        {
            document.getElementById("fizzbuzz").insertAdjacentHTML('beforeend', "Fizz Buzz<br>");
        }
    else if(fizzNum % 3 === 0)
        {
            document.getElementById("fizzbuzz").insertAdjacentHTML('beforeend', "Fizz<br>");
        }
    else if(fizzNum % 5 === 0)
        {
            document.getElementById("fizzbuzz").insertAdjacentHTML('beforeend', "Buzz<br>");
        }
    else
        {
            document.getElementById("fizzbuzz").insertAdjacentHTML('beforeend', fizzNum + "<br>");
        }

    if(document.getElementById("background").scrollHeight > document.getElementById("background").clientHeight)
        {
            document.getElementById("background").scrollTop = document.getElementById("background").scrollHeight - document.getElementById("background").clientHeight;
        }

    fizzNum++;
}

function rootRemove ()
{
    document.getElementById("background").innerHTML = "";
    let spanCursor = document.createElement("span");
    spanCursor.id = "cursor";
    spanCursor.style.animation = "blink 1.2s step-end infinite";
    document.getElementById("background").append(spanCursor);
}


/*
#include <stdio.h>
#include <string.h>
#include "cvReader.h"
int main()
{
    FILE *cv = fopen("cv.txt", "r");   
    while(1)
    {
        char* input;
        scanf(%s, input);

        // click function below for relevant section
        if(!strcmp(input,  "title")){
            title(cv);

        } else if(!strcmp(input,  "statement")){
            personalStatement(cv);

        } else if(!strcmp(input,  "education")){
            qualifications(cv);

        } else if(!strcmp(input,  "work")){
            workExperience(cv);

        } else if(!strcmp(input,  "contact")){
            contact(cv);

        } else if(!strcmp(input,  "download")){
            download(cv);
        }
    }
    return 0;
}

*/