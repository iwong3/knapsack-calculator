(this["webpackJsonpknapsack-calculator"]=this["webpackJsonpknapsack-calculator"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(2),i=n.n(a),s=n(4),c=n.n(s),r=n(5),l=n(6),o=n(1),u=n(8),_=n(7),d=(n(13),n(0)),m=function(e){Object(u.a)(n,e);var t=Object(_.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).calculate_solution=function(){a.reset_item_selections();for(var e=a.state.item_prices.map((function(e){return 100*parseFloat(e,10)})),t=a.state.item_selections,n=e.length,i=(100*parseFloat(a.state.target.substring(1))).toFixed(0),s=new Array(n+1),c=0;c<=n;c++)s[c]=new Array(i+1),s[c][0]=0;for(var r=0;r<=i;r++)s[0][r]=0;for(var l=1;l<=n;l++)for(var o=1;o<=i;o++){var u=e[l-1],_=s[l-1][o];if(u<=o){var d=s[l-1][o-u]+u;s[l][o]=Math.max(d,_)}else s[l][o]=_}for(var m=(s[n][i]/100).toFixed(2),p=(i/100-m).toFixed(2),h=[],j=n,g=i;j>0&&g>0;)s[j][g]!==s[j-1][g]?(h.push(j-1),g-=e[j-1],j--):j--;h.map((function(e){t[e]=!0})),a.setState({item_selections:t,remainder:"$"+p,total:"$"+m})},a.render_input=function(e){var t="unselected";return!0===a.state.item_selections[e]&&(t="selected"),Object(d.jsxs)("div",{className:"input_group",id:t,children:[Object(d.jsx)("div",{className:"input_group-section",id:"name",children:Object(d.jsx)("input",{className:"input_group-input",id:t,type:"text",placeholder:"Enter Item",value:a.state.item_names[e],onChange:function(t){a.handle_item_name_change(t,e)}})}),Object(d.jsxs)("div",{className:"input_group-section",id:"price",children:[Object(d.jsx)("div",{className:"input_group-label",children:"$"}),Object(d.jsx)("input",{className:"input_group-input",id:t,type:"text",value:a.state.item_prices[e],onChange:function(t){a.handle_item_price_change(t,e)}})]}),Object(d.jsx)("div",{className:"input_group-section",id:"close",children:Object(d.jsx)("div",{className:"remove_icon",onClick:function(t){a.remove_input(t,e)}})})]})},a.append_input=function(){a.setState((function(e){return{inputs:e.inputs.concat([a.state.inputs.length]),item_names:e.item_names.concat([""]),item_prices:e.item_prices.concat([0])}})),a.reset_item_selections()},a.remove_input=function(e,t){e.preventDefault();var n=a.state.inputs;n.pop();var i=a.state.item_names;i.splice(t,1);var s=a.state.item_prices;s.splice(t,1),a.setState({inputs:n,item_names:i,item_prices:s}),a.reset_item_selections()},a.handle_item_name_change=function(e,t){var n=a.state.item_names;n[t]=e.target.value,a.setState({item_names:n}),a.reset_item_selections()},a.handle_item_price_change=function(e,t){var n=a.state.item_prices;n[t]=e.target.value,a.setState({item_prices:n}),a.reset_item_selections()},a.handle_target_change=function(e){var t=e.target.value;t||(t="$"),a.setState({target:t}),a.reset_item_selections()},a.reset_item_selections=function(){for(var e=a.state.item_prices.length,t=[],n=0;n<e;n++)t.push(!1);a.setState({item_selections:t,remainder:a.state.target,total:"$0"})},a.state={inputs:[0,1,2],item_names:["soda","watermelon","gum"],item_prices:[1.99,5.99,.99],item_selections:[!1,!1,!1],remainder:"$10",target:"$10",total:"$0"},a.calculate_solution=a.calculate_solution.bind(Object(o.a)(a)),a.render_input=a.render_input.bind(Object(o.a)(a)),a.append_input=a.append_input.bind(Object(o.a)(a)),a.remove_input=a.remove_input.bind(Object(o.a)(a)),a.handle_item_name_change=a.handle_item_name_change.bind(Object(o.a)(a)),a.handle_item_price_change=a.handle_item_price_change.bind(Object(o.a)(a)),a.handle_target_change=a.handle_target_change.bind(Object(o.a)(a)),a.reset_item_selections=a.reset_item_selections.bind(Object(o.a)(a)),a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{className:"KnapsackCalculator",children:[Object(d.jsxs)("div",{className:"header1",children:[Object(d.jsx)("div",{children:"Budget"}),Object(d.jsx)("input",{className:"input_group-input",id:"target-input",type:"text",value:this.state.target,onChange:function(t){e.handle_target_change(t)}})]}),Object(d.jsxs)("div",{className:"header2",children:[Object(d.jsxs)("div",{className:"header2-section",children:["Total: ",this.state.total]}),Object(d.jsxs)("div",{className:"header2-section",children:["Remaining: ",this.state.remainder]})]}),Object(d.jsx)("form",{children:this.state.inputs.map((function(t){return e.render_input(t)}))}),Object(d.jsxs)("div",{className:"button_group",children:[Object(d.jsx)("div",{className:"button",id:"add-item",onClick:function(){return e.append_input()},children:"Add Item"}),Object(d.jsx)("div",{className:"button",id:"calculate",onClick:function(){return e.calculate_solution()},children:"Calculate"})]})]})}}]),n}(a.Component),p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),s(e),c(e)}))};n(15);c.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(m,{})}),document.getElementById("root")),p()}},[[16,1,2]]]);
//# sourceMappingURL=main.fe3e0f07.chunk.js.map