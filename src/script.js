document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('avatarError').textContent = '';
    document.getElementById('githubError').textContent = '';

    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const avatar = document.getElementById('avatar').files[0];
    const github = document.getElementById('github').value.trim();


    
    let valid = true;

   
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
    } else if (avatar.size > 2 * 1024 * 1024) { 
        document.getElementById('avatarError').textContent = 'Avatar must be less than 2MB.';
        valid = false;
    } else if (!['image/jpeg', 'image/png'].includes(avatar.type)) {
        document.getElementById('avatarError').textContent = 'Avatar must be a JPG or PNG image.';
        valid = false;
    }

    
    if (!github) {
        document.getElementById('githubError').textContent = 'GitHub username is required.';
        valid = false;
    }

  
    if (valid) {
       
       document.getElementById('mainTitle').innerHTML = `Congrats, <span class="highlight-name">${name}</span>! Your ticket is ready.`;
       document.getElementById('subTitle').innerHTML = `We've emailed your ticket to <span class="highlight-email">${email}</span> and will send updates in the run up to the event.`;

        document.getElementById('ticketName').textContent = `${name}`;
     
        document.getElementById('ticketGithub').textContent = `${github}`;

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('ticketAvatar').src = e.target.result;
            document.getElementById('ticket').style.display = 'block'; 
            document.getElementById('ticketForm').style.display = 'none';
        };
        reader.readAsDataURL(avatar);

       
        document.getElementById('ticketForm').reset();
    }
});


const avatarInput = document.getElementById('avatar');
const uploadIcon = document.getElementById('uploadIcon');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const changeImageBtn = document.getElementById('changeImageBtn');


avatarInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
           
            imagePreview.src = event.target.result;
            imagePreviewContainer.style.display = 'flex';
            
           
            uploadIcon.style.display = 'none';
            document.getElementById('avatarHint').style.display = 'none';
        };
        
        reader.readAsDataURL(file);
    }
});


changeImageBtn.addEventListener('click', function() {
   
    avatarInput.value = '';
    
   
    imagePreviewContainer.style.display = 'none';
    uploadIcon.style.display = '';
    document.getElementById('avatarHint').style.display = '';
    
    
    document.getElementById('avatarError').textContent = '';
});