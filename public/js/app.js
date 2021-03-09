// alert('Test')

function onFormSubmit(e){
    e.preventDefault()
    if(e.target.elements['gender'][0].checked == true  || e.target.elements['gender'][1].checked == true){
        console.log('Ok')
    }
    return false
    // const value = document.querySelector('#name').value
    // // const email = document.querySelector('#email').value
    // // const gender = document.querySelector('#email').value
    // if(!value){
    //     // alert(e.target)
    //     return false
    // }else{
    //     alert('Sucessful')
    // } 
}

