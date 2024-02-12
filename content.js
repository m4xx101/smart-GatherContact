function extractNamesFromSearchResults() {
    let extractedNames = [];
    const titles = document.querySelectorAll('h3');

    titles.forEach(title => {
        let text = title.innerText.trim();
        let words = text.split(' ');
        if (words.length >= 2) {
            let firstName = words[0];
            let lastName = words[1];
            extractedNames.push({ firstName, lastName });
        }
    });

    return extractedNames;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractNames') {
        const names = extractNamesFromSearchResults();
        sendResponse({ profiles: names });
    }
    return true;
});
