//marrja e komponenteve nga dokumenti HTML

const button =document.getElementById("result"),
    emri=document.getElementById("emri"),
     tipi=document.getElementById("Lloji"),
     results=document.querySelector(".results"),
     search=document.getElementById("Search");


//kerkohen qe profilet te qendrojne edhe pasi te jete hequr faqja prandaj perdor storage te web
const Profilet=JSON.parse(localStorage.getItem("Profili")||"[]")

//Kerkesa per valdiim te inputit qe te kemi te pakten 2 kraktere ne fushe
emri.addEventListener("keyup",()=>{
    let gajtesia=emri.value.length
   if(gajtesia<2){
        button.disabled=true
        button.classList.add("disabled")
    }
    else{
        button.disabled=false
        button.classList.remove("disabled")
    }
})



//kerkesa per kerkim te rezultateve
//rezultatet jane objekte ne nje vektor dhe kerkim behet me ane te tiparit EMRI dhe funksionit include

search.addEventListener('keyup',()=>{
    let name=search.value
    filter = search.value.toUpperCase();
    if(name){
        document.querySelectorAll(".result").forEach(profil =>profil.remove());
        let output=``;
        Profilet.forEach((note,index) => {
        if(note.Emri.includes(name)){
            output+=`
                <div class="result">
                <div class="profile">
                    <div class="photo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="">
                    </div>
                    <div class="details">
                        <span>${note.Emri}</span>
                        <span>${note.Lloji}</span>
                    </div>

                </div>
                <div class="delete"onclick="deleteNote(${index})" >
                        <div></div>
                        <div></div>
                </div>
            </div>`
        }   
        });
        results.innerHTML=output
        
    }
    else{
        showNotes()
    }

})

    


//funksion er marrjen e te dhenave nga lokalstorage
function showNotes(){

        //fillimisht heqim ato qe kemi te shfaqura
        //bejme iterim nga lokal storage dhe shkruajme i shkruajme koponentet
        document.querySelectorAll(".result").forEach(profil =>profil.remove());
        let output=``;
        Profilet.forEach((note,index) => {
          
            output+=`
            <div class="result">
            <div class="profile">
                <div class="photo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="">
                </div>
                <div class="details">
                    <span>${note.Emri}</span>
                    <span>${note.Lloji}</span>
                </div>

            </div>
            <div class="delete"onclick="deleteNote(${index})" >
                    <div></div>
                    <div></div>
            </div>
        </div>`
        });
        results.innerHTML=output
       

}
   
//therrasim funksioni per here te pare
showNotes()
button.addEventListener("click", e=>{
        e.preventDefault();
        let emer =emri.value;
        let lloji=tipi.value;

        if(emer || lloji) {
            let Profili ={
                Emri:emer,
                Lloji:lloji,
            }

            if(Profilet){
                Profilet.push(Profili)
            }
    
            localStorage.setItem("Profili",JSON.stringify(Profilet));
            showNotes();
        }
        
})


//funksion per fshirje te proilit ku si input merr nje index qe ja japim gjate iterimit
//therritet nga div qe krijohet nga javascript
function deleteNote(noteid){
    let confirmDel = confirm("A doni ta fshini kete Profil");
    if(!confirmDel) return;
    
    Profilet.splice(noteid,1);
    localStorage.setItem("Profili",JSON.stringify(Profilet));
    showNotes();
}

