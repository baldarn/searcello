const SEARCHES = 'searches';

let searches = JSON.parse(localStorage.getItem(SEARCHES));

var browser = chrome;

if(searches == null){
	searches = [];
}

let vm = {
	data : searches,

	search : function(){
		// delete field
		let script = "$('.header-search-input').val('')";
		browser.tabs.executeScript({
	  	  code: script
	  });

		// search
		let src =	searches[this.getAttribute('data-id')];
		script = '$(".header-search-input").sendkeys(' + JSON.stringify(src) +')';
		browser.tabs.executeScript({
	  	  code: script
	  });
	},

	edit : function(){
		let idx = this.getAttribute('data-id');
		let temp = prompt("modify ", vm.data[idx]) || vm.data[idx];
		vm.data[idx] = temp;

		// trik to update rivetsjs
		vm.data.push("");
		vm.data.pop();
		localStorage.setItem(SEARCHES, JSON.stringify(vm.data));
	},

	del : function(){
		vm.data.splice(this.getAttribute('data-id'), 1);
		localStorage.setItem(SEARCHES, JSON.stringify(vm.data));
	},

	info : function(){
		// show info

		let info = "\
To add a search just type it in the input box and press enter!\n\n\
To do the search click on the item of the list";

		alert(info);
	}
};

function addItem(search){
	vm.data.push(search);
	localStorage.setItem(SEARCHES, JSON.stringify(vm.data));
};

rivets.bind(document.getElementById('scope') , {vm : vm});

document.getElementById('search').addEventListener('keydown' ,
	function(e){
		if (e.keyCode === 13) { // enter
			if(this.value != null && this.value != ''){
				addItem(this.value);
        this.value = '';
			}
    }
	});

	browser.tabs.executeScript({
			code: "if (typeof inited === 'undefined') {}"
	}, function(res){
		if(!res[0]){
			browser.tabs.executeScript({
					code: "var inited = true;"
			});
			browser.tabs.executeScript(null, { file: "/popup/js/jquery-3.1.1.min.js" }, function() {
				browser.tabs.executeScript(null, { file: "/popup/js/bililiteRange.js" } , function() {
					browser.tabs.executeScript(null, { file: "/popup/js/jquery.sendkeys.js" }, function(){
					});
				});
			});
		}


	});
