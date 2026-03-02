const searchYT = async (query) => {
    const res = await fetch('https://www.youtube.com/results?search_query=' + encodeURIComponent(query) + '&sp=EgJAAQ%253D%253D'); // EgJAAQ%3D%3D is base64 for 'Live'
    const text = await res.text();
    const match = text.match(/\"videoId\":\"([a-zA-Z0-9_-]{11})\"/);
    return match ? match[1] : null;
};

Promise.all([
    searchYT('Golden Temple Amritsar Live Gurbani'),
    searchYT('Prem Mandir Vrindavan Live Darshan')
]).then(console.log).catch(console.error);
