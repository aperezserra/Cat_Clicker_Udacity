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

         active_cat: null,

         admin_view_active: false,
    };


    var control = {

        getCatList: function() {
            return data.cat_list;
        },

        getActiveCat: function() {
            return data.active_cat;
        },

        getAdminViewStatus: function() {
            return data.admin_view_active;
        },

        increaseCatClicks: function() {
            let activeCat = this.getActiveCat();
            activeCat.clicks_amount += 1;
            cat_view.render();
            admin_view.render();
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

        setAdminViewStatus: function(status) {
            //The status variable should be given as true or false to set the form to visible or not.
            data.admin_view_active = status;
        },

        toggleAdminFormView: function() {
            if (data.admin_view_active === false) {
                data.admin_view_active = true;
                admin_view.render();
            }
            else {
                data.admin_view_active = false;
                admin_view.render();
            }
        },

        init: function() {
            this.setActiveCat(1);
            list_view.init();
            cat_view.init();
            admin_view.init();
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
                        control.setAdminViewStatus(false);
                        cat_view.render();
                        admin_view.render();
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


    var admin_view = {
        init: function() {
            // Getting Buttons from the DOM to attach event listeners to them.
            this.adminBtn = document.querySelector('button[name="admin_btn"]');
            this.cancelBtn = document.querySelector('button[name="cancel_btn"]');
            this.saveBtn = document.querySelector('button[name="save_btn"]');

            //Adding event listeners to the DOM buttons selected.
            let adminBtn = this.adminBtn;
            adminBtn.addEventListener('click', function(){
                control.toggleAdminFormView();
            });

            let cancelBtn = this.cancelBtn;
            cancelBtn.addEventListener('click', function(){
                control.toggleAdminFormView();
            });

            let saveBtn = this.saveBtn;

            this.render();
        },
        render: function() {
            // Getting the Admin Form status (visible or not) to render it or not.
            let adminViewStatus = control.getAdminViewStatus();
            // Getting DOM Elements to modify
            let adminForm = document.getElementById('cat_admin_hid_div');
            let inputCats = document.getElementsByTagName('input');
            let inputCatName = document.getElementById('form_cat_name');
            let inputCatPath = document.getElementById('form_cat_path');
            let inputCatClicks = document.getElementById('form_cat_clicks');
            // Getting the active cat.
            let activeCat = control.getActiveCat();

            // Setting placeholder attributes to the current cat attributes
            inputCatName.placeholder = activeCat.cat_name;
            inputCatPath.placeholder = activeCat.cat_path;
            inputCatClicks.placeholder = activeCat.clicks_amount;

            // Clearing out the input value for every input field in the admin form.
            for(let i = 0; i < inputCats.length; i++) {
                inputCats[i].value = "";
                }


            if (adminViewStatus) {
                adminForm.style.display = "";
                }
            else {
                adminForm.style.display = "none";
                }
        },
    };

    control.init();
}())
