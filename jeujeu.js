// JavaScript Document

window.onload = function(){		
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var clavier  = new Clavier();

	//Création des variables
	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();
	var perso = new Image();

	//Chargement des variables
	premierPlan.src = 'PremierPlan.png';
	secondPlan.src = 'SecondPlan.png';
	arrierePlan.src = 'ArrierePlan.png';
	
	perso.src = 'mario-spritesheet.png';
	
	var x = 100;
	var y = 200;
	var yinit = 30;
	var droite = true;
	var compteur = 0;
	var pas = 0;
	var telep = false;
	var ramasse_coin = false;
	var gravite = false; //pour savoir si on est en train de tomber. On ne saute pas.

	//Autres variables
	var telep = false;

	premierPlan.onload = function(){

		setInterval(boucle,20); //FPS : 1000/20

	}

	function boucle(){
		/***** on positionne les variables ****/
		//theta = theta +0.2;

		if (clavier.droite){
				x=x+3;
			
		}
		else if(clavier.gauche){ 
				x=x-3;	
		}

		if (pas>=8)
			pas=0;

		ctx.save();
		ctx.drawImage(arrierePlan,0,0,1820,400);
		ctx.drawImage(secondPlan,0,0,1820,400);
		ctx.drawImage(premierPlan,0,0,1820,400);

		ctx.translate(x+16,y+32); //
		//ctx.rotate(theta); scale(), ...
		if (!droite)
			ctx.scale(-1,1)
		
		ctx.drawImage(perso,pas*32,128,32,64,-16,-32,32,64);

		ctx.restore();
	}
	
}