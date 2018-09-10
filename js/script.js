$(function() {

    function randomString() {           //funkcja generuje id, które składa się z ciągu 10 losowo wybranych znaków
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';    //ciag znaków jest obiektem czy tablicą????
        var str = '';                  //tworze zmienna w której zapisze ciąg wylosowanych znaków
        for (var i = 0; i < 10; i++) {  //przy pomocy pętli wylosuje z ciągu znaków zapisanych w zmiennej chars,  10 losowo wybranych znaków
            str += chars[Math.floor(Math.random() * chars.length)]; //i dodaje je do zmiennej str
        }
        return str; //funkcja zwraca wartość zmiennej str
    }

    //tworze klase Column
    function Column(name) {     //nazwa klasy z dużej litery
        var self = this;        //zmienna potrzebna by nie zgubić kontekstu przy zagnieżdzaniu funkcji

        this.id = randomString();   //przypisuje właściwości id wylosowaną przez funkcje randomString wartość
        this.name = name;           //przypisuje właściwości name wartość podanego argumentu name
        this.$element = createColumn();

        function createColumn() {   //funkcja tworzy elementy, podpina zdarzenia, konstruuje kolumny i zwraca je.
                                    //znak dolara oznacza ze zmienna trzyma ele. jquery

            var $column = $('<div>').addClass('column');                //tworze ele. div z klasa column              
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);  //tworze ele. h2 i dodaje klase column-title i dodaje tekst przy pomocy metody text. Tekst znajduje sie we właściwości name.
            var $columnCardList = $('<ul>').addClass('column-card-list');   //tworze liste na kartki i dodaje klasę column-card-list
            var $columnDelete = $('<button>').addClass('btn-delete btn').text('x');     //dodaje przyciski za pomocą których dodaje i usuwam karty z listy
            var $columnAddCard = $('<button>').addClass('add-card btn').text('Dodaj kartę');

            $columnDelete.click(function () {   //jeśli wystapi zdarzenie click ....
                self.removeColumn();
            });
            
            $columnAddCard.click(function () {      //jeśli wystąpi zdarzenie click...
                var name = prompt("Wprowadź nazwę karty.");
                if (name === null || name === '') {
                    alert('Podana nazwa jest nieprawidłowa. Wprowadź poprawną wartość.');
                    return;
                }            
                self.addCard(new Card(name));     
            });

            $column.append($columnTitle)        //budowa elementu $column
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;     //zwrócenie przez funkcje ele. $column
        }
    }

    Column.prototype = {
        addCard: function(card) {       //metoda przyjmuje parametr card który dodany zostanie do kolumny
            this.$element.children('ul').append(card.$element); //pobieram wszystkie dzieci ul elementu o klasie column i podpinamy do niej karte
        },
        removeColumn: function() {
            this.$element.remove();
        }        
    }

    function Card(description) {        //odpowiedzialna za konstruowanie kart podobna w budowie do klasy Column
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() { //funkcja tworzy ele. z których będzie składała się karta. Podpina odpowiednie zdarzenia pod elementy. Buduje karty i je zwraca.
            var $card = $('<li>').addClass('card');     //tworze ele. li i dodaje mu klase
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);    //tworze ele. p idod. mu klase i tekst
            var $cardDelete = $('<button>').addClass('btn-delete btn').text('x');   //tworze przycisk do usuwania karty

            $cardDelete.click(function() {      //obsługa zdarzenia click. Usunięcie karty.
                self.removeCard()
            });

            $card.append($cardDelete)           //tworzenie karty
                .append($cardDescription);
            return $card;                       //zwracanie karty
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {               //metoda stworzy kolumnę dzięki przypięciu jej ele. do ele. tablicy (#board .column-container)
            this.$element.append(column.$element);  
            initSortable();
        },
        $element: $('#board .column-container')     //this.$element wskazuje na board.$element. W tej właściwości trzymany jest poprawny ele. kontenera tablicy.
    };

    function initSortable() {           //dzięki implementacji jqueryUl można skożystać z metody sortable, która umożliwia przenoszenie elementów na stronie(drag'n'drop). 
        $('.column-card-list').sortable({       //wybieram wszystkie listy kart, które maja mieć możliwość przenoszenia.
            connectWith: '.column-card-list',   //Metoda sortable przyjmuje jako parametr obiekt konfiguracyjny. ConnectWith to atrybut przy pomocy którego wybieramy liste w której będzie działać sortowanie.
            placeholder: 'card-placeholder'     //Placeholder to atrybut który trzyma nazwe klasy która pojawia sie po najechaniu na puste pole, na które chcemy upuścić przenoszony element.
        }).disableSelection();      //wyłączenie zaznaczania tekstu na kartach, które przeciągamy.
    }

    $('.create-column').click(function(){       //podpięcie zdarzenia do przycisku tablicy o klasie create-column. Wybieramy przycis.
        var name = prompt('Wprowadź nazwę kolumny.');   //po kliknięciu uruchamia się funkcja, która poprosi o podanie nazwy kolumny, którą chcemy stworzyć.
        if (name === null || name === '') {
            alert('Podana nazwa jest nieprawidłowa. Wprowadź poprawną wartość.');
            return;
        }  
        var column = new Column(name);
            board.addColumn(column);
    });

    // tworzenie kolumn
    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie pracy');
    var doneColumn = new Column('Zrobione');

    // dodanie kolumn do board
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // tworzenie kart
    var card1 = new Card('Nowe zadanie');
    var card2 = new Card('Tworzenie Kanban');
    var card3 = new Card('Moduł zaliczony');

    // dodanie kart do kolumn
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addC(card3);
})
