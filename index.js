window.onload = clearUI;
function clearUI(){
    document.body.innerHTML = `
        <div class="requestTable">
        <div>
    `;
    document.body.getElementsByClassName("requestTable")[0].appendChild(newRow());
}

function newRow(){
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = `
        <div class="requestRow">
            <div class="request" contenteditable="true" spellcheck="false"></div>
            <div class="result"></div>
        </div>
    `;

    let newRow = tempDiv.children[0];
    let inputElement = newRow.getElementsByClassName("request")[0];
    let outputElement = newRow.getElementsByClassName("result")[0];
    inputElement.addEventListener("keypress", (e)=>{
        if(e.key == "Enter" && e.shiftKey){
            getResult(inputElement.innerText, outputElement);
            e.preventDefault();
        }
        e.stopPropagation();
    });
    inputElement.addEventListener("focusout", (e)=>{
        getResult(inputElement.innerText, outputElement);
    });

    return newRow;
}

function getResult(inputString, outputElement){
    let requestRows = document.body.getElementsByClassName("requestTable")[0].children;
    if(requestRows[requestRows.length-1].children[0].innerHTML != "")
        document.body.getElementsByClassName("requestTable")[0].appendChild(newRow());
    
    let result = eval(inputString);
    if(result instanceof HTMLElement){
        outputElement.innerHTML = "";
        outputElement.appendChild(result);
        return;
    }
    else { // primitive datatypes dont inherit instaceof funtionality
        outputElement.innerHTML = result;
        return;
    }
}

function plot2d(expression, xRange, yRange){
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 300;

    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);

    let stepSize = 0.1;
    context.lineWidth = 1;
    for(let i=xRange[0];i<xRange[1];i+=stepSize){
        let y1 = eval(expression.replaceAll("x", "("+i+")"));
        let y2 = eval(expression.replaceAll("x", "("+(i+stepSize)+")"));
        context.beginPath();
        context.moveTo( map(i,xRange[0],xRange[1],0,canvas.width), canvas.height-map(y1,yRange[0],yRange[1],0,canvas.height));
        context.lineTo( map(i+stepSize,xRange[0],xRange[1],0,canvas.width) ,canvas.height-map(y2,yRange[0],yRange[1],0,canvas.height));
        context.closePath();
        context.stroke();
    }

    return canvas;
}

function map(x,v1,v2,v3,v4){
    x = x-v1+v3;
    return x*(v4-v3)/(v2-v1);
}




const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        try {
            navigator.serviceWorker.register("./sw.js").then(e => { console.log(e) });

        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};
registerServiceWorker();



/*
container class for all math stuff?
*/

// plot2d("1+x*x", [0,5], [0,10])
// plot2d("x^2+Math.sin(x)", [0,20], [0,20])

