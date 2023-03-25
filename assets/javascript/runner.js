let joueur = prompt("Quel est votre nom?")
        while (joueur.length > 9) {
            alert("9 caractères au maximum s'il vous plait")
            joueur = prompt("Quel est votre nom?")
        }

let valeurScore = 0
let lesParametres = new Map()
let lesInfosVariantes = new Map()
let gestionDesNiveaux = new Map()
let nombreTotalDeNiveaux = 1  //Par défaut
let niveaux = new Map()
let lesMedias = new Map()
let melodieDefond = new Audio()

lesParametres.set("Debuter","g")

async function jeu(){
        let buttonPause = document.querySelector('button.pause') 
        // Clic du button PAUSE jeu qui ne marchera que lorsque les blocs sont en mouvements.
        await buttonPause.onclick
        buttonPause.onclick =() => {
    if (document.querySelector ('div.blocA')!=null){
            pause()
    }
}



// Les mouvements maintenant qui n'auront lieu que si les blocs sont de passage
        onkeydown=(touche)=>{
            if (document.querySelector ('div.blocA')!=null){

                if (touche.key.toLowerCase()==lesParametres.get("Sauter")){

                    let sauter = document.createElement('div')
                    sauter.setAttribute("class","positionSaut")
                    document.querySelector("main.main div.personne").replaceChildren(sauter)
                    return jeu()
                    
                } else if (touche.key.toLowerCase()==lesParametres.get("Accroupir")) {

                    let accroupi = document.createElement('div')
                    accroupi.setAttribute("class","positionAccroupi")
                    document.querySelector("main.main div.personne").replaceChildren(accroupi)
                    return jeu()

                } else if (touche.key.toLowerCase()==lesParametres.get("Pause/Reprendre")) {
                    pause()
                }

            }
        }
//                       Condition inconrtounable pour charger un niveau supérieur
            if (lesInfosVariantes.get("Blocs Parcourus") >= lesInfosVariantes.get("La longueur du niveau"))

                    {
                        gestionDesNiveaux.set("Niveau en cours",gestionDesNiveaux.get("Niveau en cours")+1)
                        //reinitialiser certaines infos 
                        lesInfosVariantes.set("Blocs Parcourus",0)
                        lesInfosVariantes.set("N x Vitesse",1)
                    }

        // Charger les niveaux
        let lesBlocs = chargeurDeNiveau()
        lesInfosVariantes.set("La longueur du niveau",lesBlocs.length)

                            //la manipulation 😍
    if (document.querySelector ('div.blocA')==null){

    // Au debut de chaque niveau, le personnage est debout
    if (gestionDesNiveaux.get("Niveau en cours")==1)
        {let debut = document.createElement('div')
        let monScore = document.createElement('p')
        monScore.innerHTML = "<strong>Score:</strong><br>0"
        let champScore= document.querySelector("div.score p")
        champScore.replaceChildren(monScore)
            //initialisation du sound
            let melody = document.createElement('div')
            melody.setAttribute("class","musiquedefond")
            if (niveaux.get(1)["assets"]["melody"] != undefined)
            {melody.innerHTML = '<audio src="'+niveaux.get(1)["assets"]["melody"]+'" autoplay></audio>'
            document.querySelector('.conteneur').append(melody)} else {
            melody.innerHTML = '<audio src="./assets/medias/sounds/piano.mp3" autoplay></audio>'
            document.querySelector('.conteneur').append(melody)
            }

        debut.setAttribute("class","positionDebout")
        document.querySelector("main.main div.personne").replaceChildren(debut)
    }
        else {
            await gagne_temps(3000)
            document.querySelector ('main.NiveauTransition div.personne').lastChild.setAttribute("class","positionDebout");
            document.querySelector ('main.NiveauTransition').setAttribute("class","main");
            //initialisation du sound
            let melody = document.createElement('div')
            melody.setAttribute("class","musiquedefond")  
            if (niveaux.get(gestionDesNiveaux.get("Niveau en cours"))["assets"]["melody"] != undefined)
            {   melody.innerHTML = '<audio src="'+niveaux.get(gestionDesNiveaux.get("Niveau en cours"))["assets"]["melody"]+'" autoplay></audio>'
                document.querySelector('.conteneur').append(melody)} else {
                melody.innerHTML = '<audio src="./assets/medias/sounds/piano.mp3" autoplay></audio>'
                document.querySelector('.conteneur').append(melody)
     
            }
          
        }

        for (let bloc of lesBlocs) {
            let facteur=lesInfosVariantes.get("dureeAnimation")*150 // Non, juste utilisé pour gérer la transition entre les blocs 😀
            if(bloc=="A")
            {
            await gagne_temps(lesInfosVariantes.get("dureeAnimation")*1000 - facteur)
            if (document.querySelector ('div.blocA')==null || document.querySelector ('div.blocA').style["animation-play-state"] != "paused") {
        createurBloc("blocA")} else if (document.querySelector ('div.blocA').style["animation-play-state"] == "paused") {
            while (document.querySelector ('div.blocA').style["animation-play-state"] == "paused") {
                await gagne_temps(1000) // Tant qu'il y a pause, on attend suivant une boucle régulière de 1s
            } 
            createurBloc("blocA")
        }
        }
            else if (bloc=="B")
            {await gagne_temps(lesInfosVariantes.get("dureeAnimation")*1000 - facteur)
            if (document.querySelector ('div.blocA')==null || document.querySelector ('div.blocA').style["animation-play-state"] != "paused")
            {createurBloc("blocB_enfant")  }   else if (document.querySelector ('div.blocA').style["animation-play-state"] == "paused") {
            while (document.querySelector ('div.blocA').style["animation-play-state"] == "paused") {
                await gagne_temps(1000) // Tant qu'il y a pause, on attend suivant une boucle régulière de 1s
            } 
            createurBloc("blocA")
        }
        }
        else if (bloc=="C")
            {await gagne_temps(lesInfosVariantes.get("dureeAnimation")*1000 - facteur)
            if (document.querySelector ('div.blocA')==null || document.querySelector ('div.blocA').style["animation-play-state"] != "paused")
            { createurBloc("blocC_enfant")  } else if (document.querySelector ('div.blocA').style["animation-play-state"] == "paused") {
            while (document.querySelector ('div.blocA').style["animation-play-state"] == "paused") {
                await gagne_temps(1000) // Tant qu'il y a pause, on attend suivant une boucle régulière de 1s
            } 
            createurBloc("blocA")
                }
            }
        
        }
    }

}


function pause () {   
    let buttonPause = document.querySelector('button.pause') 



        let liste1BlocEnMouvement = document.querySelectorAll ('div.bas div.blocB_enfant');
        let liste2BlocEnMouvement = document.querySelectorAll ('div.haut div.blocC_enfant');
        let liste3BlocEnMouvement = document.querySelectorAll ('div.haut div.blocA');
        let liste4BlocEnMouvement = document.querySelectorAll ('div.bas div.blocA');

        liste1BlocEnMouvement.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : paused")
        });
        liste2BlocEnMouvement.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : paused")
        });
        liste3BlocEnMouvement.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : paused")
        });
        liste4BlocEnMouvement.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : paused")
        });
        document.querySelector ('main.main').setAttribute("style","animation-play-state : paused");
        document.querySelector ('div.personne div').setAttribute("style","animation-play-state : paused");

            buttonPause.parentElement.remove()
            let redemarer = document.createElement('div')
            redemarer.innerHTML='<button class="redemarer">Recommencer</button>'
            let changerParametre = document.createElement('div')
            changerParametre.innerHTML='<button class="parametre">Paramètres</button>'
            let quitter = document.createElement('div')
            quitter.innerHTML = '<button class="quitter">Quitter</button>'
            let reprendre = document.createElement('div')
            reprendre.innerHTML = '<button class="reprendre" autofocus>Reprendre</button>' //La propriété autofocus pour permettre qu'il soit sélectionné par défaut
            document.querySelector('.contenu').append(quitter)
            document.querySelector('.contenu').prepend(reprendre)
            document.querySelector('.contenu').append(redemarer)
            document.querySelector('.contenu').append(changerParametre)
        

            document.getElementsByClassName("reprendre").autofocus

        let buttonRedemarer = document.querySelector('button.redemarer')
        let buttonQuitter = document.querySelector('button.quitter')
        let buttonReprendre = document.querySelector('button.reprendre')
        let buttonParametre = document.querySelector('button.parametre')

        //Clic du button Parametre
        buttonParametre.onclick = () => {

            alert("Dans cette section, vous pouvez changer les touches associées à vos actions\n \
            Les touches Diretion(haut et bas) permettent respectivement par défaut de sauter et de s'accroupir. `P` sert à pauser et reprendre le Jeu. \n \
            En pleine pause comme celle-ci, vous pouvez recommencer avec `R` et quitter avec `Q`.")

            if (confirm("En effectuant cette action, vous acceptez changer les touches correspondantes à ces divers actions.")){

                //Touche Pause/Reprendre
                let touchePause = prompt("Changer la touche d'appel de la fonction Pause",lesParametres.get("Pause/Reprendre"))
                while(touchePause.length!=1){
                    alert("Un seul caractère est autorisé")
                    touchePause = prompt("Changer la touche d'appel de la fonction Pause",lesParametres.get("Pause/Reprendre"))}
                lesParametres.set("Pause/Reprendre",touchePause.toLowerCase())

                //Touche Sauter
                let toucheSaut = prompt("Changer la touche d'appel de la fonction Saut",lesParametres.get("Sauter"))
                if (toucheSaut != lesParametres.get("Sauter")){
                while(toucheSaut.length!=1){
                    alert("Un seul caractère est autorisé")
                    toucheSaut = prompt("Changer la touche d'appel de la fonction Saut",lesParametres.get("Sauter"))}
                lesParametres.set("Sauter",toucheSaut.toLowerCase())
            }
                //Touche Accroupi
                let toucheAccroupi = prompt("Changer la touche d'appel de la fonction Saut",lesParametres.get("Accroupir"))
                if (toucheAccroupi != lesParametres.get("Accroupir")){
                while(toucheAccroupi.length!=1){
                    alert("Un seul caractère est autorisé")
                    toucheAccroupi = prompt("Changer la touche d'appel de la fonction Accroupi",lesParametres.get("Accroupir"))}
                lesParametres.set("Sauter",toucheAccroupi.toLowerCase())
            }

                //Touche Recommencer
                let toucheRecommencer = prompt("Changer la touche d'appel de la fonction Recommencer",lesParametres.get("Recommencer"))
                while(toucheRecommencer.length!=1){
                    alert("Un seul caractère est autorisé")
                    toucheRecommencer = prompt("Changer la touche d'appel de la fonction Recommencer",lesParametres.get("Recommencer"))}
                lesParametres.set("Recommencer",toucheRecommencer.toLowerCase())

 
                //Touche Quitter
                let toucheQuitter = prompt("Changer la touche d'appel de la fonction Quitter",lesParametres.get("Quitter"))
                while(toucheQuitter.length!=1){
                    alert("Un seul caractère est autorisé")
                    toucheQuitter = prompt("Changer la touche d'appel de la fonction Quitter",lesParametres.get("Quitter"))}
                lesParametres.set("Quitter",toucheQuitter.toLowerCase())

               confirm("Merci d'avoir fait un tour 🥲")
                }
            }

        

        // Clic du button pour redermarer le jeu
        buttonRedemarer.onclick = () =>{
        //Supprimer les boutons enfants créé en pause
        buttonRedemarer.parentElement.remove()
            buttonReprendre.parentElement.remove()  // On pourait ne pas supprimer et faire un replaceChildren m'bon
            buttonQuitter.parentElement.remove()
            buttonParametre.parentElement.remove()
            let pause = document.createElement('div')
            pause.innerHTML='<button class="pause">Pause</button>'
         document.querySelector('.contenu').append(pause)
         gestionDesNiveaux.set("Niveau en cours",1)
            recommencer()
            return demarrer()

        }


            // Clic du button pour quitter le jeu
            buttonQuitter.onclick = () =>{
            //Sortir de tout
            lesInfosVariantes.set("Blocs Parcourus",11000)
            gestionDesNiveaux.set("Niveau en cours",1000)
            let imageQuitter= document.createElement('div')
            imageQuitter.setAttribute("class","Quitter")
            document.querySelector('.conteneur').replaceChildren(imageQuitter)
            return debuter()

        }

        // Clic du button pour reprendre le jeu
        buttonReprendre.onclick = () =>{
            //Reprendre les animations en pause
        let liste1BlocEnPause = document.querySelectorAll ('div.bas div.blocB_enfant');
        let liste2BlocEnPause = document.querySelectorAll ('div.haut div.blocC_enfant');
        let liste3BlocEnPause = document.querySelectorAll ('div.haut div.blocA');
        let liste4BlocEnPause = document.querySelectorAll ('div.bas div.blocA');

        liste1BlocEnPause.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : ")
        });
        liste2BlocEnPause.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : ")
        });
        liste3BlocEnPause.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : ")
        });
        liste4BlocEnPause.forEach(blocs => {
            blocs.setAttribute("style","animation-play-state : ")
        });
        document.querySelector ('main.main').setAttribute("style","animation-play-state : ");
        document.querySelector ('div.personne div').setAttribute("style","animation-play-state : ");

        //Supprimer les boutons enfants créé en pause
        buttonRedemarer.parentElement.remove()
        buttonReprendre.parentElement.remove()  // On pourait ne pas supprimer et faire un replaceChildren m'bon
        buttonQuitter.parentElement.remove()
        buttonParametre.parentElement.remove()
        let pause = document.createElement('div')
        pause.innerHTML='<button class="pause">Pause</button>'
         document.querySelector('.contenu').append(pause)

     return jeu()
        }

        lesParametres.set("Pause/Reprendre","p")
        lesParametres.set("Recommencer","r")
        lesParametres.set("Quitter","q")


        //Les touches maintenant
        onkeydown = (touche) => {
            if (touche.key.toLowerCase() == lesParametres.get("Pause/Reprendre"))
                  {            //Reprendre les animations en pause
                    let liste1BlocEnPause = document.querySelectorAll ('div.bas div.blocB_enfant');
                    let liste2BlocEnPause = document.querySelectorAll ('div.haut div.blocC_enfant');
                    let liste3BlocEnPause = document.querySelectorAll ('div.haut div.blocA');
                    let liste4BlocEnPause = document.querySelectorAll ('div.bas div.blocA');
            
                    liste1BlocEnPause.forEach(blocs => {
                        blocs.setAttribute("style","animation-play-state : ")
                    });
                    liste2BlocEnPause.forEach(blocs => {
                        blocs.setAttribute("style","animation-play-state : ")
                    });
                    liste3BlocEnPause.forEach(blocs => {
                        blocs.setAttribute("style","animation-play-state : ")
                    });
                    liste4BlocEnPause.forEach(blocs => {
                        blocs.setAttribute("style","animation-play-state : ")
                    });
                    document.querySelector ('main.main').setAttribute("style","animation-play-state : ");
                    document.querySelector ('div.personne div').setAttribute("style","animation-play-state : ");
            
                    //Supprimer les boutons enfants créé en pause
                    buttonRedemarer.parentElement.remove()
                    buttonReprendre.parentElement.remove()  // On pourait ne pas supprimer et faire un replaceChildren m'bon
                    buttonQuitter.parentElement.remove()
                    buttonParametre.parentElement.remove()
                    let pause = document.createElement('div')
                    pause.innerHTML='<button class="pause">Pause</button>'
                     document.querySelector('.contenu').append(pause)
            
                 return jeu()
                                                  }
                                }

            onkeydown = (touche) => {
                if (touche.key.toLowerCase() == lesParametres.get("Recommencer"))
                        {        //Supprimer les boutons enfants créé en pause
                        buttonRedemarer.parentElement.remove()
                            buttonReprendre.parentElement.remove()  // On pourait ne pas supprimer et faire un replaceChildren m'bon
                            buttonQuitter.parentElement.remove()
                            buttonParametre.parentElement.remove()
                            let pause = document.createElement('div')
                            pause.innerHTML='<button class="pause">Pause</button>'
                            document.querySelector('.contenu').append(pause)
                            gestionDesNiveaux.set("Niveau en cours",1)
                            recommencer()
                            return demarrer()
                }}
                onkeydown = (touche) => {
                    if (touche.key.toLowerCase() == lesParametres.get("Quitter"))
                            {             //Sortir de tout
                                lesInfosVariantes.set("Blocs Parcourus",11000)
                                gestionDesNiveaux.set("Niveau en cours",1000)
                                let imageQuitter= document.createElement('div')
                                imageQuitter.setAttribute("class","Quitter")
                                document.querySelector('.conteneur').replaceChildren(imageQuitter)
                                return debuter()                    
                    }}
                            
                        
        } 

        // LA fonction qui charge les niveaux.
function chargeurDeNiveau() {

    let champJoueur = document.querySelector("div.joueur p")
        champJoueur.innerHTML='<p><strong>Joueur:</strong><br><em>'+joueur+'</em></p>'

        let champCreateur = document.querySelector("div.createur p")
        let champNiveau = document.querySelector("div.Nom p")
        let champDifficulte = document.querySelector("div.difficulte p")

    let collection = niveaux.get(gestionDesNiveaux.get("Niveau en cours"))
    
                            champNiveau.innerHTML="<p><strong>Niveau:</strong> <br>" + collection["title"] + "</p>";
                            champCreateur.innerHTML="<p>Createur: <strong> <br>" + collection["creator"] + "</strong></p>";
                            champDifficulte.innerHTML="<p><strong>Difficulté:</strong> <br><strong><em>" + collection["difficulty"] + "</em></strong></p>"; 
                            let blocS =[]

                            for (let all of collection["blocks"]) {
                               blocS.push(all["type"][0])// indice 0 car pour des jeux évolués, certains blocs auront pour type AB1 par exemple avec A le type principal à l'indice 0 🥲
                            }

        return blocS
}
   


async function createurBloc(classeAattribue) {
    
    // Je supprime tous les anciens blocs avant le passage d'un autre.
    document.querySelectorAll('.blocA').forEach(bloc =>{ bloc.remove()})
    document.querySelectorAll('.blocB_enfant').forEach(bloc =>{ bloc.remove()})
    document.querySelectorAll('.blocC_enfant').forEach(bloc =>{ bloc.remove()})
 

    if (lesInfosVariantes.get("Blocs Parcourus")==lesInfosVariantes.get("La longueur du niveau")-1){
    lesInfosVariantes.set("Blocs Parcourus",lesInfosVariantes.get("Blocs Parcourus") + 2);
    valeurScore = lesInfosVariantes.get("Score") + (lesInfosVariantes.get("N x Vitesse")*10) // Avec 10, le point par bloc
    lesInfosVariantes.set("Score",valeurScore)
    } else {
        lesInfosVariantes.set("Blocs Parcourus",lesInfosVariantes.get("Blocs Parcourus") + 1)
    }
console.log(lesInfosVariantes.get("Blocs Parcourus"))
console.log(lesInfosVariantes.get("La longueur du niveau"))

if (lesInfosVariantes.get("Blocs Parcourus")%10==0 && lesInfosVariantes.get("Blocs Parcourus")!=0)//<------------------------------------- A modifier (voir la longueur du niveau)
{lesInfosVariantes.set("N x Vitesse",lesInfosVariantes.get("N x Vitesse") + 0.2 )}

//--------------------------------> Notre vitesse de base est celle utilisée pour parcourir tout l'écran en 10s en mode normal(animation css)
//                 XpixelEcran ------> 10s = xpixelEcran/(1x)    #Vitesse à 1x
//                 XpixelEcran ------> 1s = xpixelEcran/(?!=0)    #Quelle vitesse va permettre le parcours de l'ecran en 1s?

// C'est la reponse (vice/versa) à l'équation qu'on exploitera pour définir les vitesse et donc augmenter la vitesse de passe des blocs.

    let laTailleDeLecran = document.querySelector('html').getClientRects()[0]["width"] // Tous les fichiers ont la balise <html></html>
    let laVitesseParDefaut = laTailleDeLecran /10

    let monScore = document.createElement('p')
    let champScore= document.querySelector("div.score p")


    valeurScore = lesInfosVariantes.get("Score") + (lesInfosVariantes.get("N x Vitesse")*10) // Avec 10, le point par bloc
    lesInfosVariantes.set("Score",valeurScore)
    monScore.innerHTML = "<strong>Score:</strong><br>" + lesInfosVariantes.get("Score")
    champScore.replaceChildren(monScore)
    let dureeAnimation = lesInfosVariantes.get("dureeAnimation")

    
// On a donc 1x <------------------ laVitesseParDefaut
//           Nx <------------------- laVitesse

let laVitesse = lesInfosVariantes.get("N x Vitesse")* laVitesseParDefaut
    dureeAnimation = laTailleDeLecran / laVitesse

    lesInfosVariantes.set("dureeAnimation",dureeAnimation)

    let debout = document.createElement('div')
    debout.setAttribute("class","positionDebout")

    document.querySelector("main.main div.personne").replaceChildren(debout)

  if (classeAattribue == "blocC_enfant"){
    let leBlocC= document.createElement('div')
    let leBlocA= document.createElement('div')
    leBlocC.setAttribute("class","blocC_enfant")
    leBlocC.setAttribute("style","animation-duration: "+dureeAnimation+"s; ")
    leBlocA.setAttribute("class","blocA")
    leBlocA.setAttribute("style","animation-duration: "+dureeAnimation+"s;")
                           leBlocC.innerHTML='<img src="'+ lesMedias.get("Image du Bloc C") +'" alt="image Problème" height="200px" width="200px" >'
                           //mettre maintenant un bloc C en haut et un bloc A en bas
                            document.querySelector('div.haut').append(leBlocC)
                            document.querySelector('div.bas').append(leBlocA)
  } else if (classeAattribue == "blocB_enfant") {
    let leBlocB= document.createElement('div')
    let leBlocA= document.createElement('div')
    leBlocB.setAttribute("class","blocB_enfant")
    leBlocB.setAttribute("style","animation-duration: "+dureeAnimation+"s;")
    leBlocA.setAttribute("class","blocA")
    leBlocA.setAttribute("style","animation-duration: "+dureeAnimation+"s;")
                           leBlocB.innerHTML='<img src="'+ lesMedias.get("Image du Bloc B") +'" alt="image Poblème" height="200px" width="200px" >'
                           //mettre maintenant un bloc A en haut et un bloc B en bas
                            document.querySelector('div.bas').append(leBlocB)
                            document.querySelector('div.haut').append(leBlocA)
   
  } else if (classeAattribue == "blocA") {
    let leBlocAhaut= document.createElement('div')
    let leBlocAbas= document.createElement('div')
    leBlocAhaut.setAttribute("class","blocA")
    leBlocAhaut.setAttribute("style","animation-duration: "+dureeAnimation+"s;")
    leBlocAbas.setAttribute("class","blocA")
    leBlocAbas.setAttribute("style","animation-duration: "+dureeAnimation+"s;")
                            document.querySelector('div.haut').append(leBlocAhaut)
                            document.querySelector('div.bas').append(leBlocAbas)

  }


// La condition de fin de niveau et les parametres associés
 
  if (lesInfosVariantes.get("Blocs Parcourus") >= lesInfosVariantes.get("La longueur du niveau"))
  {await gagne_temps(dureeAnimation*1000)
    document.querySelectorAll('div.blocA').forEach(blocs => {
        blocs.remove()
    })

    document.querySelector('div.musiquedefond').remove()
                //initialisation du sound
    let melodieDeVictoie = new Audio(lesMedias.get("Melodie de Victoire"))
    melodieDeVictoie.play()

    if (document.querySelector('div.blocB_enfant')!= null) {
        document.querySelectorAll('div.blocB_enfant').forEach(blocs => {
        blocs.remove()
    })     
    } else if (document.querySelector('div.blocC_enfant')!= null) {
        document.querySelectorAll('div.blocC_enfant').forEach(blocs => {
        blocs.remove()
    })
    }

    document.querySelector ('main.main div.personne').lastChild.setAttribute("class","PersonneNiveauTransition");
    document.querySelector ('main.main').setAttribute("class","NiveauTransition");
    //Score à la fin du niveau.
    if (gestionDesNiveaux.get("Nombre de niveaux") > gestionDesNiveaux.get("Niveau en cours"))

{
    let scorefinale = lesInfosVariantes.get("Score") + (lesInfosVariantes.get("La longueur du niveau")*lesInfosVariantes.get("N x Vitesse"))
    lesInfosVariantes.set("Score",Math.floor(scorefinale))
    //initialisation du sound
    let melody = document.createElement('div')
    melody.setAttribute("class","musiquedefond")
    melody.innerHTML = '<audio src="'+lesMedias.get("Melodie du niveau")+'" autoplay></audio>'
    document.querySelector('.conteneur').append(melody)
}
    
    return jeu()
  }
 }



async function gagne_temps(ms) {
  let  milliSecondes = parseInt(ms)
   let i = Math.floor(milliSecondes/5) //Pour essayer de garder la partie entière
   let compteur= 2*i
   await new Promise (attente => setTimeout(attente,compteur ))
   while (compteur <= (((4*milliSecondes)/5))) //Juste pour gérer au mieux la collision vue la position du personnage.
    {
    await new Promise(attente => setTimeout(attente, i/2));
    if (document.querySelector('div.blocA') != null && document.querySelector ('div.blocA').style["animation-play-state"] != "paused")
    { 
        // Définition des caractéristiques de la position de la personne.
            let personneX = document.querySelector('main.main div.personne div').getClientRects()[0]["x"]
            let personneY = document.querySelector('main.main div.personne div').getClientRects()[0]["y"]
            let personneHauteur = document.querySelector('main.main div.personne div').getClientRects()[0]["height"]
            let personneLargeur = document.querySelector('main.main div.personne div').getClientRects()[0]["width"]
        // Vérification de la postion de l'image du personnage par rapport à celle du bloc qui passe dans le truc.
        if (document.querySelector('div.blocB_enfant') != null)
         {
            let blocX = document.querySelector('div.blocB_enfant').getClientRects()[0]["x"]
            let blocY = document.querySelector('div.blocB_enfant').getClientRects()[0]["y"]

            if (((personneX + personneLargeur) >= (blocX)) && ((personneY + personneHauteur) >= (blocY)))
            {
                console.log("colision bloc B 😱😱😱😱😱😱😱😱😱😱")   // <-------------------Que faire en cas de collision
                document.querySelector('div.musiquedefond').remove()
                //initialisation du sound
                console.log("L'erreur qui suit est déclenchée exprès vu les variables pour tout stopper 😁")
                let melodieEchec = new Audio(lesMedias.get("Melodie d'Echec"))
                melodieEchec.play()
                let imageEchec= document.createElement('div')
                imageEchec.setAttribute("class","Echec")
                document.querySelector('.conteneur').replaceChildren(imageEchec)
                return debuter()
            
            }
        }
        if (document.querySelector('div.blocC_enfant') != null)
         {
            let blocX = document.querySelector('div.blocC_enfant').getClientRects()[0]["x"]
            let blocY = document.querySelector('div.blocC_enfant').getClientRects()[0]["y"]
            let blocHauteur = document.querySelector('div.blocC_enfant').getClientRects()[0]["height"]

            if (((personneX + personneLargeur) >= (blocX)) && ((blocY + blocHauteur) >= (personneY)))
            {
                console.log("colision  bloc C 😱😱😱😱😱😱😱😱😱😱") // <-------------------Que faire en cas de collision 
                //initialisation du sound
                document.querySelector('div.musiquedefond').remove()
                console.log("L'erreur qui suit est déclenchée exprès vu les variables pour tout stopper 😁")
                let melodieEchec = new Audio(lesMedias.get("Melodie d'Echec"))
                melodieEchec.play()
                let imageEchec= document.createElement('div')
                imageEchec.setAttribute("class","Echec")
                document.querySelector('.conteneur').replaceChildren(imageEchec)
                return debuter()
            }
        }

}
    compteur = compteur + i/2
}
//D'après les calculs, il reste i temps pour compenser la variable ms. Ce qu'on retourne.
return new Promise(attente => setTimeout(attente, i));
}


function recommencer() {

    let joueur = prompt("Quel est votre nom?")
        while (joueur.length > 9) {
            alert("9 caractères au maximum s'il vous plait")
            joueur = prompt("Quel est votre nom?\n 9 caractères max s'il vous plait!")
        }

        let valeurScore = 0
        let lesParametres = new Map()
        let lesInfosVariantes = new Map()
        let gestionDesNiveaux = new Map()

         // Définition des variantes telles que le score et la vitesse, les tourches
        let monScore = document.createElement('p')
        monScore.innerHTML = "<strong>Score:</strong><br>0"
        let champScore= document.querySelector("div.score p")
        champScore.replaceChildren(monScore)

         lesInfosVariantes.set("Score",- 10)
         lesInfosVariantes.set("N x Vitesse",1)
         lesInfosVariantes.set("dureeAnimation",10)
         lesInfosVariantes.set("Blocs Parcourus",0) // M'bon au départ.
         lesInfosVariantes.set("La longueur du niveau",1)

         lesParametres.set("Sauter","arrowup")
         lesParametres.set("Accroupir","arrowdown")
         lesParametres.set("Pause/Reprendre","p")
         lesParametres.set("Recommencer","r")
         lesParametres.set("Quitter","q")


         document.querySelector ('main.main').setAttribute("style","animation-play-state : ");
         document.querySelector ('div.personne div').setAttribute("style","animation-play-state : ");

    document.querySelectorAll('div.blocA').forEach(blocs => {
        blocs.remove()
    })

    if (document.querySelector('div.blocB_enfant')!= null) {
        document.querySelectorAll('div.blocB_enfant').forEach(blocs => {
        blocs.remove()
    })     
    } else if (document.querySelector('div.blocC_enfant')!= null) {
        document.querySelectorAll('div.blocC_enfant').forEach(blocs => {
        blocs.remove()
    })
    }
}


function demarrer () {
// Définition des variantes telles que le score et la vitesse, les tourches
         lesInfosVariantes.set("Score",- 10)
         lesInfosVariantes.set("N x Vitesse",1)
         lesInfosVariantes.set("dureeAnimation",10)
         lesInfosVariantes.set("Blocs Parcourus",0) // M'bon au départ.
         lesInfosVariantes.set("La longueur du niveau",1)

         lesParametres.set("Sauter","arrowup")
         lesParametres.set("Accroupir","arrowdown")
         lesParametres.set("Pause/Reprendre","p")
         lesParametres.set("Recommencer","r")
         lesParametres.set("Quitter","q")


         gestionDesNiveaux.set("Niveau en cours",1)

         lesMedias.set("Image du Bloc B","https://previews.dropbox.com/p/thumb/AB1qDSRELxzYQ-gXG3H3fO8Nsl0dZHTyrgYlPaC2Zo1iUWEn4OIPcT6HLIApuwNqDa9fWUA-18TxXwAPWPO1uBxsyv_kT0VZixJmrcpcsyix4BRNpNytOUa7tmhEd7qd-M8YHWCGkUxq5Ri-HWmYZKeysEdnWZSkbB9MFB_J02GBD66PLBjj7GXDEciJKRnI8dW2ckooe90QTP5NbA8L3yBvoiZUQdajghLtKQInhuAmR-6YDYcu6p-DfOseaMstT-g_cVYqywIpqKRb_uTd6TZttj4QE_KRjidvGRBnBxQC2-XsJvInM-H16ZQ-c57vKv877wGNxMK2IEzIDi982olIBWTosd_Mbq7ohY1XkDVgY4Vc8XK_SYZ9YQClDP6LWvU/p.png")

         lesMedias.set("Image du Bloc C","https://previews.dropbox.com/p/thumb/AB1qDSRELxzYQ-gXG3H3fO8Nsl0dZHTyrgYlPaC2Zo1iUWEn4OIPcT6HLIApuwNqDa9fWUA-18TxXwAPWPO1uBxsyv_kT0VZixJmrcpcsyix4BRNpNytOUa7tmhEd7qd-M8YHWCGkUxq5Ri-HWmYZKeysEdnWZSkbB9MFB_J02GBD66PLBjj7GXDEciJKRnI8dW2ckooe90QTP5NbA8L3yBvoiZUQdajghLtKQInhuAmR-6YDYcu6p-DfOseaMstT-g_cVYqywIpqKRb_uTd6TZttj4QE_KRjidvGRBnBxQC2-XsJvInM-H16ZQ-c57vKv877wGNxMK2IEzIDi982olIBWTosd_Mbq7ohY1XkDVgY4Vc8XK_SYZ9YQClDP6LWvU/p.png")
         
         lesMedias.set("Melodie du niveau","./assets/medias/sounds/piano.mp3")
         lesMedias.set("Melodie d'Echec","./assets/medias/sounds/echec.mp3")
         lesMedias.set("Melodie de Victoire","./assets/medias/sounds/fin.mp3")


    let j = 1
while (j < gestionDesNiveaux.get("Nombre de niveaux") +1 )

{
     if (niveaux.has(j))
      {
    let collection = niveaux.get(j)

for( composant in collection)
         {
            if (composant=="assets")

            {
                for (element in collection["assets"])
                
                 {
                     if (element=='melody')
                 {
                        if (collection["assets"]["melody"] != "")
                        {
                        if (collection["assets"]["melody"].length > 11)
                        {
                            if ( collection["assets"]["melody"][0]+collection["assets"]["melody"][1]+collection["assets"]["melody"][2]+collection["assets"]["melody"][3]+collection["assets"]["melody"][4]+collection["assets"]["melody"][5]+collection["assets"]["melody"][6]+collection["assets"]["melody"][7] !="https://")
                        {
                            alert("Le lien de la mélodie du niveau "+j+" n'est pas valide, elle ne sera donc pas exécutée 🥲")
                            niveaux.get(j)["assets"]["melody"] = "./assets/medias/sounds/piano.mp3"
                        } else {
                            lesMedias.set("Melodie du niveau",collection["assets"]["melody"])
                                //Deuxième texte sur la musique. On n'a pas pu controler le flux lecteur, on a abandonné 🤣
                            alert("La sécurité de melody du niveau "+j+" n'est pas rassurant, si JS n'a pas pu accéder à la source du lien, votre jeu se jouera sans musique de fond 🥸.\n Allez donc essayer notre éditeur de niveau pour modifier/supprimer ce mauvais lien du fichier et donc écouter notre douce musique de fond \n Bon jeu à vous.😍")
                            // On a juste fait un petit alert pour prévenir 😁.
                        }

            }
        }
                } else if (element=="C") {
                    if (collection["assets"]["C"] != "")
                    {if (collection["assets"]["C"].length > 11)
                    {
                        if ( collection["assets"]["C"][0]+collection["assets"]["C"][1]+collection["assets"]["C"][2]+collection["assets"]["C"][3]+collection["assets"]["C"][4]+collection["assets"]["C"][5]+collection["assets"]["C"][6]+collection["assets"]["C"][7] !="https://")
                    {
                        alert("L'image du bloc C du niveau "+j+" n'est pas valide")
                    } else {
                        lesMedias.set("Image du Bloc C",collection["assets"]["C"])
                    }
                }
                            }} else if (element=="B"){
                    if(collection["assets"]["B"] != "")
                    {if (collection["assets"]["B"].length > 11)
                    {
                        if ( collection["assets"]["B"][0]+collection["assets"]["B"][1]+collection["assets"]["B"][2]+collection["assets"]["B"][3]+collection["assets"]["B"][4]+collection["assets"]["B"][5]+collection["assets"]["B"][6]+collection["assets"]["B"][7] !="https://")
                    {
                        alert("L'image du bloc B du niveau "+j+" n'est pas valide")
                    } else {
                        lesMedias.set("Image du Bloc B",collection["assets"]["B"])
                    }
                }
                }

                }
            }}
        }
      }
j=j+1
}
alert(" Infos 🙂 \n Le jeu commencera après les premiers clignotements de l'écran(ou bref délais).\n \n Utilisez les touches p,g,r,q pour pauser/reprendre; debuter;recommencer;quitter au moment opportun\n Les touches DirectionHaut&Bas vous permettent de sauter et de s'accroupir.\n Vous pouvez changer ces touches en menu parametre une fois le jeu pausé.\n Bonne Chance 😍")
jeu()

}

async function debuter() {

    let debut = document.createElement('div')

    debut.setAttribute("class","positionDebout")
    document.querySelector("main.main div.personne").replaceChildren(debut)

    document.querySelector ('main.main div.personne').lastChild.setAttribute("class","PersonneDebut");
    document.querySelector ('main.main').setAttribute("class","Debut");

    document.querySelector("input[type=file]")
    .addEventListener("change", (event) => {
        let file = event.target.files[0];
//Vérification de l'extension du fichier entrant.<----1ère sécurité
        if ( file.name[file.name.length-5]+file.name[file.name.length-4]+file.name[file.name.length-3]+file.name[file.name.length-2]+file.name[file.name.length-1] !=".jmpr") {
        alert("❌ Fichier non autorisé 🚫");
        return debuter();
        }
        else {
        let lecteur = new FileReader();
    
        lecteur.onload = () => {
            let contenu = "";   
            contenu  = lecteur.result;  
        //Vérification du contenu du fichier entré.<----2ème sécurité        
        try {
            contenu = JSON.parse(contenu)

        //La suite si le fichier respecte les normes        
        niveaux.set(nombreTotalDeNiveaux,contenu )
        alert("Fichié sécurisé ✅.\
        \n Vous avez " + nombreTotalDeNiveaux + " niveau(x) chargé(s).")
        let n=nombreTotalDeNiveaux+1
            let quiz= confirm("Voulez-vous charger un autre niveau?\n Cela vous ferait "+n+" niveaux en cours")
            if(quiz)
            {
                nombreTotalDeNiveaux=nombreTotalDeNiveaux+1

                document.querySelector("div.fichier").replaceChildren('')

                let input = document.createElement("input")
                input.setAttribute('type',"file")
                document.querySelector("div.fichier").append(input)
                document.querySelector ('main.Debut div.personne').lastChild.setAttribute("class","positionDebout");
                document.querySelector ('main.Debut').setAttribute("class","main");

                return debuter()
                                }
                             
   
        } catch (error) {
            alert("le fichier ne respecte pas le format JSON 〽️. Veuillez le vérifier")
            return debuter()
        }           
        gestionDesNiveaux.set("Nombre de niveaux",nombreTotalDeNiveaux)

                 let buttonDebuter = document.querySelector('button.Debuter')
                    buttonDebuter.onclick = () =>
                        {
                      
                            buttonDebuter.parentElement.remove()
                            document.querySelector('footer').remove()
                            let pause = document.createElement('div')
                            pause.innerHTML='<button class="pause">Pause</button>'
                            document.querySelector('.contenu').append(pause)
                            document.querySelector ('main.Debut div.personne').lastChild.setAttribute("class","positionDebout");
                            document.querySelector ('main.Debut').setAttribute("class","main");
                
                            return demarrer()
                        }

                    onkeydown = (touche) => {
                if (touche.key.toLowerCase() == lesParametres.get("Debuter"))
                      {
                     let buttonnDebuter = document.querySelector('button.Debuter')
                    buttonnDebuter.parentElement.remove()
                            document.querySelector('footer').remove()
                            let pausee = document.createElement('div')
                            pausee.innerHTML='<button class="pause">Pause</button>'
                            document.querySelector('.contenu').append(pausee)
                            document.querySelector ('main.Debut div.personne').lastChild.setAttribute("class","positionDebout");
                            document.querySelector ('main.Debut').setAttribute("class","main");
                   
                           return demarrer()}
                        }

                        };  
        lecteur.readAsText(file);
        }
    });   
    
 }

if (joueur==null){
    alert("Veuiller Ecrire votre pseudo pour continuer")
} else
{debuter()}
