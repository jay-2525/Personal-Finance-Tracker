const API_URL = "http://localhost:5000/api/transactions"

async function loadTransactions(){

    const res = await fetch(API_URL)
    const data = await res.json()

    const list = document.getElementById("list")
    const balanceEl = document.getElementById("balance")

    list.innerHTML = ""

    let balance = 0

    data.forEach(t => {

        const li = document.createElement("li")

        li.innerHTML = `
        ${t.title} : ₹${t.amount} (${t.type})
        <button onclick="deleteTransaction('${t._id}')">Delete</button>
        `

        list.appendChild(li)

        if(t.type === "income"){
            balance += t.amount
        }else{
            balance -= t.amount
        }

    })

    balanceEl.innerText = "Balance: ₹" + balance

}

async function addTransaction(){

    const title = document.getElementById("title").value
    const amount = parseInt(document.getElementById("amount").value)
    const type = document.getElementById("type").value

    if(title === "" || amount === ""){
        alert("Please fill all fields")
        return
    }

    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title,amount,type})
    })

    document.getElementById("title").value = ""
    document.getElementById("amount").value = ""

    loadTransactions()

}

async function deleteTransaction(id){

    await fetch(API_URL + "/" + id,{
        method:"DELETE"
    })

    loadTransactions()

}

loadTransactions()