window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clavier = new Clavier();

	//Création des appels des variables des pour les différentes positions du jeu
	var perso = new Image();
	var portail = new Image();

	//Créations des variables notes
	var note1 = new Image();
	var note2 = new Image();
	var note3 = new Image();
	var note4 = new Image();
	var note5 = new Image();
	var note6 = new Image();
	var note7 = new Image();
	var note8 = new Image();
	var note9 = new Image();
	var note10 = new Image();

	var note11 = new Image();
	var note12 = new Image();
	var note13 = new Image();
	var note14 = new Image();
	var note15 = new Image();
	var note16 = new Image();
	var note17 = new Image();
	var note18 = new Image();
	var note19 = new Image();
	var note20 = new Image();

	var son_saut = new Audio();
	var son_note = new Audio();

	//Création des variables pour les différents plan du jeu
	var premierPlan = new Image();
	var secondPlan = new Image();
	var arrierePlan = new Image();

	//Appel des fichiers correspondant aux noms des variables
	perso.src = "Images/yoshi_marche.png";
	portail.src = "Images/portal.png";
	
	premierPlan.src = "Images/PremierPlan.png";
	secondPlan.src = "Images/SecondPlan.png";
	arrierePlan.src = "Images/ArrierePlan.png";

	note1.src = "Images/note.png"
	note2.src = "Images/note.png"
	note3.src = "Images/note.png"
	note4.src = "Images/note.png"
	note5.src = "Images/note.png"
	note6.src = "Images/note.png"
	note7.src = "Images/note.png"
	note8.src = "Images/note.png"
	note9.src = "Images/note.png"
	note10.src = "Images/note.png"

	note11.src = "Images/note.png"
	note12.src = "Images/note.png"
	note13.src = "Images/note.png"
	note14.src = "Images/note.png"
	note15.src = "Images/note.png"
	note16.src = "Images/note.png"
	note17.src = "Images/note.png"
	note18.src = "Images/note.png"
	note19.src = "Images/note.png"
	note20.src = "Images/note.png";

	son_note.src = "Son/son_note/mp3";
	son_saut.src = "Son/son_saut.mp3";

	//Créations de variables utiles au jeu
	var compteur_note = 0;
	var saut = 0;

	a = 1;
	var x = 85;
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var coefDeZ = 2;
	var y = 300; //(x,y) : position du perso par rapport à la map du fond 

	var sol = y;
	
	var droite = true;

	var portail_pris = false;
	
	//Pas pour régler la vitesse des 3 plans en parallaxe
	var pas1 = 0 ;

	//Variables des 20 notes à attraper dans le jeu
	var note1_prise = false;
	var note2_prise = false;
	var note3_prise = false;
	var note4_prise = false;
	var note5_prise = false;
	var note6_prise = false;
	var note7_prise = false;
	var note8_prise = false;
	var note9_prise = false;
	var note10_prise = false;

	var note11_prise = false;
	var note12_prise = false;
	var note13_prise = false;
	var note14_prise = false;
	var note15_prise = false;
	var note16_prise = false;
	var note17_prise = false;
	var note18_prise = false;
	var note19_prise = false;
	var note20_prise = false;
	
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
		son_saut.play();
		saut = 40; 
		
		if (saut >= 0){
			y =  300 + (saut-20)*(saut-20)/4-100;
			saut = saut - 1;
		}

		//Les différents pas pour les spritessheets
		if (pas1 > 4){pas1 = 0;}

		ctx.save();  	

		var hide_text = document.getElementById("hide_text");

		if (compteur_note == 20){
			hide_text.style.opacity = "1";
		}
		else {
			//Mise en place de l'arrière plan ainsi que son parallaxe
			ctx.drawImage(arrierePlan,z1-1300,0,1300,400);
			ctx.drawImage(arrierePlan,z1,0,1300,400);
			ctx.drawImage(arrierePlan,z1+1300,0,1300,400);

			if (z1>1300){z1=0;}
			
			if (z1<-1300){z1=0;}

			//Mise en place du deuxième plan ainsi que son parallaxe
			ctx.drawImage(secondPlan,z2-1430,60,1430,314);
			ctx.drawImage(secondPlan,z2,60,1430,314);
			ctx.drawImage(secondPlan,z2+1430,60,1430,314);

			if (z2>1430){z2=0;}

			if (z2<-1430){z2=0;}

			//Mise en place du premier plan ainsi que son parallaxe
			ctx.drawImage(premierPlan,z3-1820,0,1820,400);
			ctx.drawImage(premierPlan,z3,0,1820,400);
			ctx.drawImage(premierPlan,z3+1820,0,1820,400);

			if (z3>1820){z3=0;}

			if (z3<-1820){z3=0;}
		}

		//Fait apparaitre/disparaitre la note de musique et incrémente le compteur de notes
		
		//NOTE 1 = BAS
		if (z3+250<=x && z3+280>=x && y>=280 && y<=350 && note1_prise==false){
			note1_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note1_prise == false){ctx.drawImage(note1,z3+265,315,30,44);}

		//NOTE 2 = HAUT
		if (z3+430<=x && z3+460>=x && y>=200 && y<=270 && note2_prise==false){
			note2_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note2_prise == false){ctx.drawImage(note2,z3+445,235,30,44);}

		//NOTE 3 = BAS
		if (z3+610<=x && z3+640>=x && y>=280 && y<=350 && note3_prise==false){
			note3_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note3_prise == false){ctx.drawImage(note3,z3+625,315,30,44);}

		//NOTE 4 = BAS
		if (z3+790<=x && z3+820>=x && y>=280 && y<=350 && note4_prise==false){
			note4_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note4_prise == false){ctx.drawImage(note4,z3+805,315,30,44);}

		//NOTE 5 = HAUT
		if (z3+970<=x && z3+1000>=x && y>=200 && y<=270 && note5_prise==false){
			note5_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note5_prise == false){ctx.drawImage(note5,z3+985,235,30,44);}

		//NOTE 6 = BAS
		if (z3+1150<=x && z3+1180>=x && y>=280 && y<=350 && note6_prise==false){
			note6_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note6_prise == false){ctx.drawImage(note6,z3+1165,315,30,44);}

		//NOTE 7 = HAUT
		if (z3+1330<=x && z3+1360>=x && y>=200 && y<=270 && note7_prise==false){
			note7_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note7_prise == false){ctx.drawImage(note7,z3+1345,235,30,44);}

		//NOTE 8 = HAUT
		if (z3+1510<=x && z3+1540>=x && y>=200 && y<=270 && note8_prise==false){
			note8_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note8_prise == false){ctx.drawImage(note8,z3+1525,235,30,44);}

		//NOTE 9 = BAS
		if (z3+1690<=x && z3+1720>=x && y>=280 && y<=350 && note9_prise==false){
			note9_prise = true;
			compteur_note++;
			document.getElementById("compteur_note").innerHTML = compteur_note;
			son_note.play();}
		else if (note9_prise == false){ctx.drawImage(note9,z3+1705,315,30,44);}
		
		console.log(compteur_note)

		if (z3+1740<=x && z3+1790 && y>=280 && y<=340 && portail_pris == false){
			portail_pris = true;
			console.log("portail_pris");
		}

		else if (portail_pris == false){ctx.drawImage(portail,z3+1700,270,100,131)}

		// console.log("z3 = " + z3);
		// console.log("z2 = " + z2);
		// console.log("z1 = " + z1);
		
		if (compteur_note >=9 && portail_pris == true){

			x = 385;

			//NOTE 10 = HAUT
			if (z3+250<=x && z3+280>=x && y>=200 && y<=270 && note10_prise==false){
				note10_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note10_prise == false){ctx.drawImage(note10,z3+235,235,30,44);}
		
			//NOTE 11 = BAS
			if (z3+430<=x && z3+460>=x && y>=280 && y<=350 && note11_prise==false){
				note11_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note11_prise == false){ctx.drawImage(note11,z3+445,315,30,44);}

			//NOTE 12 = HAUT
			if (z3+610<=x && z3+640>=x && y>=200 && y<=270 && note12_prise==false){
				note12_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note12_prise == false){ctx.drawImage(note12,z3+625,235,30,44);}

			//NOTE 13 = HAUT
			if (z3+790<=x && z3+820>=x && y>=200 && y<=270 && note13_prise==false){
				note13_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note13_prise == false){ctx.drawImage(note13,z3+805,235,30,44);}

			//NOTE 14 = BAS
			if (z3+970<=x && z3+1000>=x && y>=280 && y<=350 && note14_prise==false){
				note14_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note14_prise == false){ctx.drawImage(note14,z3+985,315,30,44);}

			//NOTE 15 = HAUT
			if (z3+1150<=x && z3+1180>=x && y>=200 && y<=270 && note15_prise==false){
				note15_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note15_prise == false){ctx.drawImage(note15,z3+1165,235,30,44);}

			//NOTE 16 = BAS
			if (z3+1330<=x && z3+1370>=x && y>=280 && y<=350 && note16_prise==false){
				note16_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note16_prise == false){ctx.drawImage(note16,z3+1345,315,30,44);}

			//NOTE 17 = BAS
			if (z3+1510<=x && z3+1540>=x && y>=280 && y<=350 && note17_prise==false){
				note17_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note17_prise == false){ctx.drawImage(note17,z3+1525,315,30,44);}

			//NOTE 18 = HAUT
			if (z3+1690<=x && z3+1720>=x && y>=200 && y<=270 && note18_prise==false){
				note18_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note18_prise == false){ctx.drawImage(note18,z3+585,235,30,44);}

			//NOTE 19 = BAS
			if (z3+50<=x && z3+80>=x && y>=280 && y<=350 && note19_prise==false){
				note19_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note19_prise == false){ctx.drawImage(note19,z3+65,315,30,44);}
				
			//NOTE 20 = HAUT
			if (z3+50<=x && z3+80>=x && y>=200 && y<=270 && note20_prise==false){
				note20_prise = true;
				compteur_note++;
				document.getElementById("compteur_note").innerHTML = compteur_note;
				son_note.play();}
			else if (note20_prise == false){ctx.drawImage(note20,z3+65,235,30,44);}
		}

		ctx.translate(x+16,y+32); 

		if (!droite){ctx.scale(-1,1);}
		else ctx.scale(1,1);

		ctx.drawImage(perso,pas1*27,0,27,42,-16,-32,32,64);

		if (clavier.bas == true){clavier.haut = false;}

		ctx.restore();
	}
}