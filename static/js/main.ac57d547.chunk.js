(this["webpackJsonpknapsack-calculator"]=this["webpackJsonpknapsack-calculator"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(2),a=n.n(i),s=n(4),c=n.n(s),r=n(5),u=n(6),o=n(1),l=n(8),_=n(7),p=(n(13),n(0)),m=function(e){Object(l.a)(n,e);var t=Object(_.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).calculate_solution=function(){i.reset_item_selections();for(var e=i.state.item_prices.map((function(e){return 100*parseFloat(e,10)})),t=i.state.item_selections,n=e.length,a=(100*parseFloat(i.state.target.substring(1))).toFixed(0),s=new Array(n+1),c=0;c<=n;c++)s[c]=new Array(a+1),s[c][0]=0;for(var r=0;r<=a;r++)s[0][r]=0;for(var u=1;u<=n;u++)for(var o=1;o<=a;o++){var l=e[u-1],_=s[u-1][o];if(l<=o){var p=s[u-1][o-l]+l;s[u][o]=Math.max(p,_)}else s[u][o]=_}for(var m=s[n][a]/100,d=[],h=n,j=a;h>0&&j>0;)s[h][j]!==s[h-1][j]?(d.push(h-1),j-=e[h-1],h--):h--;d.map((function(e){t[e]=!0})),i.setState({item_selections:t,total:"$"+m})},i.render_input=function(e){var t="unselected";return!0===i.state.item_selections[e]&&(t="selected"),Object(p.jsxs)("div",{className:"input_group",id:t,children:[Object(p.jsxs)("div",{className:"input_group-section",id:"name",children:[Object(p.jsx)("div",{className:"input_group-label",children:">"}),Object(p.jsx)("input",{className:"input_group-input",id:t,type:"text",value:i.state.item_names[e],onChange:function(t){i.handle_item_name_change(t,e)}})]}),Object(p.jsxs)("div",{className:"input_group-section",id:"price",children:[Object(p.jsx)("div",{className:"input_group-label",children:"$"}),Object(p.jsx)("input",{className:"input_group-input",id:t,type:"text",value:i.state.item_prices[e],onChange:function(t){i.handle_item_price_change(t,e)}})]}),Object(p.jsx)("div",{className:"input_group-section",id:"close",children:Object(p.jsx)("div",{className:"remove_icon",onClick:function(t){i.remove_input(t,e)}})})]})},i.append_input=function(){i.setState((function(e){return{inputs:e.inputs.concat([i.state.inputs.length]),item_names:e.item_names.concat([""]),item_prices:e.item_prices.concat([0])}})),i.reset_item_selections()},i.remove_input=function(e,t){e.preventDefault();var n=i.state.inputs;n.pop();var a=i.state.item_names;a.splice(t,1);var s=i.state.item_prices;s.splice(t,1),i.setState({inputs:n,item_names:a,item_prices:s}),i.reset_item_selections()},i.handle_item_name_change=function(e,t){var n=i.state.item_names;n[t]=e.target.value,i.setState({item_names:n}),i.reset_item_selections()},i.handle_item_price_change=function(e,t){var n=i.state.item_prices;n[t]=e.target.value,i.setState({item_prices:n}),i.reset_item_selections()},i.handle_target_change=function(e){var t=e.target.value;t||(t="$"),i.setState({target:t}),i.reset_item_selections()},i.reset_item_selections=function(){for(var e=i.state.item_prices.length,t=[],n=0;n<e;n++)t.push(!1);i.setState({item_selections:t,total:"$0"})},i.state={inputs:[0,1,2],item_names:["soda","watermelon","gum"],item_prices:[1.99,5.99,.99],item_selections:[!1,!1,!1],target:"$10",total:"$0"},i.calculate_solution=i.calculate_solution.bind(Object(o.a)(i)),i.render_input=i.render_input.bind(Object(o.a)(i)),i.append_input=i.append_input.bind(Object(o.a)(i)),i.remove_input=i.remove_input.bind(Object(o.a)(i)),i.handle_item_name_change=i.handle_item_name_change.bind(Object(o.a)(i)),i.handle_item_price_change=i.handle_item_price_change.bind(Object(o.a)(i)),i.handle_target_change=i.handle_target_change.bind(Object(o.a)(i)),i.reset_item_selections=i.reset_item_selections.bind(Object(o.a)(i)),i}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"KnapsackCalculator",children:[Object(p.jsx)("div",{children:"Target"}),Object(p.jsx)("input",{className:"input_group-input",id:"target-input",type:"text",value:this.state.target,onChange:function(t){e.handle_target_change(t)}}),Object(p.jsx)("div",{children:"Total: "}),Object(p.jsx)("div",{children:this.state.total}),Object(p.jsx)("form",{children:this.state.inputs.map((function(t){return e.render_input(t)}))}),Object(p.jsx)("button",{onClick:function(){return e.append_input()},children:"Add Item"}),Object(p.jsx)("button",{onClick:function(){return e.calculate_solution()},children:"Calculate"})]})}}]),n}(i.Component),d=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),i(e),a(e),s(e),c(e)}))};n(15);c.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(m,{})}),document.getElementById("root")),d()}},[[16,1,2]]]);
//# sourceMappingURL=main.ac57d547.chunk.js.map