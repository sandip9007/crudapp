// alert('Test')

function onFormSubmit(){
    const name = document.querySelector('#name').value
    const email = document.querySelector('#name').value
    const gender = document.querySelector('input[name="gender"]:checked')
    if(!name || !email || !gender){
        alert("Please fill all the fields")
        return false
    }
}

