function loadSomePets (){
   fetch('/pets?page=1&limit=3')
      .then(response => response.json())
      .then(data => console.log(data));
}

loadSomePets();