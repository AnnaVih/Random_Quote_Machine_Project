/***********************************
******** UI controller *************
***********************************/
const UICtrl = (function(){

    //Random color 
    function randomColor(){
        let hex;

        //Make hex color
        hex = '#' + (function co(lor){   return (lor +=
            [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
            && (lor.length == 6) ?  lor : co(lor); })('');
       
        return hex;
    }
            
    /************ PUBLIC METHODS **********/

    return {

        //Display quotes on UI
        show: function(data){
            let output = '',twitterLink, faceBookLink, randomQuote;

            twitterLink = document.getElementById('twitterLink');
            faceBookLink = document.getElementById('facebookLink');
            randomQuote = document.querySelector('.random-quote');

            //Loop over data
            data.forEach(function(quote){
                output += `<i class="fa fa-quote-left"></i>${quote.content}<p class="author-name"> - ${quote.title}</p>`;
                twitterLink.href = "http://twitter.com/intent/tweet?hashtags=LikeRandomQuoteMachineByAnnaVihrogonova&text=" + encodeURIComponent(quote.content);
                faceBookLink.href = "http://www.facebook.com/sharer.php?u=http://127.0.0.1:5500/" + encodeURIComponent(quote.content);
            });
            
            randomQuote.innerHTML = output;
        },


        //Display random color 
        displayRandomColor: function(){
            let hex , randomQuote, elements;

            //Getting random color from private function
            hex = randomColor();

            //Getting elements from DOM
            randomQuote = document.querySelector('.random-quote');
            elements = document.querySelectorAll('body,' + '#wrapper,' + '.btn');

            //Loop over elements, assign hex random
            //color for background and font color
            elements.forEach(function(element){
               element.style.backgroundColor = hex;
               element.style.transition = 'background 2s';
               randomQuote.style.color = hex;
            //    randomQuote.style.transition = 'color 3s';
            });
        },


        //FadeOut and FadeIn
        fadeOutAndFadeIn: function(element, classVisible, classHidden){
            
            if(element.classList.contains(classVisible)){
                element.classList.remove(classVisible);
                element.className += ' ' + classHidden;
            }
            
            //Remove and add classes for fade out and fade in
            setTimeout(function(){
                element.classList.remove(classHidden);
                element.className += ' ' + classVisible;
                
            },600);
        }
    }

})();



/***********************************
******** APP controller *************
***********************************/
const AppCtrl = (function( UICtrl){

    // Function for eventListeners
    function eventListeners() {
        window.addEventListener('load', displayDataInfo);
        document.querySelector('.btn-quote').addEventListener('click', displayDataInfo);
        document.querySelector('.btn-quote').addEventListener('click', fadeInOut);
    }


    //Click event to GET response from API and show data on UI
    function displayDataInfo(){
        let url, bustCache, randomQuoteEl;
        randomQuoteEl = document.querySelector('.random-quote');

        
        url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
        bustCache = '?' + new Date().getTime();

            fetch(url + bustCache)
             .then(res => res.json())
             .then(function(data){
                UICtrl.show(data);
                console.log(data);
            })
            .catch(err => console.log(err));

        //Random color
        UICtrl.displayRandomColor();
    }


    //Click event for fade out/in efect
    function fadeInOut(){
        let randomQuote;
        randomQuote = document.querySelector('.random-quote');
        console.log(randomQuote);

        //Fade out and fadeIn
        UICtrl.fadeOutAndFadeIn( randomQuote, 'visible', 'hidden');
   }


    /*************** PUBLIC METHODS ****************/
    return {
       init: function() {
           return eventListeners();
       }

}
     
})( UICtrl);

//Invoke init function 
AppCtrl.init();
