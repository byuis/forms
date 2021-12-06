evaluation='<select name="a"><option value=1>1-Much less<br>than average</option><option value=2>2</option><option value=3>3-About average</option><option value=4>4</option><option value=5>5-Much more than average</option>'
let team
let evaluations

function configure(){
    const params = atob(window.location.search.substr(1)).split("|")
    document.getElementById("netid").value=params[0]
    team=params[1].split(",")
    evaluations=params[2].split(",")
    document.getElementById("student_name").innerHTML = team[0]
   //console.log(team.length)
    for(let e=0; e < evaluations.length; e++){
        const one_eval = evaluations[e]
        const table=document.createElement('table')
        const row=table.insertRow() 
        row.innerHTML=`
        <th class="first-col"></th>
        <th>Much less<br>than other<br>group members</th>
        <th></th>
        <th>About the same<br>as other<br>group members</th>
        <th></th>
        <th>Much more<br>than other<br>group members</th>
    `

    for(let i=team.length-1;i>-1;i--){
        console.log("team[i]",team[i], typeof team[i], team[i].length)
        if(team[i].replace(/ /g, '')==="null"){
            console.log("In null")
            team.splice(i, 1)
        }
    }


        for(let i=team.length-1;i>-1;i--){
     
            const row  = table.insertRow()
            row.className="normal"
            row.id="row" + i + "q" + e
            let suffix=""
            if(i===0){suffix=" (you)"}

            row.innerHTML=` <td class="first-col">${team[i]}${suffix}</td>
            <td><input type="radio" value="1" name="tm${i}q${e}" /></td>
            <td><input type="radio" value="2" name="tm${i}q${e}" /></td>
            <td><input type="radio" value="3" name="tm${i}q${e}" /></td>
            <td><input type="radio" value="4" name="tm${i}q${e}" /></td>
            <td><input type="radio" value="5" name="tm${i}q${e}" /></td>`
        }

        const evals=document.getElementById("evals")
        const newdiv=document.createElement("div")
        newdiv.innerHTML=`
            <h3>Please rate how your group members contributed to <span class="emphasis">${one_eval}</span>.</h3>
        `
        evals.appendChild(newdiv);
        evals.appendChild(table);
    }

}

function submit_form(){
    const data={}
    let message=null
    let data_comment

    for(let e=0; e < evaluations.length; e++){
        const ev = evaluations[e]
        data[ev]={}
        for(let i=team.length-1;i>-1;i--){
            if (window.event.ctrlKey) {
                //for debugging
                data[ev][team[i]]=randBetween(1,5)
            }else{
                data[ev][team[i]]=null
            }
            for(const btn of document.getElementsByName(`tm${i}q${e}`)){
                if(btn.checked){
                    data[ev][team[i]]=parseInt(btn.value)
                   //console.log("name of button:",btn.name, btn.value)
                    document.getElementById("row" + i + "q" + e).className="normal"
                }
            }
           //console.log("checking", e, i, data[ev][team[i]])
            if(data[ev][team[i]]===null){
               //console.log("null found at ", e, i)
                message="Please complete all evaluations"
                document.getElementById("row" + i + "q" + e).className="error"
            }
        }
    }

    if(message){
        alert(message)
        return false
    }
    if(document.getElementById("comment").value){
      data_comment=document.getElementById("comment").value
    }else if(window.event.ctrlKey){
        //for debugging
        const comment = []
        for(let i=team.length-1;i>0;i--){
            comment.push(team[i].split(" ")[0])
            comment.push(", ")
        }
        comment[comment.length-3]=", and "
        comment[comment.length-1]=" were really great to work with.  I can't imagine a better group.  Please keep us together next semester!!!"
        data_comment=comment.join("")
    }
   //console.log ("data",data)
   document.getElementById("stud_name").value = team[0]
   document.getElementById("comment2").value = data_comment
   document.getElementById("data").value = JSON.stringify(data)
    return true
    
    
}

function randBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

