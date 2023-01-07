window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clavier = new Clavier();

	//Création des variables pour les différentes positions du personnage
	var perso = new Image();
	var perso_obstacle = new Image();

	//Création des variables pour les différents plan du jeu
	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();

	//Création des variables pour les obstacles du jeu
	var obstacle0 = new Image();
	var obstacle00 = new Obstacle(z3+300,200*1.35,30,100);
	var obstacle1 = new Image();
	var obstacle2 = new Image();
	var obstacle3 = new Image();
	var obstacle4 = new Image();
	var obstacle5 = new Image();
	var obstacle6 = new Image();
	var obstacle7 = new Image();

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

	//Créations des obstacles du jeu
	var obstacle00 = new Obstacle(/*mettre des coords*/);

	//Appel des fichiers correspondant aux noms des variables
	perso.src = "Images/yoshi_marche.png";
	perso_obstacle.src = "Images/yoshi_obstacle.png";

	premierPlan.src = "Images/PremierPlan.png";
	secondPlan.src = 'Images/SecondPlan.png';
	arrierePlan.src = 'Images/ArrierePlan.png';

	obstacle0.src = "Images/web.png";
	obstacle1.src = "Images/web.png";
	obstacle2.src = "Images/web.png";
	obstacle3.src = "Images/web.png";
	obstacle4.src = "Images/web.png";
	obstacle5.src = "Images/web.png";
	obstacle6.src = "Images/web.png";
	obstacle7.src = "Images/web.png";

	note0.src = "Images/note.png"
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
	var x = 200;
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var droite = true;
	var coefDeZ = 2;
	var y = 300; //(x,y) : position du perso par rapport à la map du fond 
	var sol = y;

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
		setInterval(boucle, 20); //framerate : 1000/20 soit 50 images par seconde
	}

	function boucle(){

		obstacle00.x = z3+300;
		
		if (clavier.droite){
			droite = true;
			if (!obstacle00.collision(x,sol,32,64)){
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
			if (!obstacle00.collision(x,sol,32,64)){
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

		//Permet de mettre différents obstacles et les collisions en -z3
		ctx.drawImage(obstacle0,z3+300,200*1.55,48,48);

		if (x == obstacle0.x + obstacle0.width + 2){
				clavier.droite = false;
				x = 150;
			}

		if (x == obstacle0.x - 2){
				clavier.droite = false;
			}
		
		if (perso.y == obstacle0.y && saut > 0){
			sol = y - obstacle0.height;
		}

		console.log(obstacle00.x)		
		
		//Fait apparaitre/disparaitre les notes de musique et incrémente le compteur de notes

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