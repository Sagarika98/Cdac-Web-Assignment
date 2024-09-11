document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Clear previous messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('loginMessage').textContent = '';
    
    const spinner = document.getElementById('spinner');
    const loginButton = document.getElementById('loginBtn');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe');

    let valid = true;

    // Basic email validation
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    // Basic password validation (at least 6 characters)
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    if (!valid) return;

    // Show loading spinner and disable the form
    spinner.style.display = 'block';
    loginButton.disabled = true;


    // If the "Remember Me" box is checked, store email and password in localStorage
    if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    } else {
        // If "Remember Me" is unchecked, clear localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }


    // Simulate a delay to visualize the spinner
    setTimeout(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            const data = await response.json();
            console.log(data);
            document.getElementById('loginMessage').textContent = 'Login successful!';

            // Reload page after successful login to simulate a new session
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            document.getElementById('loginMessage').textContent = 'Login failed. Please try again.';
        } finally {
            // Hide spinner and re-enable the form regardless of success or failure
            spinner.style.display = 'none';
            loginButton.disabled = false;
        }
    }, 2000); // Simulating a 1-second delay for the spinner to be visible
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}




// Password visibility toggle functionality
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function (e) {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle the icon between eye and eye-slash
    this.classList.toggle('fa-eye-slash');
});


// On page load, check if "Remember Me" was checked previously
window.onload = function() {
    const rememberedEmail = localStorage.getItem('email');
    const rememberedPassword = localStorage.getItem('password');
    
    if (rememberedEmail && rememberedPassword) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('password').value = rememberedPassword;
        document.getElementById('rememberMe').checked = true; // Check the "Remember Me" box
    }
};