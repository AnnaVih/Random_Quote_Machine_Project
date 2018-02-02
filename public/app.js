//Create constructor class 
var QuotesService = function(url) {
    this.url = url;
    this.bustCache = '?' + new Date().getTime();
};

//Create prototype method for getting data
QuotesService.prototype.getApiData = function(){
    
       //Fetch data from api service
       return fetch(this.url + this.bustCache)
              .then(res => res.json())
              .then(function(data){
                // console.log(data);
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
        twitterLink:  document.querySelector('#twitterLink'),
        facebookLink: document.querySelector('#facebookLink'),
        randomQuote:  document.querySelector('.random-quote'),
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

        //Display quote on UI
        show: function(quote){
            let output = '';

            //Loop over data
            if(quote){
                    output += `<p><i class="fa fa-quote-left quote-mark"></i>${quote.quote}</p><p class="author-name"> - ${quote.author}</p>`;
                    UISelectors.twitterLink.href = "http://twitter.com/intent/tweet?hashtags=LikeRandomQuoteMachineByAnnaVihrogonova&text=" + encodeURIComponent(quote.content);
                    UISelectors.facebookLink.href = "http://www.facebook.com/sharer.php?u=http://127.0.0.1:5500/" + encodeURIComponent(quote.content);
            }else {
                //If no data pass just show fallback default text to user
                output += `<p><i class="fa fa-quote-left quote-mark"></i>Sorry something went wrong, Please check your internet connection</p>`;
            }

            UISelectors.randomQuote.innerHTML = output;
        },


        //Display random color 
        displayRandomColor: function(){
            let hex, randomQuote, elements;

            //Getting random color from private function
            hex = randomColor();

            //Getting elements from DOM
            
            elements = document.querySelectorAll(UISelectors.body + ',' + UISelectors.wrapper + ',' + UISelectors.btn);

            //Loop over elements, assign hex random
            //color for background and font color
            elements.forEach(function(element){
               element.style.backgroundColor = hex;
               element.style.transition = 'background 2s';
               UISelectors.randomQuote.style.color = hex;
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

        //Return  selectors object
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
    selectors = UICtrl.getSelectors();

    //Click event to GET response from API and show data on UI
    function displayDataInfo(){
            let newApiService, quotes;

            //1. Make instance of ApiService
            newApiService =  new QuotesService('https://talaikis.com/api/quotes/random/');
            
            //2. Invoke apiData method
            quotes = newApiService.getApiData();
            
            //3.Pass recieved data from service to UIController
            quotes.then(actualQuote => {console.log(actualQuote);UICtrl.show(actualQuote)});
            
            //4.Create Random color
            UICtrl.displayRandomColor();
     }


    //Click event for fade out/in efect
    function fadeInOut(){

        //Fade out and fadeIn
        UICtrl.fadeOutAndFadeIn(selectors.randomQuote, 'visible', 'hidden');

        // e.preventDefault();
   }


    /*************** PUBLIC METHODS ****************/
    return {
      init: function() {
        displayDataInfo()
      },
      newQuote: ()=>{
      	displayDataInfo()
      	fadeInOut()
      }

}
     
})(UICtrl);

//Invoke init function 
AppCtrl.init();
