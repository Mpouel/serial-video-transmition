document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const dataDisplay = document.getElementById('dataDisplay');

    connectButton.addEventListener('click', async () => {
        try {
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });

            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
            const reader = textDecoder.readable.getReader();

            dataDisplay.innerHTML = '<p>Connected to serial device. Reading data...</p>';

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    reader.releaseLock();
                    break;
                }
                dataDisplay.innerHTML += `<p>${value}</p>`;
            }
        } catch (error) {
            dataDisplay.innerHTML = `<p>Error: ${error}</p>`;
        }
    });
});
