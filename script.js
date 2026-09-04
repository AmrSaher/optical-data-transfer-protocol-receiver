// Initialize the scanner with the target div ID
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 10, // Frames per second to scan
    qrbox: { width: 250, height: 250 }, // Scanning box overlay
  },
  /* verbose= */ false,
);

// Define what happens when a barcode is successfully read
function onScanSuccess(decodedText, decodedResult) {
  console.log(`Barcode scanned: ${decodedText}`);
  alert(`Scanned: ${decodedText}`);

  // Optional: Stop scanning after the first successful read
  // html5QrcodeScanner.clear();
}

// Define what happens on scan failure (usually ignored)
function onScanFailure(error) {
  // Runs constantly as the camera searches for a barcode.
  // Leave empty or use for debugging.
}

// Start rendering the scanner
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
