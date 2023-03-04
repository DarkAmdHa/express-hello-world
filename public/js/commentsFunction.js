function loadcomments() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/getcomment', true)
  xhr.onload = function () {
    if (this.status === 200) {
      const result = this.responseText;
      const results = JSON.parse(result);
      const commentDisplay = document.querySelector(".commentDisplay");
      results.map((comment) => {
        const commentBox = document.createElement("div");
        commentBox.className = 'commentBox';
        const customerbox = document.createElement("div");
        customerbox.className = 'customerbox';
        const customerIcon = document.createElement("div");
        customerIcon.className = 'customerIcon';
        const cutomerDetails = document.createElement("div");
        cutomerDetails.className = 'cutomerDetails';
        const customerName = document.createElement("h4");
        customerName.id = 'customerName';
        const date = document.createElement("h6");
        date.id = 'date';
        const p = document.createElement("p");
        p.id = "p";
        const customerComment = document.createElement("div");
        customerComment.className = "customerComment";
        const pcomment = document.createElement("p");
        pcomment.className = "customerComment";
        
        commentBox.appendChild(customerbox);
        customerbox.appendChild(customerIcon);
        customerbox.appendChild(cutomerDetails);
        commentBox.appendChild(customerComment);
        cutomerDetails.appendChild(customerName);
        cutomerDetails.appendChild(date);
        cutomerDetails.appendChild(p);
        customerComment.appendChild(pcomment);
        commentDisplay.appendChild(commentBox);
        customerIcon.innerHTML = `<span><i class="fa-solid fa-user"></i></span>`
        customerName.innerHTML = `${comment.userName}`;
      
        const datee = new Date(comment.Date);
        let dd = datee.getDate();
        let mm = datee.getMonth() + 1;
        let yy = datee.getFullYear()
        let present = `${dd}/${mm}/${yy}`
        date.innerHTML = `${present}`;
        // Do not forget the rating here!!!!

        const stars = comment.Rating
        const oneStar = '<span><i class="fa-solid fa-star"></i></span>'
        for (let i = 0; i < stars; i++){
          p.innerHTML += oneStar
        }

        pcomment.innerHTML =`${comment.comment}`


      })
      // To display the total number of comments.
      const displayTotalComments = document.querySelector('.displayTotalComments')
      const totalP = document.createElement("p");
      displayTotalComments.appendChild(totalP);
      totalP.innerHTML =`Total rating 4.7 and ${results.length} comments.`
    }
  }

  xhr.send();
}


function insertComment(e) {
  const xhr = new XMLHttpRequest;

  const name = document.getElementById('name').value;
  const clientID = document.getElementById('clientID').value;
  
  const star = document.getElementById('star').value;
  const msg = document.getElementById('msg').value;
  const data = {
    "name": name,
    "clientID": parseInt(clientID) ,
    "star": star,
    "msg": msg
  }
  xhr.open('POST', '/insert', true);
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onload = function () {
    var result = this.responseText
    if (result === "notworking") {
      console.log("gotit")
    }
  }
  xhr.send(JSON.stringify(data))

  e.preventDefault()

}