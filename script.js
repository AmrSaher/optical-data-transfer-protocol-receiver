const SUCCESS = new Audio("./assets/done.mp3");

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 10, 
    qrbox: { width: 250, height: 250 },
  },
);

let chunks = {};
let chunksNum = 0;

function playSuccess() {
    SUCCESS.currentTime = 0; 
    
    SUCCESS.play().catch(error => {
        console.warn("Audio playback prevented by browser policy. User must interact with the page first.", error);
    });
}

function onScanSuccess(decodedText, decodedResult) {
  if (decodedText.startsWith("METADATA") && chunksNum <= 0) {
    chunksNum = JSON.parse(decodedText.replace("METADATA", "")).chunks;
  }

  if (chunksNum > 0 && !decodedText.startsWith("METADATA")) {
    let chunk = JSON.parse(decodedText);
    chunks[chunk.seq] = chunk.value;
  }

  if (Object.keys(chunks).length == chunksNum && chunksNum > 0) {
    document.querySelector("#payload").value = Object.values(chunks).join("");
    playSuccess();
  }
}

function onScanFailure(error) {}

html5QrcodeScanner.render(onScanSuccess, onScanFailure);
