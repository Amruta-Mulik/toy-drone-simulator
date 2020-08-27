var platformHeight = 0;
var droneHeight = 0;
var droneDirection = 'north';
var initialDroneOffsetLeft = 0;
var initialDroneOffsetTop = 0;
const UNITSIZE = 10;
const MIN = 0;
const MAX = 9; 

function init() {
    //platform setting and init
   var platformImgObj = document.getElementById('platform-img');
   platformHeight = platformImgObj.clientHeight;
   //drone setting and init
   var droneImgObj = document.getElementById('drone-img');
   droneHeight = droneImgObj.clientHeight;
   droneImgObj.style.display = 'none';
   initialDroneOffsetLeft = $('#platform-img').offset().left; 
   initialDroneOffsetTop = $('#platform-img').offset().top + platformHeight - droneHeight; 
}

//todo
function checkBoundry(obj){
    var moveSize = obj == 'attack' ? 2 : 1;
    var canObjMove = true;
    var cords = getPositionXY();
    cords.x = Math.round(cords.x);
    cords.y = Math.round(cords.y);
    if(droneDirection == 'north'){
        if(( - cords.y + moveSize)  > 10)
            canObjMove = false;
    }else if(droneDirection == 'east'){
        if(cords.x + moveSize > 9)
            canObjMove = false;
    }
    else if(droneDirection == 'south'){
        if(( cords.y + moveSize) > -1 )
            canObjMove = false;
    }else if(droneDirection == 'west'){
        if(cords.x - moveSize < 0 )
            canObjMove = false;
    }
    return canObjMove;
}


function move(){
    var droneImgObj = document.getElementById('drone-img');
    var canDroneMove = checkBoundry('move');
    if(canDroneMove){
        if(droneDirection == 'south'){
            droneImgObj.style.top = parseFloat(droneImgObj.style.top) + UNITSIZE + '%';
        }else if(droneDirection == 'east'){
            droneImgObj.style.left = parseFloat(droneImgObj.style.left) + UNITSIZE + '%';
        }else if(droneDirection == 'west'){
            droneImgObj.style.left = parseFloat(droneImgObj.style.left) - UNITSIZE + '%';
        }else{
            droneImgObj.style.top = parseFloat(droneImgObj.style.top) - UNITSIZE + '%';
        }
    }else{
        alert('Can\'t move drone outside boundry.');
    }
}

function rotateRight(){
    var droneImgObj = document.getElementById('drone-img');
    if(droneDirection == 'north'){
        droneDirection = 'east';
        droneImgObj.style.transform = 'rotate(90deg)';
    }else if(droneDirection == 'east'){
        droneDirection = 'south';
        droneImgObj.style.transform = 'rotate(180deg)';
    }else if(droneDirection == 'south'){
        droneDirection = 'west';
        droneImgObj.style.transform = 'rotate(270deg)';
    }else if(droneDirection == 'west'){
        droneDirection = 'north';
        droneImgObj.style.transform = 'rotate(360deg)';
    }
}

function rotateLeft(){
    var droneImgObj = document.getElementById('drone-img');
    if(droneDirection == 'north'){
        droneDirection = 'west';
        droneImgObj.style.transform = 'rotate(-90deg)';
    }else if(droneDirection == 'west'){
        droneDirection = 'south';
        droneImgObj.style.transform = 'rotate(-180deg)';
    }else if(droneDirection == 'south'){
        droneDirection = 'east';
        droneImgObj.style.transform = 'rotate(-270deg)';
    }else if(droneDirection == 'east'){
        droneDirection = 'north';
        droneImgObj.style.transform = 'rotate(-360deg)';
    }
}

function rotateObject(obj,orientation){
    if(obj == 'drone')
        imgObj = document.getElementById('drone-img');
    else if(obj == 'projectile')
        imgObj = document.getElementById('projectile-img');
    
    if(orientation == 'east'){
        imgObj.style.transform = 'rotate(90deg)';
    }else if(orientation == 'south'){
        imgObj.style.transform = 'rotate(180deg)';
    }else if(orientation == 'west'){
        imgObj.style.transform = 'rotate(270deg)';
    }else if(obj == 'projectile' && orientation == 'north'){
        imgObj.style.transform = 'rotate(360deg)';
    }
}

function getPositionXY() {
    var lt = document.getElementById('drone-img').style.left;
    var tp = document.getElementById('drone-img').style.top;
    var x = lt.substring(0, lt.indexOf('%'));
    var y = tp.substring(0,tp.indexOf('%'));
    var xposition = parseFloat(x)/UNITSIZE;
    var yposition = parseFloat(y)/UNITSIZE;
    return { x: xposition, y: yposition };
}

function report() {
    var lt = document.getElementById('drone-img').style.left;
    var tp = document.getElementById('drone-img').style.top;
    var x = lt.substring(0, lt.indexOf('%'));
    var y = tp.substring(0,tp.indexOf('%'));
    var xposition = Math.round(parseFloat(x)/UNITSIZE);
    var yposition =  - Math.round(parseFloat(y)/UNITSIZE) -1 ;

    var dir = droneDirection.charAt(0).toUpperCase() + droneDirection.slice(1);
    var output = "X:    "+ xposition + "\nY:    "+ yposition + "\nDirection: "+dir;
    alert(output);
}

function enableButtons(){
    document.getElementById("movebtn").disabled = false;
    document.getElementById("placebtn").disabled = false;
    document.getElementById("leftbtn").disabled = false;
    document.getElementById("rightbtn").disabled = false;
    document.getElementById("reportbtn").disabled = false;
    document.getElementById("attackbtn").disabled = false;
    document.getElementById('placebtn').style.display = 'none';
    document.getElementById('resetbtn').style.display = 'block';
}

//todo
function placeDrone(){

    droneDirection = document.getElementById('direction').value;
    
    var xpos = document.getElementById('xpos').value;
    var ypos = document.getElementById('ypos').value;
    xpos = (xpos < MIN) ? MIN : (xpos > MAX) ? MAX : xpos;
    ypos = (ypos < MIN) ? MIN : (ypos > MAX) ? MAX : ypos;

    var droneImgObj = document.getElementById('drone-img');
    droneImgObj.style.position= 'relative'; 
    droneImgObj.style.left = xpos*UNITSIZE + '%';
    droneImgObj.style.top =  - (ypos*UNITSIZE + 12) + '%';
    droneImgObj.style.display = 'block';
    
    rotateObject('drone', droneDirection);
    enableButtons();
    $('#exampleModal').modal('hide');

}

//todo
function attack() {
    var canAttack = checkBoundry('attack');
    if(canAttack){
        var projectileImgObj = document.getElementById('projectile-img');
        var droneOffsetLeft = document.getElementById('drone-img').style.left;
        var droneOffsetTop = document.getElementById('drone-img').style.top;

        projectileImgObj.style.position= 'relative'; 
        
        projectileImgObj.style.left = parseFloat(droneOffsetLeft) + 5 +'%'; 
        projectileImgObj.style.top = parseFloat(droneOffsetTop) - 9 +'%';
        projectileImgObj.style.display = 'block'; 
 
        rotateObject('projectile', droneDirection);
        moveProjectile();
    }else{
        alert('Drone too close to the boundry to attack.');
    }

    
}

function moveProjectile() {
    if(droneDirection == 'north'){
        $("#projectile-img").animate({top: "-="+ (UNITSIZE*2) + '%'}, 1600, animateProjectile);
    }else if(droneDirection == 'east'){
        $("#projectile-img").animate({left: "+="+ (UNITSIZE*2) + '%'}, 1600, animateProjectile);
    }
    else if(droneDirection == 'south'){
        $("#projectile-img").animate({top: "+="+ (UNITSIZE*2) + '%'}, 1600, animateProjectile);
    }else if(droneDirection == 'west'){
        $("#projectile-img").animate({left: "-="+ (UNITSIZE*2) + '%'}, 1600, animateProjectile);
    }

}



//todo
function animateProjectile() {
    var explosionImgObj = document.getElementById('explosion-img');
    var projectileOffsetLeft = document.getElementById('projectile-img').style.left;
    var projectileOffsetTop = document.getElementById('projectile-img').style.top;
    explosionImgObj.style.position= 'relative'; 
    explosionImgObj.style.left = parseFloat(projectileOffsetLeft) - 3.5 +'%'; 
    explosionImgObj.style.top = (parseFloat(projectileOffsetTop) - 7) +'%';
    explosionImgObj.style.display = 'block'; 
    
    var projObj = document.getElementById('projectile-img').getBoundingClientRect();
    document.getElementById('projectile-img').style.display = 'none';
 
    setTimeout(putDamage(projObj),500);


}

//todo
function putDamage(projObj){
    var explosionImgObj = document.getElementById('explosion-img');
    //old code bck----
    var damageImgObj = new Image(50, 50);
    var path = window.location.href;
    damageImgObj.src =  path + '/damage.png';
    damageImgObj.style.position= 'absolute'; 
    

    damageImgObj.style.left = initialDroneOffsetLeft  + projObj.left  - 40 +'px';  
    damageImgObj.style.top = initialDroneOffsetTop +  projObj.top - 395  + 'px'; 
    document.getElementById('img-container').appendChild(damageImgObj);
    setTimeout(function(){explosionImgObj.style.display = 'none';}, 200);

}

function resetPage(){
    window.location.reload();
}

window.onload = init;
