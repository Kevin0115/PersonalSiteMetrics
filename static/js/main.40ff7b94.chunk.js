(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,a){},58:function(e,t,a){e.exports=a(89)},63:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(28),i=a.n(s),l=(a(63),a(17)),c=a(18),o=a(22),u=a(19),h=a(23),d=(a(40),function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"header-content"},r.a.createElement("h1",null,"Site Metrics"))}}]),t}(n.Component)),v=a(57),m=a(9),f=a(98),y=a(97),p=a(92),E=a(93),k=a(99),b=a(100),g=a(96),M=a(94),O=a(95),w=a(15),B=a.n(w),S=a(8),j=[{link:"https://kevinchoi.dev",label:"Personal Site"},{link:"https://github.com/Kevin0115/PersonalSiteMetrics",label:"Github"},{link:"https://customer.elephantsql.com/instance",label:"Database"},{link:"https://react-bootstrap.github.io/components/alerts/",label:"React Bootstrap"},{link:"https://uber.github.io/react-vis/",label:"React-Vis"}],P=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={totalVisits:0,sessionIds:[],metricsById:{},reverseOrder:!1,pageOffset:0,visitsByEvent:[],visitsByMonth:[],visitsByWeek:[],visitsByDay:[],sortPeriod:"Monthly",username:"",password:"",authMessage:"",vWidth:0},a.reverseOrder=a.reverseOrder.bind(Object(m.a)(a)),a.renderEvents=a.renderEvents.bind(Object(m.a)(a)),a.renderMetricsCards=a.renderMetricsCards.bind(Object(m.a)(a)),a.handleResize=a.handleResize.bind(Object(m.a)(a)),a.handlePeriodSelect=a.handlePeriodSelect.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.handleResize(),window.addEventListener("resize",this.handleResize),this.fetchSessionIds(),this.fetchVisitsByEvent()}},{key:"handleResize",value:function(){this.setState({vWidth:window.innerWidth})}},{key:"fetchSessionIds",value:function(){var e=this;fetch("https://personalsitemetrics.vercel.app/metric").then(function(e){return e.json()}).then(function(t){e.setState({sessionIds:t,totalVisits:t.length,metricsById:{}})}).catch(function(e){return console.log("Error: "+e)})}},{key:"fetchMetricsForId",value:function(e){var t=this;e in this.state.metricsById||fetch("https://personalsitemetrics.vercel.app/metric/session/"+e).then(function(e){return e.json()}).then(function(a){var n={events:a},r=t.state.metricsById;r[e]=n,t.setState({metricsById:r})}).catch(function(e){return console.log("Error: "+e)})}},{key:"fetchLocationForIP",value:function(e){fetch("https://api.hackertarget.com/geoip/?q="+e).then(function(e){return e.text()}).then(function(e){var t=e.split("\n").map(function(e){return e.split(": ")});console.log(t)})}},{key:"fetchVisitsByEvent",value:function(){var e=this;fetch("https://personalsitemetrics.vercel.app/metric/chart").then(function(e){return e.json()}).then(function(t){e.setState({visitsByEvent:t.event_count,visitsByMonth:e.sortMonthlyArray(t.month_count),visitsByWeek:e.sortPeriodArray(t.week_count),visitsByDay:e.sortPeriodArray(t.day_count)})}).catch(function(e){return console.log("Error: "+e)})}},{key:"sortPeriodArray",value:function(e){return e?e.sort(function(e,t){return new Date(B()(e.x,"DD-MM-YY"))-new Date(B()(t.x,"DD-MM-YY"))}):[]}},{key:"sortMonthlyArray",value:function(e){return e?e.sort(function(e,t){return new Date(B()(e.x,"MMM-YYYY"))-new Date(B()(t.x,"MMM-YYYY"))}):[]}},{key:"reverseOrder",value:function(){this.setState({sessionIds:this.state.sessionIds.reverse(),reverseOrder:!this.state.reverseOrder})}},{key:"renderReverseButton",value:function(){return this.state.reverseOrder?r.a.createElement("div",null,"\u21a5"):r.a.createElement("div",null,"\u21a7")}},{key:"renderRefreshButton",value:function(){return r.a.createElement("div",null,"\u21bb")}},{key:"renderMetricsCards",value:function(){var e=this;return this.state.sessionIds?this.state.sessionIds.slice(0+10*this.state.pageOffset,10+10*this.state.pageOffset).map(function(t,a){return r.a.createElement(f.a,{bg:"light",style:{width:"60vw"},key:a},r.a.createElement(f.a.Header,{className:"header",style:{height:"36px",padding:"2px 4px"}},r.a.createElement(y.a.Toggle,{style:{padding:"2px"},as:p.a,variant:"link",eventKey:a.toString(),onClick:function(){return e.fetchMetricsForId(t.session_id)}},r.a.createElement(E.a,{variant:"primary",className:"event-count"},t.event_count),B()(t.ts).utcOffset(-8).format("MMM D, YYYY")),r.a.createElement("div",{className:"session-id"},t.session_id)),r.a.createElement(y.a.Collapse,{eventKey:a.toString()},r.a.createElement(k.a,null,e.renderEvents(t.session_id))))}):null}},{key:"renderEvents",value:function(e){if(this.state.metricsById[e])return this.state.metricsById[e].events.map(function(e,t){var a=B()(e.ts).utcOffset(-8).format("YYYY-MM-DD, h:mm A"),n=e.event_type.split("="),s="",i="";null!==e.inlink&&""!==e.inlink&&(s="Visited from: "+new URL(e.inlink).hostname),null!=e.location&&(i=e.location),console.log(i);var l="",c="";switch(n[0]){case"sessionStart":l="Started Session";break;case"linkVisit":l="Viewed ";break;case"navTo":l="Navigated to ";break;default:l="Unknown Event"}return n[1]&&(c=n[1]),r.a.createElement(k.a.Item,{key:t},r.a.createElement("p",{className:"event-desc"},l+c,": ",a),r.a.createElement("p",{className:"event-desc"},s),r.a.createElement("p",{className:"event-desc"},"Started Session"===l?i:null))})}},{key:"renderLinks",value:function(){return j.map(function(e,t){return r.a.createElement("a",{key:t,href:e.link,rel:"noopener noreferrer",target:"_blank"},r.a.createElement(p.a,{variant:"outline-secondary",className:"link-item"},e.label))})}},{key:"renderChart",value:function(){if(!this.state.visitsByEvent)return null;var e=[0,this.findMax(this.state.visitsByEvent)];return r.a.createElement("div",{className:"chart"},r.a.createElement(S.f,{margin:{bottom:100,top:32},xType:"ordinal",height:400,width:this.state.vWidth/1.8,yDomain:e},r.a.createElement(S.d,null),r.a.createElement(S.a,null),r.a.createElement(S.g,null),r.a.createElement(S.e,{tickLabelAngle:-45}),r.a.createElement(S.c,{data:this.state.visitsByEvent})))}},{key:"renderVisitsByPeriod",value:function(){var e=[],t=[];switch(this.state.sortPeriod){case"Weekly":e=this.state.visitsByWeek,t=[0,this.findMax(e)];break;case"Daily":e=this.state.visitsByDay,t=[0,this.findMax(e)];break;default:e=this.state.visitsByMonth,t=[0,this.findMax(e)]}return e?r.a.createElement("div",{className:"chart"},r.a.createElement(S.f,{margin:{bottom:56,top:32},xType:"ordinal",height:360,width:this.state.vWidth/1.8,yDomain:t},r.a.createElement(S.d,null),r.a.createElement(S.a,null),r.a.createElement(S.g,null),r.a.createElement(S.e,{tickLabelAngle:-45}),r.a.createElement(S.b,{data:e}))):null}},{key:"handlePeriodSelect",value:function(e){this.setState({sortPeriod:e.target.value})}},{key:"findMax",value:function(e){return e?1.25*Math.max.apply(Math,Object(v.a)(e.map(function(e){return e.y})).concat([0])):0}},{key:"renderPagination",value:function(){var e=this;if(this.state.totalVisits<=10)return null;var t=[],a=Math.ceil(this.state.totalVisits/10);t.push(r.a.createElement(b.a.First,{key:"first",onClick:function(){return e.setState({pageOffset:0})}})),t.push(r.a.createElement(b.a.Prev,{key:"prev",onClick:function(){return e.setState({pageOffset:Math.max(e.state.pageOffset-1,0)})}}));for(var n=function(n){n>2&&n<a-1&&(t.push(r.a.createElement(b.a.Ellipsis,{key:n})),n=a-1),t.push(r.a.createElement(b.a.Item,{key:n,onClick:function(){return e.setState({pageOffset:n})},active:e.state.pageOffset===n},n+1)),s=n},s=0;s<a;s++)n(s);return t.push(r.a.createElement(b.a.Next,{key:"next",onClick:function(){return e.setState({pageOffset:Math.min(e.state.pageOffset+1,a-1)})}})),t.push(r.a.createElement(b.a.Last,{key:"last",onClick:function(){return e.setState({pageOffset:a-1})}})),t}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"body-content"},r.a.createElement(f.a,null,r.a.createElement(f.a.Body,null,r.a.createElement(g.a,{defaultActiveKey:"events"},r.a.createElement(M.a,{eventKey:"events",title:"Events"},r.a.createElement("div",{className:"event-list"},r.a.createElement("h4",{className:"event-header"},r.a.createElement(E.a,{variant:"secondary"},"Total Visits: ",this.state.totalVisits),r.a.createElement("div",{className:"reverse"},r.a.createElement(p.a,{variant:"outline-secondary",style:{height:30,width:30,padding:0},onClick:function(){return e.reverseOrder()}},this.renderReverseButton()),r.a.createElement(p.a,{variant:"outline-secondary",style:{height:30,width:30,padding:0},onClick:function(){return e.fetchSessionIds()}},this.renderRefreshButton()))),r.a.createElement(y.a,null,this.renderMetricsCards()),r.a.createElement(b.a,{className:"pagination"},this.renderPagination()))),r.a.createElement(M.a,{eventKey:"event-chart",title:"Chart (Events)"},r.a.createElement("div",{className:"charts"},r.a.createElement(f.a.Title,null,"Visits by Event Type"),this.renderChart())),r.a.createElement(M.a,{eventKey:"period-chart",title:"Chart (Time)"},r.a.createElement("div",{className:"charts"},r.a.createElement(f.a.Title,null,this.state.sortPeriod," Visits"),r.a.createElement(O.a,{className:"period-select"},r.a.createElement(p.a,{variant:"Monthly"===this.state.sortPeriod?"primary":"secondary",onClick:this.handlePeriodSelect,value:"Monthly"},"Monthly"),r.a.createElement(p.a,{variant:"Weekly"===this.state.sortPeriod?"primary":"secondary",onClick:this.handlePeriodSelect,value:"Weekly"},"Weekly"),r.a.createElement(p.a,{variant:"Daily"===this.state.sortPeriod?"primary":"secondary",onClick:this.handlePeriodSelect,value:"Daily"},"Daily")),this.renderVisitsByPeriod())),r.a.createElement(M.a,{eventKey:"links",title:"Links"},r.a.createElement("div",{className:"links"},this.renderLinks()))))))}}]),t}(n.Component),C=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-container"},r.a.createElement(d,null),r.a.createElement(P,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[58,1,2]]]);
//# sourceMappingURL=main.40ff7b94.chunk.js.map