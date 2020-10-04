var inputs=document.querySelectorAll("input");
var button=document.querySelector("button");
var selects=document.querySelectorAll("select");
var algorithm="Shift Cipher";

alphabets="abcdefghijklmnopqrstuvwxyz";

selects[1].addEventListener("change",function()
{
    button.innerHTML=selects[1].options[selects[1].selectedIndex].text;
});

selects[0].addEventListener("change",function()
{
    algorithm=this.options[this.selectedIndex].text

    if(algorithm==="Shift Cipher" || algorithm==="RailFence Cipher")
    {
        inputs[0].disabled=false;
        inputs[0].type="Number";
    }
    else if(algorithm==="Vigenere Cipher" || algorithm==="Playfair Cipher")
    {
        inputs[0].disabled=false;
        inputs[0].type="text";
    }
    else
    {
        inputs[0].value="";
        inputs[0].disabled=true;
    }
});

button.addEventListener("click",function()
{
    if(algorithm==="Shift Cipher")
    {
        button.innerHTML==="Encrypt" ? shiftCipher("Encrypt") : shiftCipher("Decrypt");
    }
    else if(algorithm==="Vigenere Cipher")
    {
        button.innerHTML=="Encrypt" ? vigenereCipher("Encrypt") : vigenereCipher("Decrypt");
    }
    else if(algorithm==="Substitution Cipher")
    {
        button.innerHTML==="Encrypt" ? substitutionCipher("Encrypt") : substitutionCipher("Decrypt");
    }
    else if(algorithm==="Playfair Cipher")
    {
        button.innerHTML==="Encrypt" ? playfairCipher("Encrypt") : playfairCipher("Decrypt");
    }
    else
    {
        button.innerHTML==="Encrypt" ? railFenceCipher("Encrypt") : railFenceCipher("Decrypt");
    }
});

function shiftCipher(mode)
{
    var outputText="";
    var key=Number(inputs[0].value);
    if(mode==="Encrypt")
    {
        var inputText=inputs[1].value;
        for(char of inputText)
        {
            if(char!==" ")
            {
                var index=alphabets.indexOf(char);
                if(index+key>=0)
                {
                    index=(index+key)%26;
                }
                else
                {
                    var x=( Math.abs(index+key) ) % 26;
                    index=26-x;
                }
                outputText+=alphabets[index];
            }
            else
            {
                outputText+=char;
            }
        }
        inputs[2].value=outputText;
    }
    else
    {
        var inputText=inputs[2].value;
        for(char of inputText)
        {
            if(char!==" ")
            {
                var index=alphabets.indexOf(char);
                if(index-key>=0)
                {
                    index=(index-key)%26;
                }
                else
                {
                    var x=( Math.abs(index-key) ) % 26;
                    index=26-x;
                }
                outputText+=alphabets[index];
            }
            else
            {
                outputText+=char;
            }
        }
        inputs[1].value=outputText;
    }
}

function vigenereCipher(mode)
{
    var outputText="";
    var key=inputs[0].value;
    if(mode==="Encrypt")
    {
        var inputText=inputs[1].value;
        key =  generateVigenereKey(key, inputText);
        console.log(key);
        for(var i=0; i<key.length; i++)
        {
            var keyIndex=alphabets.indexOf(key[i]);
            var inputIndex=alphabets.indexOf(inputText[i]);

            inputIndex=(inputIndex+keyIndex)%26;
            outputText+=alphabets[inputIndex];
        }
        inputs[2].value=outputText;
    }
    else
    {
        var inputText=inputs[2].value;
        key =  generateVigenereKey(key, inputText);
        console.log(key);
        for(var i=0; i<key.length; i++)
        {
            var keyIndex=alphabets.indexOf(key[i]);
            var inputIndex=alphabets.indexOf(inputText[i]);

            inputIndex=(inputIndex-keyIndex)%26;

            if(inputIndex < 0){
                inputIndex += 26;
            }
            
            outputText+=alphabets[inputIndex];
        }
        inputs[1].value=outputText;
    }
}
function generateVigenereKey(key, inputText){
    if(key.length === inputText.length){
        //pass if statement as it is
    }
    else if(key.length < inputText.length){
        let i = 0
        while(key.length !== inputText.length){
            key += key[i];
            i += 1;
        }
    }
    else{
       key = key.slice(0, inputText.length);
    }

    return key;
}

function substitutionCipher(mode)
{
    var dict={
        a:'p',b:'h',c:'q',d:'g',e:'i',f:'u',g:'m',h:'e',i:'a',j:'y',k:'l',l:'n',m:'o',n:'f',o:'d',p:'x',q:'j',r:'k',s:'r',t:'c',u:'v',v:'s',w:'t',x:'z',y:'w',z:'b'
    };
    var outputText="";

    if(mode==="Encrypt")
    {
        var inputText=inputs[1].value;
        for(char of inputText)
        {
            char!==" " ? outputText+=dict[char] : outputText+=" ";
        }
        inputs[2].value=outputText;
    }
    else
    {
        var inputText=inputs[2].value;
        for(char of inputText)
        {
            char!==" " ? outputText+=Object.keys(dict).find( key => dict[key]==char ) : outputText+=" ";
        }
        inputs[1].value=outputText;
    }
}

function playfairCipher(mode){
    var plainText;
    mode === "Encrypt" ? plainText=inputs[1].value : plainText=inputs[2].value ;
    var key=inputs[0].value;
    var keyMatrix = new Array(5);
    var enc="";
    for(var i=0;i<5;i++){
        keyMatrix[i] = new Array(5);
    }
    var count = 0;
    for(var i=0;i<5;i++){
        for(var j =0;j<5;j++){
            if(count != key.length)
            {
                if(key[count] != "j")
                {
                    if(find(keyMatrix,key[count])){
                        keyMatrix[i][j] = key[count];
                    }
                    else
                    {
                        j=j-1
                    }
                }
                else
                {
                    j=j-1 
                }
               count++;
            }       
            else
            {
                for(var k=0;k<alphabets.length;k++)
                {

                    if(alphabets[k] == "j")
                    {
                        k++;
                    }
                    var value = find(keyMatrix,alphabets[k])
                    if(value == true)
                    {
                        keyMatrix[i][j] = alphabets[k]
                        break;
                    }
                   
                }
              
            }
            
        }
    }
    console.log(keyMatrix)
    var pair="";
    var j=0;
    for(var i=0;i<plainText.length;i++){
        pair+=plainText[i]
        
       if(i%2!=0)
       {
            if(pair[j]==pair[j+1])
            {
                
                var temp="";
                temp = pair[j] + 'x';
                console.log(temp)
                 enc += checkMatrix(keyMatrix,temp,mode)
                console.log(enc)
                pair="";
                pair=plainText[i]
                j=0
            }
            else
            {
               console.log(pair)
                 enc += checkMatrix(keyMatrix,pair,mode)
                pair="";
                console.log(enc)
            }
       }
       if(i==plainText.length-1 && pair!= "")
       {
           console.log(pair)
           pair+= 'x';
            enc += checkMatrix(keyMatrix,pair,mode)
            pair="";
            console.log(enc)
       }
    }
    mode==="Encrypt" ? inputs[2].value=enc : inputs[1].value=enc;
}

function find(keyMatrix,check)
{
  for(var i=0;i<5;i++){
    for(var j =0;j<5;j++){
            if(keyMatrix[i][j]==check)
            {
                return false
            }
            if(keyMatrix[i][j] == null)
            {
                return true
            }
         }
    }
}

function checkMatrix(keyMatrix,temp,cryp)
{
 for(var i=0;i<temp.length;i++)
 {
     for(var j=0;j<5;j++)
     {
      
         for(var k=0;k<5;k++)
         {
          
            if(keyMatrix[j][k]==temp[i])
            {
               if(i==1)
               {
                var checkCol2 = k;
                var checkRow2 = j;
                var tempRow2 = checkRow2
                var tempRow1 = checkRow1
                var tempCol1,tempCol2;
                if(checkRow1 == checkRow2 && cryp == "Encrypt")
                {
                    
                    var enc="";
                    if(checkCol1<4)
                    {
                        tempCol1 = checkCol1;
                        tempCol1++;
                        enc+=keyMatrix[checkRow1][tempCol1]

                    }
                    else
                    {
                        enc+=keyMatrix[checkRow1][0]
                    }
                    if(checkCol2<4)
                    {
                        tempCol2 = checkCol2;
                        tempCol2++;
                        enc+=keyMatrix[checkRow2][tempCol2]
                    }
                    else
                    {
                        enc+=keyMatrix[checkRow2][0]
                    }
                    return enc
                }
                else if(checkRow1 == checkRow2 && cryp == "Decrypt")
                {
                    var enc="";
                    if(checkCol1>0)
                    {
                        tempCol1 = checkCol1;
                        tempCol1--;
                        enc+=keyMatrix[checkRow1][tempCol1]

                    }
                    else
                    {
                        enc+=keyMatrix[checkRow1][4]
                    }
                    if(checkCol2>0)
                    {
                        tempCol2 = checkCol2;
                        tempCol2--;
                        enc+=keyMatrix[checkRow2][tempCol2]
                    }
                    else
                    {
                        enc+=keyMatrix[checkRow2][4]
                    }
                    return enc
                }
                else if(checkCol1 == checkCol2 && cryp == "Encrypt")
                {
                    var enc="";
                    if(checkRow1<4)
                    {
                      tempRow1++;
                      enc+=keyMatrix[tempRow1][checkCol1]
                    }
                    else
                    {
                        
                        enc+=keyMatrix[0][checkCol1]
                    }
                    if(checkRow2<4)
                    {
                      tempRow2++;
                      enc+=keyMatrix[tempRow2][checkCol2]
                    }
                    else
                    {
                    
                        enc+=keyMatrix[0][checkCol2]
                    }
                    return enc

                }
                else if(checkCol1 == checkCol2 && cryp == "Decrypt")
                {
                    var enc="";
                    if(checkRow1>0)
                    {
                        
                      tempRow1--;
                      enc+=keyMatrix[tempRow1][checkCol1]
                    }
                    else
                    {
                       
                        enc+=keyMatrix[4][checkCol1]
                    }
                    if(checkRow2>0)
                    {
                        
                      tempRow2--;
                      enc+=keyMatrix[tempRow2][checkCol2]
                    }
                    else
                    {
                        
                        enc+=keyMatrix[4][checkCol2]
                    }
                    return enc

                }
                else
                {
                    while(tempRow2 > checkRow1 && tempRow2 != checkRow1)
                    {
                       
                        tempRow2--;
                    }
                    while(tempRow2 < checkRow1 && tempRow2 != checkRow1)
                    {
                       
                        tempRow2++;
                    }
                   var enc="";
                   enc+= keyMatrix[tempRow2][checkCol2];
                    while(tempRow1 > checkRow2 && tempRow1 != checkRow2)
                    {
                       
                        tempRow1--;
                    }
                    while(tempRow1 < checkRow2 && tempRow1 != checkRow2)
                    {
                        
                        tempRow1++;
                    }
                    enc+=keyMatrix[tempRow1][checkCol1];
                    return enc

                }
               }
               else
               {
                   var checkCol1 = k;
                   var checkRow1 = j
               }
            }
         }
     }
 }   
}
function railFenceCipher(mode)
{
    var outputText;
    var inputText=getInputText(mode);
    var key=Number(getKey());

    if(key !== 1){
        var matrix = createMatrix(inputText, key);
        matrix = fillMatrix(matrix, inputText, mode);

        mode==="Encrypt" ?  outputText=getRFcipher("", matrix) : outputText=getRFplainText("", matrix);

        setOutputText(outputText, mode);
    }
    else{
        setOutputText(inputText, mode);
    }
}

function createMatrix(plainText, key)
{
    let matrix = [...Array(key)].map(i => Array(plainText.length).fill(null));
    return matrix;
}
function getKey()
{
    return inputs[0].value;
}
function getInputText(mode)
{
    var text;
    mode==="Encrypt" ? text=inputs[1].value : text=inputs[2].value;
    return text;
}
function fillMatrix(matrix, inputText, mode)
{
    var increment=1
    var row=0;
    var col=0;

    if(mode==="Encrypt") // col-wise filling
    {
        for(char of inputText)
        {
            matrix[row][col] = char;
            col++;
            if(row+increment===matrix.length || row+increment===-1)
            {
                increment*=-1;
            }
            row+=increment;
        }
    }
    else //row-wise filling
    {
        var index=0;
        for(selectedRow in matrix)
        {
            row=0;
            for(col in inputText)
            {
                if(row+increment<0 || row+increment>=matrix.length)
                {
                    increment*=-1;
                }
                if(row==selectedRow)
                {
                    matrix[row][col]=inputText[index];
                    index++;
                }
                row+=increment;
            }
        }
    }
    console.log(matrix);
    return matrix;
}
function setOutputText(outputText, mode)
{
    mode==="Encrypt" ? inputs[2].value=outputText : inputs[1].value=outputText;
}
function getRFcipher(outputText, matrix)
{
    for(list of matrix)
    {
        outputText+=list.join('');   // outputText=outputText+list.join('');
    }
    return outputText;
}
function getRFplainText(outputText, matrix)
{
    var increment=1
    var row=0;
    var col=0;
    for(char of matrix[row])
    {
        outputText += matrix[row][col];
        col++;
        if(row+increment===matrix.length || row+increment===-1)
        {
            increment*=-1;
        }
        row+=increment;
    }
    return outputText;
}