# **Proyecto de Pruebas con Cypress
Este repositorio contiene un conjunto de pruebas automatizadas utilizando Cypress. Cypress es una herramienta de prueba de extremo a extremo que facilita la escritura y el mantenimiento de pruebas para aplicaciones web.
## Descripción
Este proyecto está diseñado para proporcionar una suite de pruebas automatizadas para onboardings. Utilizamos Cypress debido a su facilidad de uso, rapidez y capacidad de proporcionar una experiencia de prueba completa para aplicaciones web.

## Instalación
Para comenzar a trabajar con este proyecto, necesitas tener Node.js y npm instalados. Luego, sigue los siguientes pasos:

###Clona este repositorio:
git clone https://github.com/socampo13/cypress_template_testing.git

### Navega al directorio del proyecto:
cd tu-repositorio

###Instala las dependencias:
npm install
npm install cypress --save-dev

### Uso
Para ejecutar las pruebas, puedes usar el siguiente comando:

npm run cy:open

En caso de no aparecer en el package.json, haz el siguiente cambio en los scripts del package.json:
"scripts": {
    "cy:open": "cypress open"
  }
Luego de guardar, puedes ejecutar el npm run cy:open en la línea de comandos para correr el framework. 

Cypress documentation: https://docs.cypress.io/guides/overview/why-cypress
