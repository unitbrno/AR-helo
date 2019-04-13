function setup_time_component()
{
    AFRAME.registerComponent('clock-text', {
        init: function() {
            var el = this.el;
            this.ready = false;
            el.addEventListener('textfontset', function() {
            this.ready = true;
            }.bind(this));
        },
        tick: function() {
            var el = this.el;
            if (!this.ready) {
                return;
            }
            var date = new Date();
            var hourMin = date.toTimeString().split(" ")[0];
            var hours = hourMin.split(":")[0];
            var mins = hourMin.split(":")[1];
            el.setAttribute('value', hours + ":" + mins);
            }     
        });

    // AFRAME.registerComponent('rotation-reader', {
    //     tick: function () {
    //         /* camera_yaw = document.querySelector('#camera').object3D.rotation._y
    //         world_yaw = document.querySelector('#world').object3D.rotation._y
    //         document.querySelector('#world > #y-following').object3D.rotation.set(0,camera_yaw - world_yaw,0)  */
    //     }   
    // });
}

function reset_reference()
{
    camera_yaw = document.querySelector('#camera').object3D.rotation._y
    document.querySelector('#world').object3D.rotation.set(0,camera_yaw,0)
    document.querySelector('#world > #y-following').object3D.rotation.set(0,0,0)
}

function move_down()
{
    document.querySelector('#planes').object3D.visible = true;

    document.querySelector('#planes').object3D.rotation.set(-1.2,0,0);
    document.querySelector("#mid_plane").object3D.rotation.set(38, 0, 0);
    document.querySelector("#right_plane").object3D.rotation.set(0,-45,-45);
    document.querySelector("#left_plane").object3D.rotation.set(0,45,45);
    document.querySelector("#mid_plane").object3D.position.set(0,0.4,-1.22);
}

function move_up(){
    document.querySelector('#planes').object3D.visible = true;
    document.querySelector('#planes').object3D.rotation.set(0,0,0);
    document.querySelector("#mid_plane").object3D.rotation.set(0, 0, 0);
    document.querySelector("#right_plane").object3D.rotation.set(0,-45,0);
    document.querySelector("#left_plane").object3D.rotation.set(0,45,0);
    document.querySelector("#mid_plane").object3D.position.set(0,0,-1.38);
}

function hide(){
    document.querySelector('#planes').object3D.visible = false;
}

function setup_dev_mode()
{
    if (navigator.platform == "Win32")
    {
        document.querySelector('#world').setAttribute('position', '0 1.6 0');
        document.querySelector('#world').setAttribute('rotation', '0 0 0');
    }
}

function trigger_alert(){
    var ent = document.querySelector("#alert");
    if (ent.object3D.visible === false){
        ent.object3D.visible = true;
    }else{
        ent.object3D.visible = false;
    }
}

function todoInteraction(msg){
    lst = document.querySelector('#todolist').children;
    if(msg == "kp:button4") //left
    {
        if(todoListPosition > 0){
            todoListPosition--;
        }
    }
    else if (msg == "kp:button6"){
        if(todoListPosition < lst.length-1){
            todoListPosition++;
        }
    }
    else if (msg == "kp:button3"){
        var value = lst[todoListPosition].children[1].style.color; 
        if(value == "rgb(255, 0, 0)" || value == "rgb(255, 255, 255)"){ //not to progress
            lst[todoListPosition].children[1].innerHTML = "&#x25CF";
            lst[todoListPosition].children[1].style.color = "orange";
        }
        else if (value == "rgb(0, 255, 0)"){ //done to not done
            lst[todoListPosition].children[1].innerHTML = "X";
            lst[todoListPosition].children[1].style.color = "#ff0000";

        }
        else if (value == "orange"){ //progress to done
            lst[todoListPosition].children[1].innerHTML = "&#x2713";
            lst[todoListPosition].children[1].style.color = "#00ff00";
        }
    }
    for(i = 0; i < lst.length; i++){
        if(i != todoListPosition){
            lst[i].children[0].style.color = "#ffffff";
        }else{
            lst[i].children[0].style.color = "#ffff66";
        }
    }
}
var man_page = 0;
function scroll_man_left(){
    pages = document.getElementsByClassName('man');
    if (man_page > 0) man_page--;
    for (let i = 0; i < pages.length; i++){
        if (i !== man_page){
            pages[i].style.display = "none";
        }else{
            pages[i].style.display = "block";
        }
    }
}

function scroll_man_right(){
    pages = document.getElementsByClassName('man');
    if (man_page < pages.length) man_page++;
    for (let i = 0; i < pages.length; i++){
        if (i !== man_page){
            pages[i].style.display = "none";
        }else{
            console.log(i);
            pages[i].style.display = "block";
        }
    }
}

function trigger_alert(){
    var ent = document.querySelector("#alert_ent");
    var txt = document.querySelector("#alert_text");
    if (ent.object3D.visible === false){
        ent.object3D.visible = true;
        txt.object3D.visible = true;
    }else{
        ent.object3D.visible = false;
        txt.object3D.visible = false;
    }
}

function hide_alert(){
    var ent = document.querySelector("#alert_ent");
    var txt = document.querySelector("#alert_text");
    ent.object3D.visible = false;
    txt.object3D.visible = false;
}

function show_alert(message)
{
    var ent = document.querySelector("#alert_ent");
    var txt = document.querySelector("#alert_text");
    ent.object3D.visible = true;
    document.querySelector('#alert_text').setAttribute('value', message);
    txt.object3D.visible = true;
}