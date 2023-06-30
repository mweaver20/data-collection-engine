const { Client } = require('tplink-smarthome-api');

const client = new Client();

client.startDiscovery().on('device-new', (device) => {
    if (device.alias === 'MTvPlug') {
        console.log('Found device:', device.alias);
        const ip = device.host;
        console.log('Plug IP address:', ip);

        // Use the IP address to connect to the plug and perform operations
        // Replace the following code with your desired functionality
        const plug = client.getDevice({ host: ip }).then((device) => {
            device.getSysInfo().then(console.log);
        });

    }

    // Retrieve the emeter readings
    plug.getInfo().then((info) => {
        const emeterData = info.emeter.realTime;

        const voltage = emeterData.voltage;
        const current = emeterData.current;
        const power = emeterData.power;
        const totalKWh = emeterData.total;

        // Perform any operations with the emeter readings
        console.log('Voltage:', voltage);
        console.log('Current:', current);
        console.log('Power:', power);
        console.log('Total KWh:', totalKWh);
    }).catch((error) => {
        console.error('Error retrieving emeter readings:', error);
    });
});
