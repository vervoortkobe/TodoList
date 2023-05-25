function preload() {
  setTimeout(() => {
    document.getElementById("preload").style.display = "none";
    document.getElementById("pagecontent").style.display = "block";
  }, 1000);
}
preload();
function toggle() {
  const body = document.getElementById("body").classList;
  if(body.contains("dark-mode")) body.remove("dark-mode");
  else body.add("dark-mode");
}