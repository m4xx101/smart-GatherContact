# smart-GatherContact

This tool is designed to assist in penetration testing efforts by facilitating the enumeration and reconnaissance of email addresses associated with a given domain. By leveraging publicly available information, this Chrome Extension simplifies the process of gathering potential targets for further security assessment and testing.

## Purpose

The Email Enumeration and Reconnaissance Tool aids security professionals in identifying email addresses through Google search results. It automates the extraction of names and formats them into email addresses based on predefined formats, streamlining the initial phase of penetration testing.

## Features

- Extracts names from Google search result titles to generate email addresses.
- Supports multiple email formatting options to match common organizational patterns.
- Allows for the downloading of generated email lists for further analysis and testing.

## Installation

1. Clone this repository to your local machine.
2. Navigate to `chrome://extensions/` in your Google Chrome browser.
3. Enable "Developer mode" at the top right.
4. Click "Load unpacked" and select the cloned project folder.
5. The extension should now be installed and visible in your extensions list.

## Usage

1. Perform a Google search relevant to your target domain or organization using following Google Dork:
```
site:linkedin.com/in "Company Name"
```
2. Scroll till the end of the page.
2. Click the extension icon in your browser to open the popup interface.
3. Enter the target domain and select the desired email formats.
4. Click "Go" to extract names and generate email addresses.
5. Once names are extracted, the "Download" button will enable, allowing you to download the results as a `.txt` file (Click multiple formates if needed).

## Credits

- Inspired by the methodologies of open-source tools such as WebPaste and GatherContacts.
- This project leverages Google search result parsing to identify potential email formats associated with a specific domain.
