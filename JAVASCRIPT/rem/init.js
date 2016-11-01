;(function(window,document,undefined){

			var htmlElement = document.documentElement;
			var metaElement = document.querySelector('meta[name="viewport"]');

			var dpr = Math.min(window.devicePixelRatio,3);
			var scale = 1 / dpr;

			// document.documentElement.dataset.dpr

			var renderToRem = function(){
				var width = htmlElement.getBoundingClientRect().width;
				width / dpr > 540 && (width = 540 * dpr);
				var rem = width / 10;
				// var rem = dpr * Math.min(width, 1118) / 16;
				htmlElement.style.fontSize = rem + 'px';
			};

			renderToRem();

			if(metaElement === null){
				metaElement = document.createElement('meta');
				metaElement.name = 'viewport';
				metaElement.content = 'initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale;
				htmlElement.firstElementChild.appendChild(metaElement);
			}

			// event
			window.addEventListener('resize',function(e){ 
				setTimeout(renderToRem, 300); 
			},false);
			window.addEventListener('pageshow',function(e){
				e.persisted && setTimeout(renderToRem, 300);
			},false);

		})(window,document,undefined);
