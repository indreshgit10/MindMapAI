const canvas = document.querySelector("#canvasArea");
const addNodeBtn = document.querySelector("#addNodeBtn");
const connectBtn = document.getElementById("connectBtn");
const voiceBtn = document.querySelector("#voiceBtn");
const saveBtn = document.getElementById("saveBtn");

let nodeCount = 0;
let connections = [];
let selectedNode = null;
let connectMode = false;

connectBtn.addEventListener("click", () => {
    connectMode = !connectMode;
    connectBtn.style.backgroundColor = connectMode ? "#95e600" : "#a2ff00";
});

addNodeBtn.addEventListener("click", () => {
    const userText = prompt("Enter your idea:");
    if (userText && userText.trim() !== "") {
        createNode(userText.trim());
    }
});


voiceBtn.addEventListener("click", () => startVoiceRecognition());

function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support Speech Recognition");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("result", (event) => {
        const spokenText = event.results[0][0].transcript;
        createNode(spokenText);
    });

    recognition.start();
}

saveBtn.addEventListener("click", () => {
    html2canvas(canvas).then(canvasImg => {
        const link = document.createElement("a");
        link.download = "mindmap.png";
        link.href = canvasImg.toDataURL("image/png");
        link.click();
    });
});

function createNode(text = "Main Idea") {
    const node = document.createElement("div");
    node.className = "node cloud";
    node.textContent = text;

    const canvasRect = canvas.getBoundingClientRect();
    node.style.position = "absolute";
    node.style.top = `${canvasRect.height / 2 - 40 + nodeCount * 20}px`;
    node.style.left = `${canvasRect.width / 2 - 60 + nodeCount * 20}px`;

    canvas.appendChild(node);
    nodeCount++;

    node.addEventListener("click", () => {
        if (!connectMode) return;

        if (!selectedNode) {
            selectedNode = node;
        } else if (selectedNode !== node) {
            const svg = document.getElementById("linesLayer");
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            const parentRect = selectedNode.getBoundingClientRect();
            const childRect = node.getBoundingClientRect();

            line.setAttribute("x1", parentRect.left + parentRect.width/2 - canvasRect.left);
            line.setAttribute("y1", parentRect.top + parentRect.height/2 - canvasRect.top);
            line.setAttribute("x2", childRect.left + childRect.width/2 - canvasRect.left);
            line.setAttribute("y2", childRect.top + childRect.height/2 - canvasRect.top);

            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);

            connections.push({parent: selectedNode, child: node, line: line});
            selectedNode = null;
        }
    });

    makeDraggable(node);
    return node;
}

function makeDraggable(el) {
    let startX = 0, startY = 0;
    let posX = 0, posY = 0;

    el.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        document.addEventListener("mousemove", elementDrag);
        document.addEventListener("mouseup", closeDrag);
    }

    function elementDrag(e) {
        e.preventDefault();
        const offsetX = e.clientX - startX;
        const offsetY = e.clientY - startY;
        startX = e.clientX;
        startY = e.clientY;
        posX += offsetX;
        posY += offsetY;
        el.style.transform = `translate(${posX}px, ${posY}px)`;

        connections.forEach(conn => {
            if (conn.parent === el || conn.child === el) {
                const parentRect = conn.parent.getBoundingClientRect();
                const childRect = conn.child.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                conn.line.setAttribute("x1", parentRect.left + parentRect.width/2 - canvasRect.left);
                conn.line.setAttribute("y1", parentRect.top + parentRect.height/2 - canvasRect.top);
                conn.line.setAttribute("x2", childRect.left + childRect.width/2 - canvasRect.left);
                conn.line.setAttribute("y2", childRect.top + childRect.height/2 - canvasRect.top);
            }
        });
    }

    function closeDrag() {
        document.removeEventListener("mousemove", elementDrag);
        document.removeEventListener("mouseup", closeDrag);
    }
}