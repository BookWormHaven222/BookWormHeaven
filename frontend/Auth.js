document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            alert('Registro exitoso, puedes iniciar sesión ahora.');
            window.location.href = 'login.html';
        } else {
            alert('Error al registrar: ' + result.error);
        }
    } catch (error) {
        console.error('Error en el registro:', error);
    }
});

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.token) {
            localStorage.setItem('token', result.token);
            alert('Inicio de sesión exitoso');
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else {
            alert('Error al iniciar sesión: ' + result.error);
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
    }
});
