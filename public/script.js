document.addEventListener('DOMContentLoaded', async function () {
    const ips = ['8.8.8.8', '8.8.4.4']; // Add more IPs as needed
    const statusContainer = document.getElementById('status-container');

    for (const ip of ips) {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status';
        statusDiv.innerText = `Checking ${ip}...`;
        statusContainer.appendChild(statusDiv);

        try {
            const response = await fetch(`/ping?host=${ip}`);
            const result = await response.json();
            statusDiv.innerText = `${result.host} is ${result.alive ? 'online' : 'offline'}`;
            statusDiv.className = `status ${result.alive ? 'online' : 'offline'}`;
        } catch (error) {
            statusDiv.innerText = `Error checking ${ip}`;
            statusDiv.className = 'status offline';
        }
    }
});