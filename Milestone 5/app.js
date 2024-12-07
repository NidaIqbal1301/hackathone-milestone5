// Add interactivity to dynamically generate the resume
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    var resumeOutput = document.getElementById("resume-output");
    var shareableLinkContainer = document.getElementById("sharable-link-container");
    var shareableLinkElement = document.getElementById("sharable-link");
    var downloadPdfButton = document.getElementById("download-pdf");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Get the form data
        var username = document.getElementById('username').value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var profileImgUrl = document.getElementById("profile-img").value;
        var education = document.getElementById("education").value;
        var gradYear = document.getElementById("grad-year").value;
        var workTitle = document.getElementById("work-title").value;
        var company = document.getElementById("company").value;
        var workDuration = document.getElementById("work-duration").value;
        var skills = document.getElementById("skills").value.split(',');
        // Clear the previous resume preview
        resumeOutput.innerHTML = '';
        // Create the editable resume
        var resumeHTML = "\n            <h3>Personal Information</h3>\n            <h2><spen contenteditable=\"true\">".concat(name, "</spen></h2>\n            <p><strong>Email:</strong><spen contenteditable=\"true\">").concat(email, "</spen></p>\n            <p><strong>Phone:</strong><spen contenteditable=\"true\"> ").concat(phone, "</p></spen>\n            ").concat(profileImgUrl ? "<img src=\"".concat(profileImgUrl, "\" alt=\"").concat(name, "'s Profile Picture\">") : '', "\n            \n            <h3>Education</h3>\n            <p contenteditable=\"true\">").concat(education, " (Graduated: ").concat(gradYear, ")</p>\n            \n            <h3>Work Experience</h3>\n            <p contenteditable=\"true\"><strong>").concat(workTitle, "</strong> at <em>").concat(company, "</em> (").concat(workDuration, ")</p>\n            \n            <h3>Skills</h3>\n            <ul>\n            ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n            </ul>\n        ");
        resumeOutput.innerHTML = resumeHTML;
        // Generate a shareable URL with the username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });
    // Handle PDF download
    downloadPdfButton.addEventListener('click', function () {
        window.print(); // This will open the print dialog and allow the user to save as PDF
    });
    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', function () {
        var urlParams = new URLSearchParams(window.location.search);
        var username = urlParams.get('username');
        if (username) {
            // Autofill form if data is found in localStorage
            var savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                var resumeData = JSON.parse(savedResumeData);
                document.getElementById('username').value =
                    username;
                document.getElementById('name').value =
                    resumeData.name;
                document.getElementById('email').value =
                    resumeData.email;
                document.getElementById('phone').value =
                    resumeData.phone;
                document.getElementById('education').value =
                    resumeData.education;
                document.getElementById('experience').value
                    = resumeData.experience;
                document.getElementById('skills').value =
                    resumeData.skills;
            }
        }
    });
});
