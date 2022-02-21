const be_result = (result) => document.getElementById("result").innerText = result

const shorten = async () => {
    url = document.getElementById("url").value
    if (!url) {
        be_result("Don't forget the URL!")
        return
    }

    const response = await fetch("/", {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url})
    })

    if (response.status === 400) {
        be_result("Failed to shorten! Did you include the protocol and an FQDN?")
        return
    }

    be_result(await response.text())
}

document.getElementById("shorten").onclick = shorten
