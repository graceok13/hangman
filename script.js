var images = ["img/10.jpg","img/9.jpg","img/8.jpg","img/7.jpg","img/6.jpg","img/5.jpg","img/4.jpg","img/3.jpg","img/2.jpg","img/1.jpg","img/0.jpg"];

var easyWord = ["music", "guitar", "drum", "song", "beat"];
var mediumWord = ["instrument", "percussion", "clarinet", "harmonica"];
var hardWord= ["saxophone", "xylophone", "symphony", "concerto", "intonation"];
var alphabet = ["a","b", "c", "d", "e" ,"f", "g", "h", "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var pickedLetters = [];
var graveyard = [];
var word = "";
var lives = 10;

function startGame(){
    document.getElementById("imgSpace").src = images[10];
    document.getElementById("winOrLose").innerHTML="";
    pickedLetters = [];
    graveyard = [];
    lives = 10;
    makeButtons();
    var diff = parseInt(document.getElementById("difficulty").value);
    if (diff==1){
        word = easyWord[Math.floor(Math.random() * easyWord.length)];
    }
    if (diff==2){
        word = mediumWord[Math.floor(Math.random() * mediumWord.length)];
    }
    if (diff==3){
        word = hardWord[Math.floor(Math.random() * hardWord.length)];
    }
    console.log(word);
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("graveyard").innerHTML = graveyard;
    document.getElementById("wordSpace").innerHTML = printWord();
}

function makeButtons(){
    document.getElementById("buttonDiv").innerHTML = "";
    for (var i=0; i<alphabet.length; i++){
        var buttons = document.createElement("button");
        if (pickedLetters.indexOf(alphabet[i]) > -1){
            buttons.setAttribute("value",alphabet[i]);
            buttons.setAttribute("id",alphabet[i]);
            buttons.setAttribute("class","btn btn-default");
            buttons.innerHTML=alphabet[i];
            buttons.disabled = true;
            document.getElementById("buttonDiv").appendChild(buttons);
            buttons = "";
        }else{
            buttons.setAttribute("value",alphabet[i]);
            buttons.setAttribute("id",alphabet[i]);
            buttons.setAttribute("onclick","guessLetter('" + alphabet[i] + "')");
            buttons.setAttribute("class","btn btn-default");
            buttons.innerHTML=alphabet[i];
            document.getElementById("buttonDiv").appendChild(buttons);
        }
    }
}
function guessLetter(letter) {
    pickedLetters.push(letter);
    console.log(pickedLetters);
    document.getElementById("wordSpace").innerHTML = printWord();
    makeButtons();
    if (word.indexOf(letter) == -1){
        lives -= 1;
        graveyard.push(letter);
    }
    document.getElementById("graveyard").innerHTML = graveyard;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("imgSpace").src = images[lives];
    if (lives == 0){
        document.getElementById("winOrLose").innerHTML="No more lives, you lose.";
    }

}

function printWord(){
    var answer = "";
    if (lives > 0){
        for (var i=0; i < word.length; i++){
            if (pickedLetters.indexOf(word[i]) > -1){
                answer += word[i];
                if (answer == word){
                    document.getElementById("winOrLose").innerHTML="You won!";
                }
            } else {
                answer += "_ ";
            }
        }
    }
    return answer;
}
