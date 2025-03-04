progressorbar()
function progressorbar() {
    const progress = {};
    const arr_len = parseInt(document.getElementById("article-len").innerHTML)
    for (let index = 0; index < arr_len; index++) {
        progress[`progressBar${index}`] = document.getElementById(`progressBar${index}`);
        
        const value = parseInt(progress[`progressBar${index}`].ariaValueNow);
        if (value<25) {
            progress[`progressBar${index}`].style.backgroundColor = 'red';
        }else if (value<50 && value>=25) {
            progress[`progressBar${index}`].style.backgroundColor = 'rgb(255, 174, 0)';
        }else if (value<75 && value>=50) {
            progress[`progressBar${index}`].style.backgroundColor = 'rgb(0, 119, 255)';
        }else if (value<=100 && value>=75) {
            progress[`progressBar${index}`].style.backgroundColor = 'rgb(0, 185, 31)';
        };
        progress[`progressText${index}`] = document.getElementById(`progressText${index}`);
        progress[`progressText${index}`].innerHTML = `${value}%`;
        
    }
    
}

function Ofst(id) {
    const page = document.getElementById(id);
    const active_butm = document.querySelector('.page-item.active');
    const page_num = id.split("_")[1];
    const url = `/user/offset/${page_num}`; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const table = document.getElementById('articletabel');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = ''; 
    
        data.forEach((element, index) => {
            const row = document.createElement('tr');
    
            // Add cells to the row
            row.innerHTML = `
                <td>${element.Title}</td>
                <td>${element.creator.UserName}</td>
                <td>${element.NumberSee}</td>
                <td>${element.Like}</td>
                <td>${element.Dislike}</td>
                <td>
                    <p id="progressText${index}"></p>
                    <div class="progress">
                        <div class="progress-bar" id="progressBar${index}" role="progressbar" style="width: ${Math.round((((element.Like + (element.NumberSee + 0.001)) / (element.NumberSee + 0.001)) - 1) * 100)}%;" aria-valuenow="${Math.round((((element.Like + (element.NumberSee + 0.001)) / (element.NumberSee + 0.001)) - 1) * 100)}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>
            `;
    
            tbody.appendChild(row);
        })
        active_butm.className = "";
        active_butm.class = "page-item";
    
        page.className = "";
        page.className = "page-item active"
    })
    .catch(error => {
        console.error('Error:', error); 
    });


   
}


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
    const ids = ["main-dashbord", "main-profile", "main-article"]
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
    active_box("main-article")
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

const alertDiv = document.getElementById('custom-alert')
setTimeout(() => {
  alertDiv.style.display = 'none';
}, 3000);


