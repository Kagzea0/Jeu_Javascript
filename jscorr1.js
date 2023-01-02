window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clavier = new Clavier();

	//Création des appels des variables des fichiers externes
	var perso = new Image();
	var coin = new Image();

	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();

	//Chargement des variables
	perso.src="mario-spritesheet.png";
	coin.src = "coin.png";

	premierPlan.src = "PremierPlan.png";
	secondPlan.src = 'SecondPlan.png';
	arrierePlan.src = 'ArrierePlan.png';

	var x = 100;
	var z = 0;
	var y = 30; //(x,y) : position du perso par rapport à la map du fond

	var s = 1; //inutilisé en l'occurrence, pour faire grandir/réduire le perso grâce à
	//un ctx.scale(s,s)

	var compt = 0;
	var saut = 0;
	var pas = 0 ;
	
	var droite = true;
	var pris = false;
	var telep = false;
	var transfo = false;

	premierPlan.onload = function(){
		setInterval(boucle, 10); //framerate : 1000/20 soit 50 images par s.
	}

	function boucle(){

		if (clavier.droite){
			x = x + 3;
			pas++;
			droite = true;
			z = z + 3;
		}

		else if(clavier.gauche){ 
			x = x - 3;	
			pas--;
			droite = false;
			z = z - 3;
		}

		if (clavier.haut && saut <=0)  //initialisation du saut
		saut = 40; 

		if (saut >=0){   
			y = 320 -100 + (saut-20)*(saut-20)/4;
			saut=saut-1; 
		}

		if (pas>7){
			pas = 0;
		}

		ctx.save();  

		ctx.drawImage(arrierePlan,z,0,1820,400);
		ctx.drawImage(secondPlan,z,60,1820,300);
		ctx.drawImage(premierPlan,z,0,1820,400);
 
		ctx.translate(x+16,y+32); 

		if (!droite)
			ctx.scale(-1,1)
		
		ctx.drawImage(perso,pas*32,128,32,64,-16,-32,32,64);

		ctx.restore();
	
	}

}