document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, nombre_usuario })
        });

        const result = await response.json();
        if (result.success) {
            alert('Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        } else {
            alert('Error al registrar: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
