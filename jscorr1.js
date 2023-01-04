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
	perso.src = "yoshi_spritesheet.png";
	coin.src = "coin.png";

	premierPlan.src = "PremierPlan.png";
	secondPlan.src = 'SecondPlan.png';
	arrierePlan.src = 'ArrierePlan.png';

	var x = 300;
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var coefDeZ = 1.5;
	var y = 300; //(x,y) : position du perso par rapport à la map du fond

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
		setInterval(boucle, 20); //framerate : 1000/20 soit 50 images par s.
	}

	function boucle(){

		if (clavier.droite){
			pas++;
			droite = true;
			z1 = z1 - 2*coefDeZ;
			z2 = z2 - 4*coefDeZ;
			z3 = z3 - 6*coefDeZ;
		}

		else if  (clavier.gauche){ 
			pas++;
			droite = false;
			z1 = z1 + 2*coefDeZ;
			z2 = z2 + 4*coefDeZ;
			z3 = z3 + 6*coefDeZ;
		}

		if (clavier.haut && saut <=0)  //initialisation du saut
		saut = 40; 

		if (saut >= 0){
			y =  200 + (saut-20)*(saut-20)/4;
			saut = saut-1; 
			//x = x + 1; saute vers la droite
		}

		if (pas > 4){
			pas = 0;
		}

		ctx.save();  

		ctx.drawImage(arrierePlan,z1-2600,0,1300,400);
		ctx.drawImage(arrierePlan,z1-1300,0,1300,400);
		ctx.drawImage(arrierePlan,z1,0,1300,400);
		ctx.drawImage(arrierePlan,z1+1300,0,1300,400);
		ctx.drawImage(arrierePlan,z1+2600,0,1300,400);

		ctx.drawImage(secondPlan,z2-2860,60,1430,314);
		ctx.drawImage(secondPlan,z2-1370,60,1430,314);
		ctx.drawImage(secondPlan,z2,60,1430,314);
		ctx.drawImage(secondPlan,z2+1370,60,1430,314);
		ctx.drawImage(secondPlan,z2+2860,60,1430,314);

		ctx.drawImage(premierPlan,z3-3640,0,1820,400);
		ctx.drawImage(premierPlan,z3-1820,0,1820,400);
		ctx.drawImage(premierPlan,z3,0,1820,400);
		ctx.drawImage(premierPlan,z3+1820,0,1820,400);
		ctx.drawImage(premierPlan,z3+3640,0,1820,400);

		ctx.translate(x+16,y+32); 

		if (!droite)
			ctx.scale(-1,1);
		else
		ctx.scale(1,1);
		
		ctx.drawImage(perso,pas*27,0,27,42,-16,-32,32,64);

		ctx.restore();
	
	}

}