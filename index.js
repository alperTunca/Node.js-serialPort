var SerialPort = require('serialport'); // Serialport require
var options = {
    baudRate:9600,
    parity : 'none',
    delay : 1000}; // Port options for variable
var port = new SerialPort('COM6', options); // Port definition with directory and options
const readLine = SerialPort.parsers.Readline; // Describes reading data line by line
var portParser = port.pipe(new readLine({delimiter: ';'})); // Delimiter with ';' and pipe variable

port.write('main screen turn on', function(err)
{
    if (err) {
        return console.log('Write Error : ', err.message);
    }
    console.log('Data Ready For Read');
});

port.on('open',function ()
{
    console.log('Port Open');
});

port.on('error', function(err)
{
    console.log('Error : ', err.message);
});


port.on('data',function (data)
{
    console.log (data.toString());
});

function readData() // Data read and checked function
{
    portParser.on('data', function (data)
    {
        if (data.toString()==null)
        {
            console.log("Null");
        }
        console.log('Data : ', data.toString());
        console.log(data.toString().split(",")); //  The data is separated from commas and becomes an array
        if (data.toString().length!==7)
            //In the example arduino code, there are 7 types of data
            //So it is being controlled by seven
        {
            console.log("Missing Data");
        }
    });
}

// Converting to JSON
function toJSON (data)
{
    var json = JSON.stringify(data);
    console.log(json); //json
    console.log(typeof json); //string
}

readData();
