//Create constructor class 
var QuotesService = function(url) {
    this.url = url;
    this.bustCache = '?' + new Date().getTime();
};

//Create prototype method for getting data
QuotesService.prototype.getApiData = function(){
    
       //Fetch data from api service
       fetch(this.url + this.bustCache)
              .then(res => res.json())
              .then(function(data){
                console.log(data);
                return data;
              })
              .catch(err => console.log(err));
              
}



/***********************************
******** UI controller *************
***********************************/
const UICtrl = (function(){

     //Object with ids and classes
     const UISelectors = {
        twitterLink:  '#twitterLink',
        facebookLink: '#facebookLink',
        randomQuote:  '.random-quote',
        wrapper:      '#wrapper',
        btn:          '.btn',
        btnQuote:     '.btn-quote',
        body:         'body'
    };

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
            let output = '', twitterLink, faceBookLink, randomQuote;

            //Getting dom elements
            twitterLink = document.querySelector(UISelectors.twitterLink);
            faceBookLink = document.querySelector(UISelectors.facebookLink);
            randomQuote = document.querySelector(UISelectors.randomQuote);

            //Loop over data
            if(data){
                data.forEach(function(quote){
                    output += `<i class="fa fa-quote-left"></i>${quote.content}<p class="author-name"> - ${quote.title}</p>`;
                    twitterLink.href = "http://twitter.com/intent/tweet?hashtags=LikeRandomQuoteMachineByAnnaVihrogonova&text=" + encodeURIComponent(quote.content);
                    faceBookLink.href = "http://www.facebook.com/sharer.php?u=http://127.0.0.1:5500/" + encodeURIComponent(quote.content);
                });
            }else {
                //If no data pass just show fallback default text to user
                output += `<p>Sorry something went wrong, Please check your internet connection</p>`;
            }

            randomQuote.innerHTML = output;
        },


        //Display random color 
        displayRandomColor: function(){
            let hex, randomQuote, elements;

            //Getting random color from private function
            hex = randomColor();

            //Getting elements from DOM
            randomQuote = document.querySelector(UISelectors.randomQuote);
            elements = document.querySelectorAll(UISelectors.body + ',' + UISelectors.wrapper + ',' + UISelectors.btn);

            //Loop over elements, assign hex random
            //color for background and font color
            elements.forEach(function(element){
               element.style.backgroundColor = hex;
               element.style.transition = 'background 2s';
               randomQuote.style.color = hex;
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
        },

        //Get selectors
        getSelectors: function(){
            return UISelectors;
        }
    }

})();



/***********************************
******** APP controller *************
***********************************/
const AppCtrl = (function( UICtrl){
    let selectors;

    //Get selectors
    selectors = UICtrl.getSelectors();



    //Click event to GET response from API and show data on UI
    function displayDataInfo(e){
            let newApiService, quotes, randomQuoteEl;
            randomQuoteEl = document.querySelector(selectors.randomQuote);

            //1. Make instance of ApiService
            newApiService =  new QuotesService('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1');
            
            //2. Invoke apiData method
            quotes = newApiService.getApiData();
            
        
            //3.Pass recieved data from service to UIController
                console.log(quotes);
                UICtrl.show(quotes);

            //4.Create Random color
            UICtrl.displayRandomColor();

            e.preventDefault();
     }


    //Click event for fade out/in efect
    function fadeInOut(e){
        let randomQuote;

        randomQuote = document.querySelector(selectors.randomQuote);

        //Fade out and fadeIn
        UICtrl.fadeOutAndFadeIn( randomQuote, 'visible', 'hidden');

        e.preventDefault();
   }


    /*************** PUBLIC METHODS ****************/
    return {
       init: function() {
           return eventListeners();
       }

}
     
})(UICtrl);

//Invoke init function 
AppCtrl.init();
