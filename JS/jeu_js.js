window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clavier = new Clavier();

	//Création des appels des variables des pour les différentes positions du jeu
	var perso = new Image();
	var perso_note = new Image();

	//Créations des variables notes
	var note0 = new Image();
	var note1 = new Image();
	var note2 = new Image();
	var note3 = new Image();
	var note4 = new Image();
	var note5 = new Image();
	var note6 = new Image();
	var note7 = new Image();
	var note8 = new Image();
	var note9 = new Image();

	//Création des variables pour les différents plan du jeu
	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();

	//Appel des fichiers correspondant aux noms des variables
	perso.src = "Images/yoshi_marche.png";
	perso_note.src = "Images/yoshi_note.png";
	
	premierPlan.src = "Images/PremierPlan.png";
	secondPlan.src = "Images/SecondPlan.png";
	arrierePlan.src = "Images/ArrierePlan.png";

	note0.src = "Images/note.png";
	note1.src = "Images/note.png"
	note2.src = "Images/note.png"
	note3.src = "Images/note.png"
	note4.src = "Images/note.png"
	note5.src = "Images/note.png"
	note6.src = "Images/note.png"
	note7.src = "Images/note.png"
	note8.src = "Images/note.png"
	note9.src = "Images/note.png"

	//Créations de variables utiles au jeu
	var compteur_note = 0;
	var saut = 0;

	a = 1;
	var x = 200;
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var coefDeZ = 2;
	var y = 300; //(x,y) : position du perso par rapport à la map du fond 

	var sol = y;
	
	var droite = true;
	
	//Pas pour régler la vitesse des 3 plans en parallaxe
	var pas1 = 0 ;
	var pas2 = 0 ;

	//Variables des 10 notes à attraper dans le jeu
	var note0_prise = false;
	var note1_prise = false;
	var note2_prise = false;
	var note3_prise = false;
	var note4_prise = false;
	var note5_prise = false;
	var note6_prise = false;
	var note7_prise = false;
	var note8_prise = false;
	var note9_prise = false;
	
	premierPlan.onload = function(){
		setInterval(boucle, 20); //framerate : 1000/20 soit 50 images par s.
	}

	function boucle(){
		
		if (clavier.droite){
			droite = true;
			pas1++;
			z1 = z1 - 2*coefDeZ;
			z2 = z2 - 4*coefDeZ;
			z3 = z3 - 6*coefDeZ;
		}

		else if (clavier.gauche){ 
			droite = false;
			pas1++;
			z1 = z1 + 2*coefDeZ;
			z2 = z2 + 4*coefDeZ;
			z3 = z3 + 6*coefDeZ;
		}

		if (clavier.haut && saut <=0)  //initialisation du saut
		saut = 40; 
		
		if (saut >= 0){
			y =  300 + (saut-20)*(saut-20)/4-100;
			saut = saut - 1;
		}

		if (perso.x < z3-0 && perso.x > z3+80 && y < 265 && y > 275 && saut > 0){
			sol=270;
		}

		//Les différents pas pour les spritessheets
		if (pas1 > 4){
			pas1 = 0;
		}

		if (pas2 > 2){
			pas2 = 0;
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

		//Fait apparaitre/disparaitre la note de musique et incrémente le compteur de notes

		//NOTE 0
		if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note0_prise==false){
			note0_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			/*son_note.play(); mettre le son de récup de note*/}
		else if (note0_prise == false){ctx.drawImage(note0,z3+385,310,30,44);}
		
		//NOTE 1
		if (z3+485<=x && z3+515>=x && y>=300 && y<=340 && note1_prise==false){
			note1_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			/*son_note.play(); mettre le son de récup de note*/}
		else if (note1_prise == false){ctx.drawImage(note1,z3+485,310,30,44);}

		// //NOTE 2
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note2_prise==false){
		// 	note2_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note2_prise == false){ctx.drawImage(note2,z3+385,310,30,44);}

		// //NOTE 3
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note3_prise==false){
		// 	note3_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note3_prise == false){ctx.drawImage(note3,z3+385,310,30,44);}

		// //NOTE 4
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note4_prise==false){
		// 	note4_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note4_prise == false){ctx.drawImage(note4,z3+385,310,30,44);}

		// //NOTE 5
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note5_prise==false){
		// 	note5_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note5_prise == false){ctx.drawImage(note5,z3+385,310,30,44);}

		// //NOTE 6
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note6_prise==false){
		// 	note6_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note6_prise == false){ctx.drawImage(note6,z3+385,310,30,44);}

		// //NOTE7
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note7_prise==false){
		// 	note7_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note7_prise == false){ctx.drawImage(note7,z3+385,310,30,44);}

		// //NOTE 8
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note8_prise==false){
		// 	note8_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note8_prise == false){ctx.drawImage(note8,z3+385,310,30,44);}

		// //NOTE 9
		// if (z3+385<=x && z3+415>=x && y>=300 && y<=340 && note9_prise==false){
		// 	note9_prise = true;
		// 	compteur_note++;
		// 	/*son_note.play(); mettre le son de récup de note*/}
		// else if (note9_prise == false){ctx.drawImage(note9,z3+385,310,30,44);}

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