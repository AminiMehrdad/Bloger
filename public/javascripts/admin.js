// create
function SubminForm() {
    fetch('http://localhost:5000/auth/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FerstName: `${document.getElementById('ferstnameInput').value}`,
            LastName: `${document.getElementById('lastnameInput').value}`,
            UserName: `${document.getElementById('usernameInput').value}`,
            PassWord: `${document.getElementById('passwordInput').value}`,
            PhoneNumber: `${document.getElementById('phonenumberInput').value}`,
            Gender: `${document.getElementById('genderInput').value}`,
        })
    })
    .then(response => response.json()) // Convert response to JSON
    .then((data)=> {
        if(data.msg === "ok"){
            window.location.href = "http://localhost:5000/admin";
        }else {
            let alertBox = document.getElementById("Alert");

            alertBox.textContent = data.msg;
            document.getElementById("Alert").classList.remove("d-none");

            setTimeout(() => {
                document.getElementById("Alert").classList.add("d-none");
                alertBox.textContent = ""; // Clear the text
            }, 5000);
        }
            
    })
    .catch(error => console.error('Error:', error));
}

// delete
function delete_compeny(){
    const id = document.getElementById("user").value;
    fetch(`http://localhost:5000/admin/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json()) // Convert response to JSON
    .then((data)=> {
        window.location.href = "http://localhost:5000/admin/";
    })
    .catch(error => console.error('Error:', error));
    
}

// update
function Update_user() {
    fetch(`http://localhost:5000/admin`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FerstName: `${document.getElementById('nameInputU').value}`,
            LastName: `${document.getElementById('regesterInputU').value}`,
            UserName: document.getElementById("cityInputU").value,
            PhoneNumber: `${document.getElementById('stateInputU').value}`,
            Gender: `${document.getElementById('Gender').value}`,
            id: `${document.getElementById("user").value}`
        })
    })
    .then(response => response.json()) // Convert response to JSON
    .then((data)=> {
        
        if(data.msg === "OK"){
            window.location.href = "http://localhost:5000/admin";
        }else {
            
            
            let alertBox = document.getElementById("AlertU");

            alertBox.textContent = data.msg;
            document.getElementById("AlertU").classList.remove("d-none");

            setTimeout(() => {
                document.getElementById("AlertU").classList.add("d-none");
                alertBox.textContent = ""; // Clear the text
            }, 5000);msg
        }
            
    })
    .catch(error => console.error('Error:', error));
}
