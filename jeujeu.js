// JavaScript Document

window.onload = function(){		
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var clavier  = new Clavier();
	var fond = new Image();
	var fond2 = new Image();
	var perso = new Image();
	var portal = new Image();
	var coin = new Image();
	// Chargement de l'image
	fond.src = 'decor.png';    
	perso.src = 'mario-spritesheet.png';// Path par rapport au document HTML, pas par rapport au document JS
	fond2.src = 'fond2.jpg';    
	
	coin.src = 'coin.png';
	portal.src = 'portal.png';
	var pick = new Audio('Son/Son_piece.mp3');
	
	var portal2 = new Obstacle(10, 300, 50, 50);
	var coin2 = new Obstacle(400, 300, 30, 30);
	var plateforme = new Obstacle(450,241,112,25);
	var sol = new Obstacle(0,342,800,30);
	var x = 100;
	var y = 30;
	var yinit = 30;
	var droite = true;
	var compteur = 0;
	var pas = 0;
	var telep = false;
	var ramasse_coin = false;
	var gravite = false; //pour savoir si on est en train de tomber. On ne saute pas.
	//var theta = 0; // Pour faire tourner
	fond.onload = function(){

		setInterval(boucle,20); //FPS : 1000/20

	}

	function boucle(){
		/***** on positionne les variables ****/
		//theta = theta +0.2;

		if (clavier.droite){
			if (!plateforme.collision(x+3,y,32,64))
				x=x+3;
			pas++;droite=true;
			
		}
		else if(clavier.gauche){ 
			if (!plateforme.collision(x-3,y,32,64))
				x=x-3;	
			pas++;	droite = false;
		}
		if (!sol.collision(x,y+6,32,64)&&!plateforme.collision(x,y+6,32,64)){
			y=y*1.05; //gravitÃ© avec accÃ©lÃ©ration
		    //y=y+5 par ex pour une gravitÃ© Ã  vitesse constante
		    gravite = true;
		}
		else 
			gravite = false;
		if (clavier.haut && compteur<=0&&!gravite){
			yinit = y;
			compteur = 40;
		}

		if (compteur>=0){
			if (compteur >20 && plateforme.collision(x,y-5,32,64)) 
					compteur = 40-compteur; // le perso vient de 
				//se cogner la tÃªte on va directement Ã  la fin du saut
				// pour le faire retomber
			else if (compteur > 20 || !plateforme.collision(x,y+15,32,64))
				y=yinit+ (20-compteur)*(20-compteur)/4*1.5-150;
			//on ne fait pas Ã©voluer l'Ã©quation si dans la deuxiÃ¨me partie du 
			// saut on a collision vers le bas avec la plateforme.
			compteur--;
			if (droite)
				if (!plateforme.collision(x+1,y,32,64))
					x++;
			else
				if (!plateforme.collision(x-1,y,32,64))
					x--;
		}
		if (pas>=8)
			pas=0;

		if (coin2.collision(x,y,32,64)&&ramasse_coin==false){
			ramasse_coin = true;
			pick.play();
		}
		if (portal2.collision(x,y,32,64))
			telep = true;
        /***** Les fonctions de dessin ********/
		ctx.save();
		if (telep ==false)
			ctx.drawImage(fond,0,0,600,400);
		else
			ctx.drawImage(fond2,0,0,600,400);
		if (ramasse_coin==false)
			ctx.drawImage(coin, 400,300, 30,30);
		if (telep==false)
			ctx.drawImage(portal, 10, 300, 50, 50);
		//ctx.fillRect(450,241,112,25);
		ctx.translate(x+16,y+32); //
		//ctx.rotate(theta); scale(), ...
		if (!droite)
			ctx.scale(-1,1)
		
		ctx.drawImage(perso,pas*32,128,32,64,-16,-32,32,64);
		ctx.restore();
	}
	
}