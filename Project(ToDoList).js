function getAndUpdate() {
    console.log("Adding Item to List...");

    let tit = document.getElementById("tittle").value;
    let desc = document.getElementById("description").value;

    if (!tit || !desc) {
        alert("Please fill both Title and Description.");
        return;
    }

    let itemJsonArray;
    if (localStorage.getItem('ItemsJSON') === null) {
        itemJsonArray = [];
    } else {
        itemJsonArray = JSON.parse(localStorage.getItem('ItemsJSON'));
    }

    itemJsonArray.push([tit, desc]);
    localStorage.setItem('ItemsJSON', JSON.stringify(itemJsonArray));

    document.getElementById("tittle").value = "";
    document.getElementById("description").value = "";

    update();
}

function update() {
    let itemJsonArray;
    if (localStorage.getItem('ItemsJSON') === null) {
        itemJsonArray = [];
        localStorage.setItem('ItemsJSON', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArray = JSON.parse(localStorage.getItem('ItemsJSON'));
    }

    let tableBody = document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onClick="deleted(${index})">Delete</button></td>
            </tr>
        `;
    });

    tableBody.innerHTML = str;
}

function deleted(itemIndex) {
    let itemJsonArray = JSON.parse(localStorage.getItem('ItemsJSON'));
    itemJsonArray.splice(itemIndex, 1); // Remove the item at index
    localStorage.setItem('ItemsJSON', JSON.stringify(itemJsonArray));
    update();
}

// Attach event listener to the "Add" button
let add = document.getElementById("add");
add.addEventListener('click', getAndUpdate);

// Initial table population on page load
update();

function Clear() {
    if (confirm("Are you sure you want to clear the list? This action cannot be undone."))
        console.log("Clearing List...");
    localStorage.clear();
    update();
    // alert("List Cleared Successfully!");

}
