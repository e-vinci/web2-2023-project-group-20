import archerTower from "../../assets/spriteSheets/entityPng/crossbowAlone.png"
import heavyTower from "../../assets/spriteSheets/entityPng/heavyTower.png"
import goblin from "../../assets/spriteSheets/entityPng/S_Goblin.png"
import hobGoblin from "../../assets/spriteSheets/entityPng/S_HobGoblin.png"
import wolf from "../../assets/spriteSheets/entityPng/S_Wolf.png"

const HomePage = () => {
    const main = document.querySelector('main');
    main.innerHTML = renderHomePage()

  };

  function renderHomePage(){    
  
  const innerHtmlHome = `<p class="h1" style = "text-align : center;">Bestiairy</p>
  <div class="card mb-3" style="max-width: 540px; opacity : 0.9; flex-end;background: linear-gradient(to right,#1c2b48, white ); left:1%  ">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${archerTower}" class="img-fluid rounded-start" alt="..." style = "align-items: center; margin : 40%;">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Archer tower</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>


<div class="card mb-3" style="max-width: 540px; opacity : 0.9;  flex-end;background: linear-gradient(to right,#1c2b48, white ); left:1%">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${heavyTower}" class="img-fluid rounded-start" alt="..." style = "align-items: center; margin : 40%;" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>


<div class="card mb-3" style="max-width: 540px; opacity : 0.9;  flex-end;background: linear-gradient(to right, white, #1c2b48); left:69% ">
<div class="row g-0">
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">Archer tower</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="col-md-4">
    <img src="${goblin}" class="img-fluid rounded-start" alt="..." style = "align-items: center; margin : 40%;">
  </div>
</div>
</div>


<div class="card mb-3" style="max-width: 540px; opacity : 0.9;  flex-end;background: linear-gradient(to right, white, #1c2b48); left:69% ">
<div class="row g-0">
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">Archer tower</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="col-md-4">
    <img src="${hobGoblin}" class="img-fluid rounded-start" alt="..." style = "align-items: center; margin : 40%;">
  </div>
</div>
</div>


<div class="card mb-3" style="max-width: 540px; opacity : 0.9;  flex-end;background: linear-gradient(to right, white, #1c2b48); left: 69%"> 
<div class="row g-0">
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">Archer tower</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="col-md-4">
    <img src="${wolf}" class="img-fluid rounded-start" alt="..." style = "align-items: center; margin : 40%;">
  </div>
</div>
</div>`
;
return innerHtmlHome
  }


  export default HomePage;