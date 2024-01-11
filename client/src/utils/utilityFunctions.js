// a function to parse string timestamps into real timestamp
export const parseTimestamp = (timestamp) => {
    const [hours, minutes, seconds] = timestamp.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
};

// function to parse content of VTT file recieved from backend
export const parseVTTContent = (vttContent) => {

    // splitting lines of vttContent
    const lines = vttContent.split('\n');

    // filtering only lines with text and timestamp
    const actualLines = lines.filter((lin) => lin !== "" && lin !== "WEBVTT")

    // destructuring actualLines into timestamp and text parts
    const subtitles = actualLines.map((line) => {
        const [timestamp, ...textParts] = line.split(' ');
        const text = textParts.join(' ');
        return { timestamp, text };  // returning timestamp and text
    });

    // returning subtitles
    return subtitles;
};

