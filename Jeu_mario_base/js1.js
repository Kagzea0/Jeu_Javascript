window.onload = function(){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var x = 20;
	let y = 294;
	let pas = 0;
	let compteur = 0;
	var gauche = false;
	let saut = 1;
	var son_saut = new Audio("Son_Mario.mp3");
	let posX = 0;
	let piece_prise = false;
	let son_piece = new Audio("Son_piece.mp3")

	let fond = new Image();
	let fond2 = new Image();

	let perso = new Image ();
	let piece = new Image();

	let clavier = new Clavier();

	fond.src = "decor.png";
	perso.src = "mario-spritesheet.png";
	piece.src = "coin.png";
	fond2.src = "fond2.jpg";
	
	setInterval(f, 20);

	function f() {
		ctx.save();
		ctx.drawImage(fond, posX, 0, 600, 400);

		if (piece_prise == false){
			ctx.drawImage(piece, 300, 315, 35,35);
		}
		else{
			ctx.drawImage(fond2, posX, 0, 600, 400);
		}

		if (x>=285 && x<=315 && y>=285 && y<=315 && piece_prise==false){
			piece_prise = true;
			son_piece.play();
		}
			
		ctx.translate(x, y);

		if (clavier.gauche){
			ctx.scale(-1, 1);
		} else {
			ctx.scale(saut, saut);
		}

		ctx.drawImage(perso, 32*pas, 128, 32, 64, -16, -10, 32, 64);
		ctx.restore();

		if (clavier.droite) {
			x=x+5;
			pas++;
			gauche = false;
		} 
		else if (clavier.gauche){
			gauche = true;
			/* posX+=5; Sert à déplacer le fond */
			x = x-5;
			pas++;
		}
		else if (clavier.haut && compteur <= 0){
			compteur = 40;
			son_saut.play();
		}

		if (pas>7){
			pas = 0;
		}

		if (compteur >= 0) {
			y = 294-100+(compteur - 20)*(compteur - 20)/4;
			compteur--;
			if (gauche == true)
				x-=2;
			else if (!gauche)
				x+=2;
		}
		

		/*if (x>=550){
			!gauche = false;
		}*/

		/* 
		if (posX<-800){
			posX = 0;
		} 
		else if (posX){}
		Sert à déplacer le fond 
		*/
	}
	
}

/*-x pour faire défiler  le fond if x<=2550*/ 