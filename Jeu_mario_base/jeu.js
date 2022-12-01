window.onload = function(){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var x = 20;
	var gauche = false;
	var angle = 0;
	let s = 1;
	let pas = 0;
	let compteur = 0;
	let y = 300;
	let posX = 0;

	let fond = new Image();
	let perso = new Image ();

	let clavier = new Clavier();

	fond.src = "decor.png";
	perso.src = "mario-spritesheet.png";

	setInterval(f, 20);

	function f() {
		ctx.save();
		ctx.drawImage(fond, posX, 0, 600, 400);
		ctx.translate(x, y);
	/*	ctx.rotate(angle);*/
	/*	ctx.scale(s, s);*/
		if (gauche == true){
			ctx.scale(-1, 1);
		} else {
			ctx.scale(s, s);
		}
		ctx.drawImage(perso, 32*pas, 128, 32, 64, -16, -10, 32, 64);
		ctx.restore();
/*		posX-= 4;*/

	/*	angle += 0.1;*/

		if (clavier.droite) {
			x+=5;
			posX-=5
			pas++;
			gauche = false;
		} 
		else if (clavier.gauche){
			gauche = true;
			posX+=5;
			x = x-5;
			pas++;
		}
		else if (clavier.haut && compteur <= 0){
			compteur = 40;
		}

		if (pas>7){
			pas = 0;
		}

		if (compteur >= 0) {
			y = 300-100+(compteur - 20)*(compteur - 20)/4;
			compteur--;
			if (gauche == true)
				x-=5;
			else if (!gauche)
				x+=5;
		}

		/*if (x>=550){
			!gauche = false;
		}*/

		if (posX<-800){
			posX = 0;
		} 
		else if (posX){}
	}
	
}

/*-x pour faire défiler  le fond if x<=2550*/ 