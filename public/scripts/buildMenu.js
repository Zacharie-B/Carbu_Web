function createMenu(){
  var divMenu = document.getElementsByClassName('barre');
  // console.log(divMenu[0].id);

  let divContainer = document.createElement('div');
  divContainer.className = 'container';

  let divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');

  let navBar = document.createElement('nav');
  navBar.setAttribute('class', 'col navbar navbar-expand-lg navbar-dark');
  
  
  // On génère la partie gauche du menu.
  let aNavbar = document.createElement('a');
  aNavbar.setAttribute('class', 'navbar-brand');
  aNavbar.setAttribute('href', '/index');

  aNavbar.innerHTML ='<img src="images/logo.jpg" width="50" height="50" alt="Logo essence" /> Trouve ton essence';
  navBar.appendChild(aNavbar);

  let divNcontent = document.createElement('div');
  divNcontent.setAttribute('id', 'navbarContent');
  divNcontent.setAttribute('class', 'collapse navbar-collapse');

  let ulNv = document.createElement('ul');
  ulNv.setAttribute('class', 'navbar-nav');

  let liNvtime = document.createElement('li');
  if(divMenu[0].id == 'menu-index') liNvtime.className = 'nav-item active';
  else  liNvtime.setAttribute('class', 'nav-item');

  let aNavlink = document.createElement('a');
  aNavlink.setAttribute('class', 'nav-link');
  aNavlink.setAttribute('href','/index');
  aNavlink.innerHTML = 'Acceuil';

  liNvtime.appendChild(aNavlink);
  ulNv.appendChild(liNvtime);
  divNcontent.appendChild(ulNv);


  // On génère la partie de droite du menu.
  let divNvContent = document.createElement('div');
  divNvContent.setAttribute('id', 'navbarContent');
  divNvContent.setAttribute('class', 'collapse navbar-collapse');

  let ulNvml = document.createElement('ul');
  ulNvml.setAttribute('class', 'navbar-nav ml-auto');

  let liNvitem1 = document.createElement('li');
  if(divMenu[0].id === 'menu-login') liNvitem1.className = 'nav-item active';
  else  liNvitem1.setAttribute('class', 'nav-item');
  let aNvlink1 = document.createElement('a');
  aNvlink1.setAttribute('class', 'nav-link');
  aNvlink1.setAttribute('href', '/login');
  aNvlink1.innerHTML = 'Se connecter';
  liNvitem1.appendChild(aNvlink1);
  ulNvml.appendChild(liNvitem1);

  let liNvitem2 = document.createElement('li');
  if(divMenu[0].id === 'menu-register') liNvitem2.className = 'nav-item active';
  else  liNvitem2.setAttribute('class', 'nav-item');
  let aNvlink2 = document.createElement('a');
  aNvlink2.setAttribute('class', 'nav-link');
  aNvlink2.setAttribute('href', '/register');
  aNvlink2.innerHTML = 'S\'inscrire';
  liNvitem2.appendChild(aNvlink2);
  ulNvml.appendChild(liNvitem2);

  let liNvitem3 = document.createElement('li');
  if(divMenu[0].id === 'menu-contacts') liNvitem3.className = 'nav-item active';
  else  liNvitem3.setAttribute('class', 'nav-item');
  let aNvlink3 = document.createElement('a');
  aNvlink3.setAttribute('class', 'nav-link');
  aNvlink3.setAttribute('href', '/contacts');
  aNvlink3.innerHTML = 'Contacts';
  liNvitem3.appendChild(aNvlink3);
  ulNvml.appendChild(liNvitem3);

  // On ajoute tous les noeuds dans l'ordre.
  divNvContent.appendChild(ulNvml);
  navBar.appendChild(aNavbar);
  navBar.appendChild(divNcontent);
  navBar.appendChild(divNvContent);
  divRow.appendChild(navBar);
  divContainer.appendChild(divRow);
  divMenu[0].appendChild(divContainer);
}

createMenu();