var config = {};

config.select = {};
config.vote = {};


// Seleccion random
config.select.ventana = 10; // % del total para la ventana de seleccion
config.select.minLength = 50; // minimo para usar ventana.
config.select.minVentana = 5; // ventana minama de seleccion

// Vote
config.vote.NIVEL_PROTEGIDO = 50; // multiplicador para nivel protegido
config.vote.LIMITE_NIVEL_PROTEGIDO = 30; // jugador esta en nivel protegido si times < limite

module.exports = config;