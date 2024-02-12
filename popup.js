document.addEventListener('DOMContentLoaded', function() {
    const goButton = document.getElementById('goButton');
    const downloadButton = document.getElementById('downloadButton');
    const domainInput = document.getElementById('domainInput');
    const formatCheckboxes = document.querySelectorAll('input[name="format"]');

    function formatEmailAddress(firstName, lastName, format, domain) {
        let email = format.replace('john.doe', `${firstName.toLowerCase()}.${lastName.toLowerCase()}`)
                          .replace('johnd', `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`)
                          .replace('jdoe', `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`)
                          .replace('john', firstName.toLowerCase())
                          .replace('doej', `${lastName.charAt(0).toLowerCase()}${firstName.toLowerCase()}`)
                          .replace('domain.com', domain);
        return email;
    }

    function downloadFormattedEmails(names, selectedFormats, domain) {
        selectedFormats.forEach(format => {
            let emails = names.map(name => formatEmailAddress(name.firstName, name.lastName, format, domain));
            let blob = new Blob([emails.join('\n')], { type: 'text/plain' });
            let url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: `emails_${format.replace('@domain.com', '').replace(/\./g, '_')}.txt`
            });
        });
    }

    goButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "extractNames"}, function(response) {
                if (response && response.profiles && response.profiles.length > 0) {
                    console.log("Names extracted:", response.profiles);
                    downloadButton.disabled = false;
                } else {
                    console.log("No names extracted. Make sure you are on a Google search results page.");
                    downloadButton.disabled = true;
                }
            });
        });
    });

    downloadButton.addEventListener('click', function() {
        const selectedFormats = Array.from(formatCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const domain = domainInput.value.trim();
        if (selectedFormats.length > 0 && domain) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "extractNames"}, function(response) {
                    if (response && response.profiles) {
                        downloadFormattedEmails(response.profiles, selectedFormats, domain);
                    } else {
                        console.error("Failed to download: No profiles available.");
                    }
                });
            });
        } else {
            console.log('Please select at least one email format and enter a domain.');
        }
    });
});
