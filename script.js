
// User credentials database
const users = [
    { email: 'alumno@example.com', password: 'alumno123', role: 'alumno' },
    { email: 'docente@example.com', password: 'docente123', role: 'docente' },
    { email: 'jefe-area@example.com', password: 'jefe123', role: 'jefe-area' },
    { email: 'admin@example.com', password: 'admin123', role: 'administrador' },
    { email: 'par-academico@example.com', password: 'par123', role: 'par-academico' }
];

// Store current user
let currentUser = null;
let previousScreen = null;

// Navigation function
function navigateTo(screenId) {
    // Store previous screen for back navigation
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        previousScreen = activeScreen.id;
        activeScreen.classList.remove('active');
    }

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Go back function
function goBack() {
    if (currentUser) {
        const dashboardId = `dashboard-${currentUser.role}`;
        navigateTo(dashboardId);
    } else if (previousScreen) {
        navigateTo(previousScreen);
    } else {
        navigateTo('welcome-screen');
    }
}

// Login handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    // Clear previous error
    errorElement.textContent = '';

    // Validate credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        const dashboardId = `dashboard-${user.role}`;
        
        // Clear form
        document.getElementById('login-form').reset();
        
        // Navigate to appropriate dashboard
        navigateTo(dashboardId);
    } else {
        errorElement.textContent = 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.';
    }
}

// Registration handler
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;
    const successElement = document.getElementById('register-success');

    // Clear previous messages
    successElement.textContent = '';

    // Validate form
    if (!name || !email || !password || !role) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        alert('Este correo electrónico ya está registrado.');
        return;
    }

    // Add new user to the system (in real app, this would be sent to backend)
    users.push({ email, password, role });

    // Show success message
    successElement.textContent = `¡Registro exitoso! Usuario: ${name} registrado como ${getRoleName(role)}.`;
    
    // Clear form
    document.getElementById('register-form').reset();

    // Redirect to login after 2 seconds
    setTimeout(() => {
        successElement.textContent = '';
        navigateTo('login-screen');
    }, 2000);
}

// Get role display name
function getRoleName(role) {
    const roleNames = {
        'alumno': 'Alumno',
        'docente': 'Docente',
        'jefe-area': 'Jefe de Área',
        'administrador': 'Administrador Institucional',
        'par-academico': 'Par Académico'
    };
    return roleNames[role] || role;
}

// Logout function
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        currentUser = null;
        previousScreen = null;
        navigateTo('welcome-screen');
        
        // Clear any form data
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.reset());
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Evaluación Docente 360° - Inicializado');
    
    // Set welcome screen as active on load
    navigateTo('welcome-screen');
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key to go back
    if (event.key === 'Escape') {
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id !== 'welcome-screen') {
            goBack();
        }
    }
});
