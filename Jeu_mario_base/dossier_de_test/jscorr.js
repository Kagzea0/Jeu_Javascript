window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var theta = 0; //inutilisé en l'occurrence, pour faire tourner le perso grâce à un ctx.rotate(theta)
	var x=100;
	var z = 0;
	var y = 320; //(x,y) : position du perso par rapport à la map du fond
	var s=1; //inutilisé en l'occurrence, pour faire grandir/réduire le perso grâce à
	//un ctx.scale(s,s)
	var compt = 0;
	var transfo = false;
	var saut = 0;
	var pas =0 ;
	
	var droite = true;
	var pris = false;
	var son = new Audio();
	var fond = new Image();
	var fond2 = new Image();
	var perso = new Image();
	var coin = new Image();
	var clavier = new Clavier();
	fond.src = "Images/decor.png";
	fond2.src = "Images/fond2.jpg";
	perso.src="Images/mario-spritesheet.png";
	coin.src = "Images/coin.png";
	var pick = new Audio('son/pick.mp3');
	fond.onload = function(){
		setInterval(boucle, 20); //framerate : 1000/20 soit 50 images par s.
		
	}
	function boucle(){
		/*****MISE EN PLACE DES DIFFERENTES VARIABLES ********/
		if (clavier.droite){
			// Une collision avec des if : on bloque Mario sur le monstre
			// du fond2
			// On laisse une marge de 5 à droite pour ne pas être bloqué
			// dans la collision!
			if (pris==false || x<260||x>310||y>320||y<280)
				x=x+5; // x pour déplacer le perso latéralement
			pas++; //pas = pas +1; 
			droite = true; // booléen pour retourner la spritesheet
			// quand on va à gauche
		}
		else if (clavier.gauche){
			// Une collision avec des if : on bloque Mario sur le monstre
			// du fond2
			// On laisse une marge de 5 à gauche pour ne pas être bloqué
			// dans la collision!
			if (pris==false || x<265||x>315||y>320||y<280)
				x=x-5;
			pas++; //pas sert à animer la spritesheet
			droite = false;
		}
		if (clavier.haut && saut <=0)  //initialisation du saut
			saut = 40; 

		if (saut >=0){   //le if() qui gère le saut. y dépend de saut
			// qui décroit de 40 à 0. Au max du saut quand saut vaut 20
			// y vaut 320 - 100 soit 220
			// Valable en l'état si l'on ne saute que depuis y=320
			y = 320 -100 + (saut-20)*(saut-20)/4;
			saut=saut-1; //saut--
		}
		if (pas>7) // Pour revenir à la première vignette de la spritesheet
			pas = 0;
		if (x>400 && pris == false){
			pris = true;
			pick.play();
		}


		//z-=10;
		//if (z<-2450)
		//	z=0;
		//Pour faire défiler le fond
		/***** POUR DESSINER SUR LE CANVAS ********/
		ctx.save();  // On sauve la position initiale du repère
		
		//z n'est pas utilisé, il reste à 0; il permettrait de faire défiler
		// le fond
		// Il faudrait alors étirer le fond (2600 au lieu de 600 par ex)
		if (pris == false)
			ctx.drawImage(fond, z,0,600,400 );
		else
			ctx.drawImage(fond2, z,0,600,400 );
		if (pris == false)
			ctx.drawImage(coin, 400,320,25,25 );  //pièce dessinée si on ne l'a pas prise
		
		ctx.translate(x,y); //on déplace le repère là où sera le perso
		//ctx.scale(s,s) ou ctx.rotate(theta) par ici
		if (droite == false)
			ctx.scale(-1,1); // pour retourner le perso quand on va à gauche
		ctx.drawImage(perso, pas*32,128,32,64, -16,-32,32,64);
		// on dessine le perso en (-32/2, -64,2) et non en (0,0)
		// du nouveau repère pour qu'il se 
		//retourne sans se téléporter légèrement 
		ctx.restore(); //On remet le repère en place
	
		
	}


}