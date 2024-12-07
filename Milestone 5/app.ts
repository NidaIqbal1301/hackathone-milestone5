// Add interactivity to dynamically generate the resume

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const resumeOutput = document.getElementById("resume-output") as HTMLElement;
    const shareableLinkContainer = document.getElementById("sharable-link-container") as HTMLDivElement;
    const shareableLinkElement = document.getElementById("sharable-link") as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        // Get the form data
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const profileImgUrl = (document.getElementById("profile-img") as HTMLInputElement).value;

        const education = (document.getElementById("education") as HTMLInputElement).value;
        const gradYear = (document.getElementById("grad-year") as HTMLInputElement).value;

        const workTitle = (document.getElementById("work-title") as HTMLInputElement).value;
        const company = (document.getElementById("company") as HTMLInputElement).value;
        const workDuration = (document.getElementById("work-duration") as HTMLInputElement).value;

        const skills = (document.getElementById("skills") as HTMLInputElement).value.split(',');

        // Clear the previous resume preview
        resumeOutput.innerHTML = '';

        // Create the editable resume
        const resumeHTML = `
            <h3>Personal Information</h3>
            <h2><spen contenteditable="true">${name}</spen></h2>
            <p><strong>Email:</strong><spen contenteditable="true">${email}</spen></p>
            <p><strong>Phone:</strong><spen contenteditable="true"> ${phone}</p></spen>
            ${profileImgUrl ? `<img src="${profileImgUrl}" alt="${name}'s Profile Picture">` : ''}
            
            <h3>Education</h3>
            <p contenteditable="true">${education} (Graduated: ${gradYear})</p>
            
            <h3>Work Experience</h3>
            <p contenteditable="true"><strong>${workTitle}</strong> at <em>${company}</em> (${workDuration})</p>
            
            <h3>Skills</h3>
            <ul>
            ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
            </ul>
        `;

        resumeOutput.innerHTML = resumeHTML;

        // Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {

// Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}}
    });
});
