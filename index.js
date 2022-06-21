let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const saveBtnEl = document.getElementById("savebtn-el")
const tabBtnEl = document.getElementById("tabbtn-el")
const deleteBtnEl = document.getElementById("deletebtn-el")

// check for stored data in the local storage
// checks for the key - myLeads and converts the data stored there as strings to array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// list the data found in the local storage by adding it to the myLeads array
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i += 1) {
        // lists the items of the array
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `

        /* creating the array list in a different manner 

        const li = document.createElement("li")
        li.textContent = myLeads[i]
        ulEl.append(li)
        
        */
    }
    // the string in the listItems converted to html code
    ulEl.innerHTML = listItems
}

// the current web address input into the text box
tabBtnEl.addEventListener("click", function () {
    // to get the url of the current web page
    /* myLeads.push(window.location.href) obtains the url from the active browser tab as well */

    // getting the url from chrome browser specifically
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

// values input into the text box is pushed into the array when button is clicked and the box is cleared
saveBtnEl.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = ""

    // values in the text box is stored in the local storage
    // contents in the array converted to string for storing
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

/* adding onclick = saveLead() to the button in HTML 
function saveLead() {
    myLeads.push(inputEl.value)
} 
*/

deleteBtnEl.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []

    // the function runs the empty string and this causes the DOM list to be cleared
    render(myLeads)
})