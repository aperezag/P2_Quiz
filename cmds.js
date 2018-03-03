const model = require('./model');

const {log, biglog, errorlog, colorize} = require("./out");

exports.helpCMD = rl =>{
	  log("Comandos:");
      log("		h|help - Muestra esta ayuda.");
      log("		list - Listar los quizzes existentes.");
      log("		show <id> - Muestra la pregunta y la respuesta el quiz indicado.");
      log("		add - Añadir un nuevo quiz interactivamente.");
      log("		delete <id> - Borrar el quiz indicado.");
      log("		edit <id> - Editar el quiz indicado.");
      log("		test <id> - Probar el quiz indicado.");
      log("		p|play - Jugar a preguntar aleatoriamente todos los quizzes.");
      log("		credits - Créditos.");
      log("		q|quit - Salir del programa.");
      rl.prompt();
}

exports.listCMD = rl =>{

	model.getAll().forEach((quiz,id) => {
		log(` [${colorize(id, 'magenta')}]: ${quiz.question}`);
	});


	 rl.prompt();
};

exports.quitCMD = rl =>{
	rl.close();
};

exports.addCMD = rl =>{
	rl.question(colorize('Intorduzca una pregunta: ', 'red'), question => {
		rl.question(colorize('Introduzca la respuesta:', 'red'), answer => {
			model.add(question, answer);
			log(` ${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>','magenta')}${answer}`);
			rl.prompt();
		});
	});
};

exports.editCMD = (rl,id)  =>{
	if (typeof id === "undefined"){
		errorlog(`Falta el parámetro id.`);
		rl.prompt();
	}else{
		try{
			rl.question(colorize('Intorduzca una pregunta: ', 'red'), question => {
				rl.question(colorize('Introduzca la respuesta', 'red'), answer => {
				model.update(id, question, answer);
				log(` Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize( '=>', 'magenta')} ${answer}`);
					rl.prompt();
				});
			});
		}catch(error) {
			errorlog(error.message);
			rl.prompt();
		}
	}
	
};

exports.showCMD = (rl, id)  =>{
	
	if (typeof id === "undefined"){
		errorlog(`Falta el parámetro id.`);
	}else{
		try{
			const quiz = model.getByIndex(id);
			log(`[${colorize(id, 'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
		}catch(error) {
			errorlog(error.message);
		}
	}


	rl.prompt();
};

exports.testCMD = (rl, id)  =>{
	log('Probar el quiz indicado.','red');
	rl.prompt();
};

exports.playCMD = rl =>{
	log('Jugar.', 'red');
	rl.prompt();
};

exports.deleteCMD = (rl, id)  =>{
	if (typeof id === "undefined"){
		errorlog(`Falta el parámetro id.`);
	}else{
		try{
			 model.deleteByIndex(id);
		}catch(error) {
			errorlog(error.message);
		}
	}
	rl.prompt();
};

exports.creditsCMD = rl =>{
	log('Autores de la práctica');
    log('Alejandro Pérez', 'green');
    rl.prompt();
};