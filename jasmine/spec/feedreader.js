/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         // Este Teste é Bem Direto, ele apenas verificará com um loop for se todos
         // os feed presentes no JSON tem uma URL e ela não é nula
         it('have URL', function(){
           for (let feed = 0; feed < allFeeds.length; feed ++){
             expect(allFeeds[feed].url).toBeDefined();
             expect(allFeeds[feed].url.length).not.toBe(0);
           }
         });

         // Como no teste anterior, ele  verificará com um loop for se todos
         // os feed presentes no JSON tem uma Nome e não é nulo
         it('have Name', function(){
           for (let feed = 0; feed < allFeeds.length; feed ++){
             expect(allFeeds[feed].name).toBeDefined();
             expect(allFeeds[feed].name.lenght).not.toBe(0);
           }
         });

    });

    describe('The menu', function() {
      // Aqui defini as variaveis que irei usar nos proximos testes.
      // criei uma variavel para o botáo de menu,
      let menuIcon = $('.menu-icon-link');
      // e criei uma variavel booleana para ver se inicialmente o body tem a classe "menu-hidden"
      let initialHiddenValue = $('body').hasClass("menu-hidden");

       // Como já defini anteriormente, neste teste apenas verifiquei se initialHiddenValue é verdadeira
       it('is Hidden', function(){
         expect(initialHiddenValue).toBe(true);
       });

        // Aqui fiz 2 simulações do click do menuIcon e a cada click comparei o valor de initialHiddenValue
        // com o valor que procurei na verificação da classe "menu-hidden", a logica é com um click ser false
        // e com o proximo click retornar a true
        it('toggle Visibility', function(){
          menuIcon.click();
          expect($("body").hasClass("menu-hidden")).toBe(false);
          menuIcon.click();
          expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    describe('Initial Entries', function() {

       // criei uma variavel para armazenar o feed Array dos entries
       let feedEntries;

       // acessei o loadFeed assincrona e verifiquei o array retornado e o armazenei em feedEntries
       beforeEach(function(done){
         loadFeed(0, () => {
           feedEntries = $('.feed .entry');
           done();
         })
       });

       // aqui verifiquei se o tamanho de feedEntries é maior que 0
       it('should load initial feeds', function(){
         console.log(feedEntries);
         expect(feedEntries.length).toBeGreaterThan(0);
       });

    });

    describe('New Feed Selection', function() {

       // Aqui defini as variaveis que irei usar nos proximos testes.
       // criei duas variaveis para armazenar cada feed
       let feedA;
       let feedB;
       // e armazenei em uma variavel o feed
       let feedContainer = $('.feed');

       // acessei o loadFeed assincrona 2 vezes com valores de feed diferentes
       // e armazenei o html do feed em cada variavel feedA e feedB
       beforeEach(function(done){
         loadFeed(0, () => {
           feedA = feedContainer.html();
           loadFeed(1, () => {
             feedB = feedContainer.html();
             done();
           });
         });
       });

       // comparei as duas variaveis, o teste passa apenas se as duas forem diferentes
       it('should change feeds on loadFeed()', function(){
         expect(feedA).not.toEqual(feedB);
       });
    });
}());
