(function () {

    var data = {
         cat_list: [
             {
                 cat_id: 1,
                 clicks_amount: 0,
                 cat_name: "Deadpool",
                 cat_path: "./img/deadpool.jpg",
             },
             {
                 cat_id: 2,
                 clicks_amount: 0,
                 cat_name: "Batman",
                 cat_path: "./img/batman.jpg",
             },
             {
                 cat_id: 3,
                 clicks_amount: 0,
                 cat_name: "Thor",
                 cat_path: "./img/thor.jpg",
             },
             {
                 cat_id: 4,
                 clicks_amount: 0,
                 cat_name: "Superman",
                 cat_path: "./img/superman.jpg",
             },
         ],

         active_cat: "",
    };


    var control = {

        getCatList: function() {
            return data.cat_list;
        },

        getActiveCat: function() {
            return data.active_cat;
        },

        increaseCatClicks: function() {
            let activeCat = this.getActiveCat();
            activeCat.clicks_amount += 1;
            cat_view.render();
        },

        setActiveCat: function(ctl_cat_id) {
            if (ctl_cat_id <= 0) {
                window.alert("The cat ID should be a greater than 0");
                return "";
            }
            else {
                data.active_cat = data.cat_list[ctl_cat_id-1];
            }
        },

        init: function() {
            this.setActiveCat(1);
            list_view.init();
            cat_view.init();
        },
    };


    var list_view = {

        init: function() {
            // Getting DOM elements to modify.
            this.catList = document.getElementById("cat_list");
            this.catItemTemplate = document.querySelector('script[data-template="cat_list_item"]').innerHTML;

            this.render();
        },

        render: function() {

            // Using the DOM elements to modify obtained before.
            let catItemTemplate = this.catItemTemplate;
            let thisCatList = this.catList;
            let catListLength = control.getCatList().length;

            // Adding new list elements to the DOM.
            control.getCatList().forEach(function(cat) {
                let thisTemplate = catItemTemplate.replace(/{{Cat_Id}}/g, cat.cat_id);
                thisTemplate = thisTemplate.replace(/{{Cat_Name}}/g, cat.cat_name);

                thisCatList.innerHTML += thisTemplate;
            })

            // Adding "click" event listener to each element of the list.
            for (let i = 0; i < catListLength; i++) {
                let catListElement = document.querySelector(`li[data-id="${i+1}"]`);
                catListElement.addEventListener('click', (function(cat_id) {
                    return function() {
                        control.setActiveCat(cat_id + 1);
                        cat_view.render();
                        };
                    })(i));
            }
        },
    };


    var cat_view = {
        init: function() {
            this.catPictureElement = document.getElementById("cat_picture_div");
            let catPictureElement = this.catPictureElement;

            catPictureElement.addEventListener('click', function(){
                control.increaseCatClicks();
                })

            this.render();
        },

        render: function() {
            let catPictureElement = this.catPictureElement;
            let activeCat = control.getActiveCat();
            let catPictureTemplate = document.querySelector('script[data-template="cat_picture_item"]').innerHTML;

            let thisTemplate = catPictureTemplate.replace(/{{Cat_Name}}/g, activeCat.cat_name);
            thisTemplate = thisTemplate.replace(/{{Cat_Img_Path}}/g, activeCat.cat_path);
            thisTemplate = thisTemplate.replace(/{{Cat_Clicks}}/g, activeCat.clicks_amount);

            catPictureElement.innerHTML = thisTemplate;
        },
    };

    control.init();
}())
