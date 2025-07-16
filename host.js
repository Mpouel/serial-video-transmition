document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const statusDiv = document.getElementById('status');

    startButton.addEventListener('click', async () => {
        try {
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            statusDiv.textContent = 'Status: Connected and sending data';

            let counter = 0;
            const writer = port.writable.getWriter();

            setInterval(async () => {
                const data = `Screen Data: ${counter++}\n`;
                await writer.write(new TextEncoder().encode(data));
                console.log(`Sent: ${data}`);
            }, 1000);

        } catch (error) {
            statusDiv.textContent = `Error: ${error}`;
        }
    });
});
