export function download(filename, text){
  var blob = new Blob([text], {type: "text/plain"});
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
