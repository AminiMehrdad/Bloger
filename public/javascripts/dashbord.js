const value = 25;
const progressBar = document.getElementById('progressBar');
progressBar.style.width = `${value}%`;
progressBar["aria-valuenow"] = `${value}`;

if (value<25) {
    progressBar.style.backgroundColor = 'red';
}else if (value<50 && value>=25) {
    progressBar.style.backgroundColor = 'rgb(255, 174, 0)';
}else if (value<75 && value>=50) {
    progressBar.style.backgroundColor = 'rgb(0, 119, 255)';
}else if (value<=100 && value>=75) {
    progressBar.style.backgroundColor = 'rgb(0, 185, 31)';
};
const progressText = document.getElementById('progressText');
progressText.innerHTML = `${value}%`;

function select_active_box(id_activ_box) {
    const ids = ["Dashbord", "Articles", "Profile", "Logout"];
    ids.map((elment) => {
        const paret_btu = document.getElementById(elment);
        const icon_btu = document.querySelector(`#${elment} .icon-div `);
        if (elment === id_activ_box) {
            
            paret_btu.className = ''; // Remove all classes
            paret_btu.classList.add("box"); // Add the new class
            icon_btu.className = ''; // Remove all classes
            icon_btu.classList.add("icon-div"); // Add the new class
            icon_btu.classList.add("custom-orange");
        } else {
            paret_btu.className = ''; // Remove all classes
            paret_btu.classList.add("silds"); // Add the new class
            icon_btu.className = ''; // Remove all classes
            icon_btu.classList.add("icon-div"); // Add the new class
            icon_btu.classList.add("box");
        }
    })
};
function active_box(id) {
    const ids = ["main-dashbord", "main-profile"]
    ids.map((elment) => {
        const main = document.getElementById(elment);
        if (elment === id) {
            main.style.display = 'block';
        } else {
            main.style.display = 'none';
        }
    })
}


function dashbord(){
    select_active_box("Dashbord")
    active_box("main-dashbord")
};
function articles(){
    select_active_box("Articles")
};
function profile(){
    select_active_box("Profile")
    active_box("main-profile")
};

function Log_out(){
    select_active_box("Logout")
    window.location.href = "/user/logout";
};

async function Update() {
    try {
        const response = await fetch('/user/profile', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FerstName: document.getElementById("FerstName").value,
                LastName: document.getElementById("LastName").value,
                UserName: document.getElementById("UserName").value,
                PhoneNumber: document.getElementById("PhoneNumber").value,
                Gender: document.getElementById("Gender").value      

            }),
        });
        window.location.href = "/user/logout";

    } catch (error) {
        console.error('Error:', error);
    }
};

async function Delete() {  
    try {
        const response = await fetch('/user/profile', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        window.location.href = "/user/logout";

    } catch (error) {
        console.error('Error:', error);
    }
}


