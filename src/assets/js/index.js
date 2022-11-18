const bandMemberIDs = ["alain-jasmine",
                     "jacques-danger",
                     "dove",
                     "dr-homme"]

for (let index = 0; index < bandMemberIDs.length; index++) {
    const bandMemberID = bandMemberIDs[index];
    const element = document.getElementById(bandMemberID);
    element.addEventListener("click", OnClick());
}

function OnClick () {
    const imgEl     = this.getElementsByTagName("img");
    const tableEl   = this.getElementsByClassName("member-info");

    if (tableEl.hidden == true) {
        imgEl.style.filter = "brightness(0.33)";
        tableEl.style.display = true;
    }
    else {
        imgEl.style.filter = "brightness(1)";
        tableEl.style.display = false;
    }
}
