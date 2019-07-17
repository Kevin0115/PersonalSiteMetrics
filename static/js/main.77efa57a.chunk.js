(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,n){},59:function(e,t,n){e.exports=n(90)},64:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(27),o=n.n(s),c=(n(64),n(17)),i=n(18),l=n(21),u=n(19),h=n(22),m=(n(40),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={json:null},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://ec2.kevnchoi.com/analytics/count").then(function(e){return e.json()}).then(function(t){return e.setState({json:t})}).catch(function(e){return console.log("Error: "+e)})}},{key:"renderCount",value:function(){return this.state.json?this.state.json.count:null}},{key:"render",value:function(){return r.a.createElement("div",{className:"header-content"},r.a.createElement("h1",null,"Site Metrics"),r.a.createElement("p",{className:"count"},"Total Site Visits: ",this.renderCount()))}}]),t}(a.Component)),d=n(11),v=n(98),f=n(97),p=n(93),E=n(99),y=n(95),b=n(96),g=n(94),j=n(55),k=n.n(j),w=n(15),C=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={json:null,auth:!0,username:"",password:"",authRes:null,authMessage:"",data:[]},n.handlePasswordChange=n.handlePasswordChange.bind(Object(d.a)(n)),n.handleUsernameChange=n.handleUsernameChange.bind(Object(d.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(d.a)(n)),n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://ec2.kevnchoi.com/analytics").then(function(e){return e.json()}).then(function(t){return e.setState({json:t})}).then(function(){return e.processMetrics()}).catch(function(e){return console.log("Error: "+e)})}},{key:"processMetrics",value:function(){for(var e=this.state.json,t=[],n=0;n<e.length;n++)for(var a=e[n].events,r=0;r<a.length;r++)this.insertEvent(t,a[r].eventType);t.sort(function(e,t){return t.y-e.y}),this.setState({data:t})}},{key:"insertEvent",value:function(e,t){if(0===e.length)e.push({x:t,y:1});else{for(var n=0;n<e.length;n++)if(e[n].x===t)return void(e[n].y=e[n].y+1);e.push({x:t,y:1})}}},{key:"renderMetricsCards",value:function(){var e=this;return this.state.json?this.state.json.map(function(t,n){return r.a.createElement(v.a,{bg:"light",style:{width:"60vw"},key:n},r.a.createElement(v.a.Header,null,r.a.createElement(f.a.Toggle,{as:p.a,variant:"link",eventKey:n.toString()},"Session ID: ",t.sessionId)),r.a.createElement(f.a.Collapse,{eventKey:n.toString()},r.a.createElement(E.a,null,e.renderEvents(t.events))))}):null}},{key:"renderChart",value:function(){return this.state.json?r.a.createElement(w.e,{margin:{bottom:100},xType:"ordinal",height:300,width:400},r.a.createElement(w.c,null),r.a.createElement(w.a,null),r.a.createElement(w.f,null),r.a.createElement(w.d,{tickLabelAngle:-80}),r.a.createElement(w.b,{data:this.state.data})):null}},{key:"renderEvents",value:function(e){return e.map(function(e,t){var n=k()(e.timestamp).format("MMMM Do YYYY, h:mmA"),a=e.eventType.split("="),s="",o="";switch(a[0]){case"sessionStart":s="Started Session";break;case"linkVisit":s="Viewed ";break;case"navTo":s="Navigated to ";break;default:s="Unknown Event"}return a[1]&&(o=a[1]),r.a.createElement(E.a.Item,{key:t},r.a.createElement("p",{className:"event-desc"},s+o,": ",n))})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n={username:this.state.username,password:this.state.password};fetch("https://ec2.kevnchoi.com/analytics/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(e){return e.json()}).then(function(e){"Authenticated"===e.status?t.setState({auth:!0,authMessage:""}):t.setState({authMessage:e.status})}).catch(function(e){return console.log("Error: "+e)})}},{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value})}},{key:"handleUsernameChange",value:function(e){this.setState({username:e.target.value})}},{key:"renderAuth",value:function(){return r.a.createElement(y.a,{onSubmit:this.handleSubmit},r.a.createElement(y.a.Group,{controlId:"formBasicEmail"},r.a.createElement(y.a.Control,{placeholder:"Username",onChange:this.handleUsernameChange})),r.a.createElement(y.a.Group,{controlId:"formBasicPassword"},r.a.createElement(y.a.Control,{type:"password",placeholder:"Password",onChange:this.handlePasswordChange}),r.a.createElement(y.a.Text,{className:"text-muted"},this.state.authMessage)),r.a.createElement(p.a,{variant:"outline-primary",type:"submit"},"Submit"))}},{key:"render",value:function(){return this.state.auth?r.a.createElement("div",{className:"body-content"},r.a.createElement(v.a,null,r.a.createElement(v.a.Body,null,r.a.createElement(b.a,{defaultActiveKey:"events"},r.a.createElement(g.a,{eventKey:"events",title:"Events"},r.a.createElement("div",{className:"accordion"},r.a.createElement(f.a,null,this.renderMetricsCards()))),r.a.createElement(g.a,{eventKey:"charts",title:"Charts"},r.a.createElement("div",{className:"charts"},this.renderChart())))))):r.a.createElement("div",{className:"body-content"},this.renderAuth())}}]),t}(a.Component),S=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-container"},r.a.createElement(m,null),r.a.createElement(C,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[59,1,2]]]);
//# sourceMappingURL=main.77efa57a.chunk.js.map