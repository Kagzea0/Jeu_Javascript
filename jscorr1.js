window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clavier = new Clavier();

	//Création des appels des variables des fichiers externes
	var perso = new Image();
	var perso_piece = new Image();
	var piece = new Image();
	var perso_obstacle = new Image();

	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();

	//Chargement des variables
	perso.src = "yoshi_marche.png";
	perso_piece.src = "yoshi_piece.png";
	piece.src = "coin.png";
	perso_obstacle.src = "yoshi_obstacle.png";

	premierPlan.src = "PremierPlan.png";
	secondPlan.src = 'SecondPlan.png';
	arrierePlan.src = 'ArrierePlan.png';

	var x = 300;
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var coefDeZ = 2;
	var y = 300; //(x,y) : position du perso par rapport à la map du fond

	var s = 1; //inutilisé en l'occurrence, pour faire grandir/réduire le perso grâce à
	//un ctx.scale(s,s)

	var compt = 0;
	var saut = 0;
	var pas1 = 0 ;
	var pas2 = 0 ;
	var pas3 = 0 ;
	
	var droite = true;
	var pris = false;
	var telep = false;
	var transfo = false;

	premierPlan.onload = function(){
		setInterval(boucle, 20); //framerate : 1000/20 soit 50 images par s.
	}

	function boucle(){

		if (clavier.droite){
			pas1++;
			droite = true;
			z1 = z1 - 2*coefDeZ;
			z2 = z2 - 4*coefDeZ;
			z3 = z3 - 6*coefDeZ;
		}

		else if  (clavier.gauche){ 
			pas1++;
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

		if (pas1 > 4){
			pas1 = 0;
		}

		if (pas2 > 2){
			pas2 = 0;
		}

		if (pas3 > 4){
			pas3 = 0;
		}

		for (let x = 0; i < 9; i++){
			//mettre 
		}

		ctx.save();  

		ctx.drawImage(arrierePlan,z1-1300,0,1300,400);
		ctx.drawImage(arrierePlan,z1,0,1300,400);
		ctx.drawImage(arrierePlan,z1+1300,0,1300,400);

		if (z1>1300){
			z1=0;
		}
		
		if (z1<-1300){
			z1=0;
		}

		ctx.drawImage(secondPlan,z2-1430,60,1430,314);
		ctx.drawImage(secondPlan,z2,60,1430,314);
		ctx.drawImage(secondPlan,z2+1430,60,1430,314);

		if (z2>1430){
			z2=0;
		}

		if (z2<-1430){
			z2=0;
		}

		ctx.drawImage(premierPlan,z3-1820,0,1820,400);
		ctx.drawImage(premierPlan,z3,0,1820,400);
		ctx.drawImage(premierPlan,z3+1820,0,1820,400);
		
		if (z3>1820){
			z3=0;
		}
		if (z3<-1820){
			z3=0;
		}

		ctx.translate(x+16,y+32); 

		if (!droite)
			ctx.scale(-1,1);
		else
		ctx.scale(1,1);

		if (clavier.bas){
			ctx.drawImage(perso_obstacle,pas2*36,0,36,31,-16,-10,48,48);
		}
		else {
			ctx.drawImage(perso,pas1*27,0,27,42,-16,-32,32,64);
		}

		ctx.restore();
	
	}

}