function showhide() {
    const show= document.getElementById("psw");
    if(show.type=="password"){
        show.type="text"
    }else{
        show.type="password"
    }
  }