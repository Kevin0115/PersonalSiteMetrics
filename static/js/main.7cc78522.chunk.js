(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,a){},59:function(e,t,a){e.exports=a(90)},64:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(27),i=a.n(s),l=(a(64),a(17)),c=a(18),o=a(21),u=a(19),h=a(22),d=(a(40),function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"header-content"},r.a.createElement("h1",null,"Site Metrics"))}}]),t}(n.Component)),m=a(10),v=a(99),p=a(98),E=a(93),f=a(94),y=a(100),g=a(96),b=a(97),w=a(95),k=a(48),j=a.n(k),O=a(15),S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={json:null,totalVisits:0,username:"",password:"",authMessage:"",data:[],vWidth:0,reverseOrder:!1},a.handlePasswordChange=a.handlePasswordChange.bind(Object(m.a)(a)),a.handleUsernameChange=a.handleUsernameChange.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.reverseOrder=a.reverseOrder.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({vWidth:window.innerWidth}),fetch("https://ec2.kevnchoi.com/analytics").then(function(e){return e.json()}).then(function(t){return e.setState({json:t.reverse(),totalVisits:t.length})}).then(function(){return e.processMetrics()}).catch(function(e){return console.log("Error: "+e)})}},{key:"processMetrics",value:function(){for(var e=this.state.json,t=[],a=0;a<e.length;a++)for(var n=e[a].events,r=0;r<n.length;r++){var s=n[r].eventType,i=s.substring(s.indexOf("=")+1);this.insertEvent(t,i)}t.sort(function(e,t){return t.y-e.y}),this.setState({data:t})}},{key:"insertEvent",value:function(e,t){if("sessionStart"!==t)if(0===e.length)e.push({x:t,y:1});else{for(var a=0;a<e.length;a++)if(e[a].x===t)return void(e[a].y=e[a].y+1);e.push({x:t,y:1})}}},{key:"reverseOrder",value:function(){this.setState({json:this.state.json.reverse(),reverseOrder:!this.state.reverseOrder})}},{key:"renderReverseButton",value:function(){return this.state.reverseOrder?r.a.createElement("div",null,"\u21a5"):r.a.createElement("div",null,"\u21a7")}},{key:"renderMetricsCards",value:function(){var e=this;return this.state.json?this.state.json.map(function(t,a){return r.a.createElement(v.a,{bg:"light",style:{width:"60vw"},key:a},r.a.createElement(v.a.Header,{className:"header",style:{height:"36px",padding:"2px 4px"}},r.a.createElement(p.a.Toggle,{style:{padding:"2px"},as:E.a,variant:"link",eventKey:a.toString()},r.a.createElement(f.a,{variant:"primary",className:"event-count"},t.events.length),j()(t.events[0].timestamp).format("M/D/YY, h:mmA")),r.a.createElement("div",{className:"time"},t.sessionId)),r.a.createElement(p.a.Collapse,{eventKey:a.toString()},r.a.createElement(y.a,null,e.renderEvents(t.events))))}):null}},{key:"renderChart",value:function(){return this.state.json?r.a.createElement(O.e,{margin:{bottom:60},xType:"ordinal",height:300,width:this.state.vWidth/2},r.a.createElement(O.c,null),r.a.createElement(O.a,null),r.a.createElement(O.f,null),r.a.createElement(O.d,{tickLabelAngle:-50}),r.a.createElement(O.b,{data:this.state.data})):null}},{key:"renderEvents",value:function(e){return e.map(function(e,t){var a=j()(e.timestamp).format("MMMM Do YYYY, h:mmA"),n=e.eventType.split("="),s="",i="";switch(n[0]){case"sessionStart":s="Started Session";break;case"linkVisit":s="Viewed ";break;case"navTo":s="Navigated to ";break;default:s="Unknown Event"}return n[1]&&(i=n[1]),r.a.createElement(y.a.Item,{key:t},r.a.createElement("p",{className:"event-desc"},s+i,": ",a))})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a={username:this.state.username,password:this.state.password};fetch("https://ec2.kevnchoi.com/analytics/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(function(e){return e.json()}).then(function(e){"Authenticated"===e.status?(t.setState({authMessage:""}),localStorage.setItem("auth",!0)):t.setState({authMessage:e.status})}).catch(function(e){return console.log("Error: "+e)})}},{key:"handlePasswordChange",value:function(e){this.setState({password:e.target.value})}},{key:"handleUsernameChange",value:function(e){this.setState({username:e.target.value})}},{key:"renderAuth",value:function(){return r.a.createElement(g.a,{onSubmit:this.handleSubmit},r.a.createElement(g.a.Group,{controlId:"formBasicEmail"},r.a.createElement(g.a.Control,{placeholder:"Username",onChange:this.handleUsernameChange})),r.a.createElement(g.a.Group,{controlId:"formBasicPassword"},r.a.createElement(g.a.Control,{type:"password",placeholder:"Password",onChange:this.handlePasswordChange}),r.a.createElement(g.a.Text,{className:"text-muted"},this.state.authMessage)),r.a.createElement(E.a,{variant:"outline-primary",type:"submit"},"Submit"))}},{key:"render",value:function(){var e=this;return localStorage.getItem("auth")?r.a.createElement("div",{className:"body-content"},r.a.createElement(v.a,null,r.a.createElement(v.a.Body,null,r.a.createElement(b.a,{defaultActiveKey:"events"},r.a.createElement(w.a,{eventKey:"events",title:"Events"},r.a.createElement("div",{className:"accordion"},r.a.createElement("h4",{className:"event-header"},r.a.createElement(f.a,{variant:"secondary"},"Total Visits: ",this.state.totalVisits),r.a.createElement("div",{className:"reverse"},r.a.createElement(E.a,{variant:"outline-primary",style:{height:30,width:30,padding:0},onClick:function(){return e.reverseOrder()}},this.renderReverseButton()))),r.a.createElement(p.a,null,this.renderMetricsCards()))),r.a.createElement(w.a,{eventKey:"charts",title:"Charts"},r.a.createElement("div",{className:"charts"},r.a.createElement(v.a.Title,null,"Visits by Event Type"),this.renderChart())))))):r.a.createElement("div",{className:"body-content"},this.renderAuth())}}]),t}(n.Component),C=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-container"},r.a.createElement(d,null),r.a.createElement(S,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[59,1,2]]]);
//# sourceMappingURL=main.7cc78522.chunk.js.map