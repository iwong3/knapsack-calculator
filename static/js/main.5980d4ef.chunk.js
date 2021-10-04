(this["webpackJsonpknapsack-calculator"]=this["webpackJsonpknapsack-calculator"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(2),a=n.n(i),s=n(4),c=n.n(s),r=n(5),l=n(6),u=n(1),o=n(8),_=n(7),d=(n(13),n(0)),m=function(e){Object(o.a)(n,e);var t=Object(_.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).MAX_TARGET=9999.99,i.REGEX_DECIMALS=/(\.\d{0,1})$/,i.REGEX_PRICE=/^((\d)*(\.\d{0,2})?)$/,i.REGEX_TARGET=/^\$((\d)*(\.\d{0,2})?)$/,i.calculate_solution=function(){i.reset_item_selections();for(var e=i.state.item_prices.map((function(e){return 100*parseFloat(e,10)})),t=i.state.item_selections,n=e.length,a=(100*parseFloat(i.state.target.substring(1))).toFixed(0),s=new Array(n+1),c=0;c<=n;c++)s[c]=new Array(a+1),s[c][0]=0;for(var r=0;r<=a;r++)s[0][r]=0;for(var l=1;l<=n;l++)for(var u=1;u<=a;u++){var o=e[l-1],_=s[l-1][u];if(o<=u){var d=s[l-1][u-o]+o;s[l][u]=Math.max(d,_)}else s[l][u]=_}for(var m=(s[n][a]/100).toFixed(2),p=(a/100-m).toFixed(2),h=[],j=n,v=a;j>0&&v>0;)s[j][v]!==s[j-1][v]?(h.push(j-1),v-=e[j-1],j--):j--;h.map((function(e){t[e]=!0})),i.setState({item_selections:t,remainder:"$"+p,total:"$"+m})},i.render_input=function(e){var t="unselected";return!0===i.state.item_selections[e]&&(t="selected"),Object(d.jsxs)("div",{className:"input_group",id:t,children:[Object(d.jsx)("div",{className:"input_group-section",id:"name",children:Object(d.jsx)("input",{className:"input_group-input",id:t,type:"text",placeholder:"Enter Item",value:i.state.item_names[e],onChange:function(t){return i.handle_item_name_change(t,e)}})}),Object(d.jsxs)("div",{className:"input_group-section",id:"price",children:[Object(d.jsx)("div",{className:"input_group-label",children:"$"}),Object(d.jsx)("input",{className:"input_group-input",id:t,type:"text",value:i.state.item_prices[e],onChange:function(t){return i.handle_item_price_change(t,e)},onBlur:function(t){return i.check_price(t,e)}})]}),Object(d.jsx)("div",{className:"input_group-section",id:"close",children:Object(d.jsx)("div",{className:"remove_icon",onClick:function(t){i.remove_input(t,e)}})})]})},i.append_input=function(){i.setState((function(e){return{inputs:e.inputs.concat([i.state.inputs.length]),item_names:e.item_names.concat([""]),item_prices:e.item_prices.concat([(0).toFixed(2)])}}),(function(){this.reset_item_selections()}))},i.remove_input=function(e,t){e.preventDefault();var n=i.state.inputs,a=i.state.item_names,s=i.state.item_prices;n.pop(),a.splice(t,1),s.splice(t,1),i.setState({inputs:n,item_names:a,item_prices:s},(function(){this.reset_item_selections()}))},i.handle_item_name_change=function(e,t){var n=i.state.item_names;n[t]=e.target.value,i.setState({item_names:n},(function(){this.reset_item_selections()}))},i.handle_item_price_change=function(e,t){var n=e.target.value;if(i.REGEX_PRICE.test(n)){var a=i.state.item_prices;a[t]=n,i.setState({item_prices:a},(function(){this.reset_item_selections()}))}},i.handle_target_change=function(e){var t=e.target.value;if(0===t.length&&(t="$"),i.REGEX_TARGET.test(t)){var n=parseFloat(t.substring(1));(isNaN(n)||n<=i.MAX_TARGET)&&i.setState({target:t},(function(){this.reset_item_selections()}))}},i.format_price=function(e){return"."===(e=(e=i.format_decimals(e)).replace(/^0+/,"")).slice(0,1)&&(e="0"+e),e},i.format_decimals=function(e){return i.REGEX_DECIMALS.test(e)?"."===e.slice(-1)?e+="00":e+="0":e.includes(".")||(e+=".00"),e},i.check_price=function(e,t){var n=e.target.value;n=i.format_price(n);var a=i.state.item_prices;a[t]=n,i.setState({item_prices:a},(function(){this.reset_item_selections()}))},i.check_target=function(e){var t=e.target.value;t="$"+i.format_price(t.substring(1)),i.setState({target:t},(function(){this.reset_item_selections()}))},i.reset_item_selections=function(){for(var e=i.state.item_prices.length,t=[],n=0;n<e;n++)t.push(!1);i.setState({item_selections:t,remainder:i.state.target,total:"$0.00"})},i.state={inputs:[0,1,2],item_names:["soda","watermelon","gum"],item_prices:[1.99,5.99,.99],item_selections:[!1,!1,!1],remainder:"$10.00",target:"$10.00",total:"$0.00"},i.calculate_solution=i.calculate_solution.bind(Object(u.a)(i)),i.render_input=i.render_input.bind(Object(u.a)(i)),i.append_input=i.append_input.bind(Object(u.a)(i)),i.remove_input=i.remove_input.bind(Object(u.a)(i)),i.handle_item_name_change=i.handle_item_name_change.bind(Object(u.a)(i)),i.handle_item_price_change=i.handle_item_price_change.bind(Object(u.a)(i)),i.handle_target_change=i.handle_target_change.bind(Object(u.a)(i)),i.reset_item_selections=i.reset_item_selections.bind(Object(u.a)(i)),i}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{className:"KnapsackCalculator",children:[Object(d.jsxs)("div",{className:"header_top",children:[Object(d.jsxs)("div",{className:"header1",children:[Object(d.jsx)("div",{className:"header1-label",children:"Budget"}),Object(d.jsx)("input",{className:"input_group-input",id:"target-input",type:"text",value:this.state.target,onChange:function(t){return e.handle_target_change(t)},onBlur:function(t){return e.check_target(t)}})]}),Object(d.jsxs)("div",{className:"header2",children:[Object(d.jsxs)("div",{className:"header2-section",children:[Object(d.jsx)("div",{className:"header2-label",children:"Total"}),Object(d.jsx)("div",{className:"header2-value",children:this.state.total})]}),Object(d.jsxs)("div",{className:"header2-section",children:[Object(d.jsx)("div",{className:"header2-label",children:"Remaining"}),Object(d.jsx)("div",{className:"header2-value",children:this.state.remainder})]})]})]}),Object(d.jsx)("form",{children:this.state.inputs.map((function(t){return e.render_input(t)}))}),Object(d.jsxs)("div",{className:"button_group",children:[Object(d.jsx)("div",{className:"button",id:"add-item",onClick:function(){return e.append_input()},children:"Add Item"}),Object(d.jsx)("div",{className:"button",id:"calculate",onClick:function(){return e.calculate_solution()},children:"Calculate"})]})]})}}]),n}(i.Component),p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),i(e),a(e),s(e),c(e)}))};n(15);c.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(m,{})}),document.getElementById("root")),p()}},[[16,1,2]]]);
//# sourceMappingURL=main.5980d4ef.chunk.js.map