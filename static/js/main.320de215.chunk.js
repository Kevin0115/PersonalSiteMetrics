(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){},30:function(e,t,n){e.exports=n(50)},36:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(16),c=n.n(o),i=(n(36),n(9)),s=n(10),u=n(12),l=n(11),h=n(13),m=(n(18),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={json:null},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://ec2.kevnchoi.com/analytics/count").then(function(e){return e.json()}).then(function(t){return e.setState({json:t})}).catch(function(e){return console.log("Error: "+e)})}},{key:"renderCount",value:function(){return this.state.json?this.state.json.count:null}},{key:"render",value:function(){return r.a.createElement("div",{className:"header-content"},r.a.createElement("h1",null,"Site Metrics"),r.a.createElement("p",{className:"count"},"Total Site Visits: ",this.renderCount()))}}]),t}(a.Component)),v=n(55),d=n(53),f=n(56),j=n(54),p=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={json:null},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://ec2.kevnchoi.com/analytics").then(function(e){return e.json()}).then(function(t){return e.setState({json:t})}).catch(function(e){return console.log("Error: "+e)})}},{key:"renderMetricsCards",value:function(){var e=this;return this.state.json?this.state.json.map(function(t,n){return r.a.createElement(v.a,{bg:"light",style:{width:"60vw"},key:n},r.a.createElement(v.a.Header,null,r.a.createElement(d.a.Toggle,{as:f.a,variant:"link",eventKey:n.toString()},"Session ID: ",t.sessionId)),r.a.createElement(d.a.Collapse,{eventKey:n.toString()},r.a.createElement(j.a,null,e.renderEvents(t.events))))}):null}},{key:"renderEvents",value:function(e){return e.map(function(e,t){return r.a.createElement(j.a.Item,{key:t},r.a.createElement("p",{className:"event-desc"},e.eventType,": ",e.timestamp))})}},{key:"render",value:function(){return r.a.createElement("div",{className:"body-content"},r.a.createElement(d.a,null,this.renderMetricsCards()))}}]),t}(a.Component),E=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-container"},r.a.createElement(m,null),r.a.createElement(p,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[30,1,2]]]);
//# sourceMappingURL=main.320de215.chunk.js.map