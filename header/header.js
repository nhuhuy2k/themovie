
$(document).ready(function(){
    window.onscroll = function () {
        let header = document.getElementById("header")
        if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
            header.classList.add("shink")
        } else {
            header.classList.remove("shink")
        }
    }
})




