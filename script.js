'use strict';


const closeDialogButton = document.getElementById('dialog-close'),
      headerMenu = document.getElementById('header-menu'),
      contactLink = document.getElementById('contact-link'),
      dataProtection = document.getElementById('data-protection'),
      dialogContent = document.getElementById('dialog-content'),
      impressum = document.getElementById('impressum'),
      home = document.getElementById('home'),
      faq = document.getElementById('faq'),
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


const createImageElement = (image, index) => {
    let img = document.createElement('img');
    img.src = image;
    img.id = `image${index}`;
    img.loading = 'lazy';
    img.dataset.index = index;
    img.addEventListener('click', handleImageClick);
    return img;
};

const handleImageClick = function () {
    let index = parseInt(this.dataset.index);
    updateDialogContent(index);
    updateDialogVisibility(true);
    attachButtonHandlers();
};

const updateDialogContent = (index) => {
    dialogContent.innerHTML = /*html*/`
        <button class="image-dialog-left" id="image-dialog-left"><</button>
        <img class="image-dialog-img" id="image-dialog-img" src="${images[index]}" data-index="${index}" alt="Image">
        <button class="image-dialog-right" id="image-dialog-right">></button>
    `;
};

const updateDialogVisibility = (isVisible) => {
    let dialog = document.getElementById('dialog');
    dialog.style.visibility = isVisible ? 'visible' : 'hidden';
};

const attachButtonHandlers = () => {
    let imageDialogLeftButton = document.getElementById('image-dialog-left');
    imageDialogLeftButton.onclick = handleLeftButtonClick;

    let imageDialogRightButton = document.getElementById('image-dialog-right');
    imageDialogRightButton.onclick = handleRightButtonClick;
};

const handleLeftButtonClick = () => {
    let dialogImg = document.getElementById('image-dialog-img');
    let index = parseInt(dialogImg.dataset.index);
    dialogImg.src = index > 0 ? images[index - 1] : images[images.length - 1];
    dialogImg.dataset.index = index > 0 ? index - 1 : images.length - 1;
};

const handleRightButtonClick = () => {
    let dialogImg = document.getElementById('image-dialog-img');
    let index = parseInt(dialogImg.dataset.index);
    dialogImg.src = index < images.length - 1 ? images[index + 1] : images[0];
    dialogImg.dataset.index = index < images.length - 1 ? index + 1 : 0;
};

images.forEach((image, index) => {
    let imageGallery = document.getElementById('image-gallery');
    let article = document.createElement('article');
    let img = createImageElement(image, index);
    article.appendChild(img);
    imageGallery.appendChild(article);
});

closeDialogButton.onclick = () => {
    headerMenu.style.visibility = 'hidden';
    updateDialogVisibility(false);
};

home.onclick = () => {
    headerMenu.style.visibility = 'hidden';
    updateDialogVisibility(false);
};

contactLink.onclick = () => {
    headerMenu.style.visibility = 'hidden';
    updateDialogVisibility(true);
    dialogContent.innerHTML = /*html*/`
        <form method="POST" id="contact-form">
            <h1>Kontakt</h1>
            <label for="email">E-Mail Adresse: </label>
            <input type="email" name="email" id="email" placeholder="E-Mail eingeben..." required autocomplete="off" tabindex="1">

            <label for="select">Wähle eine Kategorie: </label>

            <select id="select" name="select" required tabindex="2">
                <option value="">-bitte auswählen-</option>
                <option value="Reklamation">Beschwerde</option>
                <option value="Bewerbung">Bewerbung</option>
                <option value="Feedback">Feedback</option>
            </select>

            <label for="message">Deine Nachricht: </label>
            <textarea name="message" id="message" placeholder="Nachricht eingeben..." autocomplete="off" tabindex="3" required></textarea>

            <div class="data-protection-text">
                <input type="checkbox" class="accept" id="accept" required tabindex="4">
                <p>Datenschutzbestimmungen akzeptieren</p>
            </div>

            <div class="button-section">
                <input type="submit" class="button" id="send-button" disabled="disabled" value="Senden" tabindex="5">
            </div>
        </form>
    `;
    document.getElementById('accept').addEventListener('click', enableSendButton);
    document.getElementById('contact-form').onsubmit = sendMail;

};

const enableSendButton = () => {
    let sendButton = document.getElementById('send-button');
    let countdown = 5;

    if (document.getElementById('accept').checked) {
        setInterval(function () {
            sendButton.value = countdown;
            if (countdown >= 0) {
                countdown--;
            } else {
                sendButton.disabled = false;
                sendButton.value = 'Senden';
                sendButton.classList.add('active-button');
                clearInterval(this);
            }
        }, 1_000);
    }
};

const sendMail = function (event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(() => {
        dialogContent.innerHTML = /*html*/`
            <div class="contact-success">
                <h1>Kontaktanfrage</h1><br>
                <p><b>Ihre Nachricht wurde gesendet</b></p>
            </div>
        `;
        
        setTimeout(function () {
            location.reload();
        }, 5_000);

    }).catch((error) => {
        console.log(error);
    });
};

const companyData = {
    name: 'Pascal Mielke',
    street: 'Akazienweg. 49',
    zipCode: '61130',
    city: 'Nidderau',
    email: 'pamim@web.com',
    phone: '015118556428',
    fax: '06151-158698',
    ustId: '111896584D0',
    wirtschaftsId: '465/4523/44'
};

impressum.onclick = () => {
    headerMenu.style.visibility = 'hidden';
    updateDialogVisibility(true);
    dialogContent.innerHTML = /*html*/`
        <div class="impressum" id="impressum">
            <h2>Impressum</h2>
            <p>${companyData.name}</p>
            <p>${companyData.street}</p>
            <p>${companyData.zipCode} ${companyData.city}</p>
            <p><b>Vertreten durch:</b></p>
            <p>${companyData.name}</p>
            <p><b>Kontakt:</b></p>
            <p>Telefon: ${companyData.phone}</p>
            <p>Fax: ${companyData.fax}</p>
            <p>E-Mail: ${companyData.email}</p>
            <p><b>Umsatzsteuer-ID:</b></p>
            <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: ${companyData.ustId}</p>
            <p><b>Wirtschafts-ID:</b></p>
            <p>${companyData.wirtschaftsId}</p>
        </div>
    `;
};

faq.onclick = () => {
    headerMenu.style.visibility = 'hidden';
    updateDialogVisibility(true);
    dialogContent.innerHTML = /*html*/`
        <div class="faq" id="faq">
            <h2>FAQ</h2><br>
            <h3>1. Sind schwarze Katzen robuster als alle anderen Katzen?</h3>
            <h4>Forscher des National Institute of Health fanden heraus, dass die genetischen Mutationen, die zur schwarzen Fellfarbe führen, einen gewissen Schutz vor Krankheiten bieten können. Tatsächlich betreffen die Mutationen nämlich dieselben Gene, die bei Menschen mit einer HIV-Resistenz zusammenhängen.
                Darüber hinaus bietet schwarzes Fell eine perfekte Tarnung – egal, ob sich die Katze verstecken muss oder in der Dämmerung auf Beutezug geht.
            </h4>
            <h3>2. Können schwarze Katzen rosten?</h3>
            <h4>Natürlich nicht wortwörtlich! Vielmehr erkennt man bei vielen schwarzen Katzen eine rötlich-braune Färbung, sobald Sonnenlicht auf ihr Fell trifft. Das liegt daran, dass das Licht eine versteckte Tabby-Zeichnung offenbaren kann.
                Hinter einer permanent bräunlichen Färbung von schwarzem Fell kann aber auch ein Nährstoffdefizit stecken: Ein Mangel an der Aminosäure Tyrosin oder dem Mineralstoff Kupfer kann für den Farbwechsel verantwortlich sein.
            </h4>
            <h3>3. Warum sind schwarze Katzen so schwer zu fotografieren?</h3>
            <h4>Das liegt an der Tatsache, dass schwarze Katzen in der Regel weniger Licht reflektieren als ihre Artgenossen mit hellerem Fell. Das bedeutet, dass sie auf Fotos oft nur als dunkle Silhouette zu erkennen sind.
            </h4>
            <h3>4. Sind Katzen Unglücksbringer?</h3>
            <h4>Entgegen ihrem Image als Unglücksbote stehen Katzen in vielen Kulturen für das komplette Gegenteil:
                Eine schwarze Katze im Leben einer japanischen Singlefrau soll beispielsweise ein idealer Männer-Magnet sein.
                In den britischen Midlands gelten schwarze Katzen als perfektes Hochzeitsgeschenk, das der Braut Glück und ewige Liebe bescheren soll.
                Englische Matrosen wissen schon seit langer Zeit, dass schwarze Katzen an Bord Glück bringen und eine sichere Heimreise ermöglichen.
            </h4>
        </div>
    `;
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

let imageDialogLeftButton = document.getElementById('image-dialog-left');
let imageDialogRightButton = document.getElementById('image-dialog-right');
let dialog = document.getElementById('dialog');
window.onclick = (event) => {
    if ([imageDialogLeftButton, imageDialogRightButton, dialogContent].includes(event.target)) {
        updateDialogVisibility(false);
    }
};
