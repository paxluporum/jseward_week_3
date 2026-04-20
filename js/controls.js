//controls


var w = false;
// var a = false;
var s = false;
// var d = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);


function press(e)
{
    // console.log("Pressed " + e.keyCode);
    if (e.keyCode == 87)
    {
        w=true;
    }
    if (e.keyCode == 83)
    {
        s=true;
    }
    
}

function release(e)
{
    //console.log("Pressed " + e.keyCode);
    if (e.keyCode == 87)
    {
        w=false;
    }
    if (e.keyCode == 83)
    {
        s=false;
    }
}
