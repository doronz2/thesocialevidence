const baseUrl = "https://thesocialevidence-extension.appspot.com";

async function save(range) {
  const comment = (prompt("Comment ?") || "").trim();
  if (!comment) return;
  console.log("range: ", range)
  console.log("range.startContainer:", range.startContainer)
  console.log("range.startOffset: ", range.startOffset)
  console.log("range.endContainer:", range.endContainer)
  console.log("range.endOffset: ", range.endOffset)

  const data = {
    url: location.href,
    comment: comment,
    range: {
      startContainer: encodePath(range.startContainer),
      startOffset: range.startOffset,
      endContainer: encodePath(range.endContainer),
      endOffset: range.endOffset,
    },
  };
  console.log("start path: ", encodePath(range.startContainer))
  console.log("end path: ", encodePath(range.endContainer))

  const url = baseUrl + "/api/quotes";
  console.log("url: ", url)
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  highlight(range, comment);
}

async function load() {
  const url = baseUrl + "/api/quotes?url=" + encodeURIComponent(location.href);
  const response = await fetch(url);
  const quotes = await response.json();
  for (const quote of quotes) {
    const data = JSON.parse(quote.range);
    const range = document.createRange();
    try {
      range.setStart(decodePath(data.startContainer), data.startOffset);
      range.setEnd(decodePath(data.endContainer), data.endOffset);
      console.log("path element start: ", decodePath(data.startContainer))
      console.log("path element end: ", decodePath(data.endContainer))
      highlight(range, quote.comment);
    } catch (e) {
      console.error("error highlighting range", e);
    }
  }
}

function highlight(range, comment) {
  const span = document.createElement("span");
  span.style.backgroundColor = "orange";
  span.onclick = () => alert(comment);
  try {
    range.surroundContents(span);
  } catch (e) {
    console.error(e);
  }
}

function encodePath(element) {
  const path = [];
  while (true) {
    let i = 0;
    for (const child of element.parentElement.childNodes) {
      if (child === element) {
        break;
      }
      i++;
    }
    path.unshift(i);
    element = element.parentElement;
    if (element == document.body) break;
  }
  return path;
}

function decodePath(path) {
  let element = document.body;
  for (const i of path) {
    element = element.childNodes[i];
  }
  return element;
}

function comment() {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.toString()) {
      const range = sel.getRangeAt(0);
      save(range);
    }
  }
}

const button = document.createElement("button");
button.classList.add("the-social-evidence-select-button");
button.onclick = comment;
button.innerText = "COMMENT";
document.body.appendChild(button);
setTimeout(load, 2000);
