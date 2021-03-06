var i = 0;
				var bgPos = 0;
				var factor = 1;
				var yPos = 2;
				var runPos = [-41, -87, -132,-173, -215, -261, -305]
				var turboPos = [-346, -388, -436, -481, -527, -571, -618, -663, -710]; 
				var sTurboPos = [-6, -62, -128, -196]; 
				var jumpPos = [-7, -46, -90, -128, -173,-214, -254, -313, -361, -409]; //-219
				var currentAnimation = runPos;
				var jumpPressed = false;
				var runPressed = false;
				var goDown = false;
				var isPressedsuperTurbo = false;
				var isPressedTurbo= false;
				var avoidJump = false;
				var runAnimation = null;


				function animate(){
					runAnimation = setInterval(function(){
						var character = document.querySelector('.character');					
						var background = document.querySelector('.background');
						var background2 = document.querySelector('.background2');					
						character.style.backgroundPosition = currentAnimation[i]+'px '+yPos+'px';		
						background.style.backgroundPosition = -bgPos+'px 0px';		
						background2.style.backgroundPosition = -bgPos+'px 0px';		
						bgPos += (factor) * 5;
						if(jumpPressed){
							var height = (goDown) ? - i : i - 5;
							character.style.transform = "translateY("+ (height * 5 )+"px)"
							if(i === currentAnimation.length - 1){
								avoidJump = true;
								jumpPressed = false;
								run();
							 }
						} 
						i = (i === currentAnimation.length - 1)? 0 :i+1 ;
					},100);
				}
				function stopAnimation(){

					clearInterval(runAnimation);
					var character = document.querySelector('.character');
					character.style.backgroundPosition = '0px 2px';
					character.style.width = '34px';
					runAnimation = null;
				}
				 
				function jump(){
					i = 0;
					var character = document.querySelector('.character');
					character.style.width = '34px';
					yPos = -208;
					currentAnimation = runPos;
					if(runAnimation === null){
						animate();
					}
				}
				function run(){
					i = 0;
					yPos = 2;
					factor = 1;
					var character = document.querySelector('.character');
					character.style.width = '34px';
					currentAnimation = runPos;
					if(runAnimation === null){
						animate();
					}
				}
				function turbo(){
					i = 0 ;
					yPos = 2;
					factor = 2;
					var character = document.querySelector('.character');
					character.style.width = '34px';
					currentAnimation = turboPos;
					if(runAnimation === null){
						animate();
					}
				}
				function superTurbo(){
					i = 0 ;		
					yPos = -142; 
					factor = 4;
					var character = document.querySelector('.character');
					character.style.width = '52px';
					currentAnimation = sTurboPos;
					if(runAnimation === null){
						animate();
					}
				}

				document.body.addEventListener('keydown', function(e) {
				    
				    switch(e.keyCode){
				    	case 39: 
					    	if(!runPressed){
				    			runPressed = true;
				    			run();
				    		}
				    	break;
				    	case 81: 
				    		if(!jumpPressed && !avoidJump){
				    			goDown = false;  
			    				jumpPressed = true;
			    				jump();
				    		}
				    	break;
				    	case 65: 
				    		if(!isPressedTurbo){
				    			isPressedTurbo = true;
				    			turbo();
				    		}
				    	break;
				    	case 83: 
				    	if(!isPressedsuperTurbo){
				    			isPressedsuperTurbo= true;
				    			superTurbo();
				    		} 
				    	break;
				    	case 87:
				    		if(!jumpPressed && !avoidJump){
				    			goDown = true;  
				    			jumpPressed = true;
				    			jump();
				    		}
				    	break;
				    }
				});

				document.body.addEventListener('keyup', function(e) {
				     switch(e.keyCode){
				    	case 39: 
				    		if(runPressed){
				    			runPressed = false;
				    			stopAnimation();
				    		} 
				    	break; 
				    	case 81:  
				    		jumpPressed = avoidJump = false;
				    		if(runPressed){
				    			run();
				    		}else{
				    			stopAnimation();
				    		}
				    	break;
				    	case 87:
				    		goDown = false;  
				    			jumpPressed = avoidJump = false;
				    		if(runPressed){
				    			run();
				    		}else{
				    			stopAnimation();
				    		}
				    	break;
				    	case 65: 
				    		isPressedTurbo = false;
				    		if(runPressed){
				    			run();
				    		}else{
				    			stopAnimation();
				    		}
				    	break;
				    	case 83: 
				    	isPressedsuperTurbo = false;
					    		if(runPressed){
				    			run();
				    		}else{
				    			stopAnimation();
				    		}
				    	break;
				    }
				});