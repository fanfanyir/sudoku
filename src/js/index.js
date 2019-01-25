const Grid = require("./ui/grid");
const Popupnumbers = require("./ui/popupnumbers");

const grid = new Grid($("#container"));

grid.build();
grid.layout();

const popupnumbers = new Popupnumbers($("#popupNumbers"));
grid.bindPopup(popupnumbers);

$("#check").on("click", e => {
  grid.check();
});
$("#reset").on("click", e => {
  grid.reset();
});
$("#clear").on("click", e => {
  grid.clear();
});
$("#rebuild").on("click", e => {
  grid.rebuild();
});