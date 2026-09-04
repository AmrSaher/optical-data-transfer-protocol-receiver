const SUCCESS = new Audio("./assets/done.mp3");

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 10, 
    qrbox: { width: 250, height: 250 },
  },
);

let chunks = {};
let id = null;
let chunksNum = 0;
let payload = null;

function playSuccess() {
    SUCCESS.currentTime = 0; 
    
    SUCCESS.play().catch(error => {
        console.warn("Audio playback prevented by browser policy. User must interact with the page first.", error);
    });
}

function onScanSuccess(decodedText, decodedResult) {
  let chunk = JSON.parse(decodedText);

  if (chunk?.id && chunksNum <= 0) {
    if (id != null && id != chunk.id) {
      chunks = {};
      payload = null;
      document.querySelector("#payload").value = "";
    } else if (id != null && id == chunk.id && payload != null) {
      return;
    }

    chunksNum = chunk.chunks;
    id = chunk.id;
  }

  if (chunksNum > 0 && !chunk?.id) {
    chunks[chunk.seq] = chunk.value;
  }

  if (Object.keys(chunks).length == chunksNum && chunksNum > 0) {
    let payload = Object.values(chunks).join("");
    document.querySelector("#payload").value = payload;
    playSuccess();
  }
}

function onScanFailure(error) {}

html5QrcodeScanner.render(onScanSuccess, onScanFailure);
