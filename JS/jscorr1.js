window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clavier = new Clavier();

	//Création des appels des variables des fichiers externes
	var perso = new Image();
	var perso_note = new Image();
	var perso_obstacle = new Image();

	var note = new Image();

	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();

	a = 1;
	var x = 300;
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var coefDeZ = 2;
	var y = 300; //(x,y) : position du perso par rapport à la map du fond 

	var sol = 300;
	
	var obstacle0 = new Image();
	var obstacle00 = new Obstacle(z3+300,200*1.35,80,20);
	var obstacle1 = new Image();
	var obstacle2 = new Image();
	var obstacle3 = new Image();
	var obstacle4 = new Image();
	var obstacle5 = new Image();
	var obstacle6 = new Image();
	var obstacle7 = new Image();

	//Chargement des variables
	perso.src = "Images/yoshi_marche.png";
	perso_note.src = "Images/yoshi_note.png";
	perso_obstacle.src = "Images/yoshi_obstacle.png";

	note.src = "Images/note.png";
	obstacle0.src = "Images/obstacle.png";
	obstacle1.src = "Images/obstacle.png";
	obstacle2.src = "Images/obstacle.png";
	obstacle3.src = "Images/obstacle.png";
	obstacle4.src = "Images/obstacle.png";
	obstacle5.src = "Images/obstacle.png";
	obstacle6.src = "Images/obstacle.png";
	obstacle7.src = "Images/obstacle.png";

	premierPlan.src = "Images/PremierPlan.png";
	secondPlan.src = "Images/SecondPlan.png";
	arrierePlan.src = "Images/ArrierePlan.png";

	var compt_note = 0;
	var note_prise = false;
	var saut = 0;
	var pas1 = 0 ;
	var pas2 = 0 ;
	var pas3 = 0 ;

	var colle_x = false;
	
	var droite = true;
	
	premierPlan.onload = function(){
		setInterval(boucle, 20); //framerate : 1000/20 soit 50 images par s.
	}

	function boucle(){
		
		obstacle00.x = z3+300;
		
		if (clavier.droite){
			droite = true;
			if (!obstacle00.collision(x,y,32,64)){
				pas1++;
				z1 = z1 - 2*coefDeZ;
				z2 = z2 - 4*coefDeZ;
				z3 = z3 - 6*coefDeZ;
				colle_x = true;
			}
			else{
				console.log('droite');
				colle_x = false;
			}
		}

		else if (clavier.gauche){ 
			droite = false;
			if (!obstacle00.collision(x,y,32,64)){
				pas1++;
				z1 = z1 + 2*coefDeZ;
				z2 = z2 + 4*coefDeZ;
				z3 = z3 + 6*coefDeZ;
				colle_x = true;
			}
			else{
				console.log('gauche');
				colle_x = false;
			}
		}

		if (clavier.haut && saut <=0)  //initialisation du saut
		saut = 40; 
		
		if (saut >= 0){
			y =  sol + (saut-20)*(saut-20)/4-100;
			if (obstacle00.collision(x,y,32,64) && colle_x == false){
				console.log('saut');
				if(y+64<=270){
					sol = 270;
				}
				else{
					saut = 39 - saut;
				}
			}
			else{
				saut = saut - 1;}
			//x = x + 1; saute vers la droite
		}

		if (perso.x < z3-0 && perso.x > z3+80 && y < 265 && y > 275 && saut > 0){
			y=270;
		}

		//Les différents pas pour les spritessheets
		if (pas1 > 4){
			pas1 = 0;
		}

		if (pas2 > 2){
			pas2 = 0;
		}

		if (pas3 > 4){
			pas3 = 0;
		}

		ctx.save();  		
		
		//Mise en place de l'arrière plan ainsi que son parallaxe
		ctx.drawImage(arrierePlan,z1-1300,0,1300,400);
		ctx.drawImage(arrierePlan,z1,0,1300,400);
		ctx.drawImage(arrierePlan,z1+1300,0,1300,400);

		if (z1>1300){
			z1=0;
		}
		
		if (z1<-1300){
			z1=0;
		}

		//Mise en place du deuxième plan ainsi que son parallaxe
		ctx.drawImage(secondPlan,z2-1430,60,1430,314);
		ctx.drawImage(secondPlan,z2,60,1430,314);
		ctx.drawImage(secondPlan,z2+1430,60,1430,314);

		if (z2>1430){
			z2=0;
		}

		if (z2<-1430){
			z2=0;
		}

		//Mise en place du premier plan ainsi que son parallaxe
		ctx.drawImage(premierPlan,z3-1820,0,1820,400);
		ctx.drawImage(premierPlan,z3,0,1820,400);
		ctx.drawImage(premierPlan,z3+1820,0,1820,400);

		if (z3>1820){
			z3=0;
		}

		if (z3<-1820){
			z3=0;
		}
		
		ctx.strokeRect(z3+300,200*1.35,80,20);

		//Permet de mettre différents obstacles et les collisions en -z3
		ctx.drawImage(obstacle0,z3-0,200*1.35,80,20);
		

		console.log(obstacle00.x)

		ctx.drawImage(obstacle1,z3-300,200*1.4,80,20);
		ctx.drawImage(obstacle2,z3-600,200*1.6,80,20);
		ctx.drawImage(obstacle3,z3-900,200*1.4,80,20);
		ctx.drawImage(obstacle4,z3-1200,200*1.6,80,20);
		ctx.drawImage(obstacle5,z3-1500,200*1.8,80,20);
		ctx.drawImage(obstacle6,z3-1800,200*1.6,80,20);	

		//Permet de mettre différents obstacles en +z3
		ctx.drawImage(obstacle2,z3+600,200*1.2,80,20);
		ctx.drawImage(obstacle3,z3+900,200*1.4,80,20);
		ctx.drawImage(obstacle4,z3+1200,200*1.6,80,20);
		ctx.drawImage(obstacle5,z3+1500,200*1.8,80,20);
		ctx.drawImage(obstacle6,z3+1800,200*1.6,80,20);
		ctx.drawImage(obstacle7,z3+2100,200*1.4,80,20);

		//Fait apparaitre/disparaitre la note de musique et incrémente le compteur de notes

		if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note_prise==false){
			note_prise = true;
			compt_note++;
			//son_note.play(); 
			//mettre le son de récup de note
		}

		ctx.strokeRect(z3+385,310,30,44)

		if (note_prise == false){
			ctx.drawImage(note,z3+385,310,30,44);
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

		if (clavier.bas == true){
			clavier.haut = false;
		}

		ctx.restore();
	
	}

}

/*Contraintes du jeu (2022/2023)
Vous devez créer un jeu en vous appuyant sur ce qui a été vu. Une correction vous est remise. 
Votre jeu devra être vrendu samedi 7 janvier 2023 au plus tard et respecter les contraintes 
suivantes :

1. Le jeu doit être absolument basé sur ce qui a été vu en cours, je dois reconnaître la 
structure de ce qui vous a été donné (setInterval, fonction boucle, ....).

2. Le jeu ne doit pas se passer dans le monde de Mario : il faudra changer de fond et de 
personnage ! Il faut utiliser les fonds faits avec M. Clech. Il doit donc y avoir plusieurs 
couches de fond qui glissent à des vitesses différentes. Il faut utiliser une spritesheet. 
Vous pouvez récupérer des images sur internet, vous n’êtes pas obligés de les créer. 
Attention, certaines spritesheets disponibles sur internet sont mal conçues et poseront
problèmes (les vignettes doivent être dans une grille avec des cases qui ont toutes la même 
largeur et même hauteur).

3. Votre jeu doit être hébergé sur o2switch (ou ailleurs d’ailleurs si vous avez un autre 
hébergeur). Il faut rendre dans l’espace que je vais créer sur moodle un rapport pdf d’une 
page ou deux expliquant de façon très générale ce que vous avez réussi à faire et pas réussi 
à faire et dans lequel vous faites le bilan de votre travail. Il faut donner le lien où 
tester le jeu.

4. Il faudra utiliser des items que l’on peut prendre, et qui doivent avoir une incidence 
sur le jeu : donner un pouvoir au personnage, constituer une partie d’un ensemble d’éléments 
à rassembler dans le bon ordre, déclencher un son, changer une couleur ou un fond, etc... 
Ces items doivent être soit des notes de musique soit les quatre éléments (terre, air, feu, 
eau). Notez d’ailleurs que si vous le souhaitez votre jeu peut constituer une expérience
artistique plus qu’un jeu avec un véritable but.

Barême : non respect de la contrainte 1 : 
Originalité sur 6
Jouabilité/fonctionnement sur 6 (est-ce que le jeu est fluide, ne bloque pas à certains 
endroits, est-ce qu’il est intéressant ...), 
Avancement technique sur 8 (plus votre jeu met en oeuvre des concepts avancés plus la note 
est proche de 8).
*/