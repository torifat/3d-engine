parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"zCHU":[function(require,module,exports) {
"use strict";function r(r){return r.length}function t(r){return r.length?r[0].length:0}function o(o){var n=r(o),e=t(o);if(n!==e)throw new Error("Need a square matrix to perform this operation! "+n+" != "+e)}function n(r,t,o){for(var n=[[]],e=0;e<r;++e){n[e]=[];for(var u=0;u<t;++u)n[e][u]=o(e,u)}return n}function e(o,n){var e=r(n),u=t(o);if(u!==e)throw new Error("Columns of left Matrix must be equal to rows of right Matrix! "+u+" != "+e);for(var i=r(o),f=t(n),a=exports.empty(0),p=0;p<i;++p){a[p]=[];for(var s=0;s<f;++s){for(var c=0,v=0;v<u;++v)c+=o[p][v]*n[v][s];a[p][s]=c}}return a}function u(t){for(var o=i(t,!0).u,n=r(t),e=1,u=0;u<n;++u)e*=o[u][u];return Math.round(e)}function i(t,n){void 0===n&&(n=!1),o(t);for(var e=r(t),u=n?void 0:exports.identity(e),i=exports.copy(t),f=0;f<e-1;++f)for(var a=f+1;a<e;++a){var p=-i[a][f]/i[f][f];n||(u[a][f]=-p);for(var s=f;s<e;++s)i[a][s]+=p*i[f][s]}return{l:u,u:i}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.empty=function(r,t){return void 0===t&&(t=r),n(r,t,function(){return 0})},exports.identity=function(r){return n(r,r,function(r,t){return r===t?1:0})},exports.copy=function(o){return n(r(o),t(o),function(r,t){return o[r][t]})},exports.multiply=e,exports.determinant=u,exports.lu=i;
},{}],"UldJ":[function(require,module,exports) {
"use strict";function t(t){var r=t.translation,o=void 0===r?[0,0,0]:r,e=t.rotation,n=void 0===e?[0,0,0]:e,s=n[0],a=n[1],i=n[2],u=o[0],c=o[1],p=o[2],M=Math.cos(s),h=Math.sin(s),f=Math.cos(a),v=Math.sin(a),x=Math.cos(i),d=Math.sin(i);return[[x*f+h*d*v,h*x*v-d*f,M*v,0],[M*d,M*x,-h,0],[h*d*f-x*v,h*(x*f)+d*v,M*f,0],[u,c,p,1]]}function r(t,r,o,e){var n=e-o,s=1/Math.tan(t/2);return[[s/r,0,0,0],[0,s,0,0],[0,0,e/n,1],[0,0,-e*o/n,0]]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.zero=function(){return[0,0,0]},exports.up=function(){return[0,1,0]},exports.transform=t,exports.perspectiveProjectionMatrix=r;
},{}],"z0ce":[function(require,module,exports) {
"use strict";var t=this&&this.__spreadArrays||function(){for(var t=0,i=0,r=arguments.length;i<r;i++)t+=arguments[i].length;var e=Array(t),o=0;for(i=0;i<r;i++)for(var h=arguments[i],a=0,n=h.length;a<n;a++,o++)e[o]=h[a];return e};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("./matrix"),r=require("./utils"),e=function(){function e(t){var i=t.getContext("2d");if(!i)throw new Error("No context!");this.context=i,this.height=t.height,this.width=t.width,this.backBuffer=i.getImageData(0,0,this.width,this.height)}return e.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height),this.backBuffer=this.context.getImageData(0,0,this.width,this.height)},e.prototype.present=function(){this.context.putImageData(this.backBuffer,0,0)},e.prototype.putPixel=function(t,i,r){var e=this.backBuffer.data,o=4*(i*this.width+t);e[o]=255*r[0],e[o+1]=255*r[1],e[o+2]=255*r[2],e[o+3]=255*r[3]},e.prototype.project=function(r,e){var o=i.multiply([t(r,[1])],e),h=o[0][0]/o[0][3],a=o[0][1]/o[0][3];return[Math.floor(h*this.width+this.width/2),Math.floor(-a*this.height+this.height/2)]},e.prototype.drawPoint=function(t){var i=t[0],r=t[1];i>=0&&r>=0&&i<this.width&&r<this.height&&this.putPixel(i,r,[1,1,0,1])},e.prototype.drawLine=function(t,i){this.drawBLine(t,i)},e.prototype.drawBLine=function(t,i){for(var r=Math.floor(t[0]),e=Math.floor(t[1]),o=Math.floor(i[0]),h=Math.floor(i[1]),a=Math.abs(o-r),n=Math.abs(h-e),s=r<o?1:-1,c=e<h?1:-1,f=a-n;this.drawPoint([r,e]),r!=o||e!=h;){var p=2*f;p>-n&&(f-=n,r+=s),p<a&&(f+=a,e+=c)}},e.prototype.render=function(t,e){var o=this;void 0===e&&(e=[]);var h=t.lookAt(r.up()),a=r.perspectiveProjectionMatrix(.78,this.width/this.height,.01,1);e.forEach(function(t){for(var e=t.faces,n=t.position,s=t.rotation,c=t.vertices,f=r.transform({translation:n,rotation:s}),p=i.multiply(i.multiply(f,h),a),u=0;u<c.length-1;++u){var d=o.project(c[u],p),l=o.project(c[u+1],p);o.drawLine(d,l)}e.forEach(function(t){var i=o.project(c[t[0]],p),r=o.project(c[t[1]],p),e=o.project(c[t[2]],p);o.drawLine(i,r),o.drawLine(r,e),o.drawLine(e,i)})})},e}();exports.Device=e;
},{"./matrix":"zCHU","./utils":"UldJ"}],"OQwB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./utils"),t=function(){return function(t,s,i){void 0===s&&(s=[]),void 0===i&&(i=[]),this.position=e.zero(),this.rotation=e.zero(),this.vertices=[],this.faces=[],console.log(t+" constructed!"),this.vertices=s,this.faces=i}}();exports.Mesh=t;
},{"./utils":"UldJ"}],"ixmL":[function(require,module,exports) {
"use strict";function n(n,r){if(n.length!==r.length)throw new Error("Dimension of both vectors needs to be same! "+n.length+" != "+r.length)}function r(r,t,e,o){return n(r,t),r.reduce(function(n,r,o){return e(n,r,t[o])},o)}Object.defineProperty(exports,"__esModule",{value:!0});var t=function(n,t,e){return r(n,t,function(n,r,t){return n.concat(e(r,t))},[])};function e(r,t){if(n(r,t),3!==r.length)throw new Error("Only support cross product for 3 dimensional vectors!");return[r[1]*t[2]-r[2]*t[1],r[2]*t[0]-r[0]*t[2],r[0]*t[1]-r[1]*t[0]]}function o(n){var r=exports.norm(n);return n.map(function(n){return n?n/r:n})}exports.add=function(n,r){return t(n,r,function(n,r){return n+r})},exports.subtract=function(n,r){return t(n,r,function(n,r){return n-r})},exports.multiply=function(n,r){return n.map(function(n){return n*r})},exports.dot=function(n,t){return r(n,t,function(n,r,t){return n+r*t},0)},exports.cross=e,exports.norm=function(n){return Math.sqrt(n.reduce(function(n,r){return n+r*r},0))},exports.normalize=o;
},{}],"puFt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t,e=require("./utils"),r=require("./vector");!function(t){t[t.Left=0]="Left",t[t.Right=1]="Right"}(t||(t={}));var o=function(){function o(t,r){void 0===t&&(t=e.zero()),void 0===r&&(r=e.zero()),this.position=t,this.target=r}return o.prototype.lookAt=function(e,o){void 0===o&&(o=t.Left);var i=this.position,s=r.normalize(o===t.Left?r.subtract(this.target,i):r.subtract(i,this.target)),n=r.normalize(r.cross(e,s)),u=r.cross(s,n);return[[n[0],u[0],s[0],0],[n[1],u[1],s[1],0],[n[2],u[2],s[2],0],[-r.dot(n,i),-r.dot(u,i),-r.dot(s,i),1]]},o}();exports.Camera=o;
},{"./utils":"UldJ","./vector":"ixmL"}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Device"),t=require("./Mesh"),r=require("./Camera"),n=!1,o=document.querySelector("canvas"),i=new e.Device(o),a=new r.Camera([0,0,10]),s=[],c=new t.Mesh("Cube",[[-1,1,1],[1,1,1],[-1,-1,1],[1,-1,1],[-1,1,-1],[1,1,-1],[1,-1,-1],[-1,-1,-1]],[[0,1,2],[1,2,3],[1,3,6],[1,5,6],[0,1,4],[1,4,5],[2,3,7],[3,6,7],[0,2,7],[0,4,7],[4,5,6],[4,6,7]]);function u(){i.clear(),c.rotation[0]+=.01,c.rotation[0]%=360,c.rotation[1]+=.01,c.rotation[1]%=360,c.rotation[2]+=.01,c.rotation[2]%=360,i.render(a,s),i.present(),n||requestAnimationFrame(u)}s.push(c),requestAnimationFrame(u),document.getElementById("control-panel").addEventListener("click",function(e){if(e.target instanceof HTMLButtonElement){var t=e.target.dataset,r=t.index,o=t.value;a.position[r]+=+o,n&&requestAnimationFrame(u)}}),document.addEventListener("keydown",function(e){switch(e.code){case"ArrowLeft":a.position[0]-=.5;break;case"ArrowRight":a.position[0]+=.5;break;case"ArrowUp":a.position[e.shiftKey?2:1]-=.5;break;case"ArrowDown":a.position[e.shiftKey?2:1]+=.5}n&&requestAnimationFrame(u)});
},{"./Device":"z0ce","./Mesh":"OQwB","./Camera":"puFt"}]},{},["B6dB"], null)
//# sourceMappingURL=src.3b8c818c.js.map