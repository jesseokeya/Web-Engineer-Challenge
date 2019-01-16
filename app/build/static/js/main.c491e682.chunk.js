(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,a){e.exports=a(60)},58:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n,s=a(0),r=a.n(s),i=a(27),c=a.n(i),l=a(7),o=a(8),u=a(11),d=a(9),h=a(12),m=a(10),v=a(2),f=a(29),p=a(16),g={wastes:[],loading:!1},E={},y=Object(v.c)({wastes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_WASTES":case"SEARCH_WASTES":return Object(p.a)({},e,{wastes:t.payload});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}}}),b={},w=[f.a];try{n=Object(v.e)(y,b,Object(v.d)(v.a.apply(void 0,w),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()))}catch(x){n=Object(v.e)(y,b,Object(v.d)(v.a.apply(void 0,w)))}var N=n,O=a(18),S=a(6),k=a(5),j=a.n(k),_=a(17),T=a.n(_),W=window.location.host.includes("localhost")?"http://localhost:3001":"",R=function(){return{type:"LOADING"}},C=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).state={favourites:[],wastes:[],search:"",loading:!1,hasSearched:!1},e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.wastes.wastes.map(function(e){var t=j.a.parseHTML(e.body)[0].data;return e.body=t,t.includes("<li>")&&t.includes("<ul>")||(e.body="<ul><li>".concat(t,"</li></ul>")),e});t=this.ensureFavourites(t),this.setState({wastes:t,loading:e.wastes.loading})}},{key:"componentDidMount",value:function(){j()("#search").keypress(function(e){13===e.which&&j()("#searchButton").click()})}},{key:"handleChange",value:function(e){var t;this.setState((t={},Object(S.a)(t,e.target.name,e.target.value),Object(S.a)(t,"hasSearched",!1),t))}},{key:"handleSubmit",value:function(){var e=this;this.setState({loading:!0,hasSearched:!0},function(t){return e.props.searchWastes(e.state)})}},{key:"loading",value:function(){return this.state.loading&&r.a.createElement("div",{className:"text-center"},r.a.createElement("div",{className:"lds-hourglass"}))}},{key:"ensureFavourites",value:function(e){var t=this.state.favourites.map(function(e){return e.title});return e=e.map(function(e){return e.favourited=!!t.includes(e.title),e})}},{key:"displayFavourites",value:function(){var e=this;return this.state.favourites.length>0&&r.a.createElement("div",{className:"jumbotron"},r.a.createElement("div",{className:"container-fluid jumbotron-up"},r.a.createElement("h3",{className:"text-head"},"Favourites"),this.state.favourites.length>0&&this.state.favourites.map(function(t,a){return e.displayWaste(t,a)})))}},{key:"ensureFavouritedIntegrity",value:function(){this.state.favourites.map(function(e){return j()("i[name='".concat(e.title,"']"))}).forEach(function(e){return e.addClass("favourite")})}},{key:"favourite",value:function(e){var t=e.target.id.trim(),a=e.target.className;if("fa fa-star inline default"===a.trim()){var n=this.ensureFavourites(this.state.wastes),s=this.state.wastes.filter(function(e){return e.title.trim()===t}),r=this.state.favourites;e.target.className="".concat(e.target.className," favourite");var i=this.tagFavourites([].concat(Object(O.a)(s),Object(O.a)(r)));this.setState({favourites:i,wastes:n})}if("fa fa-star inline default favourite"===a.trim()){var c=this.ensureFavourites(this.state.wastes);j()("i[name='".concat(e.target.id,"']")).removeClass("favourite"),e.target.className="fa fa-star inline default";var l=this.state.favourites;l=l.filter(function(e){return e.title.trim()!==t}),this.setState({favourites:l,wastes:c},this.ensureFavouritedIntegrity)}}},{key:"tagFavourites",value:function(e){return e.map(function(e){return e.favourited=!0,e})}},{key:"displayWaste",value:function(e,t){var a=e.favourited&&!0===e.favourited?"favourite":"";return r.a.createElement("div",{className:"card-group",key:t},r.a.createElement("div",{className:"card contain-div custom"},r.a.createElement("p",{className:"lead inline"},r.a.createElement("i",{name:e.title,id:e.title,onClick:this.favourite.bind(this),className:"fa fa-star inline default ".concat(a),"aria-hidden":"true"}),r.a.createElement("strong",{className:"move-right"},e.title)),r.a.createElement("br",null)),r.a.createElement("div",{className:"card add-margin custom"},r.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.body}})))}},{key:"alert",value:function(e,t){var a=t.heading,n=t.message;return r.a.createElement("div",{className:"text-center"},r.a.createElement("div",{className:"alert alert-".concat(e," alert-dismissible fade show"),role:"alert"},r.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")),r.a.createElement("strong",null,a)," ",n))}},{key:"displayWastes",value:function(){var e=this;return!this.state.loading&&this.state.wastes.length>0&&this.state.wastes.map(function(t,a){return e.displayWaste(t,a)})}},{key:"displayDangerAlert",value:function(){return this.state.search.length>0&&this.state.wastes.length<=0&&this.state.hasSearched&&this.alert("danger",{heading:"Not Found!",message:"no waste item(s) matching ".concat(this.state.search," \ud83d\ude41")})}},{key:"displayInfoAlert",value:function(){return!this.state.search.length>0&&this.alert("info",{heading:"Lookup!",message:"start searching for waste items \ud83d\ude42"})}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card"},r.a.createElement("nav",{className:"navbar bg-custom text-center"},r.a.createElement("ul",{className:"nav navbar-nav mx-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("h2",null,r.a.createElement("b",{className:"text-white"}," Toronto Waste Lookup "))))),r.a.createElement("br",null),r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"text-center"},r.a.createElement("div",{className:"col-md-10 col-lg-11 col-sm-4 inline"},r.a.createElement("input",{id:"search",name:"search",className:"form-control form-control-lg",type:"text",placeholder:"Search",onChange:this.handleChange.bind(this)})),r.a.createElement("button",{id:"searchButton",className:"btn btn-primary btn-lg bg-search inline","aria-pressed":"true",onClick:this.handleSubmit.bind(this)},r.a.createElement("i",{className:"fa fa-search","aria-hidden":"true"}))),r.a.createElement("br",null)," ",this.loading()," ",r.a.createElement("br",null),r.a.createElement("div",{className:"container-fluid"},this.state.search&&this.displayWastes(),!this.state.loading&&this.displayDangerAlert(),this.displayInfoAlert())),r.a.createElement("br",null),this.displayFavourites()))}}]),t}(s.Component),F=Object(m.b)(function(e){return{wastes:e.wastes,errors:e.errors}},{getWastes:function(e){return function(e){e(R()),T.a.get("".concat(W,"/api/wastes")).then(function(t){return e({type:"GET_WASTES",payload:t.data})}).catch(function(t){return e({type:"GET_ERRORS",payload:{}})})}},searchWastes:function(e){var t=e.search;return function(e){e(R()),T.a.get("".concat(W,"/api/wastes?query=").concat(t)).then(function(t){return e({type:"SEARCH_WASTES",payload:t.data})}).catch(function(t){return e({type:"GET_ERRORS",payload:{}})})}}})(C),A=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(m.a,{store:N},r.a.createElement(F,this.props))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(58);c.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[30,2,1]]]);
//# sourceMappingURL=main.c491e682.chunk.js.map