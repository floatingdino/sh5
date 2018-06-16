export function getType(path) {
  switch (path.match(/^\/([^/]*)/)[1]) { // first part of the path
    case "":
      return "homepage";
    case "portfolio":
      return "portfo";
    default:
      return "page";
  }
}
export function getDataPath(path) {
  switch (path) {
    case "/":
      return "home";
    default:
      return path.match(/\/([^/]*)$/)[1]; // slug of final page in route
  }
}
