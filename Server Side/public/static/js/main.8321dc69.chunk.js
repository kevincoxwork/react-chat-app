(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{154:function(e,t,a){e.exports=a.p+"static/media/logo.e8547e17.png"},223:function(e,t,a){e.exports=a(405)},253:function(e,t){},405:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),o=a(16),r=a.n(o),l=a(31),i=a(32),m=a(34),c=a(33),u=a(35),g=a(18),h=a(9),d=a(151),p=a.n(d),f=Object(g.createMuiTheme)({typography:{useNextVariants:!0},palette:{common:{black:"#000",white:"#fff"},background:{paper:"#fff",default:"#fafafa"},primary:{light:"#7986cb",main:"rgba(5, 56, 107, 1)",dark:"#303f9f",contrastText:"#fff"},secondary:{light:"#ff4081",main:"rgba(92, 219, 149, 1)",dark:"#c51162",contrastText:"#fff"},error:{light:"#e57373",main:"#f44336",dark:"#d32f2f",contrastText:"#fff"},text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"}}}),b=a(42),E=(a(70),function(e){return n.a.createElement("div",{className:"MessageBubble",style:{backgroundColor:e.color}},n.a.createElement("span",{style:{fontSize:"smaller",fontWeight:"bold",float:"left"}},e.message.from," says:"),n.a.createElement("span",{style:{fontSize:"smaller",float:"right"}},e.message.roomName),n.a.createElement("br",null),n.a.createElement("span",{style:{fontSize:"smaller",float:"right"}},e.message.time),n.a.createElement("br",null),n.a.createElement("span",{style:{float:"left"}},e.message.text))}),y=function(e){var t=40;return"right"===e.float&&(t=175),n.a.createElement("div",{style:{content:"",position:"absolute",bottom:"-10px",left:t,borderWidth:"10px 10px 0",borderStyle:"solid",borderColor:"".concat(e.color," transparent")}})},v=function(e){function t(){var e,a;Object(l.a)(this,t);for(var s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(n)))).componentDidMount=function(){var e=r.a.findDOMNode(Object(b.a)(Object(b.a)(a)));e.scrollIntoView({block:"end",behavior:"smooth"}),e.blur()},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.color,t=this.props.float;return n.a.createElement("div",{style:{float:"".concat(t),display:"inline",width:"51%",position:"relative",height:"100px"}},n.a.createElement(h.j,{ref:"message",style:{textAlign:"left",marginBottom:"5px"}},n.a.createElement(E,{message:this.props.message,color:e}),n.a.createElement(y,{float:t,color:e})),"\xa0")}}]),t}(n.a.Component),N=function(e){for(var t=[],a=0;a<e.messages.length;a++)e.messages[a].from===e.chatName?t.push(n.a.createElement(v,{float:"right",color:e.messages[a].colour,key:a.toString(),message:e.messages[a]})):t.push(n.a.createElement(v,{float:"left",color:e.messages[a].colour,key:a.toString(),message:e.messages[a]})),t.push(n.a.createElement("br",{key:a.toString()+"a"}));return n.a.createElement(h.i,null,t)},x=a(153),C=a.n(x),S=function(e){return n.a.createElement(h.a,{position:"static"},n.a.createElement(h.p,{color:"primary",title:"Case 3 - Chat App"},n.a.createElement(h.q,{variant:"h6",color:"inherit"},"Case 3 - Chat App"),n.a.createElement("section",{style:{height:90,width:90,marginLeft:"auto"}},n.a.createElement(h.h,{onClick:function(){return e.viewDialog()}},n.a.createElement(C.a,{style:{color:"white",height:70,width:70}})))))},k=a(154),R=a.n(k),j=function(e){function t(){var e,a;Object(l.a)(this,t);for(var s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(n)))).state={length:0,width:0},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.size;"large"===e?this.setState({length:300,width:300}):"medium"===e?this.setState({length:200,width:200}):"small"===e&&this.setState({length:100,width:100})}},{key:"render",value:function(){var e=this.state,t=e.length,a=e.width;return n.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"1%"}},n.a.createElement("img",{width:a,height:t,src:R.a,alt:"Website Logo"}))}}]),t}(n.a.PureComponent),T=function(e){function t(){var e,a;Object(l.a)(this,t);for(var s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(n)))).state={open:!1,socket:null,messages:[],users:[],chatName:"",messageDisabled:!0,chatNameDisabled:!0,hideRoomTextBox:!0,roomName:"",roomNameDisabled:!0,roomList:[],nameHelper:"A Unique Name Is Required",roomHelper:"A Room Is Required",messageHelper:"A Message Is Required",msg:"",isTyping:!1,isTypingText:"",hideJoinObjects:!1},a.componentDidMount=function(){var e=p.a.connect();e.on("welcome",a.onWelcome),e.on("updatedlistRooms",a.listRooms),e.on("getCurrentUsers",a.listUsers),e.on("nameexists",a.usernameExists),e.on("someonejoined",a.addMessage),e.on("someoneleft",a.addMessage),e.on("someoneistyping",a.userIsTyping),e.on("newmessage",a.addMessage),e.emit("listRooms"),a.setState({socket:e})},a.usernameExists=function(e){a.setState({nameHelper:e.text,chatNameDisabled:!0,chatName:""})},a.userIsTyping=function(e){a.setState({isTypingText:e.text})},a.listUsers=function(e){a.setState({users:e})},a.listRooms=function(e){a.setState({roomList:e})},a.onWelcome=function(e){a.addMessage(e),a.setState({hideJoinObjects:!0})},a.addMessage=function(e){var t=a.state.messages;t.push(e),a.setState({messages:t}),a.forceUpdate()},a.handleJoin=function(){a.state.socket.emit("join",{chatName:a.state.chatName,roomName:a.state.roomName})},a.onNameChange=function(e){""===e.target.value?a.setState({chatName:e.target.value,chatNameDisabled:!0,nameHelper:"A Unique Name Is Required"}):a.setState({chatName:e.target.value,chatNameDisabled:!1,nameHelper:""})},a.onRoomChange=function(e){""===e.target.value?a.setState({roomName:e.target.value,roomNameDisabled:!0,roomHelper:"A Room Is Required"}):a.setState({roomName:e.target.value,roomNameDisabled:!1,roomHelper:""})},a.onRoomChangeRadio=function(e){a.setState({roomName:e.target.value,roomNameDisabled:!1,hideRoomTextBox:!1,roomHelper:""})},a.onMessageChange=function(e){""===e.target.value?a.setState({msg:e.target.value,messageDisabled:!0,messageHelper:"A Message Is Required"}):a.setState({msg:e.target.value,messageDisabled:!1,messageHelper:""}),!1===a.state.isTyping&&(a.state.socket.emit("typing",{from:a.state.chatName}),a.setState({isTyping:!0}))},a.handleSendMessage=function(e){e.preventDefault(),a.state.socket.emit("message",{from:a.state.chatName,text:a.state.msg},function(e){}),a.setState({msg:"",isTyping:!1})},a.handleOpenDialog=function(){a.state.socket.emit("users"),a.setState({open:!0})},a.handleCloseDialog=function(){return a.setState({open:!1})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"generateUsersList",value:function(){var e=[],t=0;0!==this.state.users.length&&(t=(t=JSON.stringify(this.state.users.users)).split("chatName").length-1);for(var a=0;a<t;a++)console.log(a),e.push(n.a.createElement(h.j,{key:this.state.users.users[a].chatName},n.a.createElement(h.k,null,n.a.createElement(h.b,{style:{color:"#fff",backgroundColor:this.state.users.users[a].colour}},this.state.users.users[a].chatName.substring(0,1))),n.a.createElement(h.l,{primary:this.state.users.users[a].chatName}),n.a.createElement(h.l,{primary:this.state.users.users[a].roomName})));return e}},{key:"createRoomRadioButtons",value:function(){for(var e=[],t=0;t<this.state.roomList.length;t++)e.push(n.a.createElement(h.g,{key:this.state.roomList[t]+t.toString(),value:this.state.roomList[t],control:n.a.createElement(h.m,null),label:this.state.roomList[t]}));return n.a.createElement(h.n,{"aria-label":"Existing Rooms",name:"ExistingRooms",onChange:this.onRoomChangeRadio},e)}},{key:"render",value:function(){var e=this.state,t=e.open,a=e.hideJoinObjects,s=e.chatName,o=e.isTypingText,r=e.chatNameDisabled,l=e.nameHelper,i=e.messageDisabled,m=e.roomHelper,c=e.messageHelper,u=e.msg,d=e.messages,p=e.roomName,b=e.roomNameDisabled,E=e.hideRoomTextBox;return n.a.createElement(g.MuiThemeProvider,{theme:f},n.a.createElement("div",null,n.a.createElement(S,{viewDialog:this.handleOpenDialog}),n.a.createElement(h.e,{open:t,onClose:this.handleCloseDialog,style:{margin:20}},n.a.createElement(h.f,{style:{textAlign:"center"}},"Connected Users"),t&&this.generateUsersList())),!a&&n.a.createElement(h.d,null,n.a.createElement(h.q,{variant:"h4",style:{paddingTop:"20px",textAlign:"center"}},"Case 3 - Chat App"),n.a.createElement(j,{size:"small"}),n.a.createElement(h.d,null,n.a.createElement(n.a.Fragment,null,n.a.createElement(h.o,{onChange:this.onNameChange,placeholder:"Enter A Username",autoFocus:!0,required:!0,value:s,error:r,helperText:l}),n.a.createElement("br",null))),n.a.createElement("br",null),n.a.createElement(h.d,null,n.a.createElement(h.q,{variant:"h5",style:{padding:"1%",textAlign:"center"}},"Join Existing or Enter Room Name"),this.createRoomRadioButtons(),E&&n.a.createElement(h.o,{onChange:this.onRoomChange,placeholder:"Room Name",autoFocus:!0,required:!0,value:p,error:b,helperText:m})),n.a.createElement(h.c,{onClick:this.handleJoin,color:"primary",variant:"contained",disabled:r||b,style:{marginTop:"1em"}},"Join")),a&&n.a.createElement("div",null,n.a.createElement("div",{className:"MessagesList"},n.a.createElement(N,{messages:d,chatName:s})),n.a.createElement(n.a.Fragment,null,n.a.createElement(h.o,{onChange:this.onMessageChange,placeholder:"Message",autoFocus:!0,required:!0,error:i,helperText:c,value:u}),n.a.createElement("p",null,o),n.a.createElement(h.c,{onClick:this.handleSendMessage,color:"primary",variant:"contained",disabled:i,style:{marginTop:"1em"}},"Send"))))}}]),t}(n.a.PureComponent);r.a.render(n.a.createElement(T,null),document.getElementById("root"))},70:function(e,t,a){}},[[223,2,1]]]);
//# sourceMappingURL=main.8321dc69.chunk.js.map