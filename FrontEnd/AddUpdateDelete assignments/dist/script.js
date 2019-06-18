/*************************************************/
//localStorage persistence
var STORAGE_KEY = "items";
//localStorage.clear();
var itemStorage = {
  fetch: function () {
    var saved = localStorage.getItem(STORAGE_KEY);
    var items = saved !== null ?
    JSON.parse(saved) :
    [
    {
      username: "Jondi Rose",
      fullname: "Alfred Jond Rose",
      point: 1234,
      notes: "super user" },

    {
      username: "Dulal",
      fullname: "Jonathan Smith",
      point: 23,
      notes: "new user" }];


    items.forEach(function (item, index) {
      item.id = index;
    });
    itemStorage.uid = items.length;
    return items;
  },
  save: function (items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } };


/*********************************************/
//let v_items = itemStorage.fetch();
/* 
 * A simple React component
 */
class Title extends React.Component {
  addItem() {
    console.log('Add ' + this.props);
  }

  render() {
    return React.createElement("header", { className: "panel-heading" }, "ReactJS 15.4x CURD Application");


  }}


/*
      * Render the above component into the div#app
      */

//$("#title").replaceWith(title.contents());

class Table extends React.Component {
  constructor() {
    console.log('constructor');
    super();

    this.state = {
      data: itemStorage.fetch() };


    console.log(this.state.data);
  }

  render() {
    return (
      React.createElement("tbody", { role: "alert", "aria-live": "polite", "aria-relevant": "all" },
      this.state.data.map((item, i) => React.createElement(TableRow, { key: i, data: item }))));


  }}


class TableRow extends React.Component {
  render() {
    return (
      React.createElement("tr", null,
      React.createElement("td", null, React.createElement("span", null, this.props.data.username)),
      React.createElement("td", null, React.createElement("span", null, this.props.data.fullname)),
      React.createElement("td", null, React.createElement("span", null, this.props.data.point)),
      React.createElement("td", null, React.createElement("span", null, this.props.data.notes)),
      React.createElement("td", null, React.createElement("button", { className: "btn btn-success btn-xs" }, React.createElement("i", { className: "fa fa-pencil-square-o " })),
      React.createElement("button", { className: "btn btn-danger btn-xs" }, React.createElement("i", { className: "fa fa-trash-o" })))));



  }}


class App extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "container", id: "todoapp", style: { position: "absolute", left: "7%" } },

      React.createElement("section", { className: "wrapper site-min-height" },
      React.createElement("section", { className: "panel" },
      React.createElement("div", { className: "bg" },
      React.createElement("div", { className: "panel-body" },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-xs-2" },
      React.createElement("div", { className: "panel-body text-center" },
      React.createElement("div", { className: "pro-thumb" },
      React.createElement("img", { src: "https://formatjs.io/img/react.svg", alt: "" })))),



      React.createElement("div", { className: "col-xs-8" },
      React.createElement("div", { className: "degree" }, "ReactJS"))))),






      React.createElement(Title, null),
      React.createElement("div", { className: "panel-body" },
      React.createElement("div", { className: "adv-table editable-table " },
      React.createElement("div", { className: "clearfix" },
      React.createElement("div", { className: "btn-group" },
      React.createElement("button", { id: "editable-sample_new", className: "btn btn-success" }, "Add New ",
      React.createElement("i", { className: "fa fa-plus" }))),


      React.createElement("div", { className: "btn-group pull-right" },
      React.createElement("button", { className: "btn dropdown-toggle", "data-toggle": "dropdown", "aria-expanded": "false" }, "Tools ", React.createElement("i", { className: "fa fa-angle-down" })),

      React.createElement("ul", { className: "dropdown-menu pull-right" },
      React.createElement("li", null, React.createElement("a", { href: "#" }, "Print")),
      React.createElement("li", null, React.createElement("a", { href: "#" }, "Save as PDF")),
      React.createElement("li", null, React.createElement("a", { href: "#" }, "Export to Excel"))))),



      React.createElement("div", { className: "space15" }),

      React.createElement("div", { className: "table-responsive", tabindex: "1", style: { overflow: "hidden", outline: "none" } },

      React.createElement("div", { id: "editable-sample_wrapper", className: "dataTables_wrapper form-inline", role: "grid" },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-lg-6" },
      React.createElement("div", { id: "editable-sample_length", className: "dataTables_length" }, React.createElement("label", null,
      React.createElement("select", { size: "1", className: "form-control xsmall", "ng-options": "option.name for option in data.availableOptions track by option.id",
        "ng-model": "data.limit" }), "records per page"))),


      React.createElement("div", { className: "col-lg-6" },
      React.createElement("div", { className: "dataTables_filter", id: "editable-sample_filter" }, React.createElement("label", null, "Search: ", React.createElement("input", { type: "text", className: "form-control medium", "ng-model": "search" }))))),


      React.createElement("table", { className: "table table-striped table-hover table-bordered dataTable", id: "editable-sample", "aria-describedby": "editable-sample_info" },
      React.createElement("thead", null,
      React.createElement("tr", { role: "row" },
      React.createElement("th", { className: "sorting_disabled", role: "columnheader", rowspan: "1", colspan: "1", "aria-label": "Username", style: { width: "179px" } }, "Username"),
      React.createElement("th", { className: "sorting", role: "columnheader", tabindex: "0", "aria-controls": "editable-sample", rowspan: "1", colspan: "1", "aria-label": "Full Name: activate to sort column ascending", style: { width: "263px" } }, "Full Name"),
      React.createElement("th", { className: "sorting", role: "columnheader", tabindex: "0", "aria-controls": "editable-sample", rowspan: "1", colspan: "1", "aria-label": "Points: activate to sort column ascending", style: { width: "119px" } }, "Points"),
      React.createElement("th", { className: "sorting", role: "columnheader", tabindex: "0", "aria-controls": "editable-sample", rowspan: "1", colspan: "1", "aria-label": "Notes: activate to sort column ascending", style: { width: "175px" } }, "Notes"),
      React.createElement("th", { className: "sorting", role: "columnheader", tabindex: "0", "aria-controls": "editable-sample", rowspan: "1", colspan: "1", "aria-label": "Edit: activate to sort column ascending", style: { width: "85px" } }))),



      React.createElement(Table, null)),


      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-lg-6" },
      React.createElement("div", { className: "dataTables_info", id: "editable-sample_info" }, "Showing 1 to 1 of 1 entries")),

      React.createElement("div", { className: "col-lg-6" },
      React.createElement("div", { className: "dataTables_paginate paging_bootstrap pagination" },
      React.createElement("ul", null,
      React.createElement("li", { "ng-className": "{disabled: currentPage == 0}" },
      React.createElement("a", { href: true, "ng-click": "prevPage()" }, "\xAB Prev")),

      React.createElement("li", { "ng-repeat": "n in range(filteredData.length)", "ng-className": "{active: n == currentPage}", "ng-click": "setPage()" },
      React.createElement("a", { href: true, "ng-bind": "n + 1" }, "1")),

      React.createElement("li", { "ng-className": "{disabled: currentPage == pagedItems.length - 1}" },
      React.createElement("a", { href: true, "ng-click": "nextPage()" }, "Next \xBB"))))))))))))));













  }}


let tr = $("#app");
React.render(React.createElement(App, null), tr[0]);