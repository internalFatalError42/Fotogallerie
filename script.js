'use strict';


const closeDialogButton = document.getElementById('dialog-close'),
      imageDialogLeftButton = document.getElementById('image-dialog-left'),
      imageDialogRightButton = document.getElementById('image-dialog-right'),
      headerMenu = document.getElementById('header-menu'),
      images = [
          'images/cat_1.jpg', 
          'images/cat_2.jpg', 
          'images/cat_3.jpg', 
          'images/cat_4.jpg', 
          'images/cat_5.jpg',
          'images/cat_6.jpg',
          'images/cat_7.jpg',
          'images/cat_8.jpg',
          'images/cat_9.jpg',
          'images/cat_10.jpg',
          'images/cat_11.jpg',
          'images/cat_12.jpg',
          'images/cat_13.jpg',
          'images/cat_14.jpg',
          'images/cat_15.jpg',
          'images/cat_16.jpg',
          'images/cat_17.jpg',
          'images/cat_18.jpg',
          'images/cat_19.jpg',
          'images/cat_20.jpg'
      ];

    
images.forEach((image, index) => {
    let imageGallery = document.getElementById('image-gallery');
    let article = document.createElement('article');
    let img = document.createElement('img');

    img.src = image;
    img.id = `image${index}`;
    img.loading = 'lazy';
    img.dataset.index = index;
    img.addEventListener('click', () => {
        let dialog = document.getElementById('dialog');
        let dialogImg = document.getElementById('image-dialog-img');

        dialogImg.dataset.index = index;
        dialogImg.src = images[index];
        dialog.style.visibility = 'visible';
    });
    article.appendChild(img);
    imageGallery.appendChild(article);
});


closeDialogButton.onclick = () => {
    let dialog = document.getElementById('dialog');
    dialog.style.visibility = 'hidden';
};


imageDialogLeftButton.onclick = () => {
    let dialogImg = document.getElementById('image-dialog-img');
    let index = parseInt(dialogImg.dataset.index);

    dialogImg.src = index > 0 ? images[index - 1] : images[images.length - 1];
    dialogImg.dataset.index = index > 0 ? index - 1 : images.length - 1;
};


imageDialogRightButton.onclick = () => {
    let dialogImg = document.getElementById('image-dialog-img');
    let index = parseInt(dialogImg.dataset.index);

    dialogImg.src = index < images.length - 1 ? images[index + 1] : images[0];
    dialogImg.dataset.index = index < images.length - 1 ? index + 1 : 0;
};


document.getElementById('menu-logo').onclick = () => {
    if (headerMenu.style.visibility === 'visible') {
        headerMenu.style.visibility = 'hidden';
    } else {
        headerMenu.style.visibility = 'visible';
    }
};

document.getElementById('close-button').onclick = () => {
    headerMenu.style.visibility = 'hidden';
};

window.onclick = function(event) {
    let dialog = document.getElementById('dialog');

    if (event.target == dialog) {
        dialog.style.visibility = "hidden";
    }
 }
