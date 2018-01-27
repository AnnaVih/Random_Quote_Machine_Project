// Random Quoye
const UICtrl = (function(){

    return {
        show: function(data){
            let output = '';
           
            //Loop over data
            data.forEach(function(quote){
                output += `<div>
                                <p class="quotes">${quote.content}</p>
                                <p class="author-name">${quote.title}</p>
                            </div>`;
            });

            // Display info
            document.querySelector('.random-quote').innerHTML = output;
        }
    }

})();


const AppCtrl = (function( UICtrl){

    // Function for eventListeners
    function evenetListeners() {
        window.addEventListener('load', callApi);
        document.querySelector('.btn-quote').addEventListener('click', callApi);
    }

    // Getting response from API
    function callApi(){
        let url,bustCache;

        url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
        bustCache = '?' + new Date().getTime();

            fetch(url + bustCache)
             .then(res => res.json())
             .then(function(data){
                UICtrl.show(data);
            })
            .catch(err => console.log(err));
    }

    // Return event listeners function 
    return {
       init: function() {
           return evenetListeners();
       }

}
     
})( UICtrl);


AppCtrl.init();
