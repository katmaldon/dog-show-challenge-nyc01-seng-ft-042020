

document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.getElementById("table-body")
    const form = document.getElementById("dog-form")

    // function fetch dogs
    function getAllDogs() {
        fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }
    // call fetch dogs
    getAllDogs()

    // function render dogs to table
    function renderDogs(dogs) {

        tableBody.innerHTML = ""
        dogs.forEach(dog => {

            tableBody.innerHTML += `
            <tr id="${dog.id}">
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td>
                <button class="edit" id="${dog.id}" >Edit</button>
                </td>
            </tr>
            `
        })
    }

    // function click edit button fpr specific dog
    function clickEditButton() {
        document.addEventListener("click", function (event) {
            if (event.target.className === "edit") {
                dogId = event.target.id

                fetch(`http://localhost:3000/dogs/${dogId}`)
                .then(response => response.json())
                .then(dog => {
                    addDogDataToForm(dog)
                })
            }

        })
    }

    // call edit function
    clickEditButton()


    // populate form
    function addDogDataToForm(dog) {

        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
    }

    // submit patch to db
    function submitEditedForm() {
        document.addEventListener("submit", function (event) {
            event.preventDefault()

            const editForm = event.target

            const options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    name: editForm.name.value,
                    breed: editForm.breed.value,
                    sex: editForm.sex.value
                })
            }

            fetch(`http://localhost:3000/dogs/${dogId}`, options)
            .then(response => response.json())
            .then(dogs => getAllDogs())


        })
    }

    // call submit
    submitEditedForm()


})




