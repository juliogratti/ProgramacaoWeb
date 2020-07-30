
var timerId = null; //variavel que armazena a chamada da função timeout

function InciaJogo(){

	var	url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if (nivel_jogo == 1) {//facil -> 120 segundos
		tempo_segundos = 120;
	}

	if (nivel_jogo == 2) {//normal -> 60 segundos
		tempo_segundos = 60;
	}

	if (nivel_jogo == 3) {//dificil -> 30 segundos
		tempo_segundos = 30;
	}
	
	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML =tempo_segundos;

	


	//quantidade de balões
	var	qtd_baloes = 80 ;





	cria_baloes(qtd_baloes);

	//imprimir quantidade de baloes inteiros
	document.getElementById('qtd_baloes_inteiros').innerHTML =qtd_baloes;

	//imprimir quantidade de baloes estourados
	document.getElementById('qtd_baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);

}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if (segundos == -1) {

		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")",1000);


}



function game_over(){
	alert('FIM DE JOGO')

}



function cria_baloes(qtd_baloes){

	for (var i = 1; i <=qtd_baloes; i++) {
		var balao = document.createElement("img");
		balao.src = "imagens/balao_azul_pequeno.png";

		balao.style.margin = '11px';
		balao.id = 'b'+i; //cada balão fica com um id diferente

		balao.onclick = function(){estourar(this)}; //associação do evento com o clique sobre um balão

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick",""); //eliminar a possibilidade de pontuar clicando novamente sobre o mesmo balão
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png' //modificar o atributo src do elemento



	pontuacao(-1);
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('qtd_baloes_inteiros').innerHTML ;
	var baloes_estourados = document.getElementById('qtd_baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('qtd_baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('qtd_baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);

}


function situacao_jogo(baloes_inteiros){


	if (baloes_inteiros == 0) {

		alert('We are the champion!!!');

		parar_jogo();

	}

}

function parar_jogo(){

	clearTimeout(timerId);
}