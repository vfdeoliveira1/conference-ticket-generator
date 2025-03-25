document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('avatarError').textContent = '';
    document.getElementById('githubError').textContent = '';

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const avatar = document.getElementById('avatar').files[0];
    const github = document.getElementById('github').value.trim();

    let valid = true;

    // Validate name
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required.';
        valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Validate avatar
    if (!avatar) {
        document.getElementById('avatarError').textContent = 'Avatar is required.';
        valid = false;
    } else if (avatar.size > 2 * 1024 * 1024) { // 2MB limit
        document.getElementById('avatarError').textContent = 'Avatar must be less than 2MB.';
        valid = false;
    } else if (!['image/jpeg', 'image/png'].includes(avatar.type)) {
        document.getElementById('avatarError').textContent = 'Avatar must be a JPG or PNG image.';
        valid = false;
    }

    // Validate GitHub username
    if (!github) {
        document.getElementById('githubError').textContent = 'GitHub username is required.';
        valid = false;
    }

    // If valid, generate ticket
    if (valid) {
       // Atualizar o título e subtítulo
       document.getElementById('mainTitle').innerHTML = `Congrats, <span class="highlight-name">${name}</span>! Your ticket is ready.`;
       document.getElementById('subTitle').innerHTML = `We've emailed your ticket to <span class="highlight-email">${email}</span> and will send updates in the run up to the event.`;

        document.getElementById('ticketName').textContent = `Name: ${name}`;
       // document.getElementById('ticketEmail').textContent = `Email: ${email}`;
        document.getElementById('ticketGithub').textContent = `GitHub: ${github}`;

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('ticketAvatar').src = e.target.result;
            document.getElementById('ticket').style.display = 'block'; // Mostrar o ticket
            document.getElementById('ticketForm').style.display = 'none'; // Ocultar o formulário
        };
        reader.readAsDataURL(avatar);

        // Reset the form
        document.getElementById('ticketForm').reset();
    }
});