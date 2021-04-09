function req(endpoint, method, data, onreadystatechange) {
    const request = new XMLHttpRequest();
    const url = 'http://localhost:8080/' + endpoint;
    request.open(method, url);

    if (method.toLowerCase() === "post") {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(data));
    } else {
        request.send(null);
    }

    request.onreadystatechange = onreadystatechange
}

function _buyApReq(data) {
    req("apples/buy", "POST", data, (e) => {
        document.getElementById("js-response").innerHTML
            = "Apples ordered (" + data["amount"] + " " + data["type"].toLowerCase() + ")"
    })
}

function buyApples() {
    const type = document.getElementById("ap-type").value
    const amount = parseInt(document.getElementById("ap-amount").value)
    if (type && amount) {
        _buyApReq({type, amount})
    } else {
        document.getElementById("js-response").innerHTML = "Write correct order"
    }
}

function buyApplesRandom() {
    _buyApReq({
        "type": typeFromNumber(Math.floor(Math.random() * 4)),
        "amount": Math.floor(Math.random() * 20)
    })
}

function typeFromNumber(num) {
    switch (num) {
        case 0:
            return "GREEN"
        case 1:
            return "RED"
        default:
            return "YELLOW"
    }
}

function onAppleListLoaded() {
    const root = document.getElementById("apples-list")

    fetch("http://localhost:8080/apples")
        .then(res => res.json())
        .then(res => res["orders"])
        .then(data => data.forEach(order => {
            const node = document.createElement("p");
            node.innerText = order.amount + " " + order.type.toLowerCase()
            root.appendChild(node)
        }))

}
