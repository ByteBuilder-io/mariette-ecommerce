export const htmlClient = `
<!DOCTYPE html>
<html>

<head>
    <title>Mariette</title>
    <style>
        /* Estilos para el encabezado */
        header {
            text-align: center;
            background-color: #d7c0b4;
            padding: 20px;
        }

        /* Estilos para el cuerpo */
        main {
            padding: 20px;
        }

        /* Estilos para el pie de página */
        footer {
            text-align: center;
            background-color: #d7c0b4;
            padding: 20px;
        }

        img {
            width: 250px;
            height: 100px;
        }

        .fondo-gris {
            background-color: #f2f2f2;
            /* un tono de gris claro */
        }
    </style>
</head>

<body>
    <header>
        <img src="https://mariette.com.mx/wp-content/uploads/2022/10/cropped-LOGO-2-mariette.png"
            alt="Logo de la empresa">
    </header>
    <main>
        <p>Hola: {{name}}</p>
        <p>Gracias por ponerte en contacto con nosotros. En breve nos pondremos en contacto contigo.</p>
        <p>Cuerpo de mensaje</p>
        <p class="fondo-gris"><em>{{cuerpo_msg}}</em></p>
    </main>
    <footer>
        <a href="https://www.facebook.com/tu_pagina" target="_blank"><i class="fab fa-facebook"
                style="color: white; font-size: 30px; margin-right: 10px;"></i></a>
        <a href="https://www.instagram.com/tu_pagina" target="_blank"><i class="fab fa-instagram"
                style="color: white; font-size: 30px;"></i></a>
        <p>
            <a href="https://www.ejemplo.com">Pagina Web</a>
            <a href="https://www.ejemplo.com">Terminos y condiciones</a>
            <a href="https://www.ejemplo.com">Aviso de privacidad</a>
        </p>
    </footer>
</body>

</html>

`;

export const htmlUser = `
<!DOCTYPE html>
<html>

<head>
    <title>Mariette</title>
    <style>
        /* Estilos para el encabezado */
        header {
            text-align: center;
            background-color: #d7c0b4;
            padding: 20px;
        }

        /* Estilos para el cuerpo */
        main {
            padding: 20px;
        }

        /* Estilos para el pie de página */
        footer {
            text-align: center;
            background-color: #d7c0b4;
            padding: 20px;
        }

        img {
            width: 250px;
            height: 100px;
        }

        .fondo-gris {
            background-color: #f2f2f2;
            /* un tono de gris claro */
        }
    </style>
</head>

<body>
    <header>
        <img src="https://mariette.com.mx/wp-content/uploads/2022/10/cropped-LOGO-2-mariette.png"
            alt="Logo de la empresa">
    </header>
    <main>
        <p>Hola tienes un nuevo mensaje de;</p>
        <p><b>Nombre</b></p>
        <p>{{name}}</p>
        <p><b>Correo</b></p>
        <p>{{email}}</p>
        <p><b>Mensaje</b></p>
        <p class="fondo-gris"><em>{{msg}}</em></p>
    </main>
    <footer>
        <a href="https://www.facebook.com/tu_pagina" target="_blank"><i class="fab fa-facebook"
                style="color: white; font-size: 30px; margin-right: 10px;"></i></a>
        <a href="https://www.instagram.com/tu_pagina" target="_blank"><i class="fab fa-instagram"
                style="color: white; font-size: 30px;"></i></a>
        <p>
            <a href="https://www.ejemplo.com">Pagina Web</a>
            <a href="https://www.ejemplo.com">Terminos y condiciones</a>
            <a href="https://www.ejemplo.com">Aviso de privacidad</a>
        </p>
    </footer>
</body>

</html>
`

export const sampleText = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;
