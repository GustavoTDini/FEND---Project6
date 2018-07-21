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

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         // Este Teste é Bem Direto, ele apenas verificará com um loop for se todos
         // os feed presentes no JSON tem uma URL e ela não é nula
         it('have URL', function(){
           for (feed in allFeeds){
             expect(allFeeds[feed].url).toBeDefined();
             expect(allFeeds[feed].url).not.toBeNull();
           }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         // Como no teste anterior, ele  verificará com um loop for se todos
         // os feed presentes no JSON tem uma Nome e não é nulo
         it('have Name', function(){
           for (feed in allFeeds){
             expect(allFeeds[feed].name).toBeDefined();
             expect(allFeeds[feed].name).not.toBeNull();
           }
         });

    });

    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {
      // Aqui defini as variaveis que irei usar nos proximos testes.
      // criei uma variavel para o botáo de menu,
      let menuIcon = $('.menu-icon-link');
      // e criei uma variavel booleana para ver se inicialmente o body tem a classe "menu-hidden"
      let initialHiddenValue = $('body').hasClass("menu-hidden");

      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */

       // Como já defini anteriormente, neste teste apenas verifiquei se initialHiddenValue é verdadeira
       it('is Hidden', function(){
         expect(initialHiddenValue).toBe(true);
       });

       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        // Aqui fiz 2 simulações do click do menuIcon e a cada click comparei o valor de initialHiddenValue
        // com o valor que procurei na verificação da classe "menu-hidden", a logica é com um click ser diferente
        // e com o proximo click retornar ao valor inicial
        it('toggle Visibility', function(){
          menuIcon.click();
          expect($("body").hasClass("menu-hidden")).not.toBe(initialHiddenValue);
          menuIcon.click();
          expect($("body").hasClass("menu-hidden")).toBe(initialHiddenValue);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */

       // Aqui defini as variaveis que irei usar nos proximos testes.
       // criei uma variavel para armazenar o tamanho do feed
       let feedSize;
       // e armazenei em uma variavel o feedlist
       let feedList = $('.feed-list');

       // acessei o loadFeed assincrona e verifiquei o tamanho da lista retornada e armazenei em feedSize
       beforeEach(function(done){
         loadFeed(0, () => {
           feedSize = feedList.length;
           done();
         })
       });

       // aqui verifiquei se o valor de feedSize é maior que 0
       it('should load initial feeds', function(done){
         expect(feedSize).toBeGreaterThan(0);
         done();
       });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

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
           console.log(feedA);
         });

         loadFeed(1, () => {
           feedB = feedContainer.html();
           console.log(feedB);
           done();
         });

       });

       // comparei as duas variaveis, o teste passa apenas se as duas forem diferentes
       it('should change feeds on loadFeed()', function(done){
         expect(feedA).not.toMatch(feedB);
         done();
       });
    });
}());
