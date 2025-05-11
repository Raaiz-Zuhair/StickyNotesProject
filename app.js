{/* <div class="sticky-box">
          <textarea id="textArea" class="text-area "></textarea>
          <div class="btn-div">
            <i class='bx bx-bookmark'></i>
            <i class='bx bx-trash'></i>
          </div>
        </div> */}


class UI{
    addSticky(){
        const stickyBox = document.createElement("div");

        stickyBox.className = "sticky-box";

        const textArea = document.createElement("textarea");

        textArea.className = "text-area";

        textArea.id = "textArea";

        stickyBox.appendChild(textArea);

        const btnDiv = document.createElement("div");

        btnDiv.className = "btn-div";

        btnDiv.innerHTML = `
        <i class='bx bx-bookmark'></i>
        <i class='bx bx-trash'></i>`;
        
        stickyBox.appendChild(btnDiv);
        document.querySelector(".box-wrapper").appendChild(stickyBox);
        
    }


    alertShow(message,className){
         this.clearedAlert();

        const alertDiv = document.createElement("div");

        alertDiv.innerHTML = message;

        alertDiv.className = `${className}`;
        alertDiv.id = "alert"

        document.querySelector("#alert-box").appendChild(alertDiv);

        setTimeout(function() {
            document.querySelector("#alert").remove();
        },1000)
    }

    clearedAlert(){
        const cuuertAlert = document.querySelector("#alert");
        if(cuuertAlert){
            cuuertAlert.remove();
            this.clearedAlert()
        }
    }


    clearAll(message,className){
        this.alertShow(message,className)
        document.querySelector(".box-wrapper").innerHTML = "";
    }



}

class Storage{
    getValue() {
        let notes;
        if (localStorage.getItem("notes") === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem("notes"));
        }
        return notes;
    }


    setValue(textValue) {
        const notes = this.getValue();
        notes.push(textValue);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    displayNotes(){
        const getNotes = this.getValue();
        getNotes.forEach(note=> {
        const stickyBox = document.createElement("div");

        stickyBox.className = "sticky-box";

        const textArea = document.createElement("textarea");

        textArea.className = "text-area";

        textArea.id = "textArea";

        textArea.innerHTML = note;

        stickyBox.appendChild(textArea);

        const btnDiv = document.createElement("div");

        btnDiv.className = "btn-div";

        btnDiv.innerHTML = `
        <i class='bx bx-bookmark' id="savebtn"></i>
        <i class='bx bx-trash'></i>`;
        
        stickyBox.appendChild(btnDiv);
        document.querySelector(".box-wrapper").appendChild(stickyBox);
        } )
    }

    clearAll(){
        localStorage.removeItem("notes");
    }

    deleteNoteLS(note){
       const text = note.firstElementChild.innerText;

       const notesLS = this.getValue();
       
       notesLS.forEach((noteLS,index) =>{
        if(text === noteLS){
            notesLS.splice(index,1)
        }

        localStorage.setItem("notes" ,JSON.stringify(notesLS))

       })

    }
}


const storage = new Storage();
document.addEventListener("DOMContentLoaded" , () =>{
    storage.displayNotes();
})


// save note btn
document.querySelector(".box-wrapper").addEventListener("click", (e) => {
    const storage = new Storage();
    const ui = new UI();

    if (e.target.className === "bx bx-bookmark") {
            const textNote = e.target.parentElement.parentElement.firstElementChild.value;

            if (textNote === "") {
                ui.alertShow("Invalid input", "btn btn-danger");
            } else {
                storage.setValue(textNote);
            }
    
            if(textNote === ""){
                ui.alertShow("Invalid input" , "btn btn-danger")
            }else{
                ui.alertShow("Successfull saved note" , "btn btn-success")
            }
         
        
    }
})



// eventlistner addsticky div
document.querySelector("#addBtn").addEventListener("click" , () => {
    const ui = new UI();
    ui.addSticky()
})



//  delete
addEventListener("click" , (e) => {
    const ui = new UI();
    const storage = new Storage();

    if(e.target.className === "bx bx-trash"){
        e.target.parentElement.parentElement.remove();
        ui.alertShow("Deleted Successfully" , "btn btn-danger");
        storage.deleteNoteLS(e.target.parentElement.parentElement)


    }
})

// clearAll
document.querySelector("#clearAll").addEventListener("click" , () => {
    const ui = new UI();
    const storage = new Storage();
    const result = document.querySelector(".box-wrapper").innerHTML === "";
    if(result){
        ui.clearAll("Already Cleared" , "btn btn-danger");
    }else{
        ui.clearAll("Successfully Cleared all Notes" , "btn btn-success");
        storage.clearAll();
    }

})