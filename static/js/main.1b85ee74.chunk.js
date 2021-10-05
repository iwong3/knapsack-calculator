(this["webpackJsonpknapsack-calculator"]=this["webpackJsonpknapsack-calculator"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(2),a=n.n(i),s=n(4),c=n.n(s),r=n(5),l=n(6),o=n(1),_=n(8),u=n(7),d=(n(13),n(0)),p=function(e){Object(_.a)(n,e);var t=Object(u.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).MAX_TARGET=9999.99,i.REGEX_DECIMALS=/(\.\d{0,1})$/,i.REGEX_PRICE=/^((\d)*(\.\d{0,2})?)$/,i.REGEX_PRICE_RTL=/^((\d)*(\.)?(\d)*)$/,i.calculate_solution=function(){i.reset_item_selections();var e=i.state.item_prices.map((function(e){return i.toFixedNumber(100*parseFloat(e),0)})),t=JSON.parse(JSON.stringify(i.state.inputs)),n=e.length,a=i.toFixedNumber(100*parseFloat(i.state.target),0),s=a,c=i.state.num_pinned_items;if(c>0){for(var r=i.state.pinned_items,l=[],o=[],_=0;_<r.length;_++)r[_]||(l.push(e[_]),o.push(_));e=l,t=o,n-=c;var u=i.toFixedNumber(100*parseFloat(i.state.pinned_total),0);s=i.toFixedNumber(s-u,2)}for(var d=new Array(n+1),p=0;p<=n;p++)d[p]=new Array(s+1),d[p][0]=0;for(var m=0;m<=s;m++)d[0][m]=0;for(var h=1;h<=n;h++)for(var b=1;b<=s;b++){var g=e[h-1],j=d[h-1][b];if(g<=b){var v=d[h-1][b-g]+g;d[h][b]=Math.max(v,j)}else d[h][b]=j}var f=i.state.pinned_total,x=i.toFixedNumber(d[n][s]/100,2),O=i.toFixedNumber(f+x,2),N=i.toFixedNumber(a/100-O,2);O=O.toFixed(2),N=N.toFixed(2);for(var F=i.state.item_selections,k=[],E=n,C=s;E>0&&C>0;)d[E][C]!==d[E-1][C]?(console.log("idx used: "+E),k.push(t[E-1]),C-=e[E-1],E--):E--;k.map((function(e){F[e]=!0})),i.setState({item_selections:F,remainder:N,total:O})},i.toFixedNumber=function(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n},i.render_input=function(e){var t="unselected";!0===i.state.item_selections[e]&&(t="selected");var n="unselected";return!0===i.state.pinned_items[e]&&(n="selected"),Object(d.jsxs)("div",{className:"input_group",id:t,children:[Object(d.jsx)("div",{className:"input_group-section",id:"pin",children:Object(d.jsx)("div",{className:"pin_icon",id:n,onClick:function(t){i.toggle_pin_input(t,e)}})}),Object(d.jsx)("div",{className:"input_group-section",id:"name",children:Object(d.jsx)("input",{className:"input_group-input",id:t,type:"text",placeholder:"Enter Item",value:i.state.item_names[e],onChange:function(t){return i.handle_item_name_change(t,e)},onKeyDown:function(t){return i.handle_enter(t,e)}})}),Object(d.jsxs)("div",{className:"input_group-section",id:"price",children:[Object(d.jsx)("div",{className:"input_group-label",children:"$"}),Object(d.jsx)("input",{className:"input_group-input",id:t,type:"text",placeholder:"0.00",value:i.state.item_prices[e],dir:"rtl",onChange:function(t){return i.handle_item_price_change(t,e)},onBlur:function(t){return i.check_price(t,e)}})]}),Object(d.jsx)("div",{className:"input_group-section",id:"close",children:Object(d.jsx)("div",{className:"remove_icon",onClick:function(t){i.remove_input(t,e)}})})]},e)},i.append_input=function(e){var t=i.state.inputs,n=i.state.item_names,a=i.state.item_prices,s=i.state.item_selections,c=i.state.pinned_items;t=t.concat([i.state.inputs.length]),-1===e?(n=n.concat(""),a=a.concat(""),s=s.concat(!1),c=c.concat(!1)):(n.splice(e,0,""),a.splice(e,0,""),s.splice(e,0,!1),c.splice(e,0,!1)),i.setState({inputs:t,item_names:n,item_prices:a,item_selections:s,pinned_items:c},(function(){this.reset_item_selections()}))},i.remove_input=function(e,t){e.preventDefault();var n=i.state.inputs,a=i.state.item_names,s=i.state.item_prices,c=i.state.item_selections,r=i.state.pinned_items;n.pop(),a.splice(t,1),s.splice(t,1),c.splice(t,1),r.splice(t,1),i.setState({inputs:n,item_names:a,item_prices:s,item_selections:c,pinned_items:r},(function(){this.reset_item_selections()}))},i.handle_enter=function(e,t){"Enter"===e.key&&(i.append_input(t+1),i.reset_item_selections())},i.handle_target_change=function(e){var t=e.target.value.substring(1);if(i.REGEX_PRICE.test(t)){var n=i.toFixedNumber(parseFloat(t),2);(isNaN(n)||n<=i.MAX_TARGET)&&i.setState({target:t},(function(){this.reset_item_selections()}))}},i.toggle_pin_input=function(e,t){var n=i.state.pinned_items,a=i.state.pinned_total,s=i.state.item_prices,c=i.toFixedNumber(parseFloat(s[t]),2),r=i.state.num_pinned_items;n[t]?(n[t]=!1,a=i.toFixedNumber(a-c,2),r-=1):a+c<=i.toFixedNumber(parseFloat(i.state.target),2)&&(n[t]=!0,a=i.toFixedNumber(a+c,2),r+=1);i.setState({num_pinned_items:r,pinned_items:n,pinned_total:a},(function(){this.reset_item_selections()}))},i.handle_item_name_change=function(e,t){var n=i.state.item_names;n[t]=e.target.value,i.setState({item_names:n},(function(){this.reset_item_selections()}))},i.handle_item_price_change=function(e,t){var n=e.target.value;if(i.REGEX_PRICE_RTL.test(n)){n.length>=3&&"."!==n.slice(-1)&&(n=(n=n.replace(".","")).slice(0,-2)+"."+n.slice(-2));var a=i.state.item_prices;a[t]=n,i.setState({item_prices:a},(function(){this.reset_item_selections()}))}},i.format_price_string=function(e){return"."===(e=(e=i.format_decimals_string(e)).replace(/^0+/,"")).slice(0,1)&&(e="0"+e),e},i.format_decimals_string=function(e){return 1===e.length?".0"+e:2===e.length?"."+e:"."===e.slice(-1)?e+"00":e},i.check_price=function(e,t){var n=e.target.value;n=i.format_price_string(n);var a=i.state.item_prices;a[t]=n,i.setState({item_prices:a},(function(){this.reset_item_selections()}))},i.check_target=function(e){var t=e.target.value.substring(1);t=i.format_price_string(t),i.setState({target:t},(function(){this.reset_item_selections()}))},i.reset_item_selections=function(){var e=JSON.parse(JSON.stringify(i.state.pinned_items)),t=i.state.pinned_total,n=i.format_price_string(""+t),a=i.toFixedNumber(i.state.target-t,2),s=i.format_price_string(""+a);i.setState({item_selections:e,remainder:s,total:n})},i.state={inputs:[0,1,2,3,4],item_names:["soda","watermelon","chips","pomegranate","pie"],item_prices:["0.99","5.99","1.99","2.99","3.14"],item_selections:[!1,!1,!1,!1,!1],num_pinned_items:0,pinned_items:[!1,!1,!1,!1,!1],pinned_total:0,remainder:"10.00",target:"10.00",total:"0.00"},i.calculate_solution=i.calculate_solution.bind(Object(o.a)(i)),i.render_input=i.render_input.bind(Object(o.a)(i)),i.append_input=i.append_input.bind(Object(o.a)(i)),i.remove_input=i.remove_input.bind(Object(o.a)(i)),i.handle_item_name_change=i.handle_item_name_change.bind(Object(o.a)(i)),i.handle_item_price_change=i.handle_item_price_change.bind(Object(o.a)(i)),i.handle_target_change=i.handle_target_change.bind(Object(o.a)(i)),i.check_price=i.check_price.bind(Object(o.a)(i)),i.check_target=i.check_target.bind(Object(o.a)(i)),i.reset_item_selections=i.reset_item_selections.bind(Object(o.a)(i)),i}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{className:"KnapsackCalculator",children:[Object(d.jsxs)("div",{className:"header_top",children:[Object(d.jsxs)("div",{className:"header1",children:[Object(d.jsx)("div",{className:"header1-label",children:"Budget"}),Object(d.jsx)("input",{className:"input_group-input",id:"target-input",type:"text",value:"$"+this.state.target,onChange:function(t){return e.handle_target_change(t)},onBlur:function(t){return e.check_target(t)}})]}),Object(d.jsxs)("div",{className:"header2",children:[Object(d.jsxs)("div",{className:"header2-section",children:[Object(d.jsx)("div",{className:"header2-label",children:"Total"}),Object(d.jsx)("div",{className:"header2-value",children:"$"+this.state.total})]}),Object(d.jsxs)("div",{className:"header2-section",children:[Object(d.jsx)("div",{className:"header2-label",children:"Remaining"}),Object(d.jsx)("div",{className:"header2-value",children:"$"+this.state.remainder})]})]})]}),Object(d.jsx)("form",{children:this.state.inputs.map((function(t){return e.render_input(t)}))}),Object(d.jsxs)("div",{className:"button_group",children:[Object(d.jsx)("div",{className:"button",id:"add-item",onClick:function(){return e.append_input(-1)},children:"Add Item"}),Object(d.jsx)("div",{className:"button",id:"calculate",onClick:function(){return e.calculate_solution()},children:"Calculate"})]})]})}}]),n}(i.Component),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),i(e),a(e),s(e),c(e)}))};n(15);c.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(p,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.1b85ee74.chunk.js.map