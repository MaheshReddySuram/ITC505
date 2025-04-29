document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthMeter = document.getElementById('strengthMeter');

    // Real-time password strength feedback
    passwordInput.addEventListener('input', updatePasswordStrength);
    
    // Real-time confirm password validation
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        if (validateForm()) {
            alert('Registration successful!');
            form.reset();
            strengthMeter.style.width = '0';
        }
    });

    function updatePasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) strength += 15;
        if (/\d/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        // Update strength meter
        strengthMeter.style.width = `${Math.min(strength, 100)}%`;
        strengthMeter.style.backgroundColor = getStrengthColor(strength);
    }

    function getStrengthColor(strength) {
        if (strength < 40) return '#e74c3c';
        if (strength < 70) return '#f39c12';
        return '#2ecc71';
    }

    function validatePasswordMatch() {
        const confirmPassword = confirmPasswordInput.value;
        const password = passwordInput.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (confirmPassword && password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            return false;
        }
        errorElement.textContent = '';
        return true;
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => {
            el.textContent = '';
        });
    }

    function validateForm() {
        let isValid = true;
        const firstName = sanitizeInput(document.getElementById('firstName').value.trim());
        const lastName = sanitizeInput(document.getElementById('lastName').value.trim());
        const email = sanitizeInput(document.getElementById('email').value.trim());
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // First name validation
        if (!firstName) {
            showError('firstNameError', 'First name is required');
            isValid = false;
        } else if (firstName.length < 2) {
            showError('firstNameError', 'Must be at least 2 characters');
            isValid = false;
        }

        // Last name validation
        if (!lastName) {
            showError('lastNameError', 'Last name is required');
            isValid = false;
        } else if (lastName.length < 2) {
            showError('lastNameError', 'Must be at least 2 characters');
            isValid = false;
        }

        // Email validation
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Password validation
        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showError('passwordError', 'Password must be at least 8 characters');
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            showError('passwordError', 'Include at least one uppercase letter');
            isValid = false;
        } else if (!/\d/.test(password)) {
            showError('passwordError', 'Include at least one number');
            isValid = false;
        }

        // Confirm password validation
        if (!validatePasswordMatch()) {
            isValid = false;
        }

        return isValid;
    }

    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    function sanitizeInput(input) {
        return input.replace(/</g, "&lt;")
                   .replace(/>/g, "&gt;")
                   .replace(/"/g, "&quot;")
                   .replace(/'/g, "&#39;");
    }
});